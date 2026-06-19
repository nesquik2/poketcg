const { app, BrowserWindow } = require("electron");


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

  win.loadURL("http://localhost:3000");
  

  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS('::-webkit-scrollbar { display: none; }');
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

