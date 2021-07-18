import Platforms from "@lib/api/Platforms";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import CustomAvatar from "./PlatformIcon/Avatar";

export type PlatformIconProps = {
    platform: string;
    size?: number;
};

const PlatformIcon = ({ platform, size = 40 }: PlatformIconProps) => {
    const data = Platforms.get(platform.toLowerCase());
    const iconSize = size / 40 * 24;

    const wrapperSizes = {
        width: size,
        height: size,
    };

    if (data) {
        if (data.icon) {
            return (
                <CustomAvatar size={size} style={{ elevation: 2, }} color={data.color}>
                    <View style={[{ width: iconSize, height: iconSize }]}>
                        <data.icon />
                    </View>
                </CustomAvatar>
            );
        } else {
            return (
                <Avatar.Text style={[styles.item, wrapperSizes, { backgroundColor: data.color }]} size={iconSize} label={platform.trim().charAt(0).toUpperCase()} />
            );
        }
    } else {
        return (
            <Avatar.Text style={[styles.item, wrapperSizes]} size={iconSize} label={platform.trim().charAt(0).toUpperCase()} />
        );
    }
};

const styles = StyleSheet.create({
    item: {
        margin: 8,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PlatformIcon;