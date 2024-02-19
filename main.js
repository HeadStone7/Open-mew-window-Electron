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
