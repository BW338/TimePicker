import React, {} from "react";
import {View, Text, Modal, TouchableOpacity, Button, Animated} from 'react-native';
import { GlobalStyles } from "../estilos/global_styles";
import { Foundation, AntDesign, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function  Info ({infoVisible, infoOn}) {
      
  
    return(
        <View>
            <Modal visible={infoVisible}
         animationType='slide'
         transparent={true}

         >

    <View style={{flex:0.58,
                  justifyContent:'flex-start' , 
                  opacity:0.80,
                  marginTop:100,
                  backgroundColor:`#f8f8ff`,
                  borderWidth:3,
                  padding:3,
                  margin:10,
                  borderRadius:10,
                  }}> 
      <View style={GlobalStyles.InfoStyle}>
      <View style={{ flex: 1, alignItems:'center'}}>
      <Text style={GlobalStyles.InfoTX}>
      <Text style={{fontWeight: 'bold', fontSize:16 }}>Ingresar </Text> horario de presentacion
      <Text style={{fontWeight: 'bold', fontSize:16, textAlign:'center'}}>  (Check-In)</Text>
      </Text>
    </View>
    <View style={{ flex: 1, alignItems:'center'}}>
      <Text style={GlobalStyles.InfoTX}>
      <Text style={{fontWeight: 'bold', fontSize:16 }}>Ingresar </Text> horario de despegue
      <Text style={{fontWeight: 'bold', fontSize:16, textAlign:'center'}}>  (ETD)</Text>
      </Text>
    </View>
    <View style={{ flex: 1, alignItems:'center'}}>
      <Text style={GlobalStyles.InfoTX}>
      <Text style={{fontWeight: 'bold', fontSize:16 }}>Ingresar </Text> horario de Aterrizaje
      <Text style={{fontWeight: 'bold', fontSize:16, textAlign:'center'}}>  (ETA)</Text>
      </Text>
    </View>
    </View>
    <View style={{marginLeft:'4%', marginTop:'5%', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
    <Foundation name="clipboard-notes"
                size={50} color={'#006400'}
                /> 
                <View>
      <Text style={{marginLeft:5, fontSize:17, textAlign:'center', maxWidth:'70%'}}> Boton de acceso a planilla de <Text style={{ fontWeight: 'bold' }}>HS FLEX</Text>  </Text>
      <Text style={{ fontSize:14, marginLeft:8,maxWidth:'60%', textAlign:'center'}}>*Se habilita en vuelos de mas de 8 horas</Text>
      </View>
    </View>
    <View style={{flex:1, justifyContent:'center', marginTop:2, alignItems:'center'}}>
    <TouchableOpacity style={GlobalStyles.CloseModal}>    
            <Button 
             title= 'Cerrar'
             onPress={()=> {infoOn()  } }
             color= 'brown'
             ></Button>
      </TouchableOpacity>
      <Text style={{fontWeight:'bold'}}>Version 1.1.3</Text>
    </View>
    </View>
  </Modal>
        </View>
    )
}

