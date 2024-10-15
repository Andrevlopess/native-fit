
// import { useFormContext } from "@/hooks/useFormContext";
// import { s } from "@/styles/global";
// import { router } from "expo-router";
// import { ExpoRouter } from "expo-router/types/expo-router";
// import { TouchableOpacity, Text, Alert } from "react-native";

// export const FormCancelButton = () => {


//     const { dimissFormStack } = useFormContext()

//     const handleConfirm = () => {
//         Alert.alert(
//             'Deseja sair?',
//             'Os dados preenchidos até agora serão perdidos!',
//             [
//                 { text: 'Cancelar', onPress: () => { } },
//                 {
//                     text: 'Sair',
//                     onPress: () => {
//                         dimissFormStack();
//                     },
//                     style: 'destructive'
//                 }
//             ]
//         )
//     }
//     return (
//         <TouchableOpacity
//             style={[s.py12]}
//             onPress={handleConfirm}
//             activeOpacity={0.8}>
//             <Text style={[s.textBase, s.textIndigo600, s.semibold]}>Cancelar</Text>
//         </TouchableOpacity>
//     )
// }