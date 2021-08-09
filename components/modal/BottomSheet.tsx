import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Colors from "@lib/Colors";
import { useNavigation } from "@react-navigation/native";
import React, { forwardRef, memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { useTheme } from "react-native-paper";
import CustomBackground from "./CustomBackground";
import Handle from "./CustomHandle";

const BottomSheetTemplate = forwardRef<BottomSheetModal, BottomSheetModalProps>((props, ref) => {
    const theme = useTheme();
    const navigation = useNavigation();
    
    const [open, setOpen] = useState(false);

    const onBack = (e: any) => {
        if(open) {
            setOpen(false);
            
            e.preventDefault();

            // @ts-ignore
            ref.current.close();
        }
    };

    useEffect(() => {
        navigation.removeListener("beforeRemove", onBack);
        navigation.addListener("beforeRemove", onBack);
    }, [open, navigation]);

    return (
        <BottomSheetModal
            backgroundComponent={CustomBackground}
            backdropComponent={BottomSheetBackdrop}
            stackBehavior={"push"}
            handleComponent={Handle}
            onAnimate={() => {
                setOpen(true);
                changeNavigationBarColor(theme.colors.surface, !theme.dark, false);
            }}
            onDismiss={() => {
                console.log("dismiss")
                changeNavigationBarColor(Colors.rgbToHex(theme.colors.background), !theme.dark, true);
                setOpen(false);
            }}
            ref={ref}
            {...props}
        />
    );
});

type BottomSheet = BottomSheetModalMethods;
const BottomSheet = memo(BottomSheetTemplate);
BottomSheet.displayName = "BottomSheet";

export const useBottomSheet = () => useRef<BottomSheet>();

export default BottomSheet;