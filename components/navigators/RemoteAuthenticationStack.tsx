import React from "react";
import InstructionsAuthenticationScreen from "@components/screens/authentication/InstructionsAuthenticationScreen";
import ScanAuthenticationScreen from "@components/screens/authentication/ScanAuthenticationScreen";
import ConfirmAuthenticationScreen from "@components/screens/authentication/ConfirmAuthenticationScreen";
import { createStackNavigator } from "@react-navigation/stack";
import SuccessfulAuthenticationScreen from "@components/screens/authentication/SuccessfulAuthenticationScreen";

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
                component={SuccessfulAuthenticationScreen}
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
                component={InstructionsAuthenticationScreen}
            />
            <ScanFlowStack.Screen
                name={"RemoteAuthenticationScan"}
                component={ScanAuthenticationScreen}
            />
            <ScanFlowStack.Screen
                name={"RemoteAuthenticationConfirmation"}
                component={ConfirmAuthenticationScreen}
            />
        </ScanFlowStack.Navigator>
    );
};

export default RemoteAuthenticationStack;