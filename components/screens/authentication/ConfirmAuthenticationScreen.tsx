import React, { useEffect, useState }  from "react";
import { RemoteAuthenticationStackParamList } from "@components/navigators/RemoteAuthenticationStack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Authentication from "@lib/api/Authentication";
import { Title, Subheading, Caption, Button } from "react-native-paper";
import { useUser } from "@components/providers/AuthenticationProvider";
import { StyleSheet, View } from "react-native";
import VerifyAuthenticationIllustration from "@components/undraw/VerifyAuthenticationIllustration";

export type ConfirmAuthenticationScreenProps = {};

const ConfirmAuthenticationScreen = (props: ConfirmAuthenticationScreenProps) => {
    const { params: { code } } = useRoute<RouteProp<RemoteAuthenticationStackParamList, "Confirmation">>();
    
    const [rsaKey, setRsaKey] = useState<string>();
    const [disabled, setDisabled] = useState(false);
    const navigation = useNavigation();
    const { user } = useUser();

    const load = async () => {
        const [{ rsa }, error] = await Authentication.scan(code);

        if(error) {
            navigation.goBack();
            return;
        }

        setRsaKey(rsa);
    };

    const send = async () => {
        setDisabled(true);

        await Authentication.send(code, rsaKey);
        
        navigation.reset({
            index: 0,
            routes: [{
                name: "RemoteAuthenticationSuccess",
            }],
        });

        setDisabled(false);
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <ScrollView style={styles.root}>
            <View>
                <VerifyAuthenticationIllustration
                    width={200}
                    height={200}
                    style={[styles.row, styles.center]}
                />
            </View>
            <Title style={[styles.row, styles.textCenter]}>
                Please verify, that you can see your username!
            </Title>
            <Caption style={[styles.row, styles.textCenter]}>
                If they match, then please press the continue button below!
            </Caption>
            <Button
                style={[styles.row, styles.button, styles.center]}
                mode={"outlined"}
                disabled={disabled || !rsaKey}
                onPress={send}
                loading={disabled}
            >
                Continue
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        margin: 8,
    },
    row: {
        marginVertical: 4,
    },
    center: {
        alignSelf: "center",
    },
    textCenter: {
        textAlign: "center",
    },
    button: {
        width: 200,
        marginTop: 12,
    },
});

export default ConfirmAuthenticationScreen;