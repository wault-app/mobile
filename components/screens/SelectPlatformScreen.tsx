import React, { Fragment, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Appbar, List, useTheme } from "react-native-paper";
import { Platform, StatusBar, TextInput, UIManager } from "react-native";
import FuseJS from "fuse.js";
import PlatformIcon from "@components/platforms/PlatformIcon";
import Categories from "@wault/typings/src/Category";
import Platforms from "@wault/platforms";
import { useMemo } from "react";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";
import { Dimensions } from "react-native";
import { PlatformTypeWithDomain } from "@wault/platforms/src/Platforms";

if (Platform.OS === "android") {
    UIManager?.setLayoutAnimationEnabledExperimental(true);
}

const SearchPlatformScreen = () => {
    const [platform, setPlatform] = useState("");
    const theme = useTheme();
    const route = useRoute();
    const navigation = useNavigation();

    const data = useMemo(
        () => {
            return Platforms.getAll();
        },
        []
    )

    const fuse = useMemo(
        () => {
            return new FuseJS(data, {
                keys: ["domain", "name", "categories"],
            })
        },
        []
    );

    const dataProvider = useMemo(
        () => {
            const dataProvider = new DataProvider((r1, r2) => r1 !== r2);

            if (platform.length > 0) {
                const results = fuse.search(platform);
                return dataProvider.cloneWithRows(results.map((el) => el.item));
            } else {
                return dataProvider.cloneWithRows(data);
            }
        },
        [platform]
    );

    const layoutProvider = useMemo(
        () => (
            new LayoutProvider(() => 1, (type, dim) => {
                const { width } = Dimensions.get("window");
                dim.width = width;
                dim.height = 72;
            })
        ),
        []
    );

    return (
        <Fragment>
            <Appbar.Header style={{ backgroundColor: theme.colors.surface, marginTop: StatusBar.currentHeight }} dark={theme.dark}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />

                <TextInput
                    placeholder={"Search"}
                    style={{
                        color: theme.colors.onSurface,
                        fontSize: 16,
                        flex: 1,
                    }}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    autoCompleteType={"off"}
                    spellCheck={false}
                    selectionColor={theme.colors.primary}
                    placeholderTextColor={theme.colors.placeholder}
                    onChangeText={setPlatform}
                    value={platform}
                />
            </Appbar.Header>
            {dataProvider.getSize() > 0 && (
                <RecyclerListView
                    style={{ flex: 1 }}
                    dataProvider={dataProvider}
                    layoutProvider={layoutProvider}
                    rowRenderer={(type, platform: PlatformTypeWithDomain) => (
                        <List.Item
                            key={`platform-button-${platform.domain}`}
                            onPress={() => {
                                navigation.goBack();
                                // @ts-ignore
                                route.params.setPlatform(platform.domain);
                            }}
                            left={(props) => <PlatformIcon {...props} platform={platform.domain} />}
                            title={platform.name}
                            description={platform.categories?.map((category) => Categories.get(category).name).join(", ")}
                        />
                    )}
                />
            )}
        </Fragment>
    );
};

export default SearchPlatformScreen;