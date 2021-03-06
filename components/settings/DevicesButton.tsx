import DeviceItem from "@components/devices/DeviceItem";
import BottomSheet from "@components/modal/BottomSheet";
import Device, { DeviceType } from "@lib/api/Device";
import React, { Fragment } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Dimensions, StatusBar } from "react-native";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Button, List, Title } from "react-native-paper";
import Toast from "react-native-toast-message";

export type DevicesButtonProps = {};

const DevicesButton = (props: DevicesButtonProps) => {
    const [devices, setDevices] = useState<DeviceType[]>();
    const bottomSheet = useRef<BottomSheet>();

    const { height } = Dimensions.get("window");
    const snapPoints = useMemo(() => [200, height - StatusBar.currentHeight], []);

    const onOpen = async () => {
        try {
            bottomSheet.current.present();
            const { devices } = await Device.getAll();

            setDevices(devices);
        } catch (e) {
            Toast.show({
                type: "error",
                text1: "Something went wron!",
                text2: e.message,
            });
            
            bottomSheet.current.close();
        }
    };

    return (
        <Fragment>
            <List.Item
                onPress={() => onOpen()}
                left={(props) => <List.Icon {...props} icon={"cellphone-link"} />}
                title={"Devices"}
                description={"Check your currently active devices"}
            />
            <BottomSheet
                snapPoints={snapPoints}
                ref={bottomSheet}
            >
                <ScrollView>
                    {devices ? (
                        devices.map(
                            (device) => (
                                <DeviceItem  key={`devices-item-${device.id}`} device={device} />
                            )
                        )
                    ) : (
                        <LoadingScreen />
                    )}
                </ScrollView>
            </BottomSheet>
        </Fragment>
    );
};

const LoadingScreen = () => (
    <View style={styles.screen}>
        <ActivityIndicator />
    </View>
);

const styles = StyleSheet.create({
    row: {
        marginVertical: 4,
    },
    screen: {
        margin: 32,
    },
});

export default DevicesButton;