import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import ThemeSelector from "@components/settings/ThemeSelector";

export type OptionsScreenProps = {};

const OptionsScreen = (props: OptionsScreenProps) => {
    const navigation = useNavigation();
    
    return (
        <ScrollView>
            <List.Item 
                title={"Remote authentication"}
                onPress={() => navigation.navigate("remote-authentication")}
            />
            <ThemeSelector />
        </ScrollView>
    );
};

export default OptionsScreen;