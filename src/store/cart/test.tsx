// import { StyleSheet, Text, View } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { Navbar } from 'components/Navbar';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { NavigationParamList } from 'types/navigation.types';
// import { Routes } from 'router/routes';
// import { colors } from 'theme/colors';
// import { Buttons } from 'components/Buttons';
// import { Divider } from 'components/Divider';
// import { Address } from 'components/Address';
// import { normalize } from 'theme/metrics';

// export const YourAddress: React.FC<
//     NativeStackScreenProps<NavigationParamList, Routes.yourAddress>
// > = ({ navigation, route }) => {
//     const [addresses, setAddresses] = useState([
//         { name: 'Brokliin', address: '2118 Thornridge Cir. Syracuse, Connecticut 35624' },
//         { name: 'Brooklyn Simmons', address: 'Baku' },
//     ]);
//     const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);

//     const handleSave = (index: number, name: string, address: string) => {
//         const newAddresses = [...addresses];
//         newAddresses[index] = { name, address };
//         setAddresses(newAddresses);
//     };

//     const handleSelect = (index: number) => {
//         setSelectedAddressIndex(index);
//     };

//     const handleAddAddress = (newAddress: { name: string; address: string }) => {
//         setAddresses([...addresses, newAddress]);
//     };

//     useEffect(() => {
//         if (route.params?.newAddress) {
//             handleAddAddress(route.params.newAddress);
//         }
//     }, [route.params?.newAddress]);

//     return (
//         <View style={styles.container}>
//             <Navbar
//                 onLeftPress={() => navigation.goBack()}
//                 title="YOUR ADDRESS"
//                 titleColor={colors.ink.base}
//                 leftActionType="icon"
//                 mode="light"
//                 left={require('assets/vectors/left.svg')}
//                 rootStyle={styles.nav}
//             />
//             {addresses.map((addr, index) => (
//                 <React.Fragment key={index}>
//                     <Address
//                         name={addr.name}
//                         address={addr.address}
//                         onSave={(name, address) => handleSave(index, name, address)}
//                         selected={index === selectedAddressIndex}
//                         onSelect={() => handleSelect(index)}
//                     />
//                     {index < addresses.length - 1 && <Divider height="M" />}
//                 </React.Fragment>
//             ))}
//             <Buttons
//                 types="outlined"
//                 text="Add new address"
//                 onPress={() => navigation.navigate(Routes.addAddress, { onAddAddress: handleAddAddress })}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: normalize('horizontal', 24),
//     },
//     nav: {
//         paddingHorizontal: normalize('horizontal', 24),
//     },
// });




// addAddress


// import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import React, { useRef, useState } from 'react';
// import { NavigationParamList } from 'types/navigation.types';
// import { Routes } from 'router/routes';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { colors } from 'theme/colors';
// import { Navbar } from 'components/Navbar';
// import { InputControlled } from 'components/InputControlled';
// import { FormRules } from 'constants/formRules';
// import { useForm } from 'react-hook-form';
// import { normalize } from 'theme/metrics';
// import { TypographyStyles } from 'theme/typography';
// import { Divider } from 'components/Divider';
// import { Buttons } from 'components/Buttons';
// import PhoneInput from 'react-native-phone-number-input';
// import { countries, ICountry } from 'data/countries';

// interface IAddress {
//     fullName: string;
//     country?: string;
//     mobile?: string;
//     address: string;
// }

// export const AddAddressScreen: React.FC<
//     NativeStackScreenProps<NavigationParamList, Routes.addAddress>
// > = ({ navigation, route }) => {
//     const { control, handleSubmit, formState: { errors } } = useForm<IAddress>({
//         defaultValues: {
//             fullName: 'Brooklyn Simmons',
//             country: 'Azerbaijan',
//             address: '2118 Thornridge Cir. Syracuse,Connecticut 35624',
//             mobile: '055 555 55 55'
//         },
//     });

//     const onSubmit = (data: IAddress) => {
//         console.log('Data', data);
//         route.params.onAddAddress(data);
//         navigation.navigate(Routes.yourAddress);
//     };

//     const [value, setValue] = useState("");
//     const [formattedValue, setFormattedValue] = useState("");
//     const phoneInput = useRef<PhoneInput>(null);
//     const [country, setCountry] = useState<ICountry | null>(null);

//     return (
//         <ScrollView style={styles.container}>
//             <Navbar
//                 onLeftPress={() => navigation.goBack()}
//                 title="ADD ADDRESS"
//                 titleColor={colors.ink.base}
//                 leftActionType="icon"
//                 mode='light'
//                 left={require('assets/vectors/left.svg')}
//                 rootStyle={styles.nav}
//             />
//             <Text style={styles.details}>CONTACT DETAILS</Text>
//             <View style={styles.inputs}>
//                 <InputControlled
//                     control={control}
//                     name="fullName"
//                     label="Your Name"
//                     errorMessage={errors.fullName?.message}
//                     rules={FormRules.fullName}
//                     type="text"
//                     placeholder="Enter Your Name"
//                 />
//                 <View style={styles.select}>
//                     <Text style={styles.label}>Mobile</Text>
//                     <PhoneInput
//                         ref={phoneInput}
//                         defaultValue={value}
//                         defaultCode="AZ"
//                         layout="first"
//                         placeholder='Enter Your Mobile'
//                         onChangeText={(text) => {
//                             setValue(text);
//                         }}
//                         onChangeFormattedText={(text) => {
//                             setFormattedValue(text);
//                         }}
//                         textInputStyle={{ ...TypographyStyles.RegularNoneRegular, color: colors.ink.lighter }}
//                         codeTextStyle={{ ...TypographyStyles.InterRegular, color: colors.ink.base }}
//                         containerStyle={styles.containerStyle}
//                         textContainerStyle={styles.textContainerStyle}
//                     />
//                 </View>
//             </View>
//             <Divider height='L' />
//             <Text style={styles.details}>ADDRESS DETAILS</Text>
//             <View style={styles.inputs}>
//                 <InputControlled
//                     control={control}
//                     type='select'
//                     name="country"
//                     label="Country"
//                     placeholder="Azerbaijan"
//                     options={countries}
//                     rules={FormRules.country}
//                     errorMessage={errors.country?.message}
//                     onSelect={(option) => setCountry(option)}
//                 />
//                 <InputControlled
//                     control={control}
//                     name="address"
//                     type='text'
//                     label="Address"
//                     rules={FormRules.address}
//                     errorMessage={errors.address?.message}
//                     placeholder="Enter Your Address"
//                 />
//             </View>
//             <Buttons style={styles.button} text='Deliver to this address' onPress={handleSubmit(onSubmit)} />
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     nav: {
//         paddingHorizontal: normalize('horizontal', 24),
//     },
//     inputs: {
//         paddingHorizontal: normalize('horizontal', 24),
//         marginBottom: normalize('vertical', 32),
//         gap: 24,
//     },
//     details: {
//         ...TypographyStyles.title3,
//         paddingHorizontal: normalize('horizontal', 24),
//         color: colors.ink.base,
//         textTransform: 'uppercase',
//         marginBottom: 16,
//         marginTop: 32,
//     },
//     button: {
//         marginHorizontal: normalize('horizontal', 24),
//         marginTop: 54,
//     },
//     containerStyle: {
//         borderRadius: 8,
//         width: 341,
//         borderColor: colors.sky.light,
//         borderWidth: 1,
//     },
//     textContainerStyle: {
//         backgroundColor: colors.white,
//         borderRadius: 8,
//         paddingVertical: 8,
//     },
//     label: {
//         ...TypographyStyles.RegularNoneSemiBold,
//         color: colors.ink.base,
//     },
//     select: {
//         gap: 12,
//     },
// });