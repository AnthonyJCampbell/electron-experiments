const electron = require("electron");
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      webPreferences: {
        nodeIntegration: true, // Enable `require` 
        backgroundThrottling: false,
      },
      height: 500,
      width: 300,
      frame: false,
      resizable: false,
      show: false,
      skipTaskbar: true, // Whether to show the window in taskbar as an icon
    });

    this.loadURL(url)
    this.on("blur", this.onBlur.bind(this)) // Clicking outside the browser window
  }

  onBlur() {
      this.hide()
  }
}

module.exports = MainWindow;
