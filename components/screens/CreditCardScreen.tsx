import CreditCardDisplay from "@components/cards/CreditCardDisplay";
import { Route } from "@react-navigation/native";
import { CreditCardType } from "@wault/typings";
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
            <CreditCardDisplay creditCard={creditCard} />
        </ScrollView>
    );
};

export default CreditCardScreen;