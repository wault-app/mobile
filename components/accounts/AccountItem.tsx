import React, { Fragment } from "react";
import { AccountType } from "@lib/api/Item";
import { List, Portal } from "react-native-paper";
import PlatformIcon from "@components/platforms/PlatformIcon";
import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
import BottomSheet, { useBottomSheet } from "@components/modal/BottomSheet";
import { ScrollView } from "react-native-gesture-handler";
import OpenInBrowserButton from "./OpenInBrowserButton";
import CopyUsernameButton from "./CopyUsernameButton";
import CopyPasswordButton from "./CopyPasswordButton";
import ShowTOTPButton from "./ShowTOTPButton";

export type AccountItemProps = {
    account: AccountType;
};

const AccountItem = (props: AccountItemProps) => {
    const navigation = useNavigation();
    const snapPoints = useMemo(() => [200, "80%"], []);
    const sheet = useBottomSheet();

    return (
        <Fragment>
            <List.Item
                title={props.account.platform}
                description={props.account.username}
                onPress={() => navigation.navigate("account-info", { account: props.account })}
                onLongPress={() => sheet.current.present()}
                left={() => <PlatformIcon platform={props.account.platform} />}
            />
                
            <BottomSheet
                snapPoints={snapPoints}
                ref={sheet}
            >
                <ScrollView>
                    {!!(props.account?.url || props.account?.platform) && (
                        <OpenInBrowserButton
                            url={`https://${props.account.platform}` || props.account.url}
                        />
                    )}
                    {!!props.account?.username && (
                        <CopyUsernameButton
                            username={props.account.username}
                            onCopy={() => {
                                sheet.current.close();
                            }}
                        />
                    )}
                    {!!props.account?.password && (
                        <CopyPasswordButton
                            password={props.account.password}
                            onCopy={() => {
                                sheet.current.close();
                            }}
                        />
                    )}
                    {!!props.account?.totp && (
                        <ShowTOTPButton
                            secret={props.account.totp}
                        />
                    )}
                </ScrollView>
            </BottomSheet>
        </Fragment>
    );
};

export default AccountItem;