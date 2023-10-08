import React from 'react'

export default function ResponseContainer({ response }: { response: string }) {
    return (
        <div className="flex w-full items-center justify-start">
            <div className="flex gap-3 my-4 text-sm flex-1 bg-slate-100 max-w-[80%] min-w-[20%] py-3 px-4 rounded-xl">
                <p className="leading-relaxed text-gray-500">
                    <span className="block font-bold text-gray-700">SolPal </span>
                    {response}
                </p>
            </div>
        </div>
    )
}
