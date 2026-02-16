# Backend Setup Guide & Troubleshooting

## 🛑 Problem: "npm is not recognized"
This error means **Node.js is not installed** on your computer (or your terminal doesn't know where it is).

### ✅ Solution: Install Node.js Correctly

#### Step 1: Download
1.  Go to the official website: [**nodejs.org**](https://nodejs.org/)
2.  Click the **"LTS" (Long Term Support)** button to download the installer.

#### Step 2: Install (Important!)
1.  Run the installer file you downloaded.
2.  Click "Next" through the prompts.
3.  **CRITICAL**: When you see the "Custom Setup" or "Tools for Native Modules" screen, ensure **"Add to PATH"** is selected (it usually is by default).
4.  Finish the installation.

#### Step 3: Verify Installation
1.  **Close your current terminal/command prompt completely.** (This is required to refresh your system content).
2.  Open a **new** Command Prompt or PowerShell.
3.  Type the following and press Enter:
    ```bash
    node -v
    ```
    (You should see something like `v20.11.0`)
4.  Type this and press Enter:
    ```bash
    npm -v
    ```
    (You should see something like `10.2.4`)

---

## 🚀 Running Your Backend
Once you see version numbers from the commands above, you are ready!

### Step 1: Install Dependencies
In your project folder (`c:\Users\91933\Desktop\Portfolio`), open a terminal and run:
```bash
npm install
```
*(This downloads the tools needed for your server)*

### Step 2: Start the Server
Run:
```bash
node server.js
```
You should see:
> `Backend server running at http://localhost:3000`

### Step 3: Test Your Website
Refresh `index.html` in your browser. The chatbot is now powered by your local backend!
