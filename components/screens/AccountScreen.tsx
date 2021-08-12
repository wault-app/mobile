import PlatformIcon from "@components/platforms/PlatformIcon";
import { Route } from "@react-navigation/routers";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Platforms from "@wault/platforms";
import { Subheading, Title, useTheme } from "react-native-paper";
import CopyUsernameButton from "@components/accounts/CopyUsernameButton";
import CopyPasswordButton from "@components/accounts/CopyPasswordButton";
import OpenInBrowserButton from "@components/accounts/OpenInBrowserButton";
import ShowDescriptionButton from "@components/accounts/ShowDescriptionButton";
import ShowTOTPButton from "@components/accounts/ShowTOTPButton";
import { AccountType } from "@wault/typings";

export type AccountScreenProps = {
    route: Route<"account-info", {
        account: AccountType;
    }>
};

const AccountScreen = (props: AccountScreenProps) => {
    const theme = useTheme();
    const { account } = props.route.params;
    const platform = Platforms.get(account.platform);

    return (
        <ScrollView>
            <LinearGradient
                style={styles.gradient}
                colors={[
                    platform.color || theme.colors.primary,
                    "rgba(0,0,0,0)",
                ]}
            />
            <View style={styles.icon}>
                <PlatformIcon
                    platform={account.platform}
                    size={96}
                />
            </View>
            <Title style={styles.centerText}>
                {account.platform}
            </Title>
            <Subheading style={styles.centerText}>
                {account.username}
            </Subheading>
            <View style={styles.buttons}>
                <OpenInBrowserButton
                    url={`https://${account.platform}`}
                />
                {!!account.username && (
                    <CopyUsernameButton
                        username={account.username}
                    />
                )}
                {!!account.password && (
                    <CopyPasswordButton
                        password={account.password}
                    />
                )}
                {!!account.totp && (
                    <ShowTOTPButton
                        secret={account.totp}
                    />
                )}
                {!!account.description && (
                    <ShowDescriptionButton
                        description={account.description}
                    />
                )}

            </View>
        </ScrollView>
    );
};

const GRADIENT_HEIGHT = 100;

const styles = StyleSheet.create({
    gradient: {
        width: "100%",
        height: GRADIENT_HEIGHT,
    },
    icon: {
        alignSelf: "center",
        marginTop: -(GRADIENT_HEIGHT / 2),
    },
    centerText: {
        textAlign: "center",
    },
    buttons: {
        marginTop: 16,
    },
});

export default AccountScreen;