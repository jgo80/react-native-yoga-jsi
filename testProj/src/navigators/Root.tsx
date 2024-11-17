import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {RootStackParamList} from './RootProps';
import {Entry} from './children/Entry/Entry';
import {StyleSheet} from 'react-native';
import {TextLayout} from './children/TextLayout/TextLayout';
import {AnimatedExample} from './children/AnimatedExample/AnimatedExample';
import {colors} from '../styles/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Root: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: styles.screenContainer,
        }}>
        <Stack.Screen
          name="Entry"
          options={{
            title: 'Examples',
          }}
          getComponent={() => Entry}
        />
        <Stack.Screen
          name="TextLayout"
          options={{
            title: 'Text Layout Demo',
          }}
          getComponent={() => TextLayout}
        />
        <Stack.Screen
          name="AnimatedExample"
          options={{
            title: 'Animated Example',
          }}
          getComponent={() => AnimatedExample}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: colors.white,
  },
});
