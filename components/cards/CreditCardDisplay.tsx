import { CreditCardType } from "@wault/typings";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

export type CreditCardDisplayProps = {
    creditCard: CreditCardType;
};

const CreditCardDisplay = ({ creditCard }: CreditCardDisplayProps) => {
    return (
        <View style={styles.root}>
            <View>
                <Text style={styles.number}>
                    {creditCard.number}
                </Text>
            </View>
            <View style={styles.row}>
                <View style={styles.cardholder}>
                    <Text>
                        {creditCard.cardholder}
                    </Text>
                </View>
                
                <View style={styles.expiry}>
                    <Text>
                        {creditCard.expiry}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        borderRadius: 12,
        padding: 24,
    },
    number: {
        fontSize: 20,
    },
    cardholder: {
        flex: 1,
    },
    expiry: {

    },
    row: {
        flexDirection: "row",
        marginTop: 12,
    },
});

export default CreditCardDisplay;