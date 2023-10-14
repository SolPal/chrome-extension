import React, { useEffect, useState } from 'react'

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
        const words = response.split(' ')
        let index = 0

        const intervalId = setInterval(
            () => {
                const randomWordCount = Math.floor(Math.random() * 4) + 2 // Random number between 2 and 5
                const wordsToAdd = words.slice(index, index + randomWordCount).join(' ')

                if (index <= words.length - 1) {
                    setSlowText(prevText => prevText + ' ' + wordsToAdd)
                    index += randomWordCount
                } else {
                    clearInterval(intervalId)
                }
            },
            Math.floor(Math.random() * 500 + 100)
        ) // Adjust this value to control typing speed

        return () => clearInterval(intervalId)
    }, [response])

    return (
        <div className="pl-2 flex gap-2 w-full items-center justify-start" ref={ref?.current}>
            <div className="flex gap-3 my-4 text-sm bg-slate-100 max-w-[80%] min-w-[20%] py-3 px-4 rounded-xl response">
                <p className="leading-relaxed text-gray-500">
                    <span className="block font-bold text-gray-700">SolPal </span>
                    {forceSlowText ? slowText : response}
                </p>
            </div>
        </div>
    )
}
