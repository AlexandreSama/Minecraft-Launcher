const { ipcMain } = require('electron');
const electron = require('electron');
const app = electron.app;
const fs = require('fs')
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

let launcherPath = app.getPath('appData') + 'PsychoseLauncher'

function createWindow () {

  mainWindow = new BrowserWindow({width: 1800, height: 1200}); // on définit une taille pour notre fenêtre

  mainWindow.loadURL(`file://${__dirname}/src/views/login.html`); // on doit charger un chemin absolu

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
});

ipcMain.on('page-load', (event) => {
    if(fs.existsSync(launcherPath)){
        let JSONInfos = fs.readFileSync(launcherPath + 'infos.json')
    }
})