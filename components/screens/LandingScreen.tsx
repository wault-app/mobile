import AccountItem from "@components/accounts/AccountItem";
import CustomBackground from "@components/modal/CustomBackground";
import { useUser } from "@components/providers/AuthenticationProvider";
import { useKeycards } from "@components/providers/DataProvider";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { Fragment } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Dimensions, RefreshControl, SectionList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import Handle from "@components/modal/CustomHandle";
import { ItemType } from "@lib/api/Item";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";

export type LandingScreenProps = {};

const LandingScreen = (props: LandingScreenProps) => {
    const { user } = useUser();
    const { keycards, refresh } = useKeycards();
    const [refreshing, setRefreshing] = useState(false);
    const [provider, setProvider] = useState(new DataProvider((r1, r2) => r1 !== r2));

    const { width } = Dimensions.get("window");

    const bottomSheet = useRef<BottomSheet>();
    const snapPoints = useMemo(() => [0, 200, "80%"], []);

    const layoutProvider = new LayoutProvider((index) => 1, (type, dim) => {
        dim.width = width;
        dim.height = 72;
    });

    useMemo(() => {
        const data = [];
        for(const keycard of keycards) {
            data.push(...keycard.safe.items);
        }

        setProvider(provider.cloneWithRows(data));
    }, [keycards]);

    return (
        <Fragment>
            <RecyclerListView
                style={{ flex: 1 }}
                dataProvider={provider}
                layoutProvider={layoutProvider}
                scrollViewProps={{
                    refreshControl: (
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={async () => {
                                try {
                                    setRefreshing(true);
                                    await refresh();
                                } catch (e) {
                                    console.log(e);
                                }

                                setRefreshing(false);
                            }}
                        />
                    ),
                }}
                rowRenderer={(index, item: ItemType) => (
                    item.type === "account" ? (
                        <AccountItem account={item} onOpenSheet={() => bottomSheet.current.snapTo(1)} />
                    ) : (<List.Item
                        title={item.id}
                        onPress={() => console.log(item)}
                    />
                    )
                )}
            />
            <BottomSheet
                snapPoints={snapPoints}
                ref={bottomSheet}
                backgroundComponent={CustomBackground}
                backdropComponent={BottomSheetBackdrop}
                handleComponent={Handle}
                onChange={(index) => {
                    if (index === 0) bottomSheet.current.close();
                }}
            >
                <ScrollView>

                </ScrollView>
            </BottomSheet>
        </Fragment>
    );
};

export default LandingScreen;