import React from "react";
import { IssuerType } from "@lib/credit-card/Issuers";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

export type PlatformIconProps = {
    issuer: IssuerType
    size?: number;
};

const CreditCardIcon = ({ issuer, size = 40 }: PlatformIconProps) => {
    const iconSize = size / 40 * 24;

    return (
        <LinearGradient
            colors={issuer.colors}
            style={{
                elevation: 2,
                width: size,
                height: size,
                padding: (size - iconSize) / 2,
                borderRadius: size / 40 * 12,
                margin: 8,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View style={[{ width: iconSize, height: iconSize }]}>
                <Icon name={"credit-card"} size={iconSize} />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    item: {
        margin: 8,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CreditCardIcon;