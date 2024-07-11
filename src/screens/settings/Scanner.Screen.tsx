import React, {useEffect, useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {StyleSheet, View, Alert, Platform, Text} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back');

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;
    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      setHasPermission(true);
    } else {
      const requestResult = await request(permission);
      setHasPermission(requestResult === RESULTS.GRANTED);
    }
  };

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

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Camera permission is required to scan QR codes.
        </Text>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
});
