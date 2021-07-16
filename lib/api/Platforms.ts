import YoutubeIcon from "@components/icons/YoutubeIcon";
import DiscordIcon from "@components/icons/DiscordIcon";
import GoogleIcon from "@components/icons/GoogleIcon";
import NetflixIcon from "@components/icons/NetflixIcon";
import GithubIcon from "@components/icons/GithubIcon";
import TwitterIcon from "@components/icons/TwitterIcon";
import EpicGamesIcon from "@components/icons/EpicGamesIcon";
import SpotifyIcon from "@components/icons/SpotifyIcon";
import TwitchIcon from "@components/icons/TwitchIcon";
import SteamIcon from "@components/icons/SteamIcon";
import SnapchatIcon from "@components/icons/SnapchatIcon";
import DigitalOceanIcon from "@components/icons/DigitalOceanIcon";
import AppleIcon from "@components/icons/AppleIcon";
import MicrosoftIcon from "@components/icons/MicrosoftIcon";
import LastPassIcon from "@components/icons/LastPassIcon";
import SlackIcon from "@components/icons/SlackIcon";
import RiotGamesIcon from "@components/icons/RiotGamesIcon";
import RedditIcon from "@components/icons/RedditIcon";
import { CategoryType } from "./Categories";

export type PlatformType = {
    name: string;
    categories: CategoryType[];
    color?: string;
    icon?: (props: any) => JSX.Element;
};

const PLATFORMS: {
    [key: string]: PlatformType;
} = {
    "discord.com": {
        name: "Discord",
        color: "#7289DA",
        icon: DiscordIcon,
        categories: ["communication", "social"],
    },
    "youtube.com": {
        name: "Youtube",
        color: "#FF0000",
        icon: YoutubeIcon,
        categories: ["entertainment", "social"]
    },
    "google.com": {
        name: "Google",
        color: "#fff",
        icon: GoogleIcon,
        categories: ["communication"],
    },
    "netflix.com": {
        name: "Netflix",
        color: "#141414",
        icon: NetflixIcon,
        categories: ["entertainment"],
    },
    "github.com": {
        name: "Github",
        color: "#000000",
        icon: GithubIcon,
        categories: ["work"],
    },
    "twitter.com": {
        name: "Twitter",
        color: "#1D9BF0",
        icon: TwitterIcon,
        categories: ["social"],
    },
    "epicgames.com": {
        name: "Epic Games",
        color: "#37322f",
        icon: EpicGamesIcon,
        categories: ["games"],
    },
    "spotify.com": {
        name: "Spotify",
        color: "#1DB954",
        icon: SpotifyIcon,
        categories: ["entertainment"],
    },
    "twitch.tv": {
        name: "Twitch",
        color: "#9146FF",
        icon: TwitchIcon,
        categories: ["entertainment"]
    },
    "reddit.com": {
        name: "Reddit",
        color: "#fff",
        categories: ["social", "entertainment"],
        icon: RedditIcon,
    },
    "steamcommunity.com": {
        name: "Steam",
        color: "#fff",
        icon: SteamIcon,
        categories: ["games", "social"]
    },
    "snapchat.com": {
        name: "Snapchat",
        color: "#FFFC00",
        categories: ["social", "communication"],
        icon: SnapchatIcon,
    },
    "digitalocean.com": {
        name: "DigitalOcean",
        categories: ["work"],
        color: "#0080FF",
        icon: DigitalOceanIcon,
    },
    "apple.com": {
        name: "Apple",
        categories: [],
        color: "#fff",
        icon: AppleIcon,
    },
    "microsoft.com": {
        name: "Microsoft",
        categories: ["work"],
        color: "#fff",
        icon: MicrosoftIcon,
    },
    "lastpass.com": {
        name: "LastPass",
        categories: ["work"],
        color: "#D32D27",
        icon: LastPassIcon,
    },
    "slack.com": {
        name: "Slack",
        categories: ["work"],
        color: "#ffffff",
        icon: SlackIcon,
    },
    "riotgames.com": {
        name: "Riot Games",
        categories: ["games"],
        color: "#d2373a",
        icon: RiotGamesIcon,
    },
};

const aliases: { [key: string]: keyof typeof PLATFORMS } = {
    "discordapp.com": "discord.com", 
};

export default class Platforms {
    public static get(platform: string): PlatformType {
        return PLATFORMS[platform] || PLATFORMS[aliases[platform]] || {
            name: platform,
            categories: [],
        };
    }
}