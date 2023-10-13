import axios from 'axios'
import { useState } from 'react'

export function useAiChat() {
    const [isLoading, setIsLoading] = useState(false)

    const getResponse = async (input: string) => {
        const data = { input: input }
        setIsLoading(true)
        const res = await axios.post(`http://localhost:8000/chat/`, data, { timeout: 300000 })
        const aiResponse = await res.data
        setIsLoading(false)
        return aiResponse
    }

    return { getResponse, isLoading }
}
