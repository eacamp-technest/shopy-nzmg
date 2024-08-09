import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { MMKV } from 'react-native-mmkv';
import { useStatusBar } from 'helpers/useStatusBar';
import { colors } from 'theme/colors';
import { SvgImage } from 'components/SvgImages';
import { CommonStyles } from 'theme/common.styles';
import { TypographyStyles } from 'theme/typography';
import { standardHitSlopSize } from 'theme/consts.styles';

interface Notification {
  id: string;
  title: string;
  body: string;
}

const storage = new MMKV();

export const NortificationScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [displayedNotifications, setDisplayedNotifications] = useState<
    Notification[]
  >([]);

  useStatusBar('dark-content', colors.white);

  const loadNotifications = useCallback(() => {
    const storedNotifications = storage.getString('notifications');
    if (storedNotifications) {
      const parsedNotifications = JSON.parse(storedNotifications);
      setNotifications(parsedNotifications);
      setDisplayedNotifications(parsedNotifications.slice(0, 10));
    }
  }, []);

  const saveNotifications = useCallback((notifications: Notification[]) => {
    storage.set('notifications', JSON.stringify(notifications));
  }, []);

  const deleteNotification = useCallback(
    (id: string) => {
      setNotifications(prevNotifications => {
        const updatedNotifications = prevNotifications.filter(
          notification => notification.id !== id,
        );
        saveNotifications(updatedNotifications);
        setDisplayedNotifications(updatedNotifications.slice(0, 10));
        return updatedNotifications;
      });
    },
    [saveNotifications],
  );

  const generateUniqueId = (remoteMessage: any): string => {
    return `${remoteMessage.messageId || ''}-${new Date().getTime()}`;
  };

  useEffect(() => {
    const requestUserPermission = async () => {
      const fcmToken = await messaging().getToken();
      console.log('Your Firebase Token is:', fcmToken);

      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    };

    requestUserPermission();
    loadNotifications();

    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('A new foreground FCM message arrived!', remoteMessage);

      if (remoteMessage.notification) {
        const newNotification = {
          id: generateUniqueId(remoteMessage),
          title: remoteMessage.notification?.title ?? '',
          body: remoteMessage.notification?.body ?? '',
        };

        setNotifications(prevNotifications => {
          const updatedNotifications = [...prevNotifications, newNotification];
          saveNotifications(updatedNotifications);
          setDisplayedNotifications(updatedNotifications.slice(0, 10));
          return updatedNotifications;
        });
      }
    });

    const unsubscribeBackground = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);

        if (remoteMessage?.notification) {
          const newNotification = {
            id: generateUniqueId(remoteMessage),
            title: remoteMessage?.notification?.title ?? '',
            body: remoteMessage?.notification?.body ?? '',
          };

          setNotifications(prevNotifications => {
            const updatedNotifications = [
              ...prevNotifications,
              newNotification,
            ];
            saveNotifications(updatedNotifications);
            setDisplayedNotifications(updatedNotifications.slice(0, 10));
            return updatedNotifications;
          });
        }
      },
    );

    const unsubscribeOpenedApp = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage,
        );
        if (remoteMessage.notification) {
          const newNotification = {
            id: generateUniqueId(remoteMessage),
            title: remoteMessage.notification?.title ?? '',
            body: remoteMessage.notification?.body ?? '',
          };

          setNotifications(prevNotifications => {
            const updatedNotifications = [
              ...prevNotifications,
              newNotification,
            ];
            saveNotifications(updatedNotifications);
            setDisplayedNotifications(updatedNotifications.slice(0, 10));
            return updatedNotifications;
          });
        }
      },
    );

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          if (remoteMessage.notification) {
            const newNotification = {
              id: generateUniqueId(remoteMessage),
              title: remoteMessage.notification?.title ?? '',
              body: remoteMessage.notification?.body ?? '',
            };

            setNotifications(prevNotifications => {
              const updatedNotifications = [
                ...prevNotifications,
                newNotification,
              ];
              saveNotifications(updatedNotifications);
              setDisplayedNotifications(updatedNotifications.slice(0, 10));
              return updatedNotifications;
            });
          }
        }
      });

    return () => {
      unsubscribeForeground();
      unsubscribeOpenedApp();
      // unsubscribeBackground();
    };
  }, [loadNotifications, saveNotifications]);

  return (
    <View style={styles.root}>
      <Text style={[styles.header, TypographyStyles.LargeNoneBold]}>
        Notifications
      </Text>
      <FlatList
        data={displayedNotifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationContainer}>
            <View>
              <Text style={TypographyStyles.RegularNoneSemiBold}>
                {item.title}
              </Text>
              <Text style={TypographyStyles.RegularNormalRegular}>
                {item.body}
              </Text>
            </View>
            <Pressable onPress={() => deleteNotification(item.id)}>
              <SvgImage
                pressableHitSLop={standardHitSlopSize}
                color={colors.red.base}
                source={require('assets/vectors/trash-2.svg')}
              />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  header: {
    ...CommonStyles.textAlignCenter,
    marginBottom: 16,
  },
  notificationContainer: {
    ...CommonStyles.alignCenterJustifyBetweenRow,
    backgroundColor: colors.white,
    padding: 18,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
