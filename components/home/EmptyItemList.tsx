import EmptyCanvas from "@components/illustrations/EmptyCanvas";
import React from "react";
import { ScrollViewProps, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, Title } from "react-native-paper";

export type EmptyItemListProps = ScrollViewProps;

const EmptyItemList = (props: EmptyItemListProps) => {
    return (
        <ScrollView
            {...props}
            contentContainerStyle={styles.root}
        >
            <View>
                <EmptyCanvas
                    width={200}
                    height={200}
                />
            </View>
            <View>
                <Title>
                    No item added yet
                </Title>
            </View>
            <View>
                <Text>
                    Create your first item by clicking on the plus icon!
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        padding: 16,
    },
});

export default EmptyItemList;