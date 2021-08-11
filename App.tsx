import React from 'react';
import AuthenticationProvider from '@components/providers/AuthenticationProvider';
import { enableScreens } from 'react-native-screens';
import DataProvider from '@components/providers/DataProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ThemeProvider from '@components/providers/ThemeProvider';
import Toast from 'react-native-toast-message';
import { Portal } from 'react-native-paper';
import BiometricProvider from '@components/providers/BiometricProvider';
import RootNavigator from '@components/navigators/RootNavigator';
import ServerSelectorProvider from '@components/providers/ServerSelectorProvider';

enableScreens();

export default function App() {
    return (
        <ThemeProvider>
            <Portal>
                <Toast
                    position={"bottom"}
                    ref={(ref) => Toast.setRef(ref)}
                />
            </Portal>
            <ServerSelectorProvider>
                <BottomSheetModalProvider>
                    <AuthenticationProvider>
                        <BiometricProvider>
                            <DataProvider>
                                <RootNavigator />
                            </DataProvider>
                        </BiometricProvider>
                    </AuthenticationProvider>
                </BottomSheetModalProvider>
            </ServerSelectorProvider>
        </ThemeProvider>
    );
}
