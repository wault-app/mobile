import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as StoreProvider } from 'react-redux';
import store from '@lib/redux/store';
import { Provider as PaperProvider } from 'react-native-paper';
import AuthenticationProvider from '@components/providers/AuthenticationProvider';
import LandingScreen from '@components/screens/LandingScreen';

export default function App() {
  return (
    <NavigationContainer>
      <StoreProvider store={store}>
        <PaperProvider>
          <AuthenticationProvider>
            <LandingScreen />
          </AuthenticationProvider>
        </PaperProvider>
      </StoreProvider>
    </NavigationContainer>
  );
}
