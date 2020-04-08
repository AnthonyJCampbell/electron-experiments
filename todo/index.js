const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.loadURL(`file://${__dirname}/main.html`);

    // Using this overrides the default menu of Electron
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const menuTemplate = [
    {
        // When you're on OSX, the label of the first entry will be the name of the Application
        // So on Mac, "File" won't show up but it will on Windows/Linux
        label: "File",
        submenu: [
            { label: "New Todo" },
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
