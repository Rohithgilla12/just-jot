// Native
import { join } from "path";
import { format } from "url";

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import { menubar } from "menubar";
import Store from "electron-store";

app.setAsDefaultProtocolClient("justdown");

Store.initRenderer();

const store = new Store();

app.setLoginItemSettings({
  openAtLogin: true,
});

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      nativeWindowOpen: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      });

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
  const mb = menubar({
    icon: join(app.getAppPath(), "assets", "IconTemplate.png"),
    index: `${url}menubar`,
    browserWindow: {
      webPreferences: {
        nodeIntegration: true,
      },
    },
  });

  mainWindow.webContents.send("MSG_FROM_MAIN", "hello renderer");

  mb.on("ready", () => {
    console.log("App ready ✅");
  });

  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});

ipcMain.on("MSG_FROM_RENDERER", (_event, data) => console.log(data));

ipcMain.on("COUNTER_UPDATED", (_event, data) => {
  store.set("counterValue", data);
});
