/* eslint-disable react-native/no-color-literals */
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface Props {
  title: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}

export const Button = ({title, onPress, style}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.cont, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cont: {
    backgroundColor: 'black',
    paddingHorizontal: 16,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    backgroundColor: 'black',
    fontWeight: '600',
    color: 'white',
  },
});
