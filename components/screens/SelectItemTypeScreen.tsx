import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";

const SelectItemTypeScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView>
            <List.Item 
                onPress={() => navigation.navigate("add-account")}
                left={props => <List.Icon {...props} icon={"account"} />}
                title={"Account"}
            />
        </ScrollView>
    );
};

export default SelectItemTypeScreen;