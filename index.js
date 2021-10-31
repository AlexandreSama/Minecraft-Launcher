const { ipcMain } = require('electron');
const electron = require('electron');
const app = electron.app;
const fs = require('fs')
const BrowserWindow = electron.BrowserWindow;
const {Client, Authenticator} = require('minecraft-launcher-core')

let mainWindow;

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1800, 
    height: 1200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }}); // on définit une taille pour notre fenêtre

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
  let launcherPath = app.getPath('appData') + 'PsychoseLauncher'
    if(fs.existsSync(launcherPath)){
        let JSONInfos = fs.readFileSync(launcherPath + 'infos.json')
        let object = JSON.parse(JSONInfos)
        let email = obj['email']
        event.sender.send('infosaved', {email})
    }
})

ipcMain.on('login', (event, data) => {
    Authenticator.getAuth(data.email, data.password).then(e => {
      mainWindow.loadURL(`file://${__dirname}/src/views/app.html`)
    }).catch(err => {
      event.sender.send('Error-Login')
    })
})