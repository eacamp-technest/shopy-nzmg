import {View, Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {CommonStyles} from 'theme/common.styles';
import {colors} from 'theme/colors';

export const CheckBox = ({setCheck}: {setCheck: boolean}) => {
  return (
    <View
      style={[
        styles.checkbox,
        setCheck ? styles.active : styles.passive,
        CommonStyles.alignJustifyCenter,
      ]}>
      <View style={styles.circle}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.blue.base,
  },
  passive: {
    backgroundColor: colors.sky.base,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: colors.sky.base,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: `${colors.sky.base}`,
    width: 24,
    height: 24,
    borderRadius: 30,
  },
});
