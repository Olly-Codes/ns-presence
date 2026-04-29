const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ns-presence", {
    getGames: () => ipcRenderer.invoke("get-games"),
    setActivity: (payload) => ipcRenderer.invoke("set-activity", payload)
})