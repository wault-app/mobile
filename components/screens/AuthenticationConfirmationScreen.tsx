import React from "react";
import { RemoteAuthenticationStackParamList } from "@components/navigators/RemoteAuthenticationStack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { useState } from "react";
import Authentication from "@lib/api/Authentication";
import { Title, Subheading, Caption, Button } from "react-native-paper";

export type AuthenticationConfirmationScreenProps = {};

const AuthenticationConfirmationScreen = (props: AuthenticationConfirmationScreenProps) => {
    const { params: { code } } = useRoute<RouteProp<RemoteAuthenticationStackParamList, "Confirmation">>();
    const [user, setUser] = useState<{ username: string; rsa: string }>();
    const [disabled, setDisabled] = useState(false);
    const navigation = useNavigation();

    const load = async () => {
        const [user, error] = await Authentication.scan(code);
        console.log(user, error);
        
        if(error) {
            navigation.goBack();
            return;
        }
    
        setUser(user);
    };

    const send = async () => {
        setDisabled(true);
        await Authentication.send(code, user.rsa);
        setDisabled(false);
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <ScrollView>
            <Subheading>
                Please verify, that you can see your username!
            </Subheading>
            <Title>
                {user?.username}
            </Title>
            <Caption>
                If they match, then please press the continue button below!
            </Caption>
            <Button
                disabled={disabled}
                onPress={send}
            >
                Continue
            </Button>
        </ScrollView>
    );
};

export default AuthenticationConfirmationScreen;