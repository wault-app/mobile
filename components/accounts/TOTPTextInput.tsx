import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Paragraph, Portal, ProgressBar, Title, useTheme } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import color from "color";
import TOTP from "@lib/TOTP";
import { BarCodeScanner } from "expo-barcode-scanner";
import { URL } from "react-native-url-polyfill";

export type TOTPTextInputProps = Omit<TextInputProps, "theme">;

const TOTPTextInput = (props: TOTPTextInputProps) => {
    const theme = useTheme();
    const [date, setDate] = useState(new Date());

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const code = useMemo(
        () => TOTP.get(props.value),
        [props.value, date.getMinutes(), Math.floor(date.getSeconds() / 30)]
    );

    const openQRScanner = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        if (status === "granted") setOpen(true);
    };

    if (open) {
        return (
            <Portal>
                <BarCodeScanner
                    onBarCodeScanned={({ data }) => {
                        if (props.onChangeText) props.onChangeText(new URL(data).searchParams.get("secret"));
                        setOpen(false);
                    }}
                    barCodeTypes={["qr"]}
                    style={StyleSheet.absoluteFillObject}
                />
            </Portal>
        );
    }

    return (
        <View
            style={{
                backgroundColor: theme.dark
                    ? color(theme.colors.background).lighten(0.24).rgb().string()
                    : color(theme.colors.background).darken(0.06).rgb().string(),
                borderTopLeftRadius: theme.roundness,
                borderTopRightRadius: theme.roundness,
                borderBottomColor: theme.colors.disabled,
                borderBottomWidth: props.value ? 0 : 1,
            }}
        >
            <Paragraph style={[styles.label, {
                color: theme.colors.placeholder,
                marginBottom: 8,
            }]}>Two factor authentication</Paragraph>

            {!!props.value && (
                <Title style={{ marginHorizontal: 16, }}>
                    {code}
                </Title>
            )}

            <View style={{ flexDirection: "row", marginHorizontal: 16, marginVertical: 8 }}>
                <Button
                    icon="qrcode-scan"
                    style={styles.half}
                    onPress={openQRScanner}
                >
                    Scan QR code
                </Button>
            </View>

            {!!props.value && (
                <TwoFactorProgressBar
                    date={date}
                />
            )}
        </View>
    );
};

export const TwoFactorProgressBar = ({ date }: { date: Date }) => (
    <ProgressBar
        progress={(30 - Math.abs(date.getSeconds() > 30 ? date.getSeconds() - 30 : date.getSeconds())) / 30}
    />
);

const styles = StyleSheet.create({
    label: {
        marginLeft: 16,
        paddingTop: 12,
    },
    half: {
        flex: 1,
    }
});

export default TOTPTextInput;