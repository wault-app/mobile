import React, { Fragment } from "react";
import { useBiometric } from "@components/providers/BiometricProvider";
import { List, RadioButton } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useMemo } from "react";
import BottomSheet, { useBottomSheet } from "@components/modal/BottomSheet";

export type BiometricButtonProps = {};

const BiometricButton = () => {
    const { isEnabled, toggle } = useBiometric();
    const bottomSheet = useBottomSheet();

    const snapPoints = useMemo(() => [200], []);

    return (
        <Fragment>
            <List.Item
                title={"Biometric authentication"}
                onPress={() => bottomSheet.current.present()}
                left={(props) => <List.Icon {...props} icon={"fingerprint"} />}
                description={isEnabled ? "Enabled" : "Disabled"}
            />
                <BottomSheet
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
                </BottomSheet>
        </Fragment>
    );
};

export default BiometricButton;