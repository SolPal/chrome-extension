import WalletContextProvider from '@/context/WalletContextProvider'
import { useSession } from '@/hooks/useSession'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

const Popup = () => {
    const session = useSession()

    return (
        <div className="inline-flex flex-col justify-between p-8 border shadow w-96 h-full bg-[#271a38] border-zinc-800 overflow-hidden">
            <div className="grid grid-cols-[2fr,1fr] items-center justify-center gap-4">
                <div className="inline-flex flex-col items-start justify-between gap-1 h-full">
                    <div>
                        <div className="text-lg font-bold leading-none text-neutral-50">
                            SolPal.ai
                        </div>
                        <div className="justify-start items-start inline-flex">
                            <div className="text-sm font-normal leading-tight text-zinc-400">
                                Personal web companion for everything web3 and Solana related
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex items-start justify-start gap-4">
                        <div className="text-sm font-normal leading-tight text-zinc-400 pb-1">
                            Built for{' '}
                            <a className="text-oceanBlue-300" href="https://solana.com/hyperdrive">
                                Solana Hyperdrive
                            </a>
                        </div>
                    </div>
                </div>

                <div className="w-32 h-32 flex">
                    <img
                        src="https://cdn.discordapp.com/attachments/1159197460158238730/1160291584525475840/solpal-logomark.png?ex=653420be&is=6521abbe&hm=6ae4c844ed982388dc3a99ba5e6771ad5cc60c0bba4e1747ed8b7614079010e3&"
                        alt="SolPal Logo"
                        className=" "
                    />
                </div>
            </div>
        </div>
    )
}

export default Popup
