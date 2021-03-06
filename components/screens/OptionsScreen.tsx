import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import ThemeSelector from "@components/settings/ThemeSelector";
import RemoteAuthenticationButton from "@components/settings/RemoteAuthenticationButton";
import BiometricButton from "@components/settings/BiometricButton";
import DevicesButton from "@components/settings/DevicesButton";
import ServerSelectorButton from "@components/settings/ServerSelectorButton";

export type OptionsScreenProps = {};

const OptionsScreen = (props: OptionsScreenProps) => {
    
    return (
        <ScrollView>
            <ThemeSelector />
            <RemoteAuthenticationButton />
            <BiometricButton />
            <DevicesButton />
            <ServerSelectorButton />
        </ScrollView>
    );
};

export default OptionsScreen;