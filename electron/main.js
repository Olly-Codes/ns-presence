require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const {app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const RPC = require("discord-rpc");
const gamesData = require("../data/games.json");
const { error } = require("console");

let rpc = null;
let rpcReady = false;

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

async function connectRPC() {
    rpc = new RPC.Client({ transport: "ipc"});

    rpc.on("ready", () => {
        console.log("Discord RPC connected!");
        rpcReady = true;
    });

    rpc.on("disconnected", () => {
        console.log("Discord RPC disconnected");
        rpcReady = false;
    });

    try {
        await rpc.login({ clientId: CLIENT_ID });
    } catch (err) {
        console.log("RPC login failed:", err.message);
    }
}

function createWindow() {
    const window = new BrowserWindow({
        width: 400,
        height: 600,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true, // keeps Node out of renderer
            nodeIntegration: false // renderer cannot require() Node modules
        }
    });

    // Ensure we serve built file in production otherwise serve on localhost
    if (process.env.VITE_DEV_SERVER_URL) {
        window.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        window.loadFile(path.join(__dirname, "../dist/index.html"));
    }
}

app.whenReady().then(() => {
    createWindow();
    connectRPC();
});

app.on("window-all-closed", () => {
    if (rpc) {
        rpc.destroy();
    }
    app.quit();
});

ipcMain.handle("get-games", () => {
    return gamesData;
});

ipcMain.handle("set-activity", async (event, {game, statusMessage }) => {
    if (!rpcReady || !rpc) {
        return { success: false, error: "RPC is not connected"}
    }

    try {
        await rpc.setActivity({
            details: game.name,
            state: statusMessage || "Playing on Nintendo Switch",
            largeImageKey: game.imageKey,
            largeImageText: game.name,
            smallImageKey: "switch-icon",
            smallImageText: "Nintendo Switch",
            startTimestamp: Date.now(),
            instance: false,
        });
        return { success: true }
    } catch (err) {
        return { success: false, error: err.message }
    }
});

ipcMain.handle("set-idle", async () => {
    if (!rpcReady || !rpc) {
        return { success: false, error: "RPC is not connected"}
    }

    try {
        await rpc.setActivity({
            details: "Home",
            largeImageKey: "switch-home",
            largeImageText: "Nintendo Switch",
            instance: false,
        });
        return { success: true }
    } catch (err) {
        return { success: false, error: err.message }
    }
});

ipcMain.handle("clear-activity", async () => {
    if (!rpcReady || !rpc) {
        return { success: false, error: "RPC is not connected"}
    }

    try {
        await rpc.clearActivity();
        return { success: true }
    } catch (err) {
        return { success: false, error: err.message }
    }
});