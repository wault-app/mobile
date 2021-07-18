import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import ThemeSelector from "@components/settings/ThemeSelector";
import RemoteAuthenticationButton from "@components/settings/RemoteAuthenticationButton";

export type OptionsScreenProps = {};

const OptionsScreen = (props: OptionsScreenProps) => {
    
    return (
        <ScrollView>
            <ThemeSelector />
            <RemoteAuthenticationButton />
        </ScrollView>
    );
};

export default OptionsScreen;