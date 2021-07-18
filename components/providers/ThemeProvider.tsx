import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";
import { Appearance, StatusBar, View } from "react-native";
import merge from "deepmerge";
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from "react-native-paper";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeProviderProps = PropsWithChildren<{}>;

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

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
        // create a string of a number with leading zeros
        const pad = (num: string, size: number) => String(num).padStart(size, '0');

        // extract rgb values
        let s = theme.colors.background;
        s = s.substring(s.indexOf("(") + 1);
        s = s.substring(0, s.indexOf(")"));

        // generate hex
        const hex = `#${s.split(", ").map((el) => pad(parseInt(el).toString(16), 2)).join("")}`;

        // apply it to the navigation bar
        changeNavigationBarColor(hex, theme.dark, true);
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