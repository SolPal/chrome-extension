// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'solpal',
        title: 'SolPal',
        contexts: ['selection']
    })
})

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'solpal') {
        const selectedText = info.selectionText
        // Send message to content script
        chrome.tabs.sendMessage(tab.id, {
            action: 'getSelectedText',
            text: selectedText
        })
    }
})

// chrome.action.setBadgeText({ text: 'ON' })

chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const activeTab = tabs[0]
        chrome.tabs.sendMessage(activeTab.id!, { message: 'clicked_browser_action' })
    })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { command } = message
    switch (command) {
        case 'hello-world':
            sendResponse({ success: true, message: 'Hello World' })
            break
        default:
            break
    }
})

chrome.commands.onCommand.addListener(command => {
    if (command === 'refresh_extension') {
        chrome.runtime.reload()
    }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'reloadExtension') {
        chrome.runtime.reload()
    }
})

export {}
