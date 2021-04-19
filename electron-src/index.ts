// Native
import { join } from "path";
import { format } from "url";

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
// import { menubar } from "menubar";

app.setAsDefaultProtocolClient("justdown");

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

  console.log(url);

  // const mb = menubar({
  //   icon: join(app.getAppPath(), "assets", "icon.png"),
  //   index: `${url}menubar`,
  //   browserWindow: {
  //     webPreferences: {
  //       nodeIntegration: true,
  //     },
  //   },
  // });

  // mb.on("ready", () => {
  //   console.log("App ready ✅");
  // });

  mainWindow.loadURL(url), { userAgent: "Chrome" };
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});
