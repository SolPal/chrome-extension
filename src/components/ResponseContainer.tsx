import React, { HtmlHTMLAttributes } from 'react'
import { Avatar } from './ui/avatar'

export default function ResponseContainer({
    response,
    ref
}: {
    response: string
    ref?: React.MutableRefObject<any>
}) {
    return (
        <div className="pl-2 flex gap-2 w-full items-center justify-start" ref={ref?.current}>
            <div className="flex gap-3 my-4 text-sm  bg-slate-100 max-w-[80%] min-w-[20%] py-3 px-4 rounded-xl response">
                <p className="leading-relaxed text-gray-500">
                    <span className="block font-bold text-gray-700">SolPal </span>
                    {response}
                </p>
            </div>
        </div>
    )
}
