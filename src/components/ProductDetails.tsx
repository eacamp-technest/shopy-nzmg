import {StyleSheet, Text, View,ViewStyle,StyleProp,Image} from 'react-native';
import React from 'react';
import Actionable from '../assets/vectors/Right-Actionable.svg';
import Star from '../assets/vectors/star.svg';
import Plus from '../assets/vectors/plus.svg';
import { colors } from 'theme/colors';
import { Buttons } from './Buttons';
import { Navbar } from './Navbar';
interface IProduct{
  title?:string,
  price?:number,
  image?:string,
  press?:()=>void
  style?:StyleProp<ViewStyle>
}
const ProductDetails:React.FC<IProduct> = ({title,price,image,press,style}) => {
    const vectors = {
        arrow_left: {
          icon: require('../assets/vectors/chevron-left.svg'),
          color: colors.ink.base,
        },
        shop: {
            icon: require('../assets/vectors/shopping-bag.svg'),
            color: colors.ink.base,
          },
    }
  return (
    <View style={style}>
      <View style={styles.image}>
      <Navbar
          left={vectors.arrow_left}
          leftActionType='icon'
          rightActionType='icon'
          right={vectors.shop}
          
          rootStyle={{paddingHorizontal:24}}
        />
      <Image source={image} />
      </View>
      <View style={styles.contexts}>
        <View style={styles.con}>
          <Text style={styles.textTitle}>SHOES</Text>
          <View style={styles.contextsTitle}>
            <Text style={styles.textName}>{title}</Text>
            <Actionable style={styles.actionable} />
          </View>
          <View style={styles.contextStart}>
            <View style={styles.start}>
              <Star style={styles.starts} />
              <Star style={styles.starts} />
              <Star style={styles.starts} />
              <Star style={styles.starts} />
              <Star style={styles.starts} />
              <Text>{'(24)'}</Text>
            </View>

            <Text style={styles.textPrice}>{price}</Text>
          </View>
        </View>
        <View style={styles.contextsSize}>
            <View>
                <Text style={styles.textSize}>Size</Text>
                <Text style={styles.textSizes}>fssf</Text>
            </View>
           <Plus style={styles.plus} />
        </View>
        <View style={styles.contextsColor}>
            <Text style={styles.textColor}>Colors</Text>
            <View style={styles.colors}>
                <View style={[styles.colorsView,{backgroundColor:colors.sky.lighter}]}></View>
                <View style={[styles.colorsView,{backgroundColor:colors.red.darkest}]}></View>
                <View style={[styles.colorsView,{backgroundColor:colors.mellowApricot.base}]}></View>
                <View style={[styles.colorsView,{backgroundColor:colors.bdazzleBlue.base}]}></View>
            </View>
        </View>
        <Buttons text='Add to cart' />
      </View> 
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:350,
    
    },
    contexts:{
        paddingHorizontal:24,
    },
    con:{
       borderBottomWidth:2,
       borderBottomColor:colors.sky.lighter,
       paddingVertical:36,
       gap:20
    },
    contextsTitle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-between"
    },
    contextStart:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-between"
    },
    start:{
        flexDirection:'row',
        gap:5,
        alignItems:'center',
    },
    arrow:{
        width:10,
        height:20,
        color:colors.ink.base
    },
    shop:{
        width:10,
        height:20,
        color:colors.ink.base
    },
    contextsSize:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
        paddingVertical:22
    },
    contextsColor:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
        paddingVertical:20,
    },
    colors:{
        flexDirection:'row',
        alignItems:"center",
        gap:16
    },
    colorsView:{
       width:40,
       height:40,
       borderRadius:40,
       
    },
    
    actionable: {
    width: 26,
    height: 26,
    
  },
  starts: {
    width: 16,
    height: 16,
    color: 'yellow',
  },
  plus:{
    width:14,
    height:14,
    color:colors.ink.base
  },
  textTitle:{
    fontSize:16,
    fontWeight:"600",
    color:colors.primary.base
  },
  textName:{
    fontSize:24,
    fontWeight:"700",
    color:colors.ink.base
  },
  textPrice:{
    fontSize:18,
    fontWeight:"700",
    color:colors.ink.base
  },
  textSize:{
    fontSize:16,
    fontWeight:"600",
    color:colors.ink.base
  },
  textSizes:{
    fontSize:14,
    fontWeight:"400",
    color:"#72777A"
  },
  textColor:{
    fontSize:16,
    fontWeight:"600",
    color:colors.ink.base
  }
});
