import axios from 'axios'
import { useState } from 'react'
import OpenAI from 'openai'

export function useAiChat() {
    const [isLoading, setIsLoading] = useState(false)

    const getResponse = async (input: string) => {
        const data = { input: input }
        setIsLoading(true)
        const res = await axios.post(`http://localhost:3000/chat`, data, { timeout: 300000 })
        const aiResponse = await res.data
        setIsLoading(false)
        return aiResponse
    }

    return { getResponse, isLoading }
}

export function useOpenAi() {
    const getResponse = async (input: string) => {
        try {
            const res = await axios.post(
                `http://localhost:3000/api/chat`,
                { input: input },
                { timeout: 40000 }
            )
            const aiResponse = await res.data
            return aiResponse
        } catch (err) {
            return { choices: [{ message: { content: 'Failed to generate response' } }] }
        }
    }
    return { getResponse }
}
