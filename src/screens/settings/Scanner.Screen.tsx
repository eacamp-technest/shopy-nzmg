import React, {useEffect, useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {StyleSheet, View, Alert, Platform, Text, Linking} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {BottomSheet} from 'components/BottomSheet';
import {normalize} from 'theme/metrics';

export const ScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back');
  const [status, setStatus] = useState<boolean>(false);
  const [link, setLink] = useState<any>(null);

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
      console.log(codes);
      const scannedUrl = codes[0]?.value;

      setLink(scannedUrl);
      setStatus(true);
    },
  });
  const handleOnpress = () => {
    if (link)
      try {
        Linking.openURL(link);
        setStatus(false);
      } catch (err) {
        console.log(`Error:${err}`);
      }
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
      {status ? (
        <BottomSheet
          buttonText="Go to link"
          title={link}
          titleStyle={{
            backgroundColor: '#d3d3d3',
            borderRadius: 10,
            padding: 10,
            top: 10,
          }}
          size={{height: '20%'}}
          onPress={handleOnpress}
          setStatus={setStatus}
        />
      ) : null}
    </View>
  );
};

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
  title: {
    backgroundColor: '#d3d3d3',
    borderRadius: 50,
    padding: 10,
    marginVertical: normalize('vertical', 10),
  },
});
