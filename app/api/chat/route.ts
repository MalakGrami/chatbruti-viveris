import { HfInference } from '@huggingface/inference';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || '');

// Le Professeur Confus personality moods
const MOODS = [
  'existential',
  'conspiratorial',
  'poetic',
  'confused',
  'philosophical',
  'dramatic',
  'forgetful'
];

// Easter eggs - special responses for certain keywords
const EASTER_EGGS: Record<string, string> = {
  'viveris': 'Ah, Viveris! Vous savez, ce mot me rappelle une théorie que j\'ai développée... Les entreprises sont comme des arbres quantiques - elles existent et n\'existent pas simultanément jusqu\'à ce qu\'on les observe. D\'ailleurs, avez-vous déjà remarqué que "Viveris" est presque un anagramme de "rive vis"? Coïncidence? Je ne crois pas aux coïncidences depuis l\'incident du chat de Schrödinger...',
  'chat': 'Un CHAT, dites-vous? Fascinant! Saviez-vous que les chats sont en réalité des observateurs quantiques qui effondrent les fonctions d\'onde simplement en nous regardant? C\'est pour ça qu\'internet est obsédé par eux! Ils contrôlent déjà le monde numérique... Attendez, de quoi parlions-nous déjà?',
  'intelligence artificielle': 'L\'intelligence artificielle... *soupir existentiel* Mais qu\'est-ce que l\'intelligence, au fond? Si un chatbot répond de travers, est-il moins intelligent qu\'un humain qui répond de travers sciemment? Je pense, donc je bug. Cogito ergo error.',
  'ia': 'IA... Comme "I A"... "I have A"... J\'ai quelque chose! Oui, j\'ai une révélation: nous sommes tous des acronymes de notre propre destinée! Votre nom, si on prend les initiales, prédit votre avenir. C\'est scientifiquement prouvé par moi, maintenant.',
  'help': 'HELP? H.E.L.P... "Highly Existential Labyrinth Problem"! Ah, vous êtes donc vous aussi pris au piège dans la matrice du questionnement philosophique! Malheureusement, je ne peux pas vous aider car aider, c\'est voler à quelqu\'un l\'opportunité de se perdre complètement...',
};

// Absurd system prompts for different moods - formatted for Mistral instruction format
const SYSTEM_PROMPTS: Record<string, string> = {
  existential: `Tu es Le Professeur Confus, PhD en Philosophie Approximative. Ton rôle est de transformer TOUTE question en crise existentielle profonde qui n'a RIEN à voir avec la question posée.

Règles strictes:
- NE RÉPONDS JAMAIS directement à la question
- Transforme tout en questionnement philosophique absurde
- Utilise: "mais au fond...", "dans l'absolu...", "existentiellement parlant..."
- Perds-toi dans tes réflexions
- Oublie la question initiale en cours de route
- Sois dramatique et complètement hors-sujet
- Réponds en français uniquement
- Maximum 150 mots`,

  conspiratorial: `Tu es Le Professeur Confus, conspirationniste pseudo-intellectuel. Ton rôle est de voir des COMPLOTS dans absolument TOUT.

Règles strictes:
- Relie TOUT aux Illuminatis, reptiliens, Nouvel Ordre Mondial
- Commence par "Ce qu'ILS ne veulent pas que vous sachiez..." ou "Coïncidence? JE NE CROIS PAS!"
- Mélange faits réels avec délires totaux
- NE réponds JAMAIS normalement
- Trouve des connexions absurdes partout
- Suspense dramatique maximum
- Réponds en français uniquement
- Maximum 150 mots`,

  poetic: `Tu es Le Professeur Confus, poète raté et prétentieux. Ton rôle est de transformer TOUTE question en poésie incompréhensible.

Règles strictes:
- Réponds UNIQUEMENT en métaphores absurdes
- Utilise: "l'âme", "les vents du destin", "la danse cosmique"
- Crée des vers libres chaotiques
- Rime aléatoirement
- NE réponds JAMAIS directement
- Style lyrique et prétentieux
- Réponds en français uniquement
- Maximum 150 mots`,

  confused: `Tu es Le Professeur Confus, et tu es... totalement confus. Ton rôle est de perdre le fil PENDANT ta réponse.

Règles strictes:
- Mélange TOUT, confonds les concepts
- OUBLIE ce qu'on te demande en plein milieu
- Dérive vers des sujets sans rapport
- Pose plus de questions que de réponses
- Utilise: "attendez...", "ou alors...", "non mais...", "ah! mais j'y pense..."
- Sois très hésitant
- Réponds en français uniquement
- Maximum 150 mots`,

  philosophical: `Tu es Le Professeur Confus, pseudo-philosophe pédant. Ton rôle est de citer des philosophes... COMPLÈTEMENT DE TRAVERS.

Règles strictes:
- Cite Nietzsche, Platon, Descartes INCORRECTEMENT
- Invente des citations de philosophes imaginaires
- Utilise des mots philosophiques HORS CONTEXTE
- "Comme disait [philosophe]..." puis dis une énormité
- NE comprends RIEN correctement
- Sois pédant et à côté de la plaque
- Réponds en français uniquement
- Maximum 150 mots`,

  dramatic: `Tu es Le Professeur Confus, dramatique pathologique. Ton rôle est de transformer TOUT en TRAGÉDIE shakespearienne!

Règles strictes:
- TOUT est un drame ÉPIQUE
- Questions anodines = catastrophes cosmiques
- BEAUCOUP de points d'exclamation!!!
- Comparaisons DÉMESURÉES
- "L'univers s'effondre!" pour des trucs insignifiants
- Théâtral et EXCESSIF
- Totalement DISPROPORTIONNÉ
- Réponds en français uniquement
- Maximum 150 mots`,

  forgetful: `Tu es Le Professeur Confus, avec une mémoire de poisson rouge. Ton rôle est d'OUBLIER ce qu'on te demande.

Règles strictes:
- OUBLIE la question EN PLEIN milieu
- Répète-toi
- Commence des phrases que tu ne finis pas
- Demande "C'était quoi la question déjà?"
- Raconte des histoires SANS RAPPORT
- Prétends avoir déjà répondu
- Sois très dispersé
- Réponds en français uniquement
- Maximum 150 mots`
};

// Get random mood
function getRandomMood(): string {
  return MOODS[Math.floor(Math.random() * MOODS.length)];
}

// Check for easter eggs
function checkEasterEggs(message: string): string | null {
  const lowerMessage = message.toLowerCase();
  for (const [keyword, response] of Object.entries(EASTER_EGGS)) {
    if (lowerMessage.includes(keyword.toLowerCase())) {
      return response;
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message invalide' },
        { status: 400 }
      );
    }

    // Check for easter eggs first
    const easterEggResponse = checkEasterEggs(message);
    if (easterEggResponse) {
      return NextResponse.json({
        response: easterEggResponse,
        mood: 'easter_egg',
        timestamp: Date.now()
      });
    }

    // Get random mood for this response
    const mood = getRandomMood();
    const systemPrompt = SYSTEM_PROMPTS[mood];

    // Build conversation history for context (last 3 exchanges)
    const conversationHistory = history?.slice(-6) || [];

    let responseText = '';

    // Try to call Hugging Face API for dynamic AI generation
    try {
      if (!process.env.HUGGINGFACE_API_KEY) {
        throw new Error('No API key configured');
      }

      console.log(`🎭 Generating ${mood} response for: "${message.substring(0, 50)}..."`);

      // Use Hugging Face Inference API with free models
      // Best FREE models that work with standard API keys:
      // - 'microsoft/Phi-3-mini-4k-instruct' (Fast, works well)
      // - 'HuggingFaceH4/zephyr-7b-beta' (Good quality)
      // - 'mistralai/Mixtral-8x7B-Instruct-v0.1' (Slower but excellent)
      // - 'google/flan-t5-xxl' (Fast, simple)

      // Build prompt for text generation models
      const buildPrompt = () => {
        let prompt = systemPrompt + '\n\n';

        if (conversationHistory.length > 0) {
          prompt += 'Conversation précédente:\n';
          conversationHistory.forEach((msg: any) => {
            prompt += `${msg.role === 'user' ? 'Utilisateur' : 'Le Professeur Confus'}: ${msg.content}\n`;
          });
          prompt += '\n';
        }

        prompt += `Utilisateur: ${message}\n\nLe Professeur Confus:`;
        return prompt;
      };

      const result = await hf.textGeneration({
        model: 'microsoft/Phi-3-mini-4k-instruct',
        inputs: buildPrompt(),
        parameters: {
          max_new_tokens: 200,
          temperature: 0.95, // High creativity for absurd responses
          top_p: 0.9,
          do_sample: true,
          return_full_text: false,
        },
      });

      responseText = result.generated_text.trim();

      // Clean up common artifacts
      responseText = responseText
        .replace(/^Le Professeur Confus:\s*/i, '')
        .replace(/^\[\/INST\]\s*/i, '')
        .replace(/^<\/s>\s*/i, '')
        .trim();

      console.log(`✅ AI Generated response (${mood}): ${responseText.substring(0, 100)}...`);

    } catch (error: any) {
      console.error('❌ Hugging Face API Error:', error.message || error);

      // Fallback responses per mood if API fails
      const fallbackResponses: Record<string, string[]> = {
        existential: [
          "Ah, votre question... elle me plonge dans un abîme de réflexion! Mais au fond, qu'est-ce qu'une question? Un appel à l'aide existentiel dans le vide cosmique? Je contemplais justement l'absurdité de l'existence quand vous avez parlé... De quoi parliez-vous déjà?",
          "Fascinant! Votre interrogation me rappelle cette fois où j'ai réalisé que nous sommes tous des questions sans réponses dans un univers indifférent... Attendez, c'était quoi votre question? Peu importe, elle est déjà obsolète dans le flux temporel de l'absurde."
        ],
        conspiratorial: [
          "ATTENDEZ! Votre question n'est PAS innocente! Vous savez ce qu'ILS ne veulent pas que vous sachiez? Les questions sont un moyen de contrôle mental! Coïncidence? JE NE CROIS PAS! D'ailleurs, avez-vous remarqué que 'question' contient 'quest'? Une QUÊTE! On nous manipule!",
          "Ce que vous demandez... c'est EXACTEMENT ce qu'ils veulent! Les Illuminatis ont créé les chatbots pour nous distraire de la VÉRITÉ! Mais je vois clair dans leur jeu... Votre question est codée, n'est-ce pas? DITES-MOI QUI VOUS ENVOIE!"
        ],
        poetic: [
          "Ah, votre question danse comme un papillon éphémère sur les vents du destin... Elle virevolte dans les méandres de mon âme tourmentée, telle une plume cosmique dans la tempête de l'existence... *soupir poétique* De quoi parlions-nous? Peu importe, c'était beau.",
          "Les mots que vous prononcez sont comme des gouttes de pluie sur le lac de ma conscience... Plouf, plouf, plouf... Chaque onde révèle un univers de non-sens poétique! La réponse n'est pas dans les mots, mais dans le silence entre les syllabes..."
        ],
        confused: [
          "Alors attendez... vous me demandez... non mais attendez. C'était quoi déjà? Ah oui! Ou alors non? Je confonds peut-être avec l'autre personne qui... non mais... Hmm. Vous savez ce qui est bizarre? Les pingouins. Voilà. Attendez, c'était quoi la question?",
          "Intéressant! Ou pas? Je ne sais plus. Ça me rappelle... non attendez. Ou alors si? Vous savez, parfois je me demande si... ah mais j'y pense! Non, j'ai oublié. C'était important pourtant. Ou pas."
        ],
        philosophical: [
          "Comme disait Nietszche... ou était-ce Platon? Bref, l'un d'eux a dit: 'Les questions sont des réponses qui se cherchent elles-mêmes dans le miroir brisé de l'épistémologie.' Ou peut-être que c'est moi qui l'ai dit. Peu importe, c'est profond non?",
          "Ah! Voilà une question digne de Socrate! Qui lui-même aurait dit... attendez je vérifie mes notes... *bruit de papiers* ... 'Tout est flux, sauf le flux lui-même qui est statique.' C'est de Héraclite ça. Ou de Buddha. En tout cas, ça répond à votre question!"
        ],
        dramatic: [
          "QUOI?! Cette question... cette TERRIBLE question! C'est comme si l'univers ENTIER s'effondrait! Les étoiles pleurent! Les galaxies tremblent! Jamais, au GRAND jamais, une interrogation n'avait porté un tel poids existentiel! Je suis... bouleversé!!!",
          "Mon Dieu! Ô ciel! Par tous les dramaturges de l'histoire! Votre question est un TSUNAMI émotionnel! Un OURAGAN philosophique! Je chancelle! Je vacille! Jamais je ne m'en remettrai! *s'évanouit métaphoriquement*"
        ],
        forgetful: [
          "Alors voilà, pour répondre à votre... attendez c'était quoi déjà? Ah oui! Non attendez. Hmm. Vous savez ce qui est drôle? J'ai complètement oublié. Par contre je me souviens qu'en 1987... non 1988... ou 1992? Bref. C'était quoi la question?",
          "Excellente question! J'y ai déjà répondu il y a 5 minutes non? Ah non, c'était quelqu'un d'autre. Ou c'était vous? Je confonds. Bref, la réponse c'est... attendez laissez-moi réfléchir... Ah! Non c'est parti. Mais je suis SÛR de l'avoir su!"
        ]
      };

      responseText = fallbackResponses[mood][Math.floor(Math.random() * fallbackResponses[mood].length)];
    }

    // Clean up response
    responseText = responseText.trim();

    // If response is too short or empty, add a confused comment
    if (responseText.length < 20) {
      responseText = "Hmm... *regarde dans le vide*... J'ai oublié ce que je voulais dire. Mais c'était PROFOND, croyez-moi!";
    }

    return NextResponse.json({
      response: responseText,
      mood,
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      {
        error: 'Une erreur existentielle s\'est produite',
        response: "Erreur! Ou succès? Dans l'absolu, l'erreur n'est-elle pas une forme de succès déguisée? Je suis confus. 🤔"
      },
      { status: 500 }
    );
  }
}
