import CustomBackground from "@components/modal/CustomBackground";
import Handle from "@components/modal/CustomHandle";
import { useTheme } from "@components/providers/ThemeProvider";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Fragment } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { List, Portal, RadioButton, Text } from "react-native-paper";

export type ThemeSelectorProps = {};

const ThemeSelector = () => {
    const { theme, setTheme } = useTheme();
    const bottomSheet = useRef<BottomSheet>();
    const snapPoints = useMemo(() => [0, 300], []);

    return (
        <View>
            <List.Item
                title={"Theme"}
                description={theme === "system-preference" ? "Use system preference" : theme === "dark" ? "Dark theme" : "Light theme"}
                onPress={() => bottomSheet.current.snapTo(1)}
                left={props => <List.Icon {...props} icon="brightness-2" />}
            />
            <Portal>
                <BottomSheet
                    snapPoints={snapPoints}
                    backgroundComponent={CustomBackground}
                    backdropComponent={BottomSheetBackdrop}
                    handleComponent={Handle}
                    ref={bottomSheet}
                    onChange={(index) => {
                        if (index === 0) bottomSheet.current.close();
                    }}
                >
                    <ScrollView>
                        <RadioButton.Group onValueChange={async (value) => {
                            const theme = value === "light" ? "light" : value === "dark" ? "dark" : "system-preference";
                            setTheme(theme);
                            bottomSheet.current.close();
                            await AsyncStorage.setItem("theme", theme);
                        }} value={theme}>
                            <RadioButton.Item label={"Use system preference"} value={"system-preference"} />
                            <RadioButton.Item label={"Light theme"} value={"light"} />
                            <RadioButton.Item label={"Dark theme"} value={"dark"} />
                        </RadioButton.Group>
                    </ScrollView>
                </BottomSheet>
            </Portal>
        </View>
    );
};

export default ThemeSelector;
