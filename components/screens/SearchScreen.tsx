import { useKeycards } from "@components/providers/DataProvider";
import { ItemType } from "@wault/typings";
import React from "react";
import { useMemo } from "react";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";
import Fuse from "fuse.js";
import { useState } from "react";
import { Dimensions, LayoutAnimation, UIManager, View } from "react-native";
import AccountItem from "@components/accounts/AccountItem";
import { Caption, Searchbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import StartTypingIllustration from "@components/undraw/StartTypingIllustration";
import CreditCardItem from "@components/cards/CreditCardItem";
import { Platform } from "react-native";

export type SearchScreenProps = {};

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

const SearchScreen = (props: SearchScreenProps) => {
    const { keycards } = useKeycards();
    const [pattern, setPattern] = useState("");

    const items = useMemo(() => {
        const items: ItemType[] = [];

        for (const keycard of keycards) {
            items.push(...keycard.safe.items);
        }

        return items;
    }, [keycards]);

    const fuse = new Fuse(items, {
        keys: [
            "username",
            "platform",
            "password",
            "categories",
            "description",
        ],
    });

    const result = useMemo(() => fuse.search(pattern).map((el) => el.item), [pattern, keycards]);

    const { width } = Dimensions.get("window");

    const layoutProvider = new LayoutProvider(() => 0, (type, dim) => {
        dim.width = width;
        dim.height = 72;
    });

    const dataProvider = useMemo(() => {
        const provider = new DataProvider((r1, r2) => r1 !== r2);
        return provider.cloneWithRows(result);
    }, [result]);

    return (
        <View style={styles.root}>
            <Searchbar
                autoFocus
                style={styles.searchBar}
                value={pattern}
                onChangeText={(text) => {
                    LayoutAnimation.configureNext(
                        {
                            duration: 150,
                            create:
                            {
                                type: LayoutAnimation.Types.easeInEaseOut,
                                property: LayoutAnimation.Properties.opacity,
                            },
                            update:
                            {
                                type: LayoutAnimation.Types.easeInEaseOut,
                                property: LayoutAnimation.Properties.opacity,
                            },
                        }
                    );
                    setPattern(text);
                }}
            />
            {dataProvider.getSize() > 0 ? (
                <RecyclerListView
                    style={styles.root}
                    layoutProvider={layoutProvider}
                    dataProvider={dataProvider}
                    rowRenderer={(type, item: ItemType) => (
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
                <View style={[styles.root, styles.center]}>
                    <StartTypingIllustration
                        width={200}
                        height={200}
                    />
                    <Caption>
                        Start typing to see the results pop up!
                    </Caption>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    searchBar: {
        marginHorizontal: 12,
        marginTop: StatusBar.currentHeight + 12,
    },
    center: {
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
    }
});

export default SearchScreen;