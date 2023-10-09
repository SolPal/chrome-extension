import React, { HtmlHTMLAttributes, useEffect, useState } from 'react'
import { Avatar } from './ui/avatar'

export default function ResponseContainer({
    response,
    ref,
    forceSlowText
}: {
    response: string
    ref?: React.MutableRefObject<any>
    forceSlowText?: boolean
}) {
    const [slowText, setSlowText] = useState('')
    useEffect(() => {
        let index = 0
        const intervalId = setInterval(() => {
            if (index < response.length - 1) {
                setSlowText(prevText => prevText + response[index])
                index++
            } else {
                clearInterval(intervalId)
            }
        }, 5) // Ajuste este valor para controlar a velocidade de digitação

        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className="pl-2 flex gap-2 w-full items-center justify-start" ref={ref?.current}>
            <div className="flex gap-3 my-4 text-sm  bg-slate-100 max-w-[80%] min-w-[20%] py-3 px-4 rounded-xl response">
                <p className="leading-relaxed text-gray-500">
                    <span className="block font-bold text-gray-700">SolPal </span>
                    {forceSlowText ? slowText : response}
                </p>
            </div>
        </div>
    )
}
