const { app, BrowserWindow, protocol, net } = require("electron");
const path = require('path');

app.whenReady().then(() => {
    protocol.handle('pics', (request) => {
        const filePath = path.join(process.resourcesPath, 'pics', request.url.slice('pics://'.length));
        return net.fetch('file://' + filePath);
    });
    createWindow();
});

function createWindow() {
  const win = new BrowserWindow({
    width: 307,
    height: 460,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    frame: false, 
    transparent: false,
    webPreferences: {
      contextIsolation: true,
    }
  });

  app.isPackaged
    ? win.loadFile(path.join(__dirname, 'index.html'))
    : win.loadURL("http://localhost:3000");
  

  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS('::-webkit-scrollbar { display: none; }');

  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

