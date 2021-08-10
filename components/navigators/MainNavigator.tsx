import React from "react";
import { createStackNavigator, Header } from "@react-navigation/stack";
import LandingScreen from "@components/screens/LandingScreen";
import RemoteAuthenticationStack from "./RemoteAuthenticationStack";
import OptionsScreen from "@components/screens/OptionsScreen";
import { Appbar, Avatar, Title } from "react-native-paper";
import { useUser } from "@components/providers/AuthenticationProvider";
import AccountScreen from "@components/screens/AccountScreen";
import CreditCardScreen from "@components/screens/CreditCardScreen";
import SelectItemTypeScreen from "@components/screens/SelectItemTypeScreen";
import CreateAccountScreen from "@components/screens/add-item/CreateAccountScreen";
import SearchPlatformScreen from "@components/screens/add-item/SelectPlatformScreen";

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
                component={SelectItemTypeScreen}
                name={"add-item"}
            />
            <MainStack.Screen
                component={CreateAccountScreen}
                name={"add-account"}
            />
            <MainStack.Screen
                component={SearchPlatformScreen}
                options={{
                    headerShown: false,
                }}
                name={"search-platform"}
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