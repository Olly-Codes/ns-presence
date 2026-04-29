const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("nsPresence", {
    getGames: () => ipcRenderer.invoke("get-games"),
    setActivity: (payload) => ipcRenderer.invoke("set-activity", payload),
    setIdle: () => ipcRenderer.invoke("set-idle"),
    clearActivity: () => ipcRenderer.invoke("clear-activity"),
});