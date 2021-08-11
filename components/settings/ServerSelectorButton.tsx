import React, { Fragment } from "react";
import { Button, List, TextInput } from "react-native-paper";
import { useServer } from "@components/providers/ServerSelectorProvider";
import BottomSheet, { useBottomSheet } from "@components/modal/BottomSheet";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { useState } from "react";

export type ServerSelectorButtonProps = {};

const ServerSelectorButton = (props: ServerSelectorButtonProps) => {
    const { server, setServer } = useServer();
    const bottomSheet = useBottomSheet();

    const [newServer, setNewServer] = useState(server);

    const { height } = Dimensions.get("window");
    const snapPoints = useMemo(() => [200], []);

    return (
        <Fragment>
            <List.Item 
                left={(props) => <List.Icon {...props} icon={"server"} />}
                title={"Selected server"}
                description={server}
                onPress={() => bottomSheet.current.present()}
            />
            <BottomSheet ref={bottomSheet} snapPoints={snapPoints}>
                <ScrollView contentContainerStyle={styles.root}>
                    <TextInput
                        label={"Selected server"}
                        style={styles.row}
                        value={newServer}
                        onChangeText={setNewServer}
                    />
                    <Button mode={"contained"} disabled={newServer === server}>
                        Update
                    </Button>
                </ScrollView>
            </BottomSheet>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    root: {
        padding: 12,
    },
    row: {
        marginBottom: 12,
    },
});

export default ServerSelectorButton;