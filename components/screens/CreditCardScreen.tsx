import CreditCardDisplay from "@components/cards/CreditCardDisplay";
import { CreditCardType } from "@lib/api/Item";
import { Route } from "@react-navigation/native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

export type CreditCardScreenProps = {
    route: Route<"account-info", {
        creditCard: CreditCardType;
    }>
};

const CreditCardScreen = (props: CreditCardScreenProps) => {
    const { creditCard } = props.route.params;
    
    return (
        <ScrollView>
            <CreditCardDisplay {...creditCard} />
        </ScrollView>
    );
};

export default CreditCardScreen;