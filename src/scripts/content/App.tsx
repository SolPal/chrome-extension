import Chat from '@/components/Chat'
import { useSession } from '@/hooks/useSession'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@/hooks/useUser'
import { useOpenAi } from '@/hooks/useAiChat'

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

    const toggleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    const toggleIsActivated = () => {
        setIsActivated(!isActivated)
    }

    useEffect(() => {
        console.log('Gimme: App.tsx')

        chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
            setIsOpen(true)
            setMessages((prev: MessageProps[]) => [
                ...prev,
                { message: request.text, isResponse: false }
            ])

            setIsLoading(true)

            setTimeout(() => {
                setMessages((prev: MessageProps[]) => [
                    ...prev,
                    {
                        message: 'Working on it',
                        isResponse: true,
                        isLoading: true
                    }
                ])
            }, 100)

            const aiResponse = await AiChat.getResponse(
                'explain in a few words the meaning of this in Solana: ' + request.text
            )

            setTimeout(() => {
                setMessages((prev: MessageProps[]) =>
                    [
                        ...prev,
                        {
                            message: aiResponse?.choices[0]?.message?.content,
                            isResponse: true,
                            isLoading: false
                        }
                    ].filter(obj => !obj.isLoading || !(obj.message === 'Working on it'))
                )
                setIsLoading(false)
            }, 10)
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
        </>
    )
}

export default App
