import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {TypographyStyles} from 'theme/typography';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {OrderCard} from 'components/specific/OrderCard';
import {ORDER} from 'constants/settings';
import {Buttons} from 'components/Buttons';

export const OrderScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.order>
> = ({navigation}) => {
  const [index, setIndex] = useState<number>(0);

  const Processing: React.FC = () => {
    const processing = ORDER.filter(order => order.status === 'Processing');

    return (
      <View>
        <FlatList
          data={processing}
          keyExtractor={item => item.orderNo}
          renderItem={({item, index}) => (
            <View style={styles.delivered}>
              {index !== 0 ? <View style={styles.line} /> : null}
              <OrderCard
                orderNo={item.orderNo}
                status={item.status}
                trackingNumber={item.trackingNumber}
                quantiy={item.quantiy}
                total={item.total}
                date={item.date}
              />
            </View>
          )}
        />
      </View>
    );
  };
  const Delivered: React.FC = () => {
    const deivered = ORDER.filter(order => order.status === 'Delivered');
    return (
      <View>
        <FlatList
          data={deivered}
          keyExtractor={item => item.orderNo}
          renderItem={({item, index}) => (
            <View style={styles.delivered}>
              {index !== 0 ? <View style={styles.line} /> : null}
              <OrderCard
                orderNo={item.orderNo}
                status={item.status}
                trackingNumber={item.trackingNumber}
                quantiy={item.quantiy}
                total={item.total}
                date={item.date}
              />
            </View>
          )}
        />
      </View>
    );
  };

  const Cancelled: React.FC = () => {
    const cancelled = ORDER.filter(order => order.status === 'Cancelled');
    return (
      <View>
        <FlatList
          data={cancelled}
          keyExtractor={item => item.orderNo}
          renderItem={({item, index}) => (
            <View style={styles.delivered}>
              {index !== 0 ? <View style={styles.line} /> : null}
              <OrderCard
                orderNo={item.orderNo}
                status={item.status}
                trackingNumber={item.trackingNumber}
                quantiy={item.quantiy}
                total={item.total}
                date={item.date}
              />
            </View>
          )}
        />
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
          onLeftPress={() => navigation.goBack()}
          left={require('../../assets/vectors/left.svg')}
          rootStyle={styles.header}
        />
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        swipeEnabled={true}
        renderTabBar={props => (
          <TabBar
            {...props}
            renderLabel={({route, color}) => (
              <Text style={[TypographyStyles.RegularNoneSemiBold, {color}]}>
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
      <Buttons
        text="Cleaner"
        onPress={() => navigation.navigate(Routes.success)}
        style={styles.button}
      />
    </SafeAreaProvider>
  );
};

const routes = [
  {key: 'processing', title: 'Processing'},
  {key: 'delivered', title: 'Delivered'},
  {key: 'cancelled', title: 'Cancelled'},
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
  delivered: {
    gap: 32,
  },
  line: {
    backgroundColor: colors.sky.lighter,
    width: '100%',
    height: 1,
    marginTop: 18,
  },
  button: {
    paddingTop: 10,
    marginHorizontal: normalize('horizontal', 24),
  },
});
