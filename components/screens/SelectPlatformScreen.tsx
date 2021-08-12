import React, { Fragment, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Appbar, List, Searchbar, Text, Title, useTheme } from "react-native-paper";
import { Platform, StatusBar, TextInput, UIManager, View } from "react-native";
import Platforms from "@lib/api/Platforms";
import { FlatList } from "react-native-gesture-handler";
import FuseJS from "fuse.js";
import PlatformIcon from "@components/platforms/PlatformIcon";
import Categories from "@wault/typings/src/Category";

if (Platform.OS === "android") {
    UIManager?.setLayoutAnimationEnabledExperimental(true);
}

const SearchPlatformScreen = () => {
    const [platform, setPlatform] = useState("");
    const theme = useTheme();
    const route = useRoute();
    const navigation = useNavigation();

    const data = Object.keys(Platforms.getAll()).map((domain) => ({
        ...Platforms.get(domain),
        domain,
    }));

    const fuse = new FuseJS(data, {
        keys: ["domain", "name", "categories"],
    })

    const search = (platform: string) => {
        let resp = data;
        if(platform.length > 0) resp = fuse.search(platform).map(({ item }) => item);
        
        if(platform.length > 0 && !resp.map((el) => el.domain.toLocaleLowerCase()).includes(platform.toLocaleLowerCase())) {
            resp = [{
                name: platform,
                domain: platform,
                color: theme.colors.primary,
                categories: [],
            }, ...resp]
        }

        return resp;
    };

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

                <FlatList
                    data={search(platform)}
                    keyExtractor={(item) => item.domain}
                    renderItem={(platform: { item: typeof data[0] }) => (
                        <List.Item
                            key={`platform-butotn-${platform.item.domain}`}
                            onPress={() => {
                                navigation.goBack();
                                // @ts-ignore
                                route.params.setPlatform(platform.item.domain);
                            }}
                            left={(props) => <PlatformIcon {...props} platform={platform.item.domain} />}
                            title={platform.item.name}
                            description={platform.item.categories?.map((category) => Categories.get(category).name).join(", ")}
                        />
                    )}
                    ListFooterComponent={() => (
                        <Fragment>
                            <View style={{ margin: 16 }}>
                                <Title style={{ textAlign: "center" }}>
                                    Do you want to add more platform?
                                </Title>
                                <Text style={{ textAlign: "center" }}>
                                    Please contact us at support@wault.app
                                </Text>
                            </View>
                        </Fragment>
                    )}
                />             
        </Fragment>
    );
};

export default SearchPlatformScreen;