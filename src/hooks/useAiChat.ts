import axios from 'axios'
import { useState } from 'react'
import OpenAI from 'openai'

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

export function useOpenAi() {
    const openai = new OpenAI({
        apiKey: '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',
        dangerouslyAllowBrowser: true
    })

    const getResponse = async (input: string) => {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: input }],
            model: 'gpt-3.5-turbo'
        })
        return chatCompletion
    }
    return { getResponse }
}

export function useStreamOpenAi() {
    const [response, setResponse] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const getResponse = async (input: string) => {
        setIsLoading(true)
        const openai = new OpenAI({
            apiKey: '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',
            dangerouslyAllowBrowser: true
        })

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: input }],
            stream: true
        })

        for await (const chunk of completion) {
            setResponse(response => response + chunk.choices[0].delta.content)
            setIsLoading(false)
        }
    }

    return { getResponse, response, isLoading }
}
