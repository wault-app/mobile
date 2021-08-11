import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainNavigator from "./MainNavigator";
import DrawerContent from "@components/drawer/DrawerContent";

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen
                name={"main"}
                component={MainNavigator}
            />
        </Drawer.Navigator>
    );
};

export default RootNavigator;