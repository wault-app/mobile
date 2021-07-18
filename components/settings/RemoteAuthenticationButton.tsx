import { useNavigation } from "@react-navigation/core";
import React from "react";
import { List } from "react-native-paper";

export type RemoteAuthenticationButtonProps = {};

const RemoteAuthenticationButton = (props: RemoteAuthenticationButtonProps) => {
    const navigation = useNavigation();

    return (
        <List.Item 
            title={"Remote authentication"}
            left={(props) => <List.Icon {...props} icon={"qrcode"} />}
            description={"Used to be able to log in on a computer"}
            onPress={() => navigation.navigate("remote-authentication")}
        />
    );
};

export default RemoteAuthenticationButton;