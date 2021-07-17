import React from 'react';
import AuthenticationProvider from '@components/providers/AuthenticationProvider';
import { enableScreens } from 'react-native-screens';
import DataProvider from '@components/providers/DataProvider';
import MainNavigator from '@components/navigators/MainNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ThemeProvider from '@components/providers/ThemeProvider';
import Toast from 'react-native-toast-message';
import { Portal } from 'react-native-paper';

enableScreens(true);

export default function App() {
    return (
        <ThemeProvider>
            <BottomSheetModalProvider>
                <AuthenticationProvider>
                    <DataProvider>
                        <Portal>
                            <Toast
                                position={"bottom"}
                                ref={(ref) => Toast.setRef(ref)}
                            />
                        </Portal>
                        <MainNavigator />
                    </DataProvider>
                </AuthenticationProvider>
            </BottomSheetModalProvider>
        </ThemeProvider>
    );
}
