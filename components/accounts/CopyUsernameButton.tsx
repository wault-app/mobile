import React from "react";
import Clipboard from "@react-native-community/clipboard";
import { List } from "react-native-paper";
import Toast from "react-native-toast-message";

export type CopyUsernameButtonProps = {
    username: string;
    onCopy?: () => void;
};

const CopyUsernameButton = (props: CopyUsernameButtonProps) => {
    return (
        <List.Item
            onPress={() => {
                Clipboard.setString(props.username);
                
                Toast.show({
                    type: "success",
                    text1: "Successfully copied username to clipboard!",
                });

                if(props.onCopy) props.onCopy();
            }}
            left={(props) => <List.Icon {...props} icon={"account"} />}
            title={"Copy username"}
        />
    );
};

export default CopyUsernameButton;