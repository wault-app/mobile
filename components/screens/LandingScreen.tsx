import React, { Fragment, useEffect, useState } from "react";
import AccountItem from "@components/accounts/AccountItem";
import { useKeycards } from "@components/providers/DataProvider";
import { Dimensions, RefreshControl } from "react-native";
import { ItemType } from "@lib/api/Item";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";
import CreditCardItem from "@components/cards/CreditCardItem";
import EmptyItemList from "./LandingScreen/EmptyItemList";

export type LandingScreenProps = {};

const LandingScreen = (props: LandingScreenProps) => {
    const { width } = Dimensions.get("window");

    const { keycards, refresh } = useKeycards();
    const [refreshing, setRefreshing] = useState(false);
    const [provider, setProvider] = useState(new DataProvider((r1, r2) => r1 !== r2));

    const layoutProvider = new LayoutProvider((index) => 1, (type, dim) => {
        dim.width = width;
        dim.height = 72;
    });

    useEffect(() => {
        const data = [];

        for (const keycard of keycards) {
            data.push(...keycard.safe.items);
        }

        setProvider(provider.cloneWithRows(data));
    }, [keycards]);

    const refreshControl = (  
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
    );

    return (
        <Fragment>
            {keycards.some((keycard) => keycard.safe.items.length > 0) ? (      
                <RecyclerListView
                    style={{ flex: 1 }}
                    dataProvider={provider}
                    layoutProvider={layoutProvider}
                    scrollViewProps={{
                        refreshControl,
                    }}
                    rowRenderer={(index, item: ItemType) => (
                        item.type === "account" ? (
                            <AccountItem
                                account={item}
                            />
                        ) : item.type === "credit-card" && (
                            <CreditCardItem
                                creditCard={item}
                            />
                        )
                    )}
                />
            ) : (
                <EmptyItemList
                    refreshControl={refreshControl}
                />
            )}
        </Fragment>
    );
};

export default LandingScreen;