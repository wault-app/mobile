import React from 'react';
import AuthenticationProvider from '@components/providers/AuthenticationProvider';
import { enableScreens } from 'react-native-screens';
import DataProvider from '@components/providers/DataProvider';
import MainNavigator from '@components/navigators/MainNavigator';
import { StatusBar, View } from 'react-native';
import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider,
} from 'react-native-paper';
import merge from 'deepmerge';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useEffect } from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

enableScreens(true);

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export default function App() {
    let theme = false ? CombinedDarkTheme : CombinedDefaultTheme;

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
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <PaperProvider theme={theme}>
                <NavigationContainer theme={theme}>
                    <StatusBar
                        translucent
                        backgroundColor="transparent"
                    />
                    <BottomSheetModalProvider>
                        <AuthenticationProvider>
                            <DataProvider>
                                <MainNavigator />
                            </DataProvider>
                        </AuthenticationProvider>
                    </BottomSheetModalProvider>
                </NavigationContainer>
            </PaperProvider>
        </View>
    );
}
