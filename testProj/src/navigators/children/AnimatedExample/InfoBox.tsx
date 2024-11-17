/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const info = [
  {
    color: 'red',
    width: '20%',
    minWidth: 50,
  },
  {
    color: 'green',
    width: '40%',
    minWidth: 50,
  },
  {
    color: 'teal',
    width: '20%',
    minWidth: 50,
  },
  {
    color: 'orange',
    width: '60%',
    minWidth: 50,
  },
];

export const InfoBox = () => {
  return (
    <View style={styles.allCont}>
      {info.map(bx => (
        <View style={styles.infoCont} key={bx.color}>
          <View style={[styles.dot, {backgroundColor: bx.color}]} />
          <Text style={styles.label}>
            width: <Text style={styles.value}>{bx.width}</Text>, minWidth:{' '}
            <Text style={styles.value}>{bx.minWidth}</Text>
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
  },
  infoCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 13,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  allCont: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 4,
    alignItems: 'center',
  },
});
