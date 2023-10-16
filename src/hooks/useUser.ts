import axios from 'axios'
import { useState, useEffect } from 'react'

export const useUser = () => {
    const [user, setUser] = useState(null)

    const fetchUser = async publickey => {
        const res = await axios.get(`https://www.solpal.org/api/user?publickey=${publickey}`)
        const userData = await res.data

        // Set user in Chrome Storage
        try {
            chrome.storage.sync.set({ user: userData }, () => {})
            setUser(userData)
        } catch (e) {
            console.error("Couldn't set user in Chrome Storage:", e)
        }
    }

    useEffect(() => {
        // Check if we are in the allowed domain
        const allowedDomain = 'www.solpal.org'
        try {
            if (window.location.hostname !== allowedDomain) {
                chrome.storage.sync.get(['user'], result => {
                    if (result.user) {
                        setUser(result.user)
                    }
                })
            } else {
                chrome.storage.sync.get(['session'], async result => {
                    if (result.session) {
                        await fetchUser(result.session.user.name)
                    }
                })
            }
        } catch (e) {
            console.error("Couldn't get user from Chrome Storage:", e)
        }
    }, [])

    return { user }
}
