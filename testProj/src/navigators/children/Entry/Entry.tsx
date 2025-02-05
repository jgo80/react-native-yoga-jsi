/* eslint-disable react-native/no-color-literals */
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import type {RootStackParamList} from '../../RootProps';
import {useNavigation} from '@react-navigation/native';
import {Button, Spacer} from '../../../components';

type EntryProps = NativeStackScreenProps<RootStackParamList, 'Entry'>;

export const Entry: React.FC<EntryProps> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Entry'>>();

  return (
    <View style={styles.mainContainer}>
      <Button
        title="Text Layout Demo"
        onPress={() => {
          navigation.navigate('TextLayout');
        }}
      />
      <Button
        title="Animated Layout Demo"
        onPress={() => {
          navigation.navigate('AnimatedExample');
        }}
      />
      <Button
        title="Animated Text Layout"
        onPress={() => {
          navigation.navigate('AnimatedTextLayout');
        }}
      />
      <Spacer />
      <Button
        title="API Tests"
        onPress={() => {
          navigation.navigate('ApiTests');
        }}
      />
      <Button
        title="Benchmarks"
        onPress={() => {
          navigation.navigate('Benchmarks');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
});
