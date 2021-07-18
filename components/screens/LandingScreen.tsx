import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import AccountItem from "@components/accounts/AccountItem";
import CustomBackground from "@components/modal/CustomBackground";
import { useKeycards } from "@components/providers/DataProvider";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Dimensions, RefreshControl, SectionList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { List, Portal } from "react-native-paper";
import Handle from "@components/modal/CustomHandle";
import { AccountType, ItemType } from "@lib/api/Item";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";
import CopyUsernameButton from "@components/accounts/CopyUsernameButton";
import CopyPasswordButton from "@components/accounts/CopyPasswordButton";
import OpenInBrowserButton from "@components/accounts/OpenInBrowserButton";
import Toast from "react-native-toast-message";

export type LandingScreenProps = {};

const LandingScreen = (props: LandingScreenProps) => {
    const { width } = Dimensions.get("window");

    const { keycards, refresh } = useKeycards();
    const [refreshing, setRefreshing] = useState(false);
    const [provider, setProvider] = useState(new DataProvider((r1, r2) => r1 !== r2));

    const [account, setAccount] = useState<AccountType>();

    const sheet = useRef<BottomSheetModal>();
    const snapPoints = useMemo(() => [200, "80%"], []);

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
                        <AccountItem account={item} onOpenSheet={() => {
                            setAccount(item);
                            sheet.current.present();
                        }} />
                    ) : (<List.Item
                        title={item.id}
                        onPress={() => console.log(item)}
                    />
                    )
                )}
            />
            <BottomSheetModal
                snapPoints={snapPoints}
                ref={sheet}
                backgroundComponent={CustomBackground}
                backdropComponent={BottomSheetBackdrop}
                handleComponent={Handle}
            >
                <ScrollView>
                    {!!(account?.url || account?.platform) && (
                        <OpenInBrowserButton
                            url={`https://${account.platform}` || account.url}
                        />
                    )}
                    {!!account?.username && (
                        <CopyUsernameButton
                            username={account.username}
                            onCopy={() => {
                                sheet.current.close();
                            }}
                        />
                    )}
                    {!!account?.password && (
                        <CopyPasswordButton
                            password={account.password}
                            onCopy={() => {
                                sheet.current.close();
                            }}
                        />
                    )}
                </ScrollView>
            </BottomSheetModal>
        </Fragment>
    );
};

export default LandingScreen;