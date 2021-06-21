import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as StoreProvider } from 'react-redux';
import store from '@lib/redux/store';
import { Provider as PaperProvider, Title } from 'react-native-paper';
import AuthenticationProvider from '@components/providers/AuthenticationProvider';

export default function App() {
  return (
    <NavigationContainer>
      <StoreProvider store={store}>
        <PaperProvider>
          <AuthenticationProvider>
            <Title>
              Szia Lajos
            </Title>
          </AuthenticationProvider>
        </PaperProvider>
      </StoreProvider>
    </NavigationContainer>
  );
}
