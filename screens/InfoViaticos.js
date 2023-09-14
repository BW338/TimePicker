import React, {} from "react";
import {View, Text, Modal, TouchableOpacity, Button,StyleSheet} from 'react-native';
import { GlobalStyles } from "../estilos/global_styles";
import {FontAwesome, Fontisto } from '@expo/vector-icons';

export default function  InfoViaticos ({infoVisible, infoViaticos, AbrirModal}) {
  
    return(
        <View>
            <Modal
         visible={infoVisible}
         animationType='slide'
         transparent={true} >

    <View style={GlobalStyles.contenedorInfoViaticos}> 
      <View style={GlobalStyles.InfoStyle}>
      <View style={Styles.diario}>
      <Text style={GlobalStyles.InfoTX}>
      <Text style={{fontSize:16 }}>Marca con 
      <Text style={{fontWeight: 'bold',
                    fontSize:16,
                    color:'black' }}> NEGRO</Text> </Text> los dias que tienen 1 viatico diario.
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

    <View style={GlobalStyles.cartelesInfoViaticos}>
    <FontAwesome name="money" size={36} color="black" onPress={AbrirModal}/>
      <Text style={GlobalStyles.InfoTX}>
      <Text style={{fontSize:16 }}>Ingresa el valor de bandeja de cada escala</Text>
      </Text>
    </View>

    <View style={GlobalStyles.cartelesInfoViaticos}>
    <Fontisto name="hotel" size={32} color="black" marginRight={4} />
      <Text style={GlobalStyles.InfoTX}>
      <Text style={{fontSize:16 }}>Seleccion de postas: ejemplo CORDOBA con dos bandejas: "COR x 2"</Text>
      </Text>

    </View>    

    <View style={{flex:1, justifyContent:'center', marginTop:2, alignItems:'center'}}>
    <TouchableOpacity style={[GlobalStyles.CloseModal, { backgroundColor: 'blue' }]}>    
            <Button 
             title= 'Cerrar'
             onPress={()=>{infoViaticos()} }
             color= 'brown'
             ></Button>
      </TouchableOpacity>

    </View>
    </View>
  </Modal>
        </View>
    )
};
const Styles = StyleSheet.create({

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