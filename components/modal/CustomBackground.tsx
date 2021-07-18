import React from 'react';
import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import { useTheme } from 'react-native-paper';

const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
    style,
}) => {
    const theme = useTheme();
    return <Animated.View pointerEvents="none" style={[
        style,
        {
            backgroundColor: theme.colors.surface,
            borderTopRightRadius: theme.roundness,
            borderTopLeftRadius: theme.roundness,
        }
    ]} />;
};

export default CustomBackground;