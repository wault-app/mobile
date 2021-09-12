import React, { Fragment, useEffect, useState } from "react";
import AccountItem from "@components/accounts/AccountItem";
import { useKeycards } from "@components/providers/DataProvider";
import { Dimensions, RefreshControl, StyleSheet } from "react-native";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";
import CreditCardItem from "@components/cards/CreditCardItem";
import EmptyItemList from "../home/EmptyItemList";
import Toast from "react-native-toast-message";
import { FAB, List, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ItemType, KeycardType } from "@wault/typings";

export type HomeScreenProps = {};

const HomeScreen = (props: HomeScreenProps) => {
    const { width } = Dimensions.get("window");
    const theme = useTheme();
    const navigation = useNavigation();

    const { keycards, refresh } = useKeycards();
    const [refreshing, setRefreshing] = useState(false);
    const [provider, setProvider] = useState(new DataProvider((r1, r2) => r1 !== r2));

    const layoutProvider = new LayoutProvider(
        (index) => {
            return provider.getDataForIndex(index).type;
        }, (type, dim) => {
            if (type === "header") {
                dim.height = 42;
            } else {
                dim.height = 72;
            }

            dim.width = width;
        });

    useEffect(() => {
        const data = [];
        
        for (const keycard of keycards) {
            data.push({
                type: "header",
                keycard,
            });
            
            data.push(...keycard.safe.items.map((item) => ({ type: "item", ...item })));
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
                    Toast.show({
                        type: "error",
                        text1: "Something went wrong!",
                        text2: e.message,
                    });
                }

                setRefreshing(false);
            }}
        />
    );

    return (
        <Fragment>
            {keycards.length > 0 ? (
                <RecyclerListView
                    style={{ flex: 1 }}
                    dataProvider={provider}
                    layoutProvider={layoutProvider}
                    scrollViewProps={{
                        refreshControl,
                    }}
                    rowRenderer={(index, item: ItemType | { type: "header", keycard: KeycardType }) => (
                        item.type === "account" ? (
                            <AccountItem
                                account={item}
                            />
                        ) : item.type === "credit-card" ? (
                            <CreditCardItem
                                creditCard={item}
                            />
                        ) : item.type === "header" && (
                            <List.Subheader>
                                {item.keycard.safe.name}
                            </List.Subheader>
                        )
                    )}
                />
            ) : (
                <EmptyItemList
                    refreshControl={refreshControl}
                />
            )}

            <FAB
                style={[
                    styles.fab,
                    {
                        backgroundColor: theme.colors.primary,
                    }
                ]}
                onPress={() => navigation.navigate({
                    name: "add-item"
                })}
                icon={"plus"}
            />
        </Fragment>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})

export default HomeScreen;