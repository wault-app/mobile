import { useKeycards } from "@components/providers/DataProvider";
import Safe from "@lib/api/Safe";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

export type CreateSafeScreenProps = {};

const CreateSafeScreen = (props: CreateSafeScreenProps) => {
    const [name, setName] = useState("");
    const [disabled, setDisabled] = useState(false);
    const navigation = useNavigation();
    const { addKeycard } = useKeycards();

    const onCreate = async () => {
        setDisabled(true);

        try {
            const { message, keycard } = await Safe.create(name);

            addKeycard(keycard);

            // @ts-ignore
            navigation.pop(2);

            Toast.show({
                type: "success",
                text1: message,
            });
        } catch (e) {
            Toast.show({
                type: "error",
                text1: "Something went wrong!",
                text2: e.message,
            });
        }

        setDisabled(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.root}>
            <View style={styles.row}>
                <TextInput
                    mode={"flat"}
                    label={"Name"}
                    value={name}
                    onChangeText={setName}
                    disabled={disabled}
                />
            </View>
            <View style={styles.row}>
                <Button
                    onPress={onCreate}
                    mode={"contained"}
                    loading={disabled}
                    disabled={disabled || !name}
                >
                    Create
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        padding: 12,
    },
    row: {
        marginBottom: 12,
    },
})

export default CreateSafeScreen;