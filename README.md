# NS Presence
A Discord Rich Presence app for Nintendo Switch, it shows what you're currently playing. All game data is stored locally with the images being fetched from repo.

## Application
<img width="490" height="777" alt="ns-presence" src="https://github.com/user-attachments/assets/83194a83-69db-4466-bda3-749da3717736" />

## Discord Status
<img width="608" height="354" alt="ns-presence-status" src="https://github.com/user-attachments/assets/c725b97c-ae74-4fc0-b4c7-4fe029e147d3" />

## Why this exists
I've wanted to build a Switch Discord Presence tool from scratch properly for a long time and this was also a way for me to learn Tauri + Rust coming from a JavaScript background. This project was originally inspired by [hobby-grade/Nintendo-Switch-Discord-Status](https://github.com/hobby-grade/Nintendo-Switch-Discord-Status), which hadn't seen updates for a while and was built in Electron + Svelte instead. So I ended up rebuilding the idea in a stack I was more interested in (yes, this is due to stuff like binary sizes etc.)

## Features
- Discord Rich Presence that displays your current game
- 28 games included so far but will be updated along the way
- Game data is local and fully editable, with minimal coding required (where images are fetched from if new ones are added)

## Installation
1. Download installer from the [Releases page](https://github.com/Olly-Codes/ns-presence/releases/tag/v0.1.0)
2. Run the `.msi` or `.exe` installer
3. Windows may show a SmartScreen warning, this is due to it not being code-signed you can click more info -> run anyway. But then again you can decide after checking out the code yourself
4. Launch NS Presence, make sure Discord is running before hitting play

## Adding your own games
Game data is all located in `games.json` as `{ "name": ..., "img": ..., "local_img": ... }` entries, with cover art placed in `public/covers` folder. To add a game that isn't included:
1. If you do decide to fork this repo, please make sure you update the `base_url` so all images point to your own repo and any updated images that you add.
2. Then from that stage you can add a cover image to the above mentioned folder, ensure that the dimensions are something like 1024x1024, so `width === height`, this gives us a nice square look. Try to also follow the naming and .jpg extension for all images
3. Add an entry to `games.json` with the matching `name` and `img` used in the previous step and also include your `local_img` url, so the images can update in the app when you switch without relying on an external source
4. Rebuild, or submit a PR if you'd like the games included here as well

## Tech Stack
- Tauri
- React

## Building from source
```bash
git clone https://github.com/Olly-Codes/ns-presence.git
cd ns-presence
npm install
npm run tauri dev # dev mode
npm run tauri build # production build
```

## Known limitations
- Manual game selection like the repo this was inspired from. (Nintendo does not expose an API)
- Not code-signed, so expect a SmartScreen warning
- I though it would be funny to include a themes icon, but not implement them
