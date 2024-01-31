// const { app, BrowserWindow, ipcMain} = require('electron');
// const path = require('node:path')


// const createWindow = () => {
//     const win = new BrowserWindow({
//       width: 800,
//       height: 600,
//       webPreferences: {
//         preload: path.join(__dirname, 'preload.js'),
//         nodeIntegration: true,
//         contextIsolation: false
//       }
//     })
  
//     win.loadFile('src/index.html')
//   }
// app.whenReady().then(()=> {
//     createWindow()

//     app.on('activate', ()=>{
//         if(BrowserWindow.getAllWindows.length === 0) createWindow()
//     })
// })
// app.on('open-new-window', () =>{
//   createWindow()
// })

// app.on('window-all-closed', () =>{
//     if(process.platform !== 'darwin') app.quit()
// })


// const { app, BrowserWindow, ipcMain } = require('electron/main')
// const path = require('node:path')

// function createWindow () {
//   const mainWindow = new BrowserWindow({
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js')
//     }
//   })

//   ipcMain.on('set-title', (event, title) => {
//     const webContents = event.sender
//     const win = BrowserWindow.fromWebContents(webContents)
//     win.setTitle(title)
//   })

//   mainWindow.loadFile('src/index.html')
// }

// app.whenReady().then(() => {
//   createWindow()

//   app.on('activate', function () {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })

// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit()
// })
const { app, BrowserWindow, ipcMain, dialog } = require('electron/main');
const path = require('node:path');

let mainWindow, childWindow;

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (!canceled) {
    return filePaths[0];
  }
}

//Main Window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // Make sure this is set to true if you need it
    },
  });
  mainWindow.loadFile('src/index.html');
}

function createChildWindow() {
  childWindow = new BrowserWindow(
      {
    width: 400,
    height: 300,
    modal: true,
    parent: mainWindow,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // Make sure this is set to true if you need it
    },
  }
  );
  childWindow.loadFile('src/add.html');
}

app.whenReady().then(() => {
  createWindow();
  ipcMain.on('openWindow', (event, data)=>{
    event.sender
    console.log(data)
    createChildWindow()
  })
  // ipcMain.on('openWindow', async (event, data) =>{
  //   console.log(data)
  //   createChildWindow()
  //   event.reply('reply','Hello from Main process')
  // })
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
