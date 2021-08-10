import { useKeycards } from "@components/providers/DataProvider";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";

const SelectItemTypeScreen = () => {
    const navigation = useNavigation();
    
    const { keycards } = useKeycards();

    const canCreateAccounts = keycards.some((keycard) => ["OWNER", "WRITER"].includes(keycard.role));

    return (
        <ScrollView>
            <List.Item 
                onPress={() => navigation.navigate("create-safe")}
                left={props => <List.Icon {...props} icon={"safe-square-outline"} />}
                title={"Safe"}
            />
            <List.Item 
                onPress={() => navigation.navigate("add-account")}
                left={props => <List.Icon {...props} icon={"account"} />}
                title={"Account"}
                disabled={!canCreateAccounts}
            />
        </ScrollView>
    );
};

export default SelectItemTypeScreen;