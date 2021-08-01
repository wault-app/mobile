import React, { useRef } from 'react';
import AuthenticationProvider from '@components/providers/AuthenticationProvider';
import { enableScreens } from 'react-native-screens';
import DataProvider from '@components/providers/DataProvider';
import MainNavigator from '@components/navigators/MainNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ThemeProvider from '@components/providers/ThemeProvider';
import Toast from 'react-native-toast-message';
import { Portal } from 'react-native-paper';
import BiometricProvider from '@components/providers/BiometricProvider';

enableScreens(true);

export default function App() {
    return (
        <ThemeProvider>
            <Portal>
                <Toast
                    position={"bottom"}
                    ref={(ref) => Toast.setRef(ref)}
                />
            </Portal>
            <BottomSheetModalProvider>
                <AuthenticationProvider>
                    <BiometricProvider>
                        <DataProvider>
                            <MainNavigator />
                        </DataProvider>
                    </BiometricProvider>
                </AuthenticationProvider>
            </BottomSheetModalProvider>
        </ThemeProvider>
    );
}
