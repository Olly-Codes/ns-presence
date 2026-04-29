const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ns-presence", {
    getGames: () => ipcRenderer.invoke("get-games"),
    setActivity: (payload) => ipcRenderer.invoke("set-activity", payload),
    setIdle: () => ipcRenderer.invoke("set-idle"),
    clearActivity: () => ipcRenderer.invoke("clear-activity"),
    getSavedState: () => ipcRenderer.invoke("get-saved-state")
});