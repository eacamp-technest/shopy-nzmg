import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from 'types/navigation.types';
import { Routes } from 'router/routes';
import { Navbar } from 'components/Navbar';
import { colors } from 'theme/colors';
import { normalize } from 'theme/metrics';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { TypographyStyles } from 'theme/typography';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { ORDER } from 'constants/settings';

export const OrderScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.order>
> = ({ navigation }) => {
  const [index, setIndex] = useState<number>(0);

  const Processing: React.FC = () => {
    return (
      <View>
        <Text>Prosessing</Text>
      </View>
    );
  };
  const Delivered: React.FC = () => {
    return (
      <View>
        <FlatList
          data={ORDER}
          renderItem={({ item }) => (
            <View>
              <View>
                <Text>Order No {item.orderNo}</Text>
                <Text> {item.date}</Text>
              </View>
              <Text>Tracking Number</Text>
            </View>
          )} />
      </View>
    );
  };

  const Cancelled: React.FC = () => {
    return (
      <View>
        <Text>Cancelled</Text>
      </View>
    );
  };

  const renderScene = SceneMap({
    processing: Processing,
    delivered: Delivered,
    cancelled: Cancelled,
  });
  return (
    <SafeAreaProvider>
      <View style={styles.head}>
        <Navbar
          title="MY ORDER"
          titleColor={colors.white}
          leftActionType="icon"
          left={require('../../assets/vectors/left.svg')}
          onLeftPress={() => navigation.goBack()}
          rootStyle={styles.header}
        />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        swipeEnabled={true}
        renderTabBar={props => (
          <TabBar
            {...props}
            renderLabel={({ route, color }) => (
              <Text style={[TypographyStyles.RegularNoneSemiBold, { color }]}>
                {route.title}
              </Text>
            )}
            inactiveColor={colors.white}
            activeColor={colors.skyBlue.base}
            contentContainerStyle={styles.contentContainerStyle}
          />
        )}
        animationEnabled={true}
        onIndexChange={setIndex}
        sceneContainerStyle={styles.sceneContainerStyle}
      />
    </SafeAreaProvider>
  );
};

const routes = [
  { key: 'processing', title: 'Processing' },
  { key: 'delivered', title: 'Delivered' },
  { key: 'cancelled', title: 'Cancelled' },
];
const styles = StyleSheet.create({
  head: {
    backgroundColor: colors.bdazzleBlue.darkest,
  },
  header: {
    marginHorizontal: normalize('horizontal', 24),
    marginBottom: 16,
  },
  contentContainerStyle: {
    backgroundColor: colors.bdazzleBlue.darkest,
  },
  sceneContainerStyle: {
    paddingTop: 10,
  },
});
