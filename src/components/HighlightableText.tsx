import { useUser } from '@/hooks/useUser'
import React, { useState } from 'react'
import { Avatar } from './ui/avatar'
import { IconClose } from './ui/icons'

const HighlightableText = ({
    highlightedText,
    tooltipContent,
    tooltipPosition,
    loading,
    setHighlightedText,
    setTooltipContent
}: {
    highlightedText: string
    tooltipContent: string
    tooltipPosition: { top: number; left: number }
    loading: boolean
    setHighlightedText: React.Dispatch<React.SetStateAction<string>>
    setTooltipContent: React.Dispatch<React.SetStateAction<string>>
}) => {
    const { user } = useUser()
    return (
        <div className="">
            {loading ? (
                <div
                    className="absolute bg-[#242424] border border-white/30  rounded-lg shadow-md p-6 z-50 backdrop-blur-[128px] text-[#ddd] max-w-xl min-w-[120px] text-xl  mt-2"
                    style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
                >
                    <div className="grid grid-flow-col gap-4 items-center justify-center relative">
                        <button
                            className="absolute top-0 right-0 fill-white/30 -m-[12px]"
                            onClick={() => {
                                setHighlightedText('')
                                setTooltipContent('')
                            }}
                        >
                            <IconClose />
                        </button>
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
                        <div className="relative h-4 ml-4 w-6">
                            <div className="dot-flashing-highlight mt-1" />
                        </div>
                    </div>
                </div>
            ) : (
                highlightedText && (
                    <div
                        className="absolute bg-[#242424] border border-white/30  rounded-lg shadow-md p-6 z-50 backdrop-blur-[128px] min-w-[120px] text-[#ddd] max-w-xl text-xl  mt-2"
                        style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
                    >
                        <div className="relative grid grid-flow-col gap-4 items-center justify-cente">
                            <button
                                className="absolute top-0 right-0 fill-white/30 -m-[12px]"
                                onClick={() => {
                                    setHighlightedText('')
                                    setTooltipContent('')
                                }}
                            >
                                <IconClose
                                    onClick={() => {
                                        setHighlightedText('')
                                        setTooltipContent('')
                                    }}
                                />
                            </button>
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
                    </div>
                )
            )}
        </div>
    )
}

export default HighlightableText
