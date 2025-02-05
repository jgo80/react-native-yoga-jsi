import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {RootStackParamList} from './RootProps';
import {Entry} from './children/Entry/Entry';
import {StyleSheet} from 'react-native';
import {TextLayout} from './children/TextLayout/TextLayout';
import {AnimatedExample} from './children/AnimatedExample/AnimatedExample';
import {colors} from '../styles/colors';
import {ApiTests} from './children/ApiTests/ApiTests';
import {Benchmarks} from './children/Benchmarks/Benchmarks';
import { AnimatedTextLayout } from './children/AnimatedTextLayout/AnimatedTextLayout';

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
        <Stack.Screen
          name="ApiTests"
          options={{
            title: 'Tests',
          }}
          getComponent={() => ApiTests}
        />
        <Stack.Screen
          name="Benchmarks"
          options={{
            title: 'Benchmarks',
          }}
          getComponent={() => Benchmarks}
        />
        <Stack.Screen
          name="AnimatedTextLayout"
          options={{
            title: 'Animated Text Layout',
          }}
          getComponent={() => AnimatedTextLayout}
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
