import React, { Dispatch, SetStateAction, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Button, Paragraph, TextInput, Title } from "react-native-paper";
import Authentication from "@lib/api/Authentication";
import User, { UserType } from "@lib/api/User";

export type RegistrationScreenProps = {
    setUser: Dispatch<SetStateAction<UserType>>;
};

const RegistrationScreen = (props: RegistrationScreenProps) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [sent, setSent] = useState(false);

    const register = async () => {
        setDisabled(true);

        const [resp, error] = await Authentication.register(username, email);

        if (error) {
            setDisabled(false);
            console.log(error);
        } else {
            setSent(true);
        }
    };

    if (sent) {
        return (

            <View style={styles.root}>
                <Title style={[styles.row]}>
                    Email successfully sent!
                </Title>
                <Paragraph style={[styles.row]}>
                    Check your inbox for an email from Wault to verify your email address!
                </Paragraph>
            </View>
        );
    }

    return (
        <View style={styles.root}>
            <Title style={[styles.row]}>
                Register a new user!
            </Title>
            <Paragraph style={[styles.row]}>
                With your account you can use the Wault services!
            </Paragraph>
            <TextInput
                style={[styles.row]}
                onChangeText={setUsername}
                autoCompleteType={"username"}
                autoFocus
                label={"Username"}
                left={<TextInput.Affix text="@" />}
                autoCapitalize={"none"}
            />
            <TextInput
                style={[styles.row]}
                autoCompleteType={"email"}
                onChangeText={setEmail}
                keyboardType={"email-address"}
                autoCapitalize={"none"}
                label={"Email address"}
            />
            <Button
                disabled={username.length < 4 || !isEmail(email) || disabled}
                onPress={register}
                loading={disabled}
                style={[styles.row, styles.button]}
                mode={"outlined"}
            >
                Register
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
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

export default RegistrationScreen;