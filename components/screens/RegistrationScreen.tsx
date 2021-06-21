import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Paragraph, TextInput, Title } from "react-native-paper";
import Authentication from "@lib/api/Authentication";
import User, { UserType } from "@lib/api/User";

export type RegistrationScreenProps = {
    setUser: Dispatch<SetStateAction<UserType>>;
};

const RegistrationScreen = (props: RegistrationScreenProps) => {
    const [username, setUsername] = useState("");
    const [disabled, setDisabled] = useState(false);

    const register = async () => {
        setDisabled(true);

        const [resp, error] = await Authentication.register(username);
        const user = await User.load();

        if(error) {
            setDisabled(false);
            console.log(error);
        } else {
            props.setUser(user);
            console.log(resp);
        }
    };

    return (
        <View style={styles.root}>
            <Title>
                Register a new user!
            </Title>
            <Paragraph>
                With your account you can use the Wault services!
            </Paragraph>
            <TextInput 
                onChangeText={setUsername}
                label={"Username"}
            />
            <Button
                disabled={username.length < 4 || disabled}
                onPress={register}
                loading={disabled}
            >
                Register
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1, 
    },
});

export default RegistrationScreen;