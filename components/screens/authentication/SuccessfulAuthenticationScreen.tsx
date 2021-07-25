import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, Title } from "react-native-paper";

export type SuccessfulAuthenticationScreenProps = {};

const SuccessfulAuthenticationScreen = (props: SuccessfulAuthenticationScreenProps) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Title style={styles.center}>
                Successful authentication!
            </Title>
            <Text style={styles.center}>
                You can now use your desktop as a fully functional device.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    center: {
        textAlign: "center",
    },
    container: {
        margin: 24,
    },
});

export default SuccessfulAuthenticationScreen;