import { SafeAreaView } from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import { NavigationParamList } from "../types/navigation.types";
import { CommonStyles } from "../theme/common.styles";
import { Routes } from "./routes";
import { VerificationScreen } from "../screens/auth/Verification.Screen";
import { LoginScreen } from "../screens/auth/Login.Screen";
import { WelcomeScreen } from "../screens/auth/Welcome.Screen";
import { RegisterScreen } from "../screens/auth/Register.Screen";
import { PaymentMethodScreen } from "../screens/auth/PaymentMethod.Screen";
import { authStackScreenOption } from "../configs/navigation.configs";
import createNativeStackNavigator from "@react-navigation/native-stack/lib/typescript/src/navigators/createNativeStackNavigator";

const AuthStack = createNativeStackNavigator<NavigationParamList>();



export const AuthRouter = () => {
  return (
    <SafeAreaView style={CommonStyles.flex}>
      <AuthStack.Navigator
        screenOptions={authStackScreenOption}
        initialRouteName={Routes.welcome}>
        <AuthStack.Screen name={Routes.welcome} component={WelcomeScreen} />
        <AuthStack.Screen name={Routes.login} component={LoginScreen} />
        <AuthStack.Screen name={Routes.register} component={RegisterScreen} />
        <AuthStack.Screen
          name={Routes.verification}
          component={VerificationScreen}
        />
        <AuthStack.Screen
          name={Routes.paymentMethod}
          component={PaymentMethodScreen}
        />
      </AuthStack.Navigator>
    </SafeAreaView>
  );
};

