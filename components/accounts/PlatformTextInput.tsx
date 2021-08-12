import PlatformIcon from "@components/platforms/PlatformIcon";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Text, TextInput } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

export type PlatformTextInputProps = Omit<TextInputProps, "theme">;

const PlatformTextInput = (props: PlatformTextInputProps) => {
    const navigation = useNavigation();

    return (
        <TextInput
            {...props}
            label={"Platform"}
            render={() => (
                <TouchableWithoutFeedback onPress={() => navigation.navigate({ 
                    name: "search-platform",
                    params: {
                        setPlatform: props.onChangeText
                    },
                })}>
                    <View style={{ flexDirection: "row"}}>
                        <View style={styles.left}>
                            <Text style={styles.text}>
                                {props.value}
                            </Text>
                        </View>
                        {!!props.value && (
                            <View style={styles.right}>
                                <PlatformIcon 
                                    platform={props.value}
                                    size={42}    
                                /> 
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            )}
            mode={"flat"}
        />
    );
}

const styles = StyleSheet.create({
    left: {
        flexGrow: 1,
        marginTop: 18,
        padding: 12,
    },
    text: {
        fontSize: 16,
    },
    right: {
        alignSelf: "flex-end",
        marginRight: 4,
    },
});

export default PlatformTextInput;