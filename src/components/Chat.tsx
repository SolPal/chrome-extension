import { PromptForm } from '@/components/PromptForm'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { IoClose } from 'react-icons/io5'
import ResponseContainer from './ResponseContainer'
import PromptContainer from './PromptContainer'
import { MessageProps } from '@/scripts/content/App'

export default function Chat({
    toggleIsOpen,
    toggleIsActivated,
    messages,
    setMessages
}: {
    toggleIsOpen: () => void
    toggleIsActivated: () => void
    messages: MessageProps[]
    setMessages: React.Dispatch<React.SetStateAction<MessageProps[]>>
}) {
    const [input, setInput] = useState('')

    return (
        <>
            <Card className="fixed flex flex-col bottom-[calc(4rem+1.5rem)] right-0 mr-4 rounded-xl w-[440px] h-[634px] shadow-md bg-white overflow-hidden">
                <CardHeader className="bg-[#271b38] text-white">
                    <div className="absolute top-4 right-4  flex gap-x-3">
                        <button onClick={toggleIsOpen} className="font-medium p-1">
                            -
                        </button>
                        <button onClick={toggleIsActivated} className="p-1">
                            <IoClose />
                        </button>
                    </div>
                    <CardTitle>SolPal.ai Chat</CardTitle>
                    {/* <div className="flex flex-col space-y-1.5">
                <h2 className="font-semibold text-lg tracking-tight"></h2>
            </div> */}
                </CardHeader>
                <CardContent className="pr-4 h-[474px] min-w-full overflow-y-auto">
                    {messages ? (
                        messages.map((message, index) => {
                            if (message.isResponse) {
                                return <ResponseContainer key={index} response={message.message} />
                            } else {
                                return <PromptContainer key={index} prompt={message.message} />
                            }
                        })
                    ) : (
                        <ResponseContainer response={'Como posso ajudar?'} />
                    )}
                </CardContent>

                <CardFooter className="flex items-center pt-0 w-full">
                    <PromptForm
                        onSubmit={async () => {
                            setMessages((prev: MessageProps[]) => [
                                ...prev,
                                { message: input, isResponse: false }
                            ])
                            setTimeout(() => {
                                setMessages((prev: MessageProps[]) => [
                                    ...prev,
                                    { message: 'I am a response', isResponse: true }
                                ])
                            }, 500)
                        }}
                        isLoading={false}
                        input={input}
                        setInput={setInput}
                    />
                </CardFooter>
            </Card>
        </>
    )
}
