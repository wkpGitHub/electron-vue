const { app, BrowserWindow  } = require('electron')
const path = require('path')
const { ipcMain  } = require('electron')
const remote = require('@electron/remote/main')

ipcMain.on('fullscreen', (event, arg) => {
  // event事件对象，有很多自定义方法，args是send发送的参数
  console.log(event, arg)
  event.reply('reply-fullscreen', '回复消息')
})

let win
const createWindow = () => {
  // 创建窗口
  win = new BrowserWindow({
    show: false, 
    webPreferences: {
      sandbox: false, // 开启下面的preload，这个沙盒必须设置位false，不然会禁用preload
      preload: path.join(__dirname, './preload.js')
    }
  })
  //2、主进程的BrowserWindow实例创建以后添加如下两段代码
  remote.initialize();
  remote.enable(win.webContents);
  // 设置窗口最大化
  win.maximize() 
  // 显示窗口
  win.show()
  // 加载html
  win.loadURL('http://localhost:8080/index.html')
}

app.whenReady().then(() => {
  createWindow()
  // 打开开发者工具
  win.webContents.openDevTools()
  // 兼容macos 如果没有窗口打开则打开一个窗口 (macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 关闭窗口，销毁app实例
app.on('window-all-closed', () => {
   // 判断不是macos系统，app.quit方法不适用于 macOS。
  if (process.platform !== 'darwin') app.quit()
})