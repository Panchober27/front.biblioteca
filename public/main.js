const { app, BrowserWindow } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

require('@electron/remote/main').initialize();

const createWindow = () => {
  // Configurar la ventana de la app.
  // Agregar icono y min-widthHeight
  const win = new BrowserWindow({
    width: 1000,
    height: 620,
    frame: true,
    toolbar: false,
    title: 'BIBLIOTECA',
    resizable: true,
    maximizable: true,
    webPreferences: {},
  });

  // Ocultar la barra de herramientas de la app.
  win.removeMenu();

  // valido si es modo develop o produccion
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
};

app.on('ready', createWindow);

// Funcion de objeto app para cerrar/apagar el sistema al cerrarlo 'x'
// con nwjs la app seguia corriendo en segundo plano :/
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
