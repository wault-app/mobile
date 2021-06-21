import { useUser } from "@components/providers/AuthenticationProvider";
import React from "react";
import { View } from "react-native";
import { Title } from "react-native-paper";

export type LandingScreenProps = {};

const LandingScreen = (props: LandingScreenProps) => {
    const { user } = useUser();

    return (
        <View>
            <Title>
                Welcome back, {user.username}!
            </Title>
        </View>
    );
};

export default LandingScreen;