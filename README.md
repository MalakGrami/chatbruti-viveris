# Chat'bruti - Le Professeur Confus

Un chatbot révolutionnaire qui ne répondra JAMAIS à vos questions !

Créé pour le défi **"Chat'bruti"** de **Viveris** lors de la **Nuit de l'Info 2024**.

---

## Qu'est-ce que c'est ?

Un chatbot complètement à côté de la plaque qui transforme les questions en réponses absurdes, philosophiques et totalement hors-sujet !

**Le Professeur Confus** - Titulaire d'un doctorat imaginaire en Philosophie Approximative, il change d'humeur à chaque réponse :
- 🟣 **Existentiel** - Transforme tout en crise existentielle
- 🔴 **Conspirationniste** - Voit des complots partout
- 🩷 **Poétique** - Répond en métaphores incompréhensibles
- 🟡 **Confus** - Perd le fil en plein milieu
- 🔵 **Philosophique** - Cite des philosophes (de travers)
- 🟠 **Dramatique** - Transforme tout en tragédie
- ⚪ **Tête-en-l'air** - Oublie ce qu'on lui demande

---

## Installation (< 5 minutes)

### Prérequis
- Node.js 18+ installé
- npm (ou yarn/pnpm)

### Étapes

```bash
# 1. Installer les dépendances
npm install

# 2. Obtenir une clé API Hugging Face (GRATUIT)
# - Créer un compte : https://huggingface.co/join
# - Obtenir un token : https://huggingface.co/settings/tokens
# - Type : "Write" (requis pour l'API Inference)

# 3. Ajouter la clé dans .env.local
echo "HUGGINGFACE_API_KEY=hf_VotreCleIci" > .env.local

# 4. Lancer l'application
npm run dev

# 5. Ouvrir http://localhost:3000
```

**C'est tout ! L'application est prête ! 🎉**

### Note sur la clé API

Le token Hugging Face doit avoir les permissions **"Write"** (même si on ne fait que lire les réponses). C'est une exigence de l'API Inference pour exécuter les modèles.

Le chatbot fonctionne également **sans API** grâce à un système de réponses de secours (fallback) - mais l'IA génère des réponses encore plus créatives et uniques !

---

## Technologies

- **Next.js 16** + **React 19** + **TypeScript**
- **Tailwind CSS 4** - Design moderne
- **Hugging Face Inference API** - IA générative
- **Mistral-7B-Instruct** - Modèle de langage (7 milliards de paramètres)

---

## Fonctionnalités

### Vraie IA - Pas de réponses pré-écrites !

Chaque réponse est **générée en temps réel** par l'IA selon :
- Votre question spécifique
- L'humeur aléatoire sélectionnée
- L'historique de conversation
- Des prompts système stricts pour forcer l'absurdité

La même question = réponses différentes à chaque fois !

### Easter Eggs

Découvrez des réponses spéciales en mentionnant :
- "Viveris"
- "Chat"
- "Intelligence Artificielle" / "IA"
- "Help"

### Interface Professionnelle

- Design moderne et responsive
- Mode sombre/clair
- Animations fluides
- Indicateur d'humeur en temps réel
- Chat flottant élégant

---

## Structure du projet

```
chatbruti-viveris/
├── app/
│   ├── api/chat/route.ts      # API avec logique du chatbot + IA
│   ├── components/ChatBot.tsx # Composant UI du chat
│   ├── types/chat.ts          # Types TypeScript
│   ├── layout.tsx             # Layout principal
│   ├── page.tsx               # Page d'accueil
│   └── globals.css            # Styles globaux
├── .env.local                 # Variables d'environnement
├── package.json
└── README.md
```

---

## Personnalisation

### Modifier les personnalités

Éditez `app/api/chat/route.ts` :

```typescript
const SYSTEM_PROMPTS: Record<string, string> = {
  votre_mood: `Votre prompt personnalisé...`,
  // ...
};
```

### Ajouter des Easter Eggs

Dans `app/api/chat/route.ts` :

```typescript
const EASTER_EGGS: Record<string, string> = {
  'votre_mot_clé': 'Votre réponse spéciale...',
  // ...
};
```

### Changer le modèle IA

Dans `app/api/chat/route.ts`, modifiez le modèle :

```typescript
model: 'mistralai/Mistral-7B-Instruct-v0.2', // Changez ici
```

Autres modèles gratuits :
- `HuggingFaceH4/zephyr-7b-beta`
- `meta-llama/Meta-Llama-3-8B-Instruct`
- `microsoft/Phi-3-mini-4k-instruct`

---

## Déploiement

### Vercel (Recommandé)

1. Push votre code sur GitHub
2. Importez le projet sur [Vercel](https://vercel.com)
3. Ajoutez la variable d'environnement `HUGGINGFACE_API_KEY`
4. Déployez !

### Autres plateformes

Compatible avec Netlify, Railway, Docker, etc.

---

## Dépannage

### "HUGGINGFACE_API_KEY is not defined"

1. Vérifiez que `.env.local` existe à la racine
2. Vérifiez que la clé commence par `hf_`
3. Redémarrez le serveur (`Ctrl+C` puis `npm run dev`)

### "Rate limit exceeded"

- Attendez quelques minutes
- Créez un nouveau compte Hugging Face
- Le chatbot basculera automatiquement sur les réponses de secours

### Chatbot ne répond pas

1. Ouvrez la console (F12)
2. Vérifiez les erreurs
3. Vérifiez que la clé API est valide
4. Les fallbacks fonctionnent même sans API

---

## Build pour la production

```bash
# Build l'application
npm run build

# Lancer en production
npm run start
```

---

## Exemples de conversations

**Vous :** "Quelle heure est-il ?"

**Le Professeur (Mode Existentiel) :** "Ah, l'heure... Mais au fond, qu'est-ce que le temps ? Une illusion créée par nos cerveaux pour donner un sens à l'absurdité cosmique ? Quand vous demandez l'heure, ne cherchez-vous pas en réalité une réponse à votre propre finitude ?"

**Vous :** "Comment fonctionne React ?"

**Le Professeur (Mode Conspiratorial) :** "React?! ATTENDEZ! Ce n'est PAS une coïncidence que ça s'appelle React - RE-ACT! Ils veulent que nous RÉAGISSIONS au lieu de PENSER! Les Illuminatis du code nous manipulent avec leurs 'hooks'... Des HAMEÇONS pour attraper nos esprits!"

---

## Licence & Crédits

Créé pour :
- 🌙 **Nuit de l'Info 2024**
- 🏢 **Défi Viveris - "Chat'bruti"**

Développé avec ❤️, ☕ et 🤪

---

**Prêt à vous CHAT-llenger ? 😉**
