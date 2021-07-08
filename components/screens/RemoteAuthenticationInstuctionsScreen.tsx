import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, List, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import Safe from "@lib/api/Safe";

export type RemoteAuthenticationInstuctionsScreenProps = {};

const RemoteAuthenticationInstuctionsScreen = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    
    useEffect(() => {
        (async () => {
            console.log((await Safe.getAll(true))[0][0].safe.name)
        })();
    }, []);

    return (
        <ScrollView>
            <Icon
                style={styles.icon}
                name={"qrcode-scan"}
                color={theme.colors.onSurface}
                size={96}
            />
            <List.Item
                title={"Open the web application on your desktop"}
            />
            <List.Item
                title={"Scan the QR code on your mobile phone"}
            />
            <List.Item
                title={"Verify that you can see yourself"}
            />
            <Button
                onPress={() => navigation.navigate("RemoteAuthenticationScan")}
            >
                Scan QR code
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    icon: {
        alignSelf: "center",
        marginVertical: 42,
    },
    order: {
        fontWeight: "bold",
    },
});

export default RemoteAuthenticationInstuctionsScreen;