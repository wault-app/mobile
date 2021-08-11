import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";
import { Appearance, StatusBar, View } from "react-native";
import merge from "deepmerge";
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from "react-native-paper";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "@lib/Colors";

export type ThemeProviderProps = PropsWithChildren<{}>;

const CombinedDefaultTheme = merge(
    PaperDefaultTheme,
    NavigationDefaultTheme,
);
const CombinedDarkTheme = merge(
    PaperDarkTheme,
    NavigationDarkTheme
);

type StateType = "light" | "dark" | "system-preference";

const ThemeContext = createContext<{ theme: StateType; setTheme: Dispatch<SetStateAction<StateType>> }>(null);

export const useTheme = () => {
    return useContext(ThemeContext);
};

const ThemeProvider = (props: ThemeProviderProps) => {
    const [state, setState] = useState<StateType>("system-preference");
    const colorSchema = Appearance.getColorScheme();

    const theme = state === "dark" ? CombinedDarkTheme : state === "light" ? CombinedDefaultTheme : colorSchema === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

    useEffect(() => {
        (async () => {
            const value = await AsyncStorage.getItem("theme");
            const theme = value === "light" ? "light" : value === "dark" ? "dark" : "system-preference";
            setState(theme);
        })();
    }, []);

    useEffect(() => {
        // apply it to the navigation bar
        changeNavigationBarColor(Colors.rgbToHex(theme.colors.background), theme.dark, true);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme: state, setTheme: setState }}>
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <StatusBar
                    translucent
                    barStyle={theme.dark ? "light-content" : "dark-content"}
                    backgroundColor="transparent"
                />
                <PaperProvider theme={theme}>
                    <NavigationContainer theme={theme}>
                        {props.children}
                    </NavigationContainer>
                </PaperProvider>
            </View>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;