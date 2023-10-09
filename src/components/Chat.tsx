import { PromptForm } from '@/components/PromptForm'
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { IoClose } from 'react-icons/io5'
import ResponseContainer from './ResponseContainer'
import PromptContainer from './PromptContainer'
import { MessageProps } from '@/scripts/content/App'
import ResponseLoaderSkeleton from './ResponseLoaderSkeleton'
import { Button } from './ui/button'
import { IconArrowDown } from './ui/icons'
import { Avatar } from './ui/avatar'

export default function Chat({
    toggleIsOpen,
    toggleIsActivated,
    messages,
    setMessages,
    isLoading,
    setIsLoading
}: {
    toggleIsOpen: () => void
    toggleIsActivated: () => void
    messages: MessageProps[]
    setMessages: React.Dispatch<React.SetStateAction<MessageProps[]>>
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [input, setInput] = useState('')
    const lastMessageRef = useRef(null)

    const chatContainerRef = useRef<HTMLDivElement | null>(null)
    const [isAtBottom, setIsAtBottom] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsAtBottom(
                !(
                    chatContainerRef?.current.scrollTop + chatContainerRef?.current.clientHeight <=
                    chatContainerRef?.current.scrollHeight - 100
                )
            )
        }
        chatContainerRef?.current.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => {
            if (chatContainerRef?.current)
                chatContainerRef.current.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scrollToBottom = () => {
        const chat = chatContainerRef?.current
        chat.scrollTop = chat.scrollHeight
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <>
            <Card className="fixed flex flex-col bottom-[8rem] right-0 mr-4 rounded-xl w-[440px]  shadow-md bg-white overflow-hidden z-[999] ">
                <CardHeader className="bg-[#271b38] text-white">
                    <div className="absolute top-4 right-4  flex gap-x-3">
                        <button onClick={toggleIsOpen} className="font-medium p-1">
                            -
                        </button>
                        <button onClick={toggleIsActivated} className="p-1">
                            <IoClose />
                        </button>
                    </div>
                    <CardTitle className="flex items-center gap-3">
                        <Avatar className="border border-white">
                            <img
                                src="https://cdn.discordapp.com/attachments/1159197460158238730/1159948783166165102/solpal-logo.png?ex=6532e17c&is=65206c7c&hm=95e3831ff8a8e1cb955d239d1dc84da8868cfc4009bf1448af0c65a35b16d6ff&"
                                alt="Logo"
                                width={64}
                                height={64}
                            />
                        </Avatar>
                        SolPal.ai Chat
                    </CardTitle>
                    {/* <div className="flex flex-col space-y-1.5">
                <h2 className="font-semibold text-lg tracking-tight"></h2>
            </div> */}
                </CardHeader>
                <div className="relative">
                    <CardContent
                        className="h-[474px] min-w-full overflow-y-auto relative"
                        ref={chatContainerRef}
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {messages.length ? (
                            messages.map((message, index) => {
                                const isLastMessage = index === messages.length - 1

                                if (message.isResponse) {
                                    if (message.isLoading)
                                        return (
                                            <ResponseLoaderSkeleton
                                                key={index}
                                                ref={isLastMessage ? lastMessageRef : null}
                                            />
                                        )
                                    return (
                                        <ResponseContainer
                                            key={index}
                                            response={message.message}
                                            ref={isLastMessage ? lastMessageRef : null}
                                        />
                                    )
                                } else {
                                    return (
                                        <PromptContainer
                                            key={index}
                                            prompt={message.message}
                                            ref={isLastMessage ? lastMessageRef : null}
                                        />
                                    )
                                }
                            })
                        ) : (
                            <ResponseContainer response={'Como posso ajudar?'} />
                        )}
                    </CardContent>

                    <Button
                        variant="outline"
                        size="icon"
                        className={`absolute right-4 bottom-1 z-10  transition-opacity duration-300 sm:right-8 md:bottom-2 bg-black disabled:opacity-0 ${
                            isAtBottom ? 'opacity-0' : 'opacity-100'
                        }`}
                        onClick={scrollToBottom}
                        disabled={isAtBottom}
                    >
                        <IconArrowDown />
                        <span className="sr-only">Scroll to bottom</span>
                    </Button>
                </div>

                <CardFooter className="flex items-center pt-0 w-full">
                    <PromptForm
                        onSubmit={async () => {
                            setMessages((prev: MessageProps[]) => [
                                ...prev,
                                { message: input, isResponse: false }
                            ])
                            setIsLoading(true)
                            setTimeout(() => {
                                setMessages((prev: MessageProps[]) => [
                                    ...prev,
                                    {
                                        message: 'I am a response',
                                        isResponse: true,
                                        isLoading: true
                                    }
                                ])
                            }, 100)

                            setTimeout(() => {
                                setMessages((prev: MessageProps[]) =>
                                    [
                                        ...prev,
                                        { message: 'I am a response', isResponse: true }
                                    ].filter(message => !message.isLoading)
                                )
                                setIsLoading(false)
                            }, 2000)
                        }}
                        isLoading={isLoading}
                        input={input}
                        setInput={setInput}
                    />
                </CardFooter>
            </Card>
        </>
    )
}