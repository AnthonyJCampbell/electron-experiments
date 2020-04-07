const electron = require("electron");

// App represents the overall running process of electron on the machine
const { app, BrowserWindow } = electron;

// Listening for 'ready' event
app.on("ready", () => {
    const mainWindow = new BrowserWindow({ })
    mainWindow.loadURL(`file://${__dirname}/index.html`)
});
