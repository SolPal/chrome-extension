import React from 'react'
import { createRoot } from 'react-dom/client'
import styles from '@/styles/index.css?inline'
import App from './App'
import '@/styles/index.css'

const isProduction: boolean = process.env.NODE_ENV === 'production'
const ROOT_ID = 'extension-root'

const injectReact = (rootId: string): void => {
    try {
        const container = document.createElement('div')
        document.querySelector('html').appendChild(container)

        if (container) {
            container.id = rootId
            container.style.position = 'inherit'
            container.style.zIndex = '2147483666'
        }

        if (isProduction) {
            container.attachShadow({ mode: 'open' })
        } else {
        }

        const target: ShadowRoot | HTMLElement = isProduction ? container.shadowRoot! : container

        const root = createRoot(target!)

        root.render(
            <React.StrictMode>
                <>
                    <style>{styles.toString()}</style>
                    <App />
                </>
            </React.StrictMode>
        )
    } catch (error) {
        console.error('Error Injecting React', error)
    }
}

injectReact(ROOT_ID)
