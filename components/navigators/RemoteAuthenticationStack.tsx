import React from "react";
import RemoteAuthenticationInstuctionsScreen from "@components/screens/RemoteAuthenticationInstuctionsScreen";
import ScanRemoteAuthenticationScreen from "@components/screens/ScanRemoteAuthenticationScreen";
import AuthenticationConfirmationScreen from "@components/screens/AuthenticationConfirmationScreen";
import { createStackNavigator } from "@react-navigation/stack";
import RemoteAuthenticationSuccessScreen from "@components/screens/RemoteAuthenticationSuccessScreen";

const StackNavigator = createStackNavigator();

export type RemoteAuthenticationStackProps = {};

export type RemoteAuthenticationStackParamList = {
    "Confirmation": {
        code: string;
    };
};

const RemoteAuthenticationStack = (props: RemoteAuthenticationStackProps) => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name={"remote-authentication-instructions"}
                component={RemoteAuthenticationInstuctionsScreen}
            />
            <StackNavigator.Screen
                name={"remote-authentication-scan"}
                component={ScanRemoteAuthenticationScreen}
            />
            <StackNavigator.Screen
                name={"remote-authentication-confirmation"}
                component={AuthenticationConfirmationScreen}
            />
            <StackNavigator.Screen
                name={"remote-authentication-success"}
                component={RemoteAuthenticationSuccessScreen}
            />
        </StackNavigator.Navigator>
    );
};

export default RemoteAuthenticationStack;