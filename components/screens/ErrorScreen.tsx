import React from "react";
import WrapperError from "@wault/error";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

export type ErrorScreenProps = {
    error: WrapperError;
};

const ErrorScreen = (props: ErrorScreenProps) => {
    console.log(props);

    return (
        <ScrollView>
            <Text>
                Something went wrong!
            </Text>
        </ScrollView>
    );
};

export default ErrorScreen;