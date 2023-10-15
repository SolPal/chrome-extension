import { useUser } from '@/hooks/useUser'
import React, { useState } from 'react'
import { Avatar } from './ui/avatar'

const HighlightableText = ({
    highlightedText,
    tooltipContent,
    tooltipPosition,
    loading
}: {
    highlightedText: string
    tooltipContent: string
    tooltipPosition: { top: number; left: number }
    loading: boolean
}) => {
    const { user } = useUser()
    return (
        <div>
            <p className="text-lg text-gray-800">{/* Your content goes here */}</p>
            {loading ? (
                <div
                    className="absolute bg-[#1e2730] border border-[#343a42] rounded-lg shadow-md p-6 z-50 backdrop-blur-sm bg-opacity-70 text-white max-w-xl text-xl  grid grid-flow-col  gap-4 items-center justify-center mt-2"
                    style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
                >
                    <div className="inline-flex items-start justify-center rounded-full w-16 h-16 overflow-hidden">
                        <img
                            src={
                                user?.image ||
                                'https://cdn.discordapp.com/attachments/1159197460158238730/1159948783166165102/solpal-logo.png?ex=6532e17c&is=65206c7c&hm=95e3831ff8a8e1cb955d239d1dc84da8868cfc4009bf1448af0c65a35b16d6ff&'
                            }
                            alt="Logo"
                            className={`w-16 h-16 object-contain ${
                                user?.imgConfig?.mirror
                                    ? 'transform -scale-x-100'
                                    : 'transform scale-x-100'
                            }`}
                        />
                    </div>
                    <div className="relative h-4 ml-4">
                        <div className="dot-flashing-highlight mt-1" />
                    </div>
                </div>
            ) : (
                highlightedText && (
                    <div
                        className="absolute bg-[#1e2730] border border-[#343a42] rounded-lg shadow-md p-6 z-50 backdrop-blur-sm bg-opacity-70 text-white max-w-xl text-xl grid grid-flow-col gap-4 items-center justify-center mt-2"
                        style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
                    >
                        <div className="flex h-full items-start justify-center">
                            <div className="inline-flex place-items-start rounded-full w-16 h-16 overflow-hidden">
                                <img
                                    src={
                                        user?.image ||
                                        'https://cdn.discordapp.com/attachments/1159197460158238730/1159948783166165102/solpal-logo.png?ex=6532e17c&is=65206c7c&hm=95e3831ff8a8e1cb955d239d1dc84da8868cfc4009bf1448af0c65a35b16d6ff&'
                                    }
                                    alt="Logo"
                                    className={`w-16 h-16 object-contain ${
                                        user?.imgConfig?.mirror
                                            ? 'transform -scale-x-100'
                                            : 'transform scale-x-100'
                                    }`}
                                />
                            </div>
                        </div>

                        <p>{tooltipContent}</p>
                    </div>
                )
            )}
        </div>
    )
}

export default HighlightableText
