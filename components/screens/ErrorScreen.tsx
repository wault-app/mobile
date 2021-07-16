import WrapperError from "@lib/errors/WrapperError";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

export type ErrorScreenProps = {
    error: WrapperError;
};

const ErrorScreen = (props: ErrorScreenProps) => {
    return (
        <ScrollView>
            <Text>
                Something went wrong!
            </Text>
        </ScrollView>
    );
};

export default ErrorScreen;