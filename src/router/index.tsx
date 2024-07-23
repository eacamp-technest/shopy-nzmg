import React, { useCallback, useEffect, useState } from 'react';
import { MainStackRouter } from './Main.Router';
import { AuthRouter } from './Auth.Router';
import { NavigationContainer } from '@react-navigation/native';
import { useUserStore } from 'store/user/user.store';
import BootSplash from 'react-native-bootsplash';

const delay = (ms: number, cb?: any) =>
  new Promise(resolve => setTimeout(resolve, ms, cb));

const Router = () => {
  const [ready, setReady] = useState<boolean>(false);
  const {
    user,
    actions: { initialize },
  } = useUserStore(state => state);
  const init = useCallback(async () => {
    await delay(1500, initialize());
    setReady(true);
    await BootSplash.hide({ fade: true });
  }, [initialize]);

  useEffect(() => {
    console.log(user);
    init();
  }, [init]);

  if (!ready) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <MainStackRouter /> : <AuthRouter />}
    </NavigationContainer>
  );
};

export default Router;
