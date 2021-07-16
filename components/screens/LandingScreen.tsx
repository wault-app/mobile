import AccountItem from "@components/accounts/AccountItem";
import { useUser } from "@components/providers/AuthenticationProvider";
import { useKeycards } from "@components/providers/DataProvider";
import React from "react";
import { useState } from "react";
import { RefreshControl, SectionList } from "react-native";
import { List } from "react-native-paper";

export type LandingScreenProps = {};

const LandingScreen = (props: LandingScreenProps) => {
    const { user } = useUser();
    const { keycards, refresh } = useKeycards();
    const [refreshing, setRefreshing] = useState(false);

    return (
        <SectionList
            sections={keycards.map((keycard) => (
                {
                    title: keycard.safe.name,
                    data: keycard.safe.items,
                }
            ))}
            renderSectionHeader={(props) => (
                <List.Subheader>
                    {props.section.title}
                </List.Subheader>
            )}
            refreshControl={
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
            }
            renderItem={({ item }) => (
                item.type === "account" ? (
                    <AccountItem account={item} />
                ) : (
                    <List.Item
                        key={item.id}
                        title={item.id}
                        onPress={() => console.log(item)}
                    />
                )
            )}
        />
    );
};

export default LandingScreen;