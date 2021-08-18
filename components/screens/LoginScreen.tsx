import React, { Dispatch, SetStateAction, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Button, Paragraph, TextInput, Title } from "react-native-paper";
import Authentication from "@lib/api/Authentication";
import Toast from "react-native-toast-message";
import AdvancedRegistrationSettingsButton from "@components/registration/AdvancedRegistrationSettingsButton";
import { ScrollView } from "react-native-gesture-handler";
import User from "@lib/api/User";
import { useUser } from "@components/providers/AuthenticationProvider";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [disabled, setDisabled] = useState(false);

    const { setUser } = useUser();

    const login = async () => {
        setDisabled(true);

        try {
            await Authentication.login(email, password);

            const user = await User.get();
            setUser(user);
        } catch (e) {
            Toast.show({
                type: "error",
                text1: "Something went wrong!",
                text2: e.message,
            });

            setDisabled(false);
        }
    };

    return (
        <ScrollView>

            <View style={styles.root}>
                <TextInput
                    style={[styles.row]}
                    autoCompleteType={"email"}
                    onChangeText={setEmail}
                    keyboardType={"email-address"}
                    autoCapitalize={"none"}
                    label={"Email address"}
                />
                <TextInput
                    style={[styles.row]}
                    autoCompleteType={"password"}
                    onChangeText={setPassowrd}
                    autoCapitalize={"none"}
                    secureTextEntry={true}
                    label={"Password"}
                />
                <Button
                    disabled={!isEmail(email) || password.length < 6 || disabled}
                    onPress={login}
                    loading={disabled}
                    style={[styles.row]}
                    mode={"contained"}
                >
                    Login
                </Button>
                <AdvancedRegistrationSettingsButton
                    style={[styles.row]}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        margin: 12,
    },
    row: {
        marginVertical: 6,
    },
    button: {
        width: 150,
        alignSelf: "center",
    },
});

const isEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export default LoginScreen;