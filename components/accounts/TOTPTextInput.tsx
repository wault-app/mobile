import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Paragraph, Portal, ProgressBar, Title, useTheme } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import color from "color";
import TOTP from "@wault/totp";
import { BarCodeScanner } from "expo-barcode-scanner";
import { URL } from "react-native-url-polyfill";

export type TOTPTextInputProps = Omit<TextInputProps, "theme">;

const TOTPTextInput = (props: TOTPTextInputProps) => {
    const theme = useTheme();
    const [date, setDate] = useState(new Date());

    const [open, setOpen] = useState(false);

    const backgroundColor = useMemo(() => theme.dark
      ? color(theme.colors.background).lighten(0.24).rgb().string()
      : color(theme.colors.background).darken(0.06).rgb().string(), [theme]);

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const code = useMemo(
        () => {
            if(!props.value) return "";

            const url = new URL(props.value);

            const secret = url.searchParams.get("secret");
            const period = parseInt(url.searchParams.get("period"));
            const digits = parseInt(url.searchParams.get("digits"));
        
            return TOTP.get(secret, period, digits);
        },
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
                        if (props.onChangeText) props.onChangeText(data);
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
                backgroundColor,
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
                    url={new URL(props.value)}
                    date={date}
                />
            )}
        </View>
    );
};

export const TwoFactorProgressBar = ({ date, url }: { date: Date, url: URL }) => {
    const period = parseInt(url.searchParams.get("period")) || 30;

    const fraction = (n: number) => n - Math.floor(n);

    const progress = 1 - fraction(date.getTime() / 1000 / period);

    return (
        <ProgressBar
            progress={progress}
        />
    );
}

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