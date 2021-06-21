import React from "react";
import { RemoteAuthenticationStackParamList } from "@components/navigators/RemoteAuthenticationStack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export type AuthenticationConfirmationScreenProps = {};

const AuthenticationConfirmationScreen = (props: AuthenticationConfirmationScreenProps) => {
    const { params: { code } } = useRoute<RouteProp<RemoteAuthenticationStackParamList, "Confirmation">>();

    console.log(code);

    return (
        <ScrollView>
        </ScrollView>
    );
};

export default AuthenticationConfirmationScreen;