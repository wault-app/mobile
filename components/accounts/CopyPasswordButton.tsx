import Clipboard from "@react-native-community/clipboard";
import React from "react";
import { List } from "react-native-paper";
import Toast from "react-native-toast-message";

export type CopyPasswordButtonProps = {
    password: string;
    onCopy?: () => void;
};

const CopyPasswordButton = (props: CopyPasswordButtonProps) => {
    return (
        <List.Item
            title={"Copy password"}
            onPress={() => {
                Clipboard.setString(props.password)
                
                Toast.show({
                    type: "success",
                    text1: "Successfully copied password to clipboard!",
                });

                if(props.onCopy) props.onCopy();
            }}
            left={(props) => <List.Icon {...props} icon={"key"} />}
        />
    );
};

export default CopyPasswordButton;