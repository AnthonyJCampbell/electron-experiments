const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on("closed", () => app.quit());

    // Using this overrides the default menu of Electron
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        height: 200,
        width: 300,
        title: "Add New Todo",
    });
    addWindow.loadURL(`file://${__dirname}/add.html`);
}

ipcMain.on("todo:add", (event, todo) => {
    mainWindow.webContents.send("todo:add", todo)
    addWindow.close()
})

const menuTemplate = [
    {
        // When you're on OSX, the label of the first entry will be the name of the Application
        // So on Mac, "File" won't show up but it will on Windows/Linux
        label: "File",
        submenu: [
            {
                label: "New Todo",
                click() {
                    createAddWindow();
                },
            },
            {
                label: "Quit",
                accelerator:
                    process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
                click() {
                    app.quit();
                },
            },
        ],
    },
];

// This checks if we're running on OSX, in which case an extra object will be added to the menu
// This then has the "File" label show up
if (process.platform === "darwin") {
    menuTemplate.unshift({ label: "nothing" });
}

if (process.env.NODE_ENV !== "production") {
    menuTemplate.push({
        label: "developer",
        submenu: [
            {
                label: "Toggle Dev Tools",
                accelerator:
                    process.platform === "darwin"
                        ? "Command+Alt+I"
                        : "Ctrl+Shift+I",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                },
            },
        ],
    });
}
