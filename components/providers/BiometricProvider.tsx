import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import * as LocalAuthentication from 'expo-local-authentication';
import { ActivityIndicator, Button, Subheading, Text } from "react-native-paper";
import { StatusBar, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect } from "react";

export type BiometricProviderProps = PropsWithChildren<{}>;

export const useBiometric = () => {
    const { isEnabled, setEnabled, setPassed } = useContext(BiometricContext);

    const toggle = async (isEnabled: boolean) => {
        if(!LocalAuthentication.hasHardwareAsync()) return;

        const response = await LocalAuthentication.authenticateAsync();
        if(response.success) {
            setPassed(true);
            setEnabled(isEnabled);

            await AsyncStorage.setItem("biometric-authentication", `${isEnabled}`);
        }
    };

    return {
        isEnabled,
        toggle,
    };
};

const BiometricContext = createContext<{ isEnabled: boolean; setEnabled: Dispatch<SetStateAction<boolean>>; setPassed: Dispatch<SetStateAction<boolean | "failed">> }>(null);

const BiometricProvider = (props: BiometricProviderProps) => {
    const [isEnabled, setEnabled] = useState<boolean>(null);
    const [hasPassed, setPassed] = useState<boolean | "failed">(false);

    const onLoad = async () => {
        const isEnabled = (await AsyncStorage.getItem("biometric-authentication")) == "true";
        setEnabled(isEnabled);
    };

    const startAuthentication = async () => {
        setPassed(false);
        const resp = await LocalAuthentication.authenticateAsync();

        if(resp.success) {
            setPassed(true);
        } else {
            setPassed("failed");
        }
    };

    useEffect(() => {
        if(isEnabled && hasPassed !== true) startAuthentication();
    }, [isEnabled]);

    if(isEnabled === null) {
        return (
            <AppLoading
                startAsync={onLoad}
                onFinish={() => {}}
                onError={console.warn}
            />
        );
    }

    if(isEnabled && hasPassed !== true) {
        return (
            <AuthenticationScreen state={hasPassed === "failed" ? "FAILED" : "LOCKED"} retry={startAuthentication} />
        );
    }
    
    return (
        <BiometricContext.Provider value={{ isEnabled, setEnabled, setPassed }}>
            {props.children}
        </BiometricContext.Provider>
    );
};

const AuthenticationScreen = (props: { state: "LOCKED" | "FAILED"; retry: () => void }) => {
    return (
        <ScrollView>
            <View
                style={styles.icon}
            >
                <Icon
                    name={props.state === "LOCKED" ? "account-lock" : "account-remove"}
                    size={64}
                    color="#000"
                />
            </View>
            <Text style={styles.text}>
                {props.state === "LOCKED" ? "Please authenticate yourself with the prompt on your device." : "Failed to authenticate yourself."}
            </Text>
            {props.state === "FAILED" && (
                <Button
                    onPress={props.retry}
                    mode={"outlined"}
                    style={{
                        width: 200,
                        alignSelf: "center",
                    }}
                >
                    Retry
                </Button>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    icon: {
        marginTop: StatusBar.currentHeight + 64,
        height: 128,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
        marginVertical: 32,
        marginHorizontal: 64,
    },
});

export default BiometricProvider;