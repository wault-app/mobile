import React from "react";
import { CreditCardType } from "@lib/api/Item";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

export type CreditCardDisplayProps = {
    number?: string;
    cardholder?: string;
    expiry?: string;
    cvc?: string;
};

const CreditCardDisplay = (props: CreditCardDisplayProps) => {
    return (
        <View style={styles.root}>
            <View>
                <Text style={styles.number}>
                    {props.number}
                </Text>
            </View>
            <View style={styles.row}>
                <View style={styles.cardholder}>
                    <Text>
                        {props.cardholder}
                    </Text>
                </View>
                
                <View style={styles.expiry}>
                    <Text>
                        {props.expiry}
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