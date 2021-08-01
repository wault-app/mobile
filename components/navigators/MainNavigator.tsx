import React from "react";
import { createStackNavigator, Header } from "@react-navigation/stack";
import LandingScreen from "@components/screens/LandingScreen";
import RemoteAuthenticationStack from "./RemoteAuthenticationStack";
import OptionsScreen from "@components/screens/OptionsScreen";
import { Appbar, Avatar, Title } from "react-native-paper";
import { useUser } from "@components/providers/AuthenticationProvider";
import AccountScreen from "@components/screens/AccountScreen";
import CreditCardScreen from "@components/screens/CreditCardScreen";

const MainStack = createStackNavigator();

const MainNavigator = () => {
    const { user } = useUser();

    return (
        <MainStack.Navigator
            screenOptions={{
                header: (props) => (
                    <Appbar.Header theme={{ colors: { primary: "#ffffff" } }}>
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
                        <Appbar.Header theme={{ colors: { primary: "#ffffff" } }}>
                            <Appbar.Content title={user.username} subtitle={user.email} />
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
                name={"account-info"}
                component={AccountScreen}
            />
            <MainStack.Screen
                name={"credit-card"}
                component={CreditCardScreen}
            />
            <MainStack.Screen
                name={"remote-authentication"}
                component={RemoteAuthenticationStack}
            />
        </MainStack.Navigator>
    );
};

export default MainNavigator;