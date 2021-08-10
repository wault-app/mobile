import React from "react";
import { TextInput } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

export type UsernameTextInputProps = Omit<TextInputProps, "theme">;

const UsernameTextInput = (props: UsernameTextInputProps) => {
    return (
        <TextInput
            label={"Username"}
            mode={"flat"}
            autoCompleteType={"username"}
            autoCapitalize={"none"}
            {...props}
        />
    );
};

export default UsernameTextInput;