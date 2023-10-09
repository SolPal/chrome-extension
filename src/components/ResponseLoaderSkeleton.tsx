import React from 'react'
import { Skeleton } from './ui/skeleton'
import { Avatar } from './ui/avatar'

export default function ResponseLoaderSkeleton() {
    return (
        <div className="ml-2 flex w-full gap-2 items-center justify-start ">
            <div className="flex gap-3 my-4 text-sm  bg-slate-100 max-w-[80%] min-w-[20%] py-3 px-4 rounded-xl response">
                <div className="leading-relaxed text-gray-500 min-h-[45.5px]">
                    <p className="block font-bold text-gray-700">SolPal </p>
                    <div className="relative h-4 ml-4">
                        <div className="dot-flashing mt-1" />
                    </div>
                </div>
            </div>
        </div>
    )
}
