/* eslint-disable react-native/no-color-literals */
import {StyleSheet, Text, View, Switch as RNSwitch} from 'react-native';

type Props = {
  value: boolean;
  update: (newValue: boolean) => void;
  label: string;
};

export const Switch = ({value, update, label}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <RNSwitch value={value} onValueChange={update} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
});
