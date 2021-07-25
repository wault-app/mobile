import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import { useState } from "react";
import { Button, Text } from "react-native-paper";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export type ScanAuthenticationScreenProps = {};

const ScanAuthenticationScreen = (props: ScanAuthenticationScreenProps) => {
    const [hasPermission, setHasPermission] = useState<boolean>(null);
    const navigation = useNavigation();

    const requestPermission = async () => {
        setHasPermission(null);
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
    };

    const onScan = ({ data: code }: BarCodeScannerResult) => {
        navigation.navigate("RemoteAuthenticationConfirmation", { code });
    };

    useEffect(() => {
        requestPermission();
    }, []);

    if(hasPermission === null) {
        return (
            <Text>
                Awaiting permission...
            </Text>
        );
    }

    if(!hasPermission) {
        return (
            <ScrollView>
                <Text>
                    We can't authenticate you on your PC without the access to your camera.
                </Text>
                <Button onPress={requestPermission}>
                    Retry
                </Button>
            </ScrollView>
        );
    }


    return (
        <BarCodeScanner
            onBarCodeScanned={onScan}
            style={StyleSheet.absoluteFillObject}
        />
    );
};

export default ScanAuthenticationScreen;