import React from "react";
import RemoteAuthenticationInstuctionsScreen from "@components/screens/RemoteAuthenticationInstuctionsScreen";
import ScanRemoteAuthenticationScreen from "@components/screens/ScanRemoteAuthenticationScreen";
import AuthenticationConfirmationScreen from "@components/screens/AuthenticationConfirmationScreen";
import { createStackNavigator } from "@react-navigation/stack";
import RemoteAuthenticationSuccessScreen from "@components/screens/RemoteAuthenticationSuccessScreen";

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
        <RemoteAuthenticationWrapperStack.Navigator>
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
        <ScanFlowStack.Navigator>
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