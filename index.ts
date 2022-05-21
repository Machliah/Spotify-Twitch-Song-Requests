import {spotifyController} from "./modules/spotifyController";
import {twitchController} from "./modules/twitch/twitchController";
import {init} from "./modules/init";

// generate our config
const config = init();

const spotify = spotifyController;
const twitch = twitchController;