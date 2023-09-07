import React, { useState } from "react";    
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { GlobalStyles } from "../estilos/global_styles";



 function Checkin(){

        const [esreloj1visible, setreloj1visible] = useState(false);
      
        const [checkin, setCheckin] = useState('Chek-in'); 



      ////Presentacion
      const mostrarreloj1 = () => {
        setreloj1visible(true);
      };
      
      const cerrarreloj1 = () => {
        setreloj1visible(false);
        setCheckin('Presentacion');
      };
      
    return(
        <View>
        <TouchableOpacity style={GlobalStyles.relojes}
                onPress={() => { mostrarreloj1(); }} >
        
        <Text style={GlobalStyles.txBotones}>{checkin}</Text>
        </TouchableOpacity>
       
        <DateTimePickerModal
        isVisible={esreloj1visible}
        mode='time'
        is24Hour
         onConfirm={(time) => {
          setCheckin(time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
          setreloj1visible(false);
        }} 
         onCancel={cerrarreloj1} />
        </View>
    )
}

  export default Checkin;