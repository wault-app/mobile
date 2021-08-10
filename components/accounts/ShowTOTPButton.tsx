import React, { Fragment } from "react";
import Clipboard from "@react-native-community/clipboard";
import { List, Modal, Portal, Title, useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useMemo } from "react";
import TOTP from "@lib/TOTP";
import { useState } from "react";
import { useEffect } from "react";
import { TwoFactorProgressBar } from "./TOTPTextInput";
import { URL } from "react-native-url-polyfill";
import { StyleSheet } from "react-native";

export type ShowTOTPButtonProps = {
    secret: string;
    onOpen?: () => void;
};

const ShowTOTPButton = (props: ShowTOTPButtonProps) => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const theme = useTheme();

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const code = useMemo(
        () => props.secret ? TOTP.get(new URL(props.secret)) : "",
        [props.secret, date.getMinutes(), Math.floor(date.getSeconds() / 30)]
    )

    return (
        <Fragment>
            <List.Item
                onPress={() => {
                    setOpen(true);

                    if(props.onOpen) props.onOpen();
                }}
                left={(props) => <List.Icon {...props} icon={"two-factor-authentication"} />}
                title={"Show 2FA code"}
            />
            <Portal>
                <Modal
                    visible={open}
                    onDismiss={() => setOpen(false)}
                    contentContainerStyle={[styles.modal, {
                        borderTopLeftRadius: theme.roundness,
                        borderTopRightRadius: theme.roundness,
                        backgroundColor: theme.colors.surface,
                    }]}
                >
                    <Title style={styles.title}>
                        {code}
                    </Title>
                    <TwoFactorProgressBar url={new URL(props.secret)} date={date} />
                </Modal>
            </Portal>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    modal: {
        margin: 12,
    },
    title: {
        padding: 12,
    },
});

export default ShowTOTPButton;