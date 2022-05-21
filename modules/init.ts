import * as fs from 'fs';
import * as YAML from 'yaml';

export type config = {
    // generally required
    user_name: string;
    channel_name: string;
    usage_message: string;
    wrong_format_message: string;
    added_to_queue_message: string;
    song_not_found: string;

    // reward/redeem stuff
    custom_reward_id: string;
    automatic_refunds: boolean;
    custom_reward_name: string;
    custom_reward_cost: number;
    minimum_required_bits: number;

    // setup
    usage_type: string;
    command_alias: Array<string>;
    use_song_command: boolean;
    skip_alias: string;
    skip_user_level: Array<string>;

    // script stuff
    fastify_port: number;
    logs: boolean;
}

enum UsageType {
    channel_points = "channel_points",
    command = "command",
    bits = "bits"
}

const DEFAULT_REWARD_ID = "xxx-xxx-xxx-xxx";


export function init() {
    let config = setupConfig();
    return config;
}

/**
 * Parse the config file
 */
function setupConfig() {
    const configFileText: string = fs.readFileSync('spotipack_config.yaml', 'utf8');
    let config: config = YAML.parse(configFileText);
    config = checkConfig(config);
    return config;
}

function checkConfig(config: config) {
    // make sure we have a user_name and channel_name set
    if (config.user_name === null || config.user_name.length === 0) {
        console.log("!WARNING!: user_name cannot be empty");
    }

    // check command usage
    if (config.usage_type === UsageType.channel_points && config.custom_reward_id === DEFAULT_REWARD_ID) {
        console.log("!WARNING!: channel_points selected and custom_reward_id === default_reward_id");
    }
    if (config.usage_type === UsageType.command && config.command_alias.length === 0) {
        console.log("!WARNING!: command selected and no command aliases set");
    } else {
        for (let i = 0; i < config.command_alias.length; i++) {
            config.command_alias[i] = config.command_alias[i].toLowerCase();
        }
    }
    return config;
}