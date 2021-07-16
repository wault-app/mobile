import React from "react";
import { AccountType } from "@lib/api/Item";
import { List } from "react-native-paper";
import PlatformIcon from "@components/platforms/PlatformIcon";

export type AccountItemProps = {
    account: AccountType;
};

export default class AccountItem extends React.PureComponent<AccountItemProps> {
    render() {
        return (
            <List.Item
                title={this.props.account.platform}
                description={this.props.account.username}
                onPress={() => {}}
                left={() => <PlatformIcon platform={this.props.account.platform} />}
            />
        );
    }
};
