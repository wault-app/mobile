import React from "react";
import { CreditCardType } from "@lib/api/Item";
import { List } from "react-native-paper";
import { useMemo } from "react";
import Payment from "payment";
import Issuers from "@lib/credit-card/Issuers";
import CreditCardIcon from "./CreditCardIcon";

export type CreditCardItemProps = {
    creditCard: CreditCardType;
};

const CreditCardItem = (props: CreditCardItemProps) => {
    const issuer = useMemo(() => Issuers.get(Payment.fns.cardType(props.creditCard.number)), [props.creditCard.number]);

    return (
        <List.Item
            title={props.creditCard.name}
            description={`${issuer.name} card ending with ${props.creditCard.number.substr(props.creditCard.number.length - 4)}`}
            left={(props) => <CreditCardIcon issuer={issuer} />}
            onPress={() => {}}
        />
    );
};

export default CreditCardItem;