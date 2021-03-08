
const os = require('os-utils');
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  })
  mainWindow.loadFile('index.html');

  var python = require('child_process').spawn('python', ['./hello.py']);
    python.stdout.on('data',function(data){
        console.log("data: ",data.toString('utf8'));
    });
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
