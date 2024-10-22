'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { auth } from '@/auth'
import { useSession } from 'next-auth/react'

export default function Home() {

  // const { data: session, status } = useSession()
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const fullText = "WELCOME TO YOUR ONE STOP MEAL PLANNER"
  const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScnnqfCQah0MBDQu0wXsYFhf7xiES-rZMcYJfw6IkznhrAluQ/viewform?usp=sf_link'
  const router = useRouter()

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/login')
  //   }
  // }, [status, router])

  useEffect(() => {
    if (text.length < fullText.length) {
      setTimeout(() => {
        setText(fullText.slice(0, text.length + 1))
      }, 100)
    }
  }, [text])

  const handleFormSubmit = (): void => {
    setIsFormSubmitted(true)
    setShowModal(false)
    localStorage.setItem('formSubmitted', 'true')

    // Navigate to the dashboard
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <div className="text-center max-w-4xl w-full px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 sm:mb-12 md:mb-16 leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight">
          {text}
          <span className="animate-blink">|</span>
        </h1>
        {!isFormSubmitted ? (
          <motion.button
            onClick={() => setShowModal(true)}
            className="inline-block bg-purple-500 text-white px-6 sm:px-8 py-3 rounded-full font-bold text-base sm:text-lg transition-all duration-300 hover:bg-purple-400 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Get Cooking!
          </motion.button>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg sm:text-xl text-purple-200"
          >
            Thank you for submitting the form. Redirecting to your meal plan...
          </motion.p>
        )}
      </div>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg overflow-hidden max-w-4xl w-full h-5/6"
            >
              <div className="h-full flex flex-col">
                <div className="p-4 flex justify-between items-center bg-purple-500 text-white">
                  <h2 className="text-xl font-bold">Meal Preferences Form</h2>
                  <button onClick={() => setShowModal(false)} className="text-2xl">&times;</button>
                </div>
                <iframe
                  src={googleFormUrl}
                  className="flex-grow w-full"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                >Loading...</iframe>
                <div className="p-4 bg-gray-100">
                  <button
                    onClick={handleFormSubmit}
                    className="w-full bg-purple-500 text-white px-4 py-2 rounded font-bold hover:bg-purple-400 transition-colors"
                  >
                    Submit and Go to Dashboard
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 opacity-75"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22%3E%3Cpath fill=%22%23fff%22 fill-opacity=%22.05%22 d=%22M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z%22%3E%3C/path%3E%3C/svg%3E')] animate-[grain_8s_steps(10)_infinite]"></div>
      </div>
    </div>
  )
}