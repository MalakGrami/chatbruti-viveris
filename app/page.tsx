import ChatBot from "./components/ChatBot";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 font-sans">
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg animate-pulse">
              Nuit de l'Info 2025 - Défi Viveris
            </div>
          </div>

          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
            Chat'bruti
          </h1>

          <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Rencontrez <span className="font-bold text-purple-600 dark:text-purple-400">Le Professeur Confus</span>
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Un chatbot révolutionnaire qui ne répondra <span className="italic font-semibold">jamais</span> à vos questions...
            mais vous offrira des réponses bien plus <span className="font-bold">philosophiques</span>,
            <span className="font-bold"> dramatiques</span>, et totalement <span className="font-bold">hors-sujet</span>!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-purple-500">
            <div className="text-4xl mb-4 animate-bounce">🎭</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">7 Personnalités</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Existentiel, Conspirationniste, Poétique, Confus, Philosophique, Dramatique, Tête-en-l'air
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-blue-500">
            <div className="text-4xl mb-4 animate-bounce" style={{animationDelay: '150ms'}}>🤖</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">IA Microsoft Phi-3</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Propulsé par Phi-3-mini-4k-instruct, finement entraîné pour être complètement à côté de la plaque
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-pink-500">
            <div className="text-4xl mb-4 animate-bounce" style={{animationDelay: '300ms'}}>🎪</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Easter Eggs</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Découvrez des réponses spéciales en mentionnant certains mots clés secrets...
            </p>
          </div>
        </div>

        {/* Character Presentation */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white mb-16 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-6xl hover:rotate-12 transition-transform duration-300">
                🎓
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Le Professeur Confus</h2>
              <p className="text-lg text-white/90 leading-relaxed mb-4">
                Titulaire d'un doctorat imaginaire en Philosophie Approximative de l'Université de Nulle Part,
                Le Professeur Confus a consacré sa vie à ne pas répondre aux questions qu'on lui pose.
                Spécialiste de la digression existentielle et maître de l'art de perdre le fil,
                il transforme chaque conversation en une aventure intellectuelle... complètement absurde.
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Expert en Confusion</span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">PhD en Absurdité</span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Maître du Hors-Sujet</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Prêt à Discuter avec un Génie... du N'importe Quoi?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Cliquez sur l'icône en bas à droite pour commencer votre voyage philosophique!
          </p>
          <div className="flex items-center justify-center gap-4 text-gray-500 dark:text-gray-400">
            <span className="text-lg">👉</span>
            <span className="animate-bounce text-2xl">🎓</span>
            <span className="text-sm">Regardez en bas à droite!</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm space-y-3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl mx-auto shadow-lg">
            <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Créé avec 💜 pour la Nuit de l'Info 2025
            </p>
            <p className="text-base text-gray-700 dark:text-gray-300 mb-3">
              Défi Viveris "Chat'bruti"
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Développé par</span>
              <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Malak Grami
              </span>
              <span className="text-2xl">👨‍💻</span>
            </div>
          </div>
          <p className="text-xs">
            Propulsé par Next.js, React, TailwindCSS et Microsoft Phi-3 Mini
          </p>
        </div>
      </main>

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
}
