import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Animated, Pressable} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {colors} from 'theme/colors';

export const BottomSheet = ({setStatus}: {setStatus: any}) => {
  const slide = React.useRef(new Animated.Value(300)).current;
  const lastOffset = React.useRef(0);
  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: slide}}],
    {useNativeDriver: true},
  );

  const slideUp = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      lastOffset.current = 0;
      slide.setOffset(lastOffset.current);
      slide.setValue(0);
    });
  };

  const slideDown = () => {
    Animated.timing(slide, {
      toValue: 300,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      lastOffset.current = 300;
      slide.setOffset(lastOffset.current);
      slide.setValue(0);
    });
  };

  useEffect(() => {
    slideUp();
  }, []);

  const closeModal = () => {
    slideDown();

    setTimeout(() => {
      setStatus(false);
    }, 800);
  };

  return (
    <Pressable onPress={closeModal} style={styles.backdrop}>
      <Pressable style={{width: '100%', height: '60%'}}>
        <GestureHandlerRootView>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={event => {
              if (event.nativeEvent.oldState === 4) {
                lastOffset.current += event.nativeEvent.translationY;
                if (lastOffset.current >= 300) {
                  closeModal();
                } else {
                  slideUp();
                }
              }
            }}>
            <Animated.View
              style={[
                styles.bottomSheet,
                {
                  transform: [
                    {translateY: Animated.add(slide, lastOffset.current)},
                  ],
                },
              ]}>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                Login / SignUp
              </Text>
              <View style={{marginTop: 20}}></View>
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    backgroundColor: colors.backdrop,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  size: {
    width: '100%',
    height: '60%',
  },
  bottomSheet: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});
