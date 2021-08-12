import DiscordIcon from "@wault/platforms/res/discord.svg";
import GoogleIcon from "@wault/platforms/res/google.svg";
import NetflixIcon from "@wault/platforms/res/netflix.svg";
import GithubIcon from "@wault/platforms/res/github.svg";
import TwitterIcon from "@wault/platforms/res/twitter.svg";
import EpicGamesIcon from "@wault/platforms/res/epic-games.svg";
import SpotifyIcon from "@wault/platforms/res/spotify.svg";
import TwitchIcon from "@wault/platforms/res/twitch.svg";
import SteamIcon from "@wault/platforms/res/steam.svg";
import SnapchatIcon from "@wault/platforms/res/snapchat.svg";
import DigitalOceanIcon from "@wault/platforms/res/digital-ocean.svg";
import AppleIcon from "@wault/platforms/res/apple.svg";
import MicrosoftIcon from "@wault/platforms/res/microsoft.svg";
import SlackIcon from "@wault/platforms/res/slack.svg";
import RiotGamesIcon from "@wault/platforms/res/riot-games.svg";
import RedditIcon from "@wault/platforms/res/reddit.svg";
import React from "react";
import { SvgProps } from "react-native-svg";
import aliases from "@wault/platforms/src/aliases";

type ListType = {
    [key: string]: React.FC<SvgProps>;
};

/**
 * This library is created to create a bridge between the `@wault/platforms` and the React Native client. 
 * We must use this as you can't dynamically import svgs inside RN.
 */
export default class PlatformIcon {
    private static list: ListType = {
        "reddit.com": RedditIcon,
        "riotgames.com": RiotGamesIcon,
        "slack.com": SlackIcon,
        "microsoft.com": MicrosoftIcon,
        "apple.com": AppleIcon,
        "digitalocean.com": DigitalOceanIcon,
        "snapchat.com": SnapchatIcon,
        "steamcommunity.com": SteamIcon,
        "twitch.tv": TwitchIcon,
        "spotify.com": SpotifyIcon,
        "epicgames.com": EpicGamesIcon,
        "twitter.com": TwitterIcon,
        "github.com": GithubIcon,
        "netflix.com": NetflixIcon,
        "google.com": GoogleIcon,
        "discord.com": DiscordIcon,
    };

    public static get(hostname: string) {
        return this.list[hostname] || this.list[aliases[hostname]];
    }
}