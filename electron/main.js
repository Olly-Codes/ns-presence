const {app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const RPC = require("discord-rpc");
const Store = require("electron-store");
const gamesData = require("../data/games.json");

const store = new Store();

let rpc = null;
let rpcReady = false;

const CLIENT_ID = "";

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

ipcMain.handle("get-all-games", () => {
    return gamesData;
});