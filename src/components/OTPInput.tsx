import {View, TextInput, StyleProp, ViewStyle, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {colors} from 'theme/colors';

const OTPInput = (props: any) => {
  let inputs: any[] = [];
  const [focusedInput, setFocusedInput] = useState(0);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });
    return () => {
      showKeyboard.remove(), hideKeyboard.remove();
    };
  }, []);
  function getOtpText(inputCount: any, inputCL: any, text: any) {
    let m = text.match(new RegExp('.{1,' + inputCL + '}', 'g')) || [];
    return m.slice(0, inputCount);
  }
  const [otp, setOtp] = useState(
    getOtpText(
      props?.inputCount || 4,
      props?.inputCellLength,
      props?.defaultValue,
    ),
  );
  function onInputFocusEvent(i: number) {}
  function isValid(text: any) {
    const _isValid = /^[0-9a-zA-Z]+$/;
    return text.match(_isValid);
  }

  function onChangeText(text: string, i: number) {
    if (text && !isValid(text)) {
      return;
    }
    let temp = [...otp];
    temp[i] = text;
    setOtp(temp);

    props?.handleCallTextChange() && props?.handleCallChange(text, i);
    if (text.length === props?.inputCellLength && i !== props?.inputCount - 1) {
      inputs[i + 1].focus();
    }
    props?.handleTextChange(temp.join(''));
  }
  function onKeyPress(e: any, i: number) {
    const val = otp[i] || '';

    if (e.nativeEvent.key !== 'Backspace' && i !== props?.inputCount - 1) {
      inputs[i + 1].focus();
      setFocusedInput(num => (num = i + 1));

      return;
    }
    if (e.nativeEvent.key === 'Backspace' && i !== 0) {
      if (!val.length && otp[i - 1].length === props?.inputCellLength) {
        inputs[i - 1].focus();
        let temp = [...otp];
        temp[i - 1] = otp[i - 1]
          .split('')
          .splice(0, otp[i - 1].length - 1)
          .join('');

        setOtp(temp);
        props?.handleTextChange(otp.join(''));
        setFocusedInput(num => num - 1);
      }
    }
  }
  const TextInputComponent: any[] = [];

  for (let i = 0; i < props?.inputCount; i += 1) {
    const _inputStyle = [
      {
        height: 48,
        width: 48,
        borderWidth: 1,
        margin: 12,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '600',
        color: colors.ink.base,
        borderRadius: 8,
        borderColor: props?.offTintColor,
      } as StyleProp<ViewStyle>,
    ];

    if (focusedInput === i) {
      _inputStyle.push({
        borderColor: keyboardStatus ? props?.tintColor : props?.offTintColor,
      });
    }
    TextInputComponent.push(
      <TextInput
        ref={e => {
          if (e) {
            inputs[i] = e;
          }
        }}
        key={i}
        autoCorrect={false}
        autoFocus={props?.autoFocus && i === 0}
        keyboardType={props?.keyboardType}
        value={otp[i] || ''}
        style={_inputStyle}
        maxLength={props?.inputCellLength}
        onFocus={() => onInputFocusEvent(i)}
        onChangeText={txt => onChangeText(txt, i)}
        multiline={false}
        selectionColor={props?.tintColor}
        onKeyPress={e => onKeyPress(e, i)}
      />,
    );
  }
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center',
        },
        props?.containerStyle,
      ]}>
      {TextInputComponent}
    </View>
  );
};

export default OTPInput;

OTPInput.propTypes = {
  containerStyle: PropTypes.object,
  inputCount: PropTypes.number,
  tintColor: PropTypes.string,
  offTintColor: PropTypes.string,
  textInputStyle: PropTypes.object,
  autoFocus: PropTypes.bool,
  keyboardType: PropTypes.string,
  inputCellLength: PropTypes.number,
  defaultValue: PropTypes.string,
  handleCallTextChange: PropTypes.func,
  handleTextChange: PropTypes.func,
  inputStyle: PropTypes.object,
};

OTPInput.defaultProps = {
  containerStyle: {},
  inputCount: 4,
  tintColor: colors.primary.base,
  offTintColor: colors.sky.light,
  textInputStyle: {},
  autoFocus: true,
  keyboardType: 'numeric',
  inputCellLength: 1,
  defaultValue: '',
  handleCallTextChange: () => {},
  handleTextChange: () => {},
  inputStyle: {},
};
