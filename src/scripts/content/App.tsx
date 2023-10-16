import Chat from '@/components/Chat'
import { useSession } from '@/hooks/useSession'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@/hooks/useUser'
import { useOpenAi } from '@/hooks/useAiChat'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import HighlightableText from '@/components/HighlightableText'

export type MessageProps = {
    message: string
    isResponse: boolean
    isLoading?: boolean
}

const App = () => {
    const AiChat = useOpenAi()
    const { session } = useSession()
    const { user } = useUser()
    const [isOpen, setIsOpen] = useState(false)
    const [isActivated, setIsActivated] = useState(true)
    const [messages, setMessages] = useState<MessageProps[]>([]) //array of strings
    const [isLoading, setIsLoading] = useState(false)
    const [highlightedText, setHighlightedText] = useState('')
    const [tooltipContent, setTooltipContent] = useState('')
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
    const [isHighlightedLoading, setIsHighlightedLoading] = useState(false)

    const toggleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    const toggleIsActivated = () => {
        setIsActivated(!isActivated)
    }

    useEffect(() => {
        console.log('Gimme: App.tsx')

        chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
            const selectedText = window.getSelection().toString()
            setIsHighlightedLoading(true)
            if (selectedText) {
                setHighlightedText(selectedText)

                // Fetch additional information for the tooltip here based on the selectedText
                // and set it using setTooltipContent.

                // Calculate the position for the tooltip relative to the selected text.
                const selection = window.getSelection()
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0)
                    const rect = range.getBoundingClientRect()
                    setTooltipPosition({
                        top: rect.bottom + window.scrollY + 5, // Adjust as needed
                        left: rect.left + window.scrollX
                    })
                }
            }
            setHighlightedText(request.text)

            const aiResponse =
                await AiChat.getResponse(`You are an assitant for all things solana related, answer questions using context and your knowledge of the solana ecosystem and crypto in general.
                If the question does not have enough context, assume that the user wants to know what is the meaning of the word/phrase, only talk about .js libs if there is explicit mentioning.
                If a question does not look like a question, it means the user is asking for context to what some sentence regarding solana means, so explain it to him. 
                You may not need the context provided to answer the question, but it may help you answer the question more accurately.
                Given the following context, answer the question in a concise response of up to 40 words. 
                If the question is in a different language, write the final answer in that given language: ${request.text}`)

            setIsHighlightedLoading(false)
            setTooltipContent(aiResponse?.choices[0]?.message?.content)

            //     setIsOpen(true)
            //     setMessages((prev: MessageProps[]) => [
            //         ...prev,
            //         { message: request.text, isResponse: false }
            //     ])
            //     setIsLoading(true)
            //     setTimeout(() => {
            //         setMessages((prev: MessageProps[]) => [
            //             ...prev,
            //             {
            //                 message: 'Working on it',
            //                 isResponse: true,
            //                 isLoading: true
            //             }
            //         ])
            //     }, 100)
            //     const aiResponse = await AiChat.getResponse(
            //          request.text
            //     )
            //     setTimeout(() => {
            //         setMessages((prev: MessageProps[]) =>
            //             [
            //                 ...prev,
            //                 {
            //                     message: aiResponse?.choices[0]?.message?.content,
            //                     isResponse: true,
            //                     isLoading: false
            //                 }
            //             ].filter(obj => !obj.isLoading || !(obj.message === 'Working on it'))
            //         )
            //         setIsLoading(false)
            //     }, 10)
        })
    }, [])

    return (
        <>
            {isActivated && (
                <div className="fixed bottom-0 right-0 p-4 z-[999]">
                    <div className="inline-flex items-center justify-center h-16 rounded-full relative">
                        <div className="inline-flex items-center justify-end p-2 rounded-full">
                            <button
                                className="fixed bottom-14 right-4 z-[999999] inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16  hover:brightness-125 m-0 cursor-pointer border-gray-200 hover:border-[#44fbe1] bg-none p-0 normal-case leading-5  overflow-hidden"
                                type="button"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                data-state="closed"
                                onClick={toggleIsOpen}
                            >
                                <img
                                    src={
                                        user?.image ||
                                        'https://cdn.discordapp.com/attachments/1159197460158238730/1159948783166165102/solpal-logo.png?ex=6532e17c&is=65206c7c&hm=95e3831ff8a8e1cb955d239d1dc84da8868cfc4009bf1448af0c65a35b16d6ff&'
                                    }
                                    alt="Logo"
                                    className={`w-16 h-16 ${
                                        user?.imgConfig?.mirror
                                            ? 'transform -scale-x-100'
                                            : 'transform scale-x-100'
                                    }`}
                                />
                            </button>
                            {isOpen && (
                                //TO DO: add in/out animations
                                <div>
                                    <Chat
                                        setMessages={setMessages}
                                        messages={messages}
                                        toggleIsOpen={toggleIsOpen}
                                        toggleIsActivated={toggleIsActivated}
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <HighlightableText
                highlightedText={highlightedText}
                tooltipContent={tooltipContent}
                tooltipPosition={tooltipPosition}
                loading={isHighlightedLoading}
                setHighlightedText={setHighlightedText}
                setTooltipContent={setTooltipContent}
            />
        </>
    )
}

export default App
