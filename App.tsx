import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as StoreProvider } from 'react-redux';
import store from '@lib/redux/store';
import { Provider as PaperProvider } from 'react-native-paper';
import AuthenticationProvider from '@components/providers/AuthenticationProvider';
import { enableScreens } from 'react-native-screens';
import RemoteAuthenticationStack from "@components/navigators/RemoteAuthenticationStack";

enableScreens();

export default function App() {
  return (
    <NavigationContainer>
      <StoreProvider store={store}>
        <PaperProvider>
          <AuthenticationProvider>
            <RemoteAuthenticationStack />
          </AuthenticationProvider>
        </PaperProvider>
      </StoreProvider>
    </NavigationContainer>
  );
}
