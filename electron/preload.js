const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')
const {dialog} = require('@electron/remote')

contextBridge.exposeInMainWorld('electronProcess', {
  fs,
  dialog,
  ipcRenderer
})