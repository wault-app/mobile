import React, { Fragment } from "react";
import { useBiometric } from "@components/providers/BiometricProvider";
import { List, Portal, RadioButton } from "react-native-paper";
import { useState } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import { useMemo } from "react";
import { useRef } from "react";
import Handle from "@components/modal/CustomHandle";
import CustomBackground from "@components/modal/CustomBackground";

export type BiometricButtonProps = {};

const BiometricButton = () => {
    const { isEnabled, toggle } = useBiometric();
    const bottomSheet = useRef<BottomSheetModal>();

    const snapPoints = useMemo(() => [200], []);

    return (
        <Fragment>
            <List.Item
                title={"Biometric authentication"}
                onPress={() => bottomSheet.current.present()}
                left={(props) => <List.Icon {...props} icon={"fingerprint"} />}
                description={isEnabled ? "Enabled" : "Disabled"}
            />
                <BottomSheetModal
                    backdropComponent={BottomSheetBackdrop}
                    handleComponent={Handle}
                    backgroundComponent={CustomBackground}
                    snapPoints={snapPoints}
                    ref={bottomSheet}
                >
                    <ScrollView>
                        <RadioButton.Group value={`${isEnabled}`} onValueChange={(value) => toggle(value === "true")}>
                            <RadioButton.Item
                                value={"true"}
                                label={"Enabled"}
                            />
                            <RadioButton.Item
                                value={"false"}
                                label={"Disabled"}
                            />
                        </RadioButton.Group>
                    </ScrollView>
                </BottomSheetModal>
        </Fragment>
    );
};

export default BiometricButton;