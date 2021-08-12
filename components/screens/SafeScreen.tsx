import { useKeycards } from "@components/providers/DataProvider";
import { KeycardType } from "@lib/api/Safe";
import React from "react";
import { useMemo } from "react";
import { Dimensions } from "react-native";
import { List } from "react-native-paper";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";

export type SafeScreenProps = {};

const SafeScreen = (props: SafeScreenProps) => {
    const { keycards } = useKeycards();

    const layoutProvider = useMemo(
        () => new LayoutProvider(
            () => 0,
            (type, dim) => {
                const { width } = Dimensions.get("window");

                dim.width = width;
                dim.height = 72;
            }
        ),
        []
    );

    const dataProvider = useMemo(
        () => {
            const dataProvider = new DataProvider((r1, r2) => r1 !== r2);
            return dataProvider.cloneWithRows(keycards);
        },
        [keycards]
    );

    return (
        <RecyclerListView
            dataProvider={dataProvider}
            layoutProvider={layoutProvider}
            style={{ flex: 1 }}
            rowRenderer={(type, data: KeycardType) => (
                <List.Item
                    title={data.safe.name}
                    description={data.role}
                />
            )}
        />
    );
};

export default SafeScreen;