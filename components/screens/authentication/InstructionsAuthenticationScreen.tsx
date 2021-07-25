import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, List, Text, Title, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import StartAuthenticationIllustration from "@components/undraw/StartAuthenticationIllustration";

export type InstructionsAuthenticationScreenProps = {};

const InstructionsAuthenticationScreen = (props: InstructionsAuthenticationScreenProps) => {
    const theme = useTheme();
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.root}>
            <StartAuthenticationIllustration
                width={200}
                height={200}
                style={[styles.row, styles.center]}
            />
            <View style={styles.row}>
                <List.Item
                    left={(props) => <Title {...props} style={styles.number}>1.</Title>}
                    title={"Open wault.app on your desktop"}
                    description={"This is our only website!"}
                />
                <List.Item
                    left={(props) => <Title {...props} style={styles.number}>2.</Title>}
                    title={"Scan the QR code on your phone"}
                    description={"You can open the scanner by clicking the button"}
                />
                <List.Item
                    left={(props) => <Title {...props} style={styles.number}>3.</Title>}
                    title={"Verify that you can see your name"}
                    description={"If your name matches, then click continue"}
                />
            </View>
            <Button
                mode={"outlined"}
                style={[styles.button, styles.row]}
                icon={"qrcode-scan"}
                onPress={() => navigation.navigate("RemoteAuthenticationScan")}
            >
                Scan QR code
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        marginVertical: 8,
    },
    number: {
        alignSelf: "center",
        marginHorizontal: 12,
    },
    button: {
        width: 200,
        alignSelf: "center",
    },
    icon: {
        alignSelf: "center",
        marginVertical: 42,
    },
    order: {
        fontWeight: "bold",
    },
    center: {
        alignSelf: "center",
    },
    row: {
        marginVertical: 4,
    },
});

export default InstructionsAuthenticationScreen;