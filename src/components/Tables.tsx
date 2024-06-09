<<<<<<< HEAD

import {StyleSheet, Text, View, Image,ViewStyle, StyleProp,TouchableOpacity,Pressable,Switch} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React,{useState} from 'react';
import { TypographyStyles } from "theme/typography";
import { colors } from "theme/colors";
import { normalize } from "theme/metrics";
import {SvgImage} from './SvgImages';

type TLeft =
  | 'text'
  | 'image'
  | 'icon'
  
type TRight =
  | 'link'
  | 'checkbox'
  | 'button'
  | 'switch';

interface ITables {
  context?:string;
  left?: TableSide;
  right?: TableSide;
  caption?:TableSide;
  style?: StyleProp<ViewStyle>;
  LeftActionType?: TLeft;
  rightActionType?: TRight;
}
type TableSide =  string | React.ReactNode | undefined ;

const Tables:React.FC<ITables> = ({context,left,right,caption,LeftActionType,rightActionType,style}) => {
  function renderLeft(value:string,left:any){
    switch(value){
        case "text" :
            return <Text style={styles.context}>{left}</Text>
        case 'image' :
            return  <Image  source={{uri:left}} style={styles.image}/>  
        case 'icon' :
            return <SvgImage
            color={colors.ink.darkest}
            source={left}
           
          />
        default :
            return;    
    }
}
function renderRight(value :string , right:any){
    const [isSelected, setSelection] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(prevState => !prevState)
    switch (value){
        case 'link' :
            return <TouchableOpacity >
              <Text style={styles.link}>{right}</Text>
            </TouchableOpacity>
        case 'checkbox' :
            return <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            
           
          />
        case 'button':
            return <Pressable style={styles.button}><Text style={styles.buttonText}>{right}</Text></Pressable>   
            
        case 'switch':
            return <Switch
            trackColor={{ false: '#767577', true: colors.primary.base }}
            thumbColor={isEnabled ? 'white' : '#f4f3f4'}
            ios_backgroundColor={colors.primary.base}
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
        default :
           return    
    }
}
  return (
    <View style={[style,styles.root]}>
       <View style={styles.leftStyle}>
          {renderLeft(LeftActionType,left)}
          <View>
          {context ? (<Text style={styles.context}>{context}</Text> ):null}
          {caption ? (<Text style={styles.caption}>{caption}</Text> ):null}
          </View>
       </View>
       <View>
        {renderRight(rightActionType,right)}
       </View>
    </View>
  );
};



const styles = StyleSheet.create({
 root:{
  flexDirection:'row',
  paddingHorizontal:24,
  paddingVertical:12,
  justifyContent:'space-between',
  alignItems:"center"
 },
 leftStyle:{
  flexDirection:'row',
  gap:12,
  alignItems:"center"
  
 },
 link:{
  color:colors.primary.base,
  fontSize:16,
 fontWeight:"600"
 },
 button:{
  paddingHorizontal:16,
  paddingVertical:8,
  backgroundColor:colors.primary.base
 },
 buttonText:{
  color:colors.white,
  fontSize:16,
 fontWeight:"600"
 },
 context:{
  fontSize:16,
  fontWeight:"400"
 },
 caption:{
  fontSize:14,
  fontWeight:"400",
  
 },
 image:{
  width:40,
  height:40,
  borderRadius:40
 }
 
});
export default Tables;
=======
import {View, Text, Image, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {CommonStyles} from 'theme/common.styles';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';

interface ITables {
  title?: string;
  subTitle?: string;
  children?: ReactNode;
  avatar?: string;
}
export const Tables: React.FC<ITables> = ({
  title,
  subTitle,
  children,
  avatar,
}) => {
  return (
    <View style={[CommonStyles.alignCenterJustifyBetweenRow, styles.root]}>
      <View style={CommonStyles.row}>
        {avatar ? <Image style={styles.image} source={{uri: avatar}} /> : null}
        <View style={{gap: 4}}>
          <Text style={[TypographyStyles.RegularTightRegular, styles.title]}>
            {title}
          </Text>
          <Text style={[TypographyStyles.SmallTightRegular, styles.subTitle]}>
            {subTitle}
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 30,
    resizeMode: 'cover',
    marginRight: 12,
  },
  title: {
    color: colors.ink.darkest,
  },
  subTitle: {
    color: colors.ink.lighter,
  },
});
>>>>>>> 200f0f079d8506ab8d3672f92d2900c707050e09
