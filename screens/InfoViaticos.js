import React, {} from "react";
import {View, Text, Modal, TouchableOpacity, Button,StyleSheet} from 'react-native';
import { GlobalStyles } from "../estilos/global_styles";
import {FontAwesome } from '@expo/vector-icons';

export default function  InfoViaticos ({infoVisible, infoViaticos, AbrirModal}) {
  
    return(
        <View>
            <Modal
         visible={infoVisible}
         animationType='slide'
         transparent={true} >

    <View style={Styles.container}> 
      <View style={GlobalStyles.InfoStyle}>
      <View style={Styles.diario}>
      <Text style={GlobalStyles.InfoTX}>
      <Text style={{fontSize:16 }}>Marca con 
      <Text style={{fontWeight: 'bold',
                    fontSize:16,
                    color:'Black' }}> NEGRO</Text> </Text> los dias que tienen 1 viatico diario.
      </Text>
    </View>
    <View style={Styles.doble}>
      <Text style={GlobalStyles.InfoTX}>
      <Text style={{fontSize:16 }}>Marca con 
      <Text style={{fontWeight: 'bold',
                    fontSize:16,
                    color: 'green' }}> VERDE</Text> </Text> los dias que tiene 2 viaticos diarios.
      </Text>
    </View>
    </View>
    <View style={GlobalStyles.bandejasStyle}>
      <Text style={GlobalStyles.InfoTX}>
      <Text style={{fontSize:16 }}>Ingresa el valor de bandeja de cada escala</Text>
      </Text>
      <FontAwesome name="money" size={36} color="black" onPress={AbrirModal}/>

    </View>
    <View style={{flex:1, justifyContent:'center', marginTop:2, alignItems:'center'}}>
    <TouchableOpacity style={GlobalStyles.CloseModal}>    
            <Button 
             title= 'Cerrar'
             onPress={()=>{infoViaticos()} }
             color= 'brown'
             ></Button>
      </TouchableOpacity>
      <Text style={{fontWeight:'bold'}}>Version 1.2.0</Text>

    </View>
    </View>
  </Modal>
        </View>
    )
};
const Styles = StyleSheet.create({
container:{
  flex:0.55,
  justifyContent:'flex-start' , 
  opacity:0.80,
  marginTop:100,
  backgroundColor:`#f8f8ff`,
  borderWidth:3,
  padding:3,
  margin:10,
  borderRadius:10,
},
diario:{
  flex: 0.7,
  alignItems:'center',
  marginRight:'10%',
  borderRightWidth:1,
  borderStyle:'dotted'
},
doble:{
  flex: 0.7,
  alignItems:'center', 
  borderLeftWidth:1,
  borderStyle:'dotted'

},
});