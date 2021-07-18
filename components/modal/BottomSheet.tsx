import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Colors from "@lib/Colors";
import React, { forwardRef, memo } from "react";
import { useRef } from "react";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { useTheme } from "react-native-paper";
import CustomBackground from "./CustomBackground";
import Handle from "./CustomHandle";

const BottomSheetTemplate = forwardRef<BottomSheetModal, BottomSheetModalProps>((props, ref) => {
    const theme = useTheme();

    return (
        <BottomSheetModal
            backgroundComponent={CustomBackground}
            backdropComponent={BottomSheetBackdrop}
            handleComponent={Handle}
            onAnimate={() => {
                changeNavigationBarColor(theme.colors.surface, !theme.dark, false);
            }}
            onDismiss={() => {
                changeNavigationBarColor(Colors.rgbToHex(theme.colors.background), !theme.dark, true);
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