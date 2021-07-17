import React from 'react';
import AuthenticationProvider from '@components/providers/AuthenticationProvider';
import { enableScreens } from 'react-native-screens';
import DataProvider from '@components/providers/DataProvider';
import MainNavigator from '@components/navigators/MainNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ThemeProvider from '@components/providers/ThemeProvider';

enableScreens(true);


export default function App() {
    return (
        <ThemeProvider>
            <BottomSheetModalProvider>
                <AuthenticationProvider>
                    <DataProvider>
                        <MainNavigator />
                    </DataProvider>
                </AuthenticationProvider>
            </BottomSheetModalProvider>
        </ThemeProvider>
    );
}
