// import COLORS from "@/constants/Colors";
// import { s } from "@/styles/global";
// import {
//   BottomSheetModal,
//   BottomSheetVirtualizedList
// } from "@gorhom/bottom-sheet";
// import { LinearGradient } from "expo-linear-gradient";
// import { AlertCircle, Check, ChevronDown, Search } from "lucide-react-native";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from "react-native";
// import { SharedValue } from "react-native-reanimated";
// import Button from "./Button";
// import Input from "./Input";
// import Modal from "./Modal";


// type snapPoints = (string | number)[] | SharedValue<(string | number)[]> | Readonly<(string | number)[] | SharedValue<(string | number)[]>> | undefined

// const NoOptionFoundFeedback = () => <Text style={[s.mxAuto, s.p24, s.semibold]}>Nenhuma opção encontrada!</Text>


// interface OptionProps {
//   value: string;
//   text: string;
//   onSelect?: () => void;
//   isSelected?: boolean;
// }

// export interface SelectProps {
//   defaultValue?: string;
//   placeholder?: string;
//   label: string;
//   disabled?: boolean;
//   error?: string;
//   loading?: boolean;
//   snapPoint?: snapPoints
//   enableFilter?: boolean;
//   data: OptionProps[];
//   onChange?: (value: string) => void;
//   icon?: React.ElementType;
// }

// const Option: React.FC<OptionProps> = React.memo(
//   ({ onSelect, isSelected, text }) => {
//     return (
//       <TouchableOpacity
//         activeOpacity={0.8}
//         onPress={onSelect}
//         style={[
//           s.flexRow,
//           s.justifyBetween,
//           s.itemsCenter,
//           s.flexRow,
//           s.py12,
//           s.px24,
//           [isSelected ? s.bgGray100 : null],
//         ]}
//       >
//         <Text
//           style={[
//             s.semibold,
//             s.textLG,
//             [isSelected ? s.textStone900 : s.textStone500],
//           ]}
//         >
//           {text}
//         </Text>

//         {isSelected && (
//           <Check
//             strokeWidth={2.5}
//             color={COLORS.blue}
//           />
//         )}
//       </TouchableOpacity>
//     );
//   },
//   (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected
// );

// const SelectList = ({
//   defaultValue,
//   label,
//   placeholder,
//   disabled,
//   loading,
//   data,
//   snapPoint,
//   error,
//   enableFilter = false,
//   onChange,
//   icon: Icon,
// }: SelectProps) => {


//   const selectedText = data.find(option => option.value === defaultValue)?.text
//   const [selectedValue, setSelectedValue] = useState<string>(defaultValue || '');
//   const [filteredOptions, setFilteredOptions] = useState<OptionProps[]>(data);

//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

//   useEffect(() => { setFilteredOptions(data) }, [data]);

//   const handleFilterOptions = (search: string) => {
//     setFilteredOptions(
//       data.filter(option => option.text.toLowerCase().includes(search.toLowerCase())))
//   }


//   const handleOptionSelect = () => {
//     if (onChange) {
//       onChange(selectedValue ?? defaultValue);

//       setTimeout(() => {
//         bottomSheetModalRef.current?.close();
//       }, 200);
//     }
//   };

//   const renderItem =
//     ({ item }: { item: OptionProps }) => (
//       <Option {...item}
//         isSelected={selectedValue == item.value}
//         onSelect={() => setSelectedValue(item.value)} />
//     )

//   return (
//     <>
//       <View style={[s.gap6]}>
//         {label && (
//           <Text style={[s.semibold, s.textStone800, s.px6, s.textLG, { opacity: disabled ? 0.4 : 1 }]}>
//             {label}
//           </Text>
//         )}
//         <TouchableOpacity
//           disabled={disabled}
//           activeOpacity={0.6}
//           onPress={() => bottomSheetModalRef.current?.present()}
//           style={[
//             s.radius14,
//             s.gap4,
//             s.p12,
//             s.justifyBetween,
//             s.itemsCenter,
//             s.flexRow,
//             s.bgGray100,
//             s.borderGray200,
//             { opacity: disabled ? 0.4 : 1 },
//           ]}
//         >
//           <View style={[s.flexRow, s.gap12, s.shrink1]}>
//             {Icon && <Icon color={COLORS.textGray} />}
//             <TextInput
//               style={[s.semibold, s.textBlack, s.textBase]}
//               value={selectedText}
//               readOnly
//               placeholder={placeholder}
//               placeholderTextColor={COLORS.placeholderGray}
//             />
//           </View>

//           {loading ? (
//             <ActivityIndicator
//               size={24}
//               color={COLORS.blue}
//             />
//           ) : (
//             <ChevronDown color={COLORS.textGray} />
//           )}
//         </TouchableOpacity>
//         {error && (
//           <View style={[s.flexRow, s.itemsCenter, s.px12]}>
//             <AlertCircle
//               size={18}
//               color={COLORS.red}
//             />
//             <Text style={[s.medium, s.textRed500, s.px6]}>{error}</Text>
//           </View>
//         )}
//       </View>

//       <Modal
//         ref={bottomSheetModalRef}
//         index={0}
//         snapPoints={snapPoint ?? ["80%"]}
//       >
//         <View style={[s.p12]}>
//           {enableFilter ? (
//             <Input
//               placeholder={`Buscar ${label}`}
//               icon={Search}
//               label={label}
//               onChangeText={handleFilterOptions}
//             />
//           ) : (
//             <Text style={[s.semibold, s.textXL, s.px12]}>{label}</Text>
//           )}
//         </View>

//         <BottomSheetVirtualizedList
//           contentContainerStyle={{ paddingBottom: 96 }}
//           data={filteredOptions}
//           keyExtractor={(item, index) => `${index}-${item.value}`}
//           getItemCount={(data) => data.length}
//           getItem={(data, index) => data[index]}
//           renderItem={renderItem}
//           ListEmptyComponent={<NoOptionFoundFeedback />}
//         />

//         <LinearGradient
//           colors={[`${COLORS.white}10`, COLORS.white]}
//           style={[s.flexRow, s.px12, s.py16, s.absolute, { bottom: 0 }]}
//         >
//           <Button
//             text="Feito"
//             onPress={handleOptionSelect}
//             style={[s.mx24, s.flex1]}
//           />
//         </LinearGradient>

//       </Modal>
//     </>
//   );
// };


// export { Option, SelectList };

