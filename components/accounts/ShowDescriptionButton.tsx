import React from "react";
import { useState } from "react";
import { LayoutAnimation } from "react-native";
import { UIManager } from "react-native";
import { Platform } from "react-native";
import { View } from "react-native";
import { Card, List, Text, useTheme } from "react-native-paper";

export type ShowDescriptionButtonProps = {
    description: string;
};

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const ShowDescriptionButton = (props: ShowDescriptionButtonProps) => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    return (
        <View>
            <List.Item
                title={open ? "Hide description" : "Show description"}
                onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setOpen(!open)
                }}
                right={(props) => <List.Icon {...props} icon={open ? "chevron-up" : "chevron-down"} />}
                left={(props) => <List.Icon {...props} icon={"content-copy"} />}
            />
            {open && (
                <Card
                    style={[
                        {
                            marginTop: 6,
                            marginHorizontal: 12,
                            padding: 12,
                        }
                    ]}
                >
                    <Text>
                        {props.description}
                    </Text>
                </Card>
            )}
        </View>
    );
};

export default ShowDescriptionButton;