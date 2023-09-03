import React, {} from "react";
import {View, Text, Modal, TouchableOpacity, Button, Animated} from 'react-native';
import { GlobalStyles } from "../estilos/global_styles";
import { Foundation, AntDesign, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function  Info2 ({infoVisible, infoOn2, AbrirModal}) {
      
  
    return(
        <View>
            <Modal visible={infoVisible}
         animationType='slide'
         transparent={true}>

    <View style={GlobalStyles.ContenedorInfo}> 
      <View style={GlobalStyles.InfoStyle}>
      <View style={{flex: 0.7,
                    alignItems:'center',
                    marginRight:'10%',
                    borderRightWidth:1,
                    borderStyle:'dotted'}}>
    
      <Text style={GlobalStyles.InfoTX}>
      <Text style={{fontSize:16 }}>Marca con 
      <Text style={{fontWeight: 'bold',
                    fontSize:16,
                    color:'blue' }}> AZUL</Text> </Text> los dias que tiene 2 HS FLEX.
      </Text>
    </View>
    <View style={{ flex: 0.7,
                   alignItems:'center', 
                   borderLeftWidth:1,
                   borderStyle:'dotted'}}>
      <Text style={GlobalStyles.InfoTX}>
      <Text style={{fontSize:16 }}>Marca con 
      <Text style={{fontWeight: 'bold',
                    fontSize:16,
                    color: 'green' }}> VERDE</Text> </Text> los dias que tiene 4 HS FLEX.
      </Text>
    </View>
    </View>
    <View style={GlobalStyles.bandejasStyle}>
      <Text style={GlobalStyles.InfoTX}>
      <Text style={{fontSize:16 }}>Ingresa el valor de tu HR FLEX para calcular el total</Text>
      </Text>
      <MaterialCommunityIcons name="account-cash-outline" size={28} color="black" onPress={AbrirModal}/>

    </View>
    <View style={{flex:1, justifyContent:'center', marginTop:2, alignItems:'center'}}>
    <TouchableOpacity style={GlobalStyles.CloseModal}>    
            <Button 
             title= 'Cerrar'
             onPress={()=> {infoOn2() } }
             color= 'brown'
             ></Button>
      </TouchableOpacity>
      <Text style={{fontWeight:'bold'}}>Version 1.2.0</Text>

    </View>
    </View>
  </Modal>
        </View>
    )
}

