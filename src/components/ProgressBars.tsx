import {StyleSheet, Text, View, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {colors} from 'theme/colors';
interface IBars {
  progress: bars;
  width?: number;
  style?: StyleProp<ViewStyle>;
}
type bars = 'bars' | 'fullwidth';
function renderBars(value: string,width:any) {
  switch (value) {
    case 'bars':
      return (
        <View style={styles.bars}>
          <View
            style={[styles.barsColor, {width: width > 0 ? width : 0}]}></View>
        </View>
      );
    case 'fullwidth':
        
      return (
        <View style={styles.fullbars}>
          <View
            style={[styles.fullbarsColor, {width: width > 0 ? width : 0}]}></View>
        </View>
      );
    default :
       return   
  }
}

const ProgressBars: React.FC<IBars> = ({width, style,progress}) => {
  return (
    <View style={[styles.root, style]}>
      {renderBars(progress,width)}
    </View>
  );
};

export default ProgressBars;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bars: {
    width: 327,
    height: 4,
    backgroundColor: colors.sky.light,
    borderRadius: 100,
    overflow: 'hidden',
  },
  barsColor: {
    height: 4,
    backgroundColor: colors.primary.base,
    borderRadius: 100,
  },
  fullbars: {
    width: 375,
    height: 4,
    backgroundColor: colors.sky.light,
    borderRadius: 100,
    overflow: 'hidden',
  },
  fullbarsColor: {
    height: 4,
    backgroundColor: colors.primary.base,
    borderRadius: 100,
  },
});
