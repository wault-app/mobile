import React, { useMemo } from 'react';
import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import Animated, {
    useAnimatedStyle,
    interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from 'react-native-paper';

const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
    style,
    animatedIndex,
}) => {
    const theme = useTheme();

    return <Animated.View pointerEvents="none" style={[
        style,
        {
            backgroundColor: theme.colors.background,
            borderTopRightRadius: theme.roundness,
            borderTopLeftRadius: theme.roundness,
        }
    ]} />;
};

export default CustomBackground;