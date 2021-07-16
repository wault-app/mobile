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

enableScreens(true);

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export default function App() {
  let theme = true ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <StatusBar
            translucent
            backgroundColor="transparent"
          />
          <AuthenticationProvider>
            <DataProvider>
              <MainNavigator />
            </DataProvider>
          </AuthenticationProvider>
        </NavigationContainer>
      </PaperProvider>
    </View>
  );
}
