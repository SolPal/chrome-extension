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
import { useSession } from '@/hooks/useSession'
import { useUser } from '@/hooks/useUser'
import { useAiChat, useOpenAi } from '@/hooks/useAiChat'

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
    const AiChat = useOpenAi()
    const { session } = useSession()
    const { user } = useUser()
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
                                src={
                                    user?.image ||
                                    'https://cdn.discordapp.com/attachments/1159197460158238730/1159948783166165102/solpal-logo.png?ex=6532e17c&is=65206c7c&hm=95e3831ff8a8e1cb955d239d1dc84da8868cfc4009bf1448af0c65a35b16d6ff&'
                                }
                                alt="Logo"
                                height={64}
                                width={64}
                                className={` ${
                                    user?.imgConfig?.mirror
                                        ? 'transform -scale-x-100'
                                        : 'transform scale-x-100'
                                }`}
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
                        className="h-[474px] min-w-full overflow-y-auto relative overflow-x-hidden"
                        ref={chatContainerRef}
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {messages.length ? (
                            messages
                                .filter(message => {
                                    if (isLoading) return true
                                    return !message.isLoading
                                })
                                .map((message, index) => {
                                    const isLastMessage = index === messages.length - 1
                                    if (message.isLoading && isLastMessage) {
                                        return <ResponseLoaderSkeleton key={index} />
                                    }

                                    if (message.isResponse && isLastMessage) {
                                        return (
                                            <ResponseContainer
                                                key={index}
                                                response={message.message}
                                                forceSlowText={true}
                                            />
                                        )
                                    }

                                    if (message.isResponse) {
                                        return (
                                            <ResponseContainer
                                                key={index}
                                                response={message.message}
                                                forceSlowText={false}
                                            />
                                        )
                                    }

                                    return <PromptContainer key={index} prompt={message.message} />
                                })
                        ) : (
                            <ResponseContainer response={'How can I help you?'} />
                        )}
                    </CardContent>

                    <Button
                        variant="default"
                        size="icon"
                        className={`absolute right-4 bottom-1 z-10  transition-opacity duration-300 sm:right-8 md:bottom-2 border border-slate-300 rounded-xl bg-slate-100 disabled:opacity-0 ${
                            isAtBottom ? 'opacity-0' : 'opacity-100'
                        }`}
                        onClick={scrollToBottom}
                        disabled={isAtBottom}
                    >
                        <IconArrowDown className="fill-slate-500" />
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
                                        message: 'Working on it',
                                        isResponse: true,
                                        isLoading: true
                                    }
                                ])
                            }, 100)

                            const aiResponse =
                                await AiChat.getResponse(`You are an assitant for all things solana related, answer questions using context and your knowledge of the solana ecosystem and crypto in general.
                            If the question does not have enough context, assume that the user wants to know what is the meaning of the word/phrase, only talk about .js libs if there is explicit mentioning.
                            If a question does not look like a question, it means the user is asking for context to what some sentence regarding solana means, so explain it to him. 
                            You may not need the context provided to answer the question, but it may help you answer the question more accurately.
                            Given the following context, answer the question in a concise response of up to 40 words. 
                            If the question is in a different language, write the final answer in that given language:  ${input}`)

                            setTimeout(() => {
                                setMessages((prev: MessageProps[]) =>
                                    [
                                        ...prev,
                                        {
                                            message: aiResponse?.choices[0]?.message?.content,
                                            isResponse: true,
                                            isLoading: false
                                        }
                                    ].filter(
                                        obj => !obj.isLoading || !(obj.message === 'Working on it')
                                    )
                                )
                                setIsLoading(false)
                            }, 10)
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
