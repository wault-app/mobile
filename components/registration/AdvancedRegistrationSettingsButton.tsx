import BottomSheet, { useBottomSheet } from "@components/modal/BottomSheet";
import ServerSelectorButton from "@components/settings/ServerSelectorButton";
import React, { Fragment } from "react";
import { useMemo } from "react";
import { Dimensions, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, List } from "react-native-paper";

export type AdvancedRegistrationSettingsButtonProps = any;

const AdvancedRegistrationSettingsButton = (props: AdvancedRegistrationSettingsButtonProps) => {
    const [expanded, setExpanded] = React.useState(false);

    const sheet = useBottomSheet();
    const { height } = Dimensions.get("window");
    const snapPoints = useMemo(() => [200, height - StatusBar.currentHeight], []);

    const handlePress = () => sheet.current.present();

    return (
        <Fragment>
            <BottomSheet snapPoints={snapPoints} ref={sheet}>
                <ScrollView>
                    <ServerSelectorButton />
                </ScrollView>
            </BottomSheet>
            <Button 
                onPress={handlePress}
                mode={"outlined"}
                {...props}
            >
                Show advanced settings
            </Button>
        </Fragment>
    );
};

export default AdvancedRegistrationSettingsButton;