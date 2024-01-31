const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openWindow: (message) => ipcRenderer.send('openWindow', message)

})

