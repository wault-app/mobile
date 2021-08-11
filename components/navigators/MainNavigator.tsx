import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@components/screens/HomeScreen";
import RemoteAuthenticationStack from "./RemoteAuthenticationStack";
import OptionsScreen from "@components/screens/OptionsScreen";
import { Appbar } from "react-native-paper";
import AccountScreen from "@components/screens/AccountScreen";
import CreditCardScreen from "@components/screens/CreditCardScreen";
import SelectItemTypeScreen from "@components/screens/SelectItemTypeScreen";
import CreateAccountScreen from "@components/screens/CreateAccountScreen";
import SearchPlatformScreen from "@components/screens/SelectPlatformScreen";
import CreateSafeScreen from "@components/screens/CreateSafeScreen";
import { DrawerActions } from "@react-navigation/native";
import SearchScreen from "@components/screens/SearchScreen";

const MainStack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                header: (props) => (
                    <Appbar.Header theme={{ colors: { primary: "#ffffff" } }}>
                        {props.back ? (
                            <Appbar.BackAction onPress={() => props.navigation.goBack()} />
                        ) : (
                            <Appbar.Action
                                icon={"menu"}
                                onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
                            />
                        )}
                        <Appbar.Content
                            title={"Wault"}
                        />
                        <Appbar.Action
                            icon={"magnify"}
                            onPress={() => props.navigation.navigate("search")}
                        />
                    </Appbar.Header>
                ),
            }}
        >
            <MainStack.Screen
                name={"home"}
                component={HomeScreen}
            />
            <MainStack.Screen
                component={SelectItemTypeScreen}
                name={"add-item"}
            />
            <MainStack.Screen
                component={SearchScreen}
                name={"search"}
                options={{
                    headerShown: false,
                }}
            />
            <MainStack.Screen
                component={CreateAccountScreen}
                name={"add-account"}
            />
            <MainStack.Screen
                component={CreateSafeScreen}
                name={"create-safe"}
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