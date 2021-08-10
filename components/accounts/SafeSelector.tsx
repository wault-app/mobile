import { useKeycards } from "@components/providers/DataProvider";
import color from "color";
import React from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { List, Paragraph, RadioButton, TextInput, useTheme } from "react-native-paper";

export type SafeSelectorProps = any;

const SafeSelector = (props: SafeSelectorProps) => {
    const { keycards } = useKeycards();
    const theme = useTheme();

    return (
        <View
            style={{
                backgroundColor: theme.dark
                    ? color(theme.colors.background).lighten(0.24).rgb().string()
                    : color(theme.colors.background).darken(0.06).rgb().string(),
                borderTopLeftRadius: theme.roundness,
                borderTopRightRadius: theme.roundness,
                borderBottomColor: theme.colors.disabled,
                borderBottomWidth: 1,
            }}
        >
            <Paragraph style={[{
                color: theme.colors.placeholder,        
                marginLeft: 16,
                paddingTop: 12,
                marginBottom: 8,
            }]}>Two factor authentication</Paragraph>


            <RadioButton.Group
                {...props}
            >
                {keycards.map((keycard) => (
                    <RadioButton.Item 
                        label={keycard.safe.name}    
                        value={keycard.safe.id}
                    />
                ))}
            </RadioButton.Group>
        </View>
    );
}

export default SafeSelector;