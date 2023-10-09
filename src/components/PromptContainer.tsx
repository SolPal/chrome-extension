import React, { HTMLAttributes } from 'react'
import { Avatar } from './ui/avatar'
import { IconUser } from './ui/icons'

export default function PromptContainer({ prompt }: { prompt: string }) {
    return (
        <div className="pr-2 flex w-full gap-x-2 items-center justify-end">
            <div className="flex gap-3 my-4 text-gray-600 text-sm bg-[#63458d] max-w-[80%] min-w-[20%] py-3 px-4 rounded-xl prompt">
                <p className="leading-relaxed text-gray-100 w-full">
                    <span className="block font-bold text-white">You </span>
                    {prompt}
                </p>
            </div>
        </div>
    )
}
