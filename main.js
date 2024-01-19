const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

let win;
let appIcon;

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            nodeIntegration: true
        },
        icon: path.join(__dirname, '/src/assets/logo_064.png'),
        show: true,
    });

    appIcon = new Tray(path.join(__dirname, '/src/assets/logo_064.png'));

    appIcon.on('click', () => {
        if (win.isVisible()) {
            win.hide();
        } else {
            win.show();
        }
    });

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Fermer l\'applications',
            click: () => {
                win.destroy();
            }
        }
    ]);

    appIcon.on('right-click', () => {
        appIcon.popUpContextMenu(contextMenu);
    });


    win.setMenu(null);
    win.setMinimumSize(960, 720);
    win.on('close', (e) => {
        e.preventDefault();
        win.hide();
    });
    win.loadFile('./public/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
