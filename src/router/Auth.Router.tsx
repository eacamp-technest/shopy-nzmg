import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Edges, SafeAreaView} from 'react-native-safe-area-context';
import {WelcomeScreen} from 'screens/auth/Welcome.Screen';
import {VerificationScreen} from 'screens/auth/Verification.Screen';
import {LoginScreen} from 'screens/auth/Login.Screen';
import {PaymentMethodScreen} from 'screens/auth/PaymentMethod.Screen';
import {RegisterScreen} from 'screens/auth/Register.Screen';
import {ModalScreen} from 'screens/Modal.Screen';
import {CreateYourCardScreen} from 'screens/auth/CreateYourCard.Screen';
import {Routes} from './routes';
import {NavigationParamList} from 'types/navigation.types';
import {CommonStyles} from 'theme/common.styles';
import {modalScreenOptions} from 'configs/navigation.configs';
import {
  authStackScreenOption,
  defaultScreenOptions,
} from 'configs/navigation.configs';
import {YourCardScreen} from 'screens/auth/YourCard.Screen';
import {TestScreen} from 'Test.Screen';
import {AddNewCardScreen} from 'screens/auth/AddNewCard.Screen';

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
        initialRouteName={Routes.createyourcard}>
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
        <AuthStack.Screen
          name={Routes.modalScreen}
          component={ModalScreen}
          options={modalScreenOptions}
        />
        <AuthStack.Screen
          name={Routes.createyourcard}
          component={CreateYourCardScreen}
        />
        <AuthStack.Screen name={Routes.test} component={TestScreen} />
        <AuthStack.Screen name={Routes.yourCard} component={YourCardScreen} />
        <AuthStack.Screen
          name={Routes.addnewcard}
          component={AddNewCardScreen}
        />
      </AuthStack.Navigator>
    </SafeAreaView>
  );
};
