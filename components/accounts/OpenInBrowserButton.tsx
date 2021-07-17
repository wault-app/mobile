import Clipboard from "@react-native-community/clipboard";
import React from "react";
import { Linking } from "react-native";
import { List } from "react-native-paper";

export type OpenInBrowserButtonProps = {
    url: string;
};

const OpenInBrowserButton = (props: OpenInBrowserButtonProps) => {
    return (
        <List.Item
            title={"Open in browser"}
            onPress={() => Linking.openURL(props.url)}
            left={(props) => <List.Icon {...props} icon={"web"} />}
        />
    );
};

export default OpenInBrowserButton;