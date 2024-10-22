'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Router } from 'next/router'
type MealPlan = string[] | null;

export default function Dashboard() {
    // const {data:session, status} = useSession()
    const [mealPlan, setMealPlan] = useState<MealPlan>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [retryCount, setRetryCount] = useState<number>(0)
    const router = useRouter()

    useEffect(() => {
        const fetchMealPlan = async () => {
            try {
                const response = await fetch('/api/mealplan')
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data: { mealPlan: string[] } = await response.json()
                setMealPlan(data.mealPlan)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching meal plan:', error)
                if (retryCount < 3) {
                    setTimeout(() => {
                        setRetryCount(prev => prev + 1)
                    }, 2000) // Retry after 2 seconds
                } else {
                    setError("Failed to load meal plan after multiple attempts. Please try again later.")
                    setLoading(false)
                }
            }
        }

        if (loading) {
            fetchMealPlan()
          }
        }, [loading])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900 text-white p-4 font-poppins flex items-center justify-center">
                <motion.div
                    className="flex flex-col items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-xl">Loading your meal plan...</p>
                    {retryCount > 0 && <p className="mt-2">Retrying... (Attempt {retryCount + 1}/4)</p>}
                </motion.div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900 text-white p-4 font-poppins flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
                    <p className="text-xl mb-8">{error}</p>
                    <button
                        onClick={() => { setLoading(true); setRetryCount(0); setError(null); }}
                        className="bg-purple-500 text-white px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:bg-purple-400"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900 text-white p-4 font-poppins">
            <div className="container mx-auto max-w-3xl">
                <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                    Your Meal Plan
                </h1>
                {mealPlan && mealPlan.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {mealPlan.map((day, index) => (
                            <motion.div
                                key={index}
                                className="mb-6 p-6 bg-white bg-opacity-10 rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <h2 className="text-2xl font-semibold mb-2 text-pink-300">{day.split(':')[0]}</h2>
                                <p className="text-gray-300">{day.split(':')[1]}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center">
                        <p className="text-2xl mb-4">No meal plan available yet.</p>
                        <p>Please try again later or contact support if the problem persists.</p>
                    </div>
                )}
            </div>
        </div>
    )
}