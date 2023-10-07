import React, { useEffect, useState } from 'react'

const App = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isActivated, setIsActivated] = useState(true)

    const toggleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    const toggleIsActivated = () => {
        setIsActivated(!isActivated)
    }

    useEffect(() => {
        console.log('Gimme: App.tsx')

        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            console.log('Gimme: Message Received', request, sender, sendResponse)
        })
    }, [])

    return (
        <>
            {isActivated && (
                <div className="fixed bottom-0 right-0 p-4">
                    <div className="inline-flex items-center justify-center h-16 rounded-full relative">
                        <div className="inline-flex items-center justify-end p-2 rounded-full">
                            <button
                                className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16  hover:brightness-125 m-0 cursor-pointer border-gray-200 hover:border-[#44fbe1] bg-none p-0 normal-case leading-5  overflow-hidden"
                                type="button"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                data-state="closed"
                                onClick={toggleIsOpen}
                            >
                                <img
                                    src="https://cdn.discordapp.com/attachments/1159197460158238730/1159948783166165102/solpal-logo.png?ex=6532e17c&is=65206c7c&hm=95e3831ff8a8e1cb955d239d1dc84da8868cfc4009bf1448af0c65a35b16d6ff&"
                                    alt="Logo"
                                    className="w-16 h-16"
                                />
                            </button>
                            {isOpen && (
                                <div className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px] shadow-md">
                                    <div className="absolute top-1 right-5 text-black flex gap-x-3">
                                        <button onClick={toggleIsOpen}>-</button>
                                        <button onClick={toggleIsActivated}>x</button>
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <h2 className="font-semibold text-lg tracking-tight">
                                            SolPal.ai Chat
                                        </h2>
                                    </div>

                                    <div className="pr-4 h-[474px] min-w-full table">
                                        <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                                            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                                <div className="rounded-full bg-gray-100 border">
                                                    <img
                                                        src="https://cdn.discordapp.com/attachments/1159197460158238730/1159948783166165102/solpal-logo.png?ex=6532e17c&is=65206c7c&hm=95e3831ff8a8e1cb955d239d1dc84da8868cfc4009bf1448af0c65a35b16d6ff&"
                                                        alt="Logo"
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                </div>
                                            </span>
                                            <p className="leading-relaxed">
                                                <span className="block font-bold text-gray-700">
                                                    SolPal{' '}
                                                </span>
                                                Hi, how can I help you today?
                                            </p>
                                        </div>

                                        <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                                            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                                <div className="rounded-full bg-gray-100 border p-1">
                                                    <svg
                                                        stroke="none"
                                                        fill="black"
                                                        stroke-width="0"
                                                        viewBox="0 0 16 16"
                                                        height="20"
                                                        width="20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                                                    </svg>
                                                </div>
                                            </span>
                                            <p className="leading-relaxed">
                                                <span className="block font-bold text-gray-700">
                                                    You{' '}
                                                </span>
                                                fewafef
                                            </p>
                                        </div>

                                        <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                                            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                                <div className="rounded-full bg-gray-100 border overflow-hidden">
                                                    <img
                                                        src="https://cdn.discordapp.com/attachments/1159197460158238730/1159948783166165102/solpal-logo.png?ex=6532e17c&is=65206c7c&hm=95e3831ff8a8e1cb955d239d1dc84da8868cfc4009bf1448af0c65a35b16d6ff&"
                                                        alt="Logo"
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                </div>
                                            </span>
                                            <p className="leading-relaxed">
                                                <span className="block font-bold text-gray-700">
                                                    Solpal{' '}
                                                </span>
                                                Sorry, I couldn't find any information in the
                                                documentation about that. Expect answer to be less
                                                accurateI could not find the answer to this in the
                                                verified sources.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center pt-0">
                                        <form className="flex items-center justify-center w-full space-x-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                                                placeholder="Type your message"
                                                value=""
                                            />
                                            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2">
                                                Send
                                            </button>
                                        </form>
                                    </div>
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
