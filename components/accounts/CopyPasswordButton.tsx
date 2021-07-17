import Clipboard from "@react-native-community/clipboard";
import React from "react";
import { List } from "react-native-paper";

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
                if(props.onCopy) props.onCopy();
            }}
            left={(props) => <List.Icon {...props} icon={"key"} />}
        />
    );
};

export default CopyPasswordButton;