/* eslint-disable react-native/no-color-literals */
import {StyleSheet, Text, View} from 'react-native';

export const Benchmarks = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>🚧 WIP 🚧</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    color: 'black',
    fontWeight: '900',
  },
});
