import React from "react";
import { ScrollViewProps, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export type EmptyItemListProps = ScrollViewProps;

const EmptyItemList = (props: EmptyItemListProps) => {
    return (
        <ScrollView
            {...props}
            style={[styles.root]}
        />
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});

export default EmptyItemList;