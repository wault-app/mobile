import React from "react";
import { TextInput } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

export type DescriptionTextInputProps = Omit<TextInputProps, "theme">;

const DescriptionTextInput = (props: DescriptionTextInputProps) => {
    return (
        <TextInput
            label={"Description"}
            mode={"flat"}
            numberOfLines={4}
            multiline={true}
            {...props}
        />
    );
};

export default DescriptionTextInput;