# NS Presence

A Nintendo Switch Discord Rich Presence app built with React and Electron.
You can set your Discord status to show what you are currently playing on your Switch.

<img width="480" height="737" alt="screenshot" src="https://github.com/user-attachments/assets/c192cf9e-0c8d-4ef2-a9ee-7ba41e5c69e3" />

## Features
- You can set your Discord Status to any game that is available from the drop down (more games coming!)
- You can set a custom message per game
- You can set your status to idle to show you are on the Switch Home menu
- Status clears automatically when the app is closed
- Nintendo Switch inspired UI

## Requirements
- Windows 10 or higher
- You should have your discord app running if you want to see your presence working

## Usage
You can download the latest release from the [Releases](#) page, install it and run it. Discord has to be open before launching the app

## Development

### Prerequisites
- Node.js 18 or higher
- npm 9 or higher

### Setup
If you would like to run it and build it yourself due to me not being able to add games or you just want different ones, you can follow these steps:

```bash
git clone https://github.com/Olly-Codes/ns-presence.git
cd ns-presence
npm install
npm run dev
```

### Adding Games
Open `data/games.json` and add entris in this format:
```json
{
  "id": "id",
  "name": "Game Display Name",
  "imageKey": Discord asset key"
}
```
If you take this approach, ensure you make your own [discord appplication](https://discord.com/developers/home) then from here copy the public client ID so you can use it in your code. After that, make sure that the assets you upload have a name that match the imageKey in your json. Enjoy.

## Built With
- [Electron](https://www.electronjs.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [discord-rpc](https://www.npmjs.com/package/discord-rpc)
