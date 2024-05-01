import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Button} from '../../components/Buttons';
import {CommonStyles} from '../../theme/Common.styles';
import {SvgImage} from 'components/SvgImages';
import {colors} from '../../theme/colors';

const WelcomeScreen = () => {
  return (
    <View style={styles.root}>
      <Button
        text="Block+Secondary"
        size="block"
        position="right"
        types="secondary"
        style={{justifyContent: 'center'}}
      />
      <Button
        text="Block+Primary"
        size="block"
        types="primary"
        icon={require('../../assets/vectors/messages.svg')}
      />
      <Button text="Block+Outlined" size="block" types="outlined" />
      <Button text="Create an Account" size="large" />
      <Button
        text="Log in Instead"
        size="block"
        types="primary"
        position="right"
        style={styles.logIn}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 24,
  },
  logIn: {
    backgroundColor: colors.ink.Base,
  },
});

export default WelcomeScreen;
