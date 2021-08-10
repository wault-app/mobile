import React from "react";
import { TextInput } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

export type PasswordTextInputProps = Omit<TextInputProps, "theme">;

const PasswordTextInput = (props: PasswordTextInputProps) => {
    return (
        <TextInput
            mode={"flat"}
            label={"Password"}
            keyboardAppearance={"dark"}
            autoCompleteType={"password"}
            secureTextEntry={true}
            {...props}
        />
    );
};

export default PasswordTextInput;