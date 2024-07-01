import React from 'react';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {StyleSheet, View, Alert} from 'react-native';

export function ScannerScreen() {
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      console.log('Scanned QR code:', codes);
      showScanAlert();
    },
  });

  const showScanAlert = () => {
    Alert.alert('QR Code Scanned!', 'QR code has been successfully scanned.', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
    </View>
  );
}
