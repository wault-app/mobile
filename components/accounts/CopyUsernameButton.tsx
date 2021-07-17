import React from "react";
import Clipboard from "@react-native-community/clipboard";
import { List } from "react-native-paper";

export type CopyUsernameButtonProps = {
    username: string;
    onCopy?: () => void;
};

const CopyUsernameButton = (props: CopyUsernameButtonProps) => {
    return (
        <List.Item
            onPress={() => {
                Clipboard.setString(props.username);
                if(props.onCopy) props.onCopy();
            }}
            left={(props) => <List.Icon {...props} icon={"account"} />}
            title={"Copy username"}
        />
    );
};

export default CopyUsernameButton;