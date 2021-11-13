import { app } from "electron";
import serve from "electron-serve";
import { menubar } from "menubar";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const port = process.argv[2];
  const mb = menubar({
    index: isProd ? "app://./home.html" : `http://localhost:${port}/home`,
    preloadWindow: true,
    browserWindow: {
      width: 400,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        webSecurity: false,
      },
    },
  });

  mb.on("ready", () => {
    console.log("app is ready");
    if (mb.window) {
      mb.window.webContents.openDevTools();
    }
  });
})();

app.on("window-all-closed", () => {
  app.quit();
});
