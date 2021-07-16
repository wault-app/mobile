import React from "react";
import RemoteAuthenticationInstuctionsScreen from "@components/screens/authentication/RemoteAuthenticationInstuctionsScreen";
import ScanRemoteAuthenticationScreen from "@components/screens/authentication/ScanRemoteAuthenticationScreen";
import AuthenticationConfirmationScreen from "@components/screens/authentication/AuthenticationConfirmationScreen";
import { createStackNavigator } from "@react-navigation/stack";
import RemoteAuthenticationSuccessScreen from "@components/screens/authentication/RemoteAuthenticationSuccessScreen";

const ScanFlowStack = createStackNavigator();
export const RemoteAuthenticationWrapperStack = createStackNavigator();

export type RemoteAuthenticationStackProps = {};

export type RemoteAuthenticationStackParamList = {
    "Confirmation": {
        code: string;
    };
};

const RemoteAuthenticationStack = (props: RemoteAuthenticationStackProps) => {
    return (
        <RemoteAuthenticationWrapperStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <RemoteAuthenticationWrapperStack.Screen
                name={"AuthFlowStack"}
                component={AuthFlowStack}
            />
            <ScanFlowStack.Screen
                name={"RemoteAuthenticationSuccess"}
                component={RemoteAuthenticationSuccessScreen}
            />
        </RemoteAuthenticationWrapperStack.Navigator>
    );
};

const AuthFlowStack = () => {
    return (
        <ScanFlowStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <ScanFlowStack.Screen
                name={"RemoteAuthenticationInstructions"}
                component={RemoteAuthenticationInstuctionsScreen}
            />
            <ScanFlowStack.Screen
                name={"RemoteAuthenticationScan"}
                component={ScanRemoteAuthenticationScreen}
            />
            <ScanFlowStack.Screen
                name={"RemoteAuthenticationConfirmation"}
                component={AuthenticationConfirmationScreen}
            />
        </ScanFlowStack.Navigator>
    );
};

export default RemoteAuthenticationStack;