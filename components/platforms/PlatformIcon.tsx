import Platforms from "@wault/platforms";
import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import CustomAvatar from "./PlatformIcon/Avatar";
import IconLibrary from "@lib/PlatformIcon";

export type PlatformIconProps = {
    platform: string;
    size?: number;
};

const PlatformIcon = ({ platform, size = 40 }: PlatformIconProps) => {
    const hostname = platform?.toLowerCase();
    const data = Platforms.get(hostname);
    const iconSize = size / 40 * 24;

    const Icon = useMemo(
        () => IconLibrary.get(hostname),
        [hostname]
    );

    const wrapperSizes = {
        width: size,
        height: size,
    };

    if (data) {
        if (Icon) {
            return (
                <CustomAvatar size={size} style={{ elevation: 2, }} color={data.color}>
                    <View style={[{ width: iconSize, height: iconSize }]}>
                        <Icon
                            width={iconSize}
                            height={iconSize}
                        />
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