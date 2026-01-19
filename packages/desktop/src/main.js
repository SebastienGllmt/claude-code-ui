import { app, BrowserWindow } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The URL of the UI dev server
const UI_DEV_URL = "http://localhost:5173";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // Security: disable node integration in renderer
      nodeIntegration: false,
      contextIsolation: true,
    },
    // Nice title
    title: "Claude Code UI",
    // Show when ready to avoid flash
    show: false,
  });

  // Load the UI
  mainWindow.loadURL(UI_DEV_URL);

  // Show window when ready
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // Open DevTools in development (optional - comment out if not needed)
  // mainWindow.webContents.openDevTools();
}

// Electron app lifecycle
app.whenReady().then(() => {
  createWindow();

  // macOS: re-create window when dock icon clicked and no windows open
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed (except on macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
