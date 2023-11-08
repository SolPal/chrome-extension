# How to Install a Chrome Extension from GitHub

This README provides a step-by-step guide on how to install a Chrome extension that you've downloaded from GitHub.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installing Git](#installing-git)
3. [Step 1: Clone the GitHub Repository](#step-1-clone-the-github-repository)
4. [Step 2: Navigate to the Extension Folder](#step-2-navigate-to-the-extension-folder)
5. [Step 3: Open Chrome and Navigate to Extensions Page](#step-3-open-chrome-and-navigate-to-extensions-page)
6. [Step 4: Enable Developer Mode](#step-4-enable-developer-mode)
7. [Step 5: Load Unpacked Extension](#step-5-load-unpacked-extension)
8. [Step 6: Select the Extension Folder](#step-6-select-the-extension-folder)
9. [Running on your Chrome](#running-on-your-chrome)
10. [Need Help?](#need-help)

## Prerequisites

-   Google Chrome browser
-   Git installed on your machine

## Installing Git

If you don't have Git installed on your machine, you can follow the official installation guide [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Step 1: Clone the GitHub Repository

First, clone the GitHub repository containing the Chrome extension to your local machine. Open your terminal and run the following command:

```bash
git clone https://github.com/SolPal/chrome-extension.git
```

## Step 2: Navigate to the Extension Folder

Navigate to the folder where the Chrome extension code is located. This is usually the root directory of the cloned repository, but it might be in a subfolder.

```bash
cd chrome-extendion
```

## Step 3: Open Chrome and Navigate to Extensions Page

Open Google Chrome and go to the Extensions page. You can either navigate to `chrome://extensions/` or click on the menu icon (three vertical dots) in the upper-right corner, then go to `More Tools` > `Extensions`.

## Step 4: Enable Developer Mode

On the Extensions page, you'll find a toggle switch for "Developer mode" in the top-right corner. Turn it on.

## Step 5: Load Unpacked Extension

Click the "Load unpacked" button that appears after you enable Developer mode. This will open a file dialog.

## Step 6: Select the Extension Folder

In the file dialog, navigate to the folder where you've cloned the GitHub repository. Select the folder and click "Open."

## Running on your Chrome

**READ THIS NEXT SECTION CAREFULLY BECAUSE THERE ARE SOME TIPS THAT WILL SAVE YOU TIME WHILST DEVELOPING YOUR EXTENSION!**

To get your extension running on Chrome, you'll need to do a couple (easy) steps. Firstly, run the build command, which uses vite to build and output to the `dist` folder.

```bash
npm run build
```

From here, open Chrome and go to `chrome://extensions`, then hit `Load Unpacked` and choose the newly made `dist` directory. Assuming no errors, voila! You're in.

## Need Help?

Follow me on [twitter.com/engineergomes](https://twitter.com/engineergomes) and drop me a message. I'm here to help. It's what I enjoy the most (aside from shipping products, obviously). Reach out, always.

## Based on a Template

This project is based on the [React Tailwind Chrome Extension Template](https://github.com/dougwithseismic/react-tailwind-chrome-extension-template) by [dougwithseismic](https://github.com/dougwithseismic). Special thanks to the original author for providing the template.
