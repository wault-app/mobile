import React from "react";
import { List } from "react-native-paper";
import { useMemo } from "react";
import Payment from "payment";
import Issuers from "@lib/credit-card/Issuers";
import CreditCardIcon from "./CreditCardIcon";
import { useNavigation } from "@react-navigation/native";
import { CreditCardType } from "@wault/typings";

export type CreditCardItemProps = {
    creditCard: CreditCardType;
};

const CreditCardItem = (props: CreditCardItemProps) => {
    const navigation = useNavigation();
    const issuer = useMemo(() => Issuers.get(Payment.fns.cardType(props.creditCard.number)), [props.creditCard.number]);

    return (
        <List.Item
            title={props.creditCard.name}
            description={`${issuer.name} card ending with ${props.creditCard.number.substr(props.creditCard.number.length - 4)}`}
            left={(props) => <CreditCardIcon issuer={issuer} />}
            onPress={() => navigation.navigate("credit-card", { creditCard: props.creditCard })}
        />
    );
};

export default CreditCardItem;