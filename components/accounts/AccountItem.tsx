import React, { Fragment } from "react";
import { AccountType } from "@lib/api/Item";
import { List } from "react-native-paper";
import PlatformIcon from "@components/platforms/PlatformIcon";
import { useNavigation } from "@react-navigation/native";

export type AccountItemProps = {
    account: AccountType;
    onOpenSheet: () => void;
};

const AccountItem = (props: AccountItemProps) => {
    const navigation = useNavigation();

        return (
            <List.Item
                title={props.account.platform}
                description={props.account.username}
                onPress={() => navigation.navigate("account-info", { account: props.account })}
                onLongPress={() => props.onOpenSheet()}
                left={() => <PlatformIcon platform={props.account.platform} />}
            />
        );
};

export default AccountItem;