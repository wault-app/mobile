import React, { Dispatch, SetStateAction, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Button, Paragraph, TextInput, Title } from "react-native-paper";
import Authentication from "@lib/api/Authentication";
import { UserType } from "@lib/api/User";
import WrapperError from "@wault/error";
import Toast from "react-native-toast-message";
import { openInbox } from "react-native-email-link";

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

        try {
            await Authentication.register(username, email);

            setSent(true);
        } catch(e) {
            if(e instanceof WrapperError) {
                Toast.show({
                    type: "error",
                    text1: "Something went wrong!",
                    text2: e.message,
                })
            }

            setDisabled(false);
            console.log(e);
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
                <Button 
                    style={[styles.row]}
                    mode={"outlined"}
                    onPress={() => openInbox()}
                >
                    Open Email app
                </Button>
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