import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';
import type { RootStackParamList } from '../../RootProps';
// import Yoga from 'react-native-yoga-jsi';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../styles/colors';
import { TextDemo } from './TextDemo';

type EntryProps = NativeStackScreenProps<RootStackParamList, 'Entry'>;

export const Entry: React.FC<EntryProps> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Entry'>>();
  const [value, setValue] = useState('');

  useEffect(() => {
    // NativeModules.YogaJSI.install();
    // setValue(JSON.stringify(Yoga));
    // let c = Yoga.Node.create();
    // console.log(Platform.OS[0], 'Yoga', c);
    // setValue(Object.keys(c).join('\n'));
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Button
        title="Benchmarks"
        onPress={() => {
          navigation.navigate('Benchmarks');
        }}
      />
      <TextDemo />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  text: {
    fontSize: 20,
    color: colors.black,
  },
});
