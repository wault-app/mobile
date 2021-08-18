import DescriptionTextInput from "@components/accounts/DescriptionTextInput";
import PasswordTextInput from "@components/accounts/PasswordTextInput";
import PlatformTextInput from "@components/accounts/PlatformTextInput";
import SafeSelector from "@components/accounts/SafeSelector";
import TOTPTextInput from "@components/accounts/TOTPTextInput";
import UsernameTextInput from "@components/accounts/UsernameTextInput";
import { useKeycards } from "@components/providers/DataProvider";
import Item from "@lib/api/Item";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";

const CreateAccountScreen = () => {
    const { keycards, addItem } = useKeycards();

    const [platform, setPlatform] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [totp, setTOTP] = useState("");
    const [description, setDescription] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [keycard, setKeycard] = useState(keycards[0]);

    const navigation = useNavigation();

    const onCreate = async () => {
        setDisabled(true);

        try {
            const { item, message } = await Item.create(keycard, {
                type: "account",
                platform,
                username,
                password,
                totp,
                description,
            });

            addItem(keycard.safe, item);

            Toast.show({
                type: "success",
                text1: message,
            });

            setPlatform("");
            setUsername("");
            setPassword("");
            setDescription("");
            setTOTP("");
            setKeycard(keycards[0]);

            // for some reason .pop function was left out from typescript docs
            // @ts-ignore
            navigation?.pop(2);
        } catch(e) {
            Toast.show({
                type: "error",
                text1: "Something went wrong!",
                text2: e.message,
            });
        }

        setDisabled(false);
    };

    return (
        <ScrollView style={[styles.root]}>
            <View style={styles.row}>
                <PlatformTextInput
                    value={platform}
                    onChangeText={setPlatform}
                />
            </View>
            <View style={styles.row}>
                <UsernameTextInput
                    value={username}
                    onChangeText={setUsername}
                />
            </View>
            <View style={styles.row}>
                <PasswordTextInput
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <View style={styles.row}>
                <TOTPTextInput
                    value={totp}
                    onChangeText={setTOTP}
                />
            </View>
            <View style={styles.row}>
                <DescriptionTextInput
                    value={description}
                    onChangeText={setDescription}
                />
            </View>
            <View style={styles.row}>
                <SafeSelector
                    value={keycard.safe.id}
                    onValueChange={(id: string) => setKeycard(keycards.find((keycard) => keycard.safe.id === id))}
                />
            </View>
            <View style={styles.row}>
                <Button
                    onPress={onCreate}
                    mode={"contained"}
                    loading={disabled}
                    disabled={!platform || disabled}
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
});

export default CreateAccountScreen;