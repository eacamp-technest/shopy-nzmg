import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Edges, SafeAreaView} from 'react-native-safe-area-context';
import {WelcomeScreen} from 'screens/auth/Welcome.Screen';
import {VerificationScreen} from 'screens/auth/Verification.Screen';
import {LoginScreen} from 'screens/auth/Login.Screen';
import {PaymentMethodScreen} from 'screens/auth/PaymentMethod.Screen';
import {RegisterScreen} from 'screens/auth/Register.Screen';
import { ModalScreen } from 'screens/Modal.Screen';
import { CreateYourCardScreen } from 'screens/auth/CreateYourCard.Screen';
import {Routes} from './routes';
import {NavigationParamList} from 'types/navigation.types';
import {CommonStyles} from 'theme/common.styles';
import { modalScreenOptions } from 'configs/navigation.configs';
import {
  authStackScreenOption,
  defaultScreenOptions,
} from 'configs/navigation.configs';

const AuthStack = createNativeStackNavigator<NavigationParamList>();

const edges: Edges = {
  bottom: 'off',
  top: 'additive',
};

export const AuthRouter = () => {
  return (
    <SafeAreaView style={CommonStyles.flex} edges={edges}>
      <AuthStack.Navigator
        screenOptions={authStackScreenOption}
        initialRouteName={Routes.welcome}>
        <AuthStack.Screen
          name={Routes.welcome}
          component={WelcomeScreen}
          options={defaultScreenOptions}
        />
        <AuthStack.Screen
          name={Routes.verification}
          component={VerificationScreen}
        />
        <AuthStack.Screen name={Routes.login} component={LoginScreen} />
        <AuthStack.Screen
          name={Routes.paymentMethod}
          component={PaymentMethodScreen}
        />
        <AuthStack.Screen name={Routes.register} component={RegisterScreen} />
        <AuthStack.Screen name={Routes.modalScreen} component={ModalScreen} options={modalScreenOptions}  />
        <AuthStack.Screen name={Routes.createyourcard} component={CreateYourCardScreen} />
      </AuthStack.Navigator>
    </SafeAreaView>
  );
};
