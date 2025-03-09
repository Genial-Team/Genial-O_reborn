export interface Guild {
    guild: {
        id: string;
        name: string;
        icon: string | null;
        description: string | null;
        home_header: string | null;
        splash: string | null;
        discovery_splash: string | null;
        features: string[];
        banner: string | null;
        owner_id: string;
        application_id: string | null;
        region: string;
        afk_channel_id: string | null;
        afk_timeout: number;
        system_channel_id: string | null;
        system_channel_flags: number;
        widget_enabled: boolean;
        widget_channel_id: string | null;
        verification_level: number;
        roles: Role[];
        default_message_notifications: number;
        mfa_level: number;
        explicit_content_filter: number;
        max_presences: number | null;
        max_members: number;
        max_stage_video_channel_users: number;
        max_video_channel_users: number;
        vanity_url_code: string | null;
        premium_tier: number;
        premium_subscription_count: number;
        preferred_locale: string;
        rules_channel_id: string | null;
        safety_alerts_channel_id: string | null;
        public_updates_channel_id: string | null;
        hub_type: string | null;
        premium_progress_bar_enabled: boolean;
        latest_onboarding_question_id: string | null;
        nsfw: boolean;
        nsfw_level: number;
        emojis: any[];
        stickers: any[];
        incidents_data: any | null;
        inventory_settings: any | null;
        embed_enabled: boolean;
        embed_channel_id: string | null;
    },
    channels: {
        id: string;
        type: number;
        flags: number;
        guild_id: string;
        name: string;
        parent_id: string | null;
        position: number;
        permission_overwrites: PermissionOverwrite[];
        last_message_id?: string | null;
        rate_limit_per_user?: number;
        bitrate?: number;
        user_limit?: number;
        rtc_region?: string | null;
        nsfw?: boolean;
        topic?: string | null;
        icon_emoji?: IconEmoji | null;
        theme_color?: string | null;
        voice_background_display?: string | null;
    }[],
    members: {
        avatar: string | null;
        banner: string | null;
        communication_disabled_until: string | null;
        flags: number;
        joined_at: string;
        nick: string | null;
        pending: boolean;
        premium_since: string | null;
        roles: string[];
        unusual_dm_activity_until: string | null;
        user: User;
        mute: boolean;
        deaf: boolean;
    }[],
}

interface Role {
    id: string;
    name: string;
    description: string | null;
    permissions: string;
    position: number;
    color: number;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
    icon: string | null;
    unicode_emoji: string | null;
    tags?: {
        bot_id?: string;
    };
    flags: number;
}
interface PermissionOverwrite {
    id: string;
    type: number;
    allow: string;
    deny: string;
}
interface IconEmoji {
    id: string | null;
    name: string;
}
interface User {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    public_flags: number;
    flags: number;
    bot?: boolean;
    banner: string | null;
    accent_color: number | null;
    global_name: string | null;
    avatar_decoration_data: any | null;
    collectibles: any | null;
    banner_color: string | null;
    clan: any | null;
    primary_guild: any | null;
}



