use discord_rich_presence::{activity, DiscordIpc, DiscordIpcClient};
use std::sync::Mutex;
use std::time::{SystemTime, UNIX_EPOCH};

struct DiscordState(Mutex<Option<DiscordIpcClient>>);

#[tauri::command]
fn set_game_presence (
    state: tauri::State<DiscordState>,
    game_title: String, 
    large_image: String,
) -> Result<(), String> {
    let mut guard = state.0.lock().unwrap();

    if guard.is_none() {
        let mut client = DiscordIpcClient::new("1524026976292307205");
        client.connect().map_err(|e| e.to_string())?;
        *guard = Some(client);
    }

    let client = guard.as_mut().unwrap();

    let start_time: i64 = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(|e| e.to_string())?
        .as_secs() as i64;

    let timestamps = activity::Timestamps::new().start(start_time);
    let assets = activity::Assets::new()
        .large_image(&large_image)
        .large_text(&game_title)
        .small_text("Nintendo Switch");

    client.set_activity(activity::Activity::new()
        .details(&game_title)
        .timestamps(timestamps)
        .assets(assets)).map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
fn clear_game_presence (state: tauri::State<DiscordState>) -> Result<(), String> {
    let mut guard = state.0.lock().unwrap();
    if let Some(client) = guard.as_mut() {
        client.clear_activity().map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(DiscordState(Mutex::new(None)))
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            set_game_presence,
            clear_game_presence
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
