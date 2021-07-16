import * as React from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import { withTheme } from 'react-native-paper';

const defaultSize = 64;

type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Size of the avatar.
   */
  size?: number;
  /**
   * Custom color for the text.
   */
  color?: string;
  /**
   * Style for text container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Style for the title.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * @optional
   */
  theme: ReactNativePaper.Theme;
};

/**
 * Avatars can be used to represent people in a graphical way.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/avatar-text.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Avatar } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Avatar.Text size={24} label="XD" />
 * );
 * ```
 */
const AvatarText = ({
  size = defaultSize,
  style,
  theme,
  labelStyle,
  color: customColor,
  children,
  ...rest
}: React.PropsWithChildren<Props>) => {
  const { backgroundColor = theme.colors.primary, ...restStyle } =
    StyleSheet.flatten(style) || {};

  return (
    <View
      style={[
        styles.item,
        styles.container,
        restStyle,
        {
          width: size,
          height: size,
          borderRadius: size / 40 * 12,
          backgroundColor: customColor || backgroundColor,
        }
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

AvatarText.displayName = 'CustomAvatar';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  item: {
      margin: 8,
      height: 40,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
  },
});

export default withTheme(AvatarText);