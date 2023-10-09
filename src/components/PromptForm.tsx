import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { IoSend } from 'react-icons/io5'

import { Button, buttonVariants } from '@/components/ui/button'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'

export interface PromptProps extends Pick<UseChatHelpers, 'input' | 'setInput'> {
    onSubmit: (value: string) => Promise<void>
    isLoading: boolean
}

export function PromptForm({ onSubmit, input, setInput, isLoading }: PromptProps) {
    const { formRef, onKeyDown } = useEnterSubmit()
    const inputRef = React.useRef<HTMLTextAreaElement>(null)

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <form
            onSubmit={async e => {
                e.preventDefault()
                if (!input?.trim()) {
                    return
                }
                setInput('')
                await onSubmit(input)
            }}
            ref={formRef}
            className="w-full"
        >
            <div className="grid gap-x-4 grid-cols-[5fr,1fr] items-end justify-end">
                <Textarea
                    ref={inputRef}
                    tabIndex={0}
                    onKeyDown={event => onKeyDown(event, isLoading)}
                    rows={1}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="How can I help you?"
                    spellCheck={false}
                    className="relative flex min-h-[60px] max-h-60 grow w-full p-2 resize-none bg-transparent overflow-hidden focus-within:outline-none sm:rounded-xl sm:text-sm  sm:border  focus:border-[#271b38] items center justify-center text-gray-700"
                ></Textarea>

                <Button
                    type="submit"
                    size="icon"
                    variant="default"
                    disabled={isLoading || !input?.trim()}
                    className={
                        ' h-full sm:rounded-xl flex  items-center justify-center px-4 min-w-[60px] max-w-[80px] max-h-[60px] w-full '
                    }
                >
                    <IoSend fill="white" size={'2rem'} />
                    <span className="sr-only">Send message</span>
                </Button>
            </div>
        </form>
    )
}
