import React from "react";
import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { Avatar, Caption, Drawer, Title } from "react-native-paper";
import { useUser } from "@components/providers/AuthenticationProvider";
import { View } from "react-native";
import { StyleSheet } from "react-native";

export type DrawerContentProps = DrawerContentComponentProps;

const DrawerContent = (props: DrawerContentProps) => {
    const { user } = useUser();

    const navigate = (screen: string) => {
        props.navigation.navigate('main', { screen });
    };

    const UserAvatarIcon = () => (
        user.icon ? (
            user.icon.type === "EMOJI" && (
                <Avatar.Text
                    label={user.icon.value}
                    size={42}
                />
            )
        ) : (
            <Avatar.Text
                label={"😀"}
                size={42}
            />

        )
    );

    return (
        <DrawerContentScrollView {...props}>
            <View style={[styles.row]}>
                <View>
                    <UserAvatarIcon />
                </View>
                <View style={styles.user}>
                    <Title style={styles.title}>@{user.username}</Title>
                    <Caption style={styles.caption}>{user.email}</Caption>
                </View>
            </View>
            <Drawer.Item
                icon={"home"}
                label={"Home"}
                onPress={() => navigate("home")}
            />
            <Drawer.Item
                icon={"safe-square-outline"}
                label={"Safes"}
            />
            <Drawer.Item
                icon={"cog"}
                label={"Settings"}
                onPress={() => navigate("options")}
            />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    row: {
        paddingLeft: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
    },
    user: {
        paddingLeft: 16,
    },
    title: {
        fontWeight: 'bold',
        lineHeight: 20,
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
});

export default DrawerContent;