import React from "react";
import { createStackNavigator, Header } from "@react-navigation/stack";
import LandingScreen from "@components/screens/LandingScreen";
import RemoteAuthenticationStack from "./RemoteAuthenticationStack";
import OptionsScreen from "@components/screens/OptionsScreen";
import { Appbar, Avatar, Title } from "react-native-paper";
import { useUser } from "@components/providers/AuthenticationProvider";

const MainStack = createStackNavigator();

const MainNavigator = () => {
    const { user } = useUser();

    return (
        <MainStack.Navigator
            screenOptions={{
                header: (props) => (
                    <Appbar.Header>
                        {props.navigation.canGoBack() && (
                            <Appbar.BackAction onPress={() => props.navigation.goBack()} />
                        )}
                    </Appbar.Header>
                ),
            }}
        >
            <MainStack.Screen
                name={"landing"}
                component={LandingScreen}
                options={{
                    header: (props) => (
                        <Appbar.Header>
                            <Appbar.Content title={user.username} />
                            <Appbar.Action icon="cog" onPress={() => props.navigation.navigate("options")} />
                        </Appbar.Header>
                    )
                }}
            />
            <MainStack.Screen
                name={"options"}
                component={OptionsScreen}
            />
            <MainStack.Screen
                name={"remote-authentication"}
                component={RemoteAuthenticationStack}
            />
        </MainStack.Navigator>
    );
};

export default MainNavigator;