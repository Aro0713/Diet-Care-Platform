import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const seenIntro = localStorage.getItem('als_intro_seen')
    if (seenIntro) {
      setShowIntro(false)
    } else {
      setTimeout(() => {
        setShowIntro(false)
        localStorage.setItem('als_intro_seen', 'true')
      }, 4000)
    }
  }, [])

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url("/background.jpg")' }}>
      {/* Znak wodny logo ALS */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <Image
          src="/logo-als.png"
          alt="ALS Watermark"
          width={400}
          height={400}
          style={{ opacity: 0.07, filter: 'blur(2px) grayscale(100%)' }}
        />
      </div>

      {/* Zawartość główna */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 backdrop-blur-sm bg-white/30">
        {showIntro ? (
          <div className="animate-fadein">
            <Image
              src="/logo-als.png"
              alt="ALS Logo"
              width={300}
              height={300}
              className="opacity-0 animate-fade-in-out"
              priority
            />
          </div>
        ) : (
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold mb-10 text-white drop-shadow-lg">
              Witaj w Platformie Dietetycznej ALS
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-6 px-8 rounded shadow text-xl"
                onClick={() => router.push('/login?role=doctor')}
              >
                👨‍⚕️ Lekarz / Dietetyk
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white py-6 px-8 rounded shadow text-xl"
                onClick={() => router.push('/login?role=patient')}
              >
                🧑‍💻 Pacjent
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white py-6 px-8 rounded shadow text-xl"
                onClick={() => router.push('/login?role=admin')}
              >
                🛠️ Admin
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: scale(0.9); }
          30% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.07; transform: scale(1); }
        }

        .animate-fade-in-out {
          animation: fade-in-out 4s ease-in-out forwards;
        }

        .animate-fadein {
          animation: fadein 1s ease-in-out;
        }

        @keyframes fadein {
          from { opacity: 0 }
          to { opacity: 1 }
        }
      `}</style>
    </div>
  )
}
