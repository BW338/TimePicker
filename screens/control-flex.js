import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, Modal, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ImageBackground} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { GlobalStyles } from "../estilos/global_styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToolBar2 from '../components/toolbar-2';
import { useNavigation } from '@react-navigation/native';
import Info2 from '../screens/info2';
import KeyboardSpacer from 'react-native-keyboard-spacer';


const ControlFlex = () => {

  const [markedDates, setMarkedDates] = useState({});
  const [suma, setSuma] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date().toLocaleDateString('es', { month: 'long' }));
  const [valorHr, setValorHr] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [hideArrows, setHideArrows] = useState(false);
  const [sweep, setSweep] = useState(true)
  const navigation = useNavigation();


  useEffect(() => {
    loadPersistedData();
    
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleDateString('es', { month: 'long' });
    const currentDay = currentDate.toLocaleDateString('es', { day: '2-digit' });
    
    console.log('Se carga el mes: ' + currentMonth + ' ' + currentDay);
  //*** Deshabilita cambio de mes para EVITAR QUE SE PRODUZCA CONFLICTO EN LOS REGISTROS LOS DIAS 1 de cada mes/////
    if(currentDay === '01'){
      console.log('Cambio de mes deshabilitado');
    setHideArrows(true);
    setSweep(false)
  }else{
    setHideArrows(false);
    setSweep(true)
  /////////************************************************************************* */
  }
  }, []);

  useEffect(() => {
    saveDataToStorage();
  }, [markedDates, suma, valorHr]);

  const handleChangeText = (newValor) => {
    setValorHr(newValor);
  };

  const loadPersistedData = async () => {
    try {
      const storedDataFlex = await AsyncStorage.getItem('calendarDataFlex');
      if (storedDataFlex) {
        const { markedDates: storedMarkedDates, 
                suma: storedSuma ,
                valorHr: storedvalorHr} = JSON.parse(storedDataFlex);
        setMarkedDates(storedMarkedDates);
        setValorHr(storedvalorHr);
        setSuma(storedSuma);

        console.log('MES INICIAL: ' + currentMonth)
      }
    } catch (error) {
      console.log('Error al cargar los datos:', error);
    }
  };

  const saveDataToStorage = async () => {
    try {
      const dataToStore = JSON.stringify({ markedDates, suma, valorHr });
      await AsyncStorage.setItem('calendarDataFlex', dataToStore);
    } catch (error) {
      console.log('Error al guardar los datos:', error);
    }
  };

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    const updatedMarkedDates = { ...markedDates };
    const updatedSuma = { ...suma };

    if (updatedMarkedDates[selectedDate]) {
      if (updatedMarkedDates[selectedDate].customStyles.container.backgroundColor === 'blue') {
        updatedSuma[currentMonth] = (updatedSuma[currentMonth] || 0) + 2;
        updatedMarkedDates[selectedDate].customStyles.container.backgroundColor = 'green';
        updatedMarkedDates[selectedDate].customStyles.text.color = 'white';
      } else {
        delete updatedMarkedDates[selectedDate];
        updatedSuma[currentMonth] = (updatedSuma[currentMonth] || 0) - 4;
      }
    } else {
      updatedSuma[currentMonth] = (updatedSuma[currentMonth] || 0) + 2;
      updatedMarkedDates[selectedDate] = {
        selected: true,
        customStyles: {
          container: {
            backgroundColor: 'blue',
          },
          text: {
            color: 'white',
            fontWeight: 'bold',
          },
        },
      };
    }

    setMarkedDates({ ...updatedMarkedDates });
    setSuma(updatedSuma);

  //  setSuma(0)

  };

  const handleMonthChange = (newMonth) => {
    const selectedDate = new Date(newMonth.timestamp);
    const monthName = selectedDate.toLocaleString('es', { month: 'long' });
    setCurrentMonth(monthName);    
  };

  const AbrirModal = () => {
    setModalVisible(true);
  };

  const Back =()=>{
    navigation.navigate('Home');
  
  };

  const infoOn2 =()=>{
    if(infoVisible == false){
      setInfoVisible(true);
    }else{
      setInfoVisible(false);
    }
  };

  return (   
  
     <>  
        
    <StatusBar backgroundColor='#85C1E9'
               barStyle="dark-content" 
               
               />

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <ImageBackground source={require('../assets/bgFlex.jpg')} style={GlobalStyles.fondoViaticos}>

      <Text style={GlobalStyles.tituloFlex}>
       Control Hr Flex
      </Text>
      <Calendar
        hideExtraDays={true}
       enableSwipeMonths={sweep}
        hideArrows={hideArrows} // Oculta las flechas de navegación para cambiar de mes.

        style={{
            borderWidth:2,
            borderColor:'white',
            borderRadius:20,
            padding:5,
            marginHorizontal:7,
        }}
       theme={{
        monthTextColor:`#008b8b`,
        textMonthFontSize:24,
        textMonthFontWeight:'bold',
        arrowColor:'pink',
        arrowHeight:60,
        arrowWidth:60,
        calendarBackground:'black',
        dayTextColor:'white',
        textInactiveColor:'red',
        textSectionTitleColor: `#008b8b`,
        textDayFontSize:20,
        textDisabledColor:'grey',
        }}

        markedDates={markedDates}
        markingType={'custom'}
        onDayPress={handleDayPress}
        onMonthChange={handleMonthChange}
        renderDay={(day, selected) => {
          let style = {};

          if (selected) {
            style.backgroundColor = 'blue';
            style.textColor = 'white';
          }

          return (
            <View style={[styles.almanaque, style]}>
              <Text style={styles.dayText}>{day.day}</Text>
            </View>
          );
        }} />

      <Text style={styles.text}>
        Total de Horas Flex  
        <Text style={{fontWeight:'bold',
                      fontStyle:'italic', 
                      textTransform:'uppercase'}}> {currentMonth} </Text>
          
          <Text style={{
                      color:'black',
                      backgroundColor:`lightgrey`,
                      fontWeight:'bold',
                      fontSize:24}}> {suma[currentMonth] || 0} </Text>
      </Text>

     <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'center' }}>
      <Modal visible={modalVisible}
         animationType='slide'
         transparent={true} >
        <KeyboardAvoidingView
         style={{ flex: 1, justifyContent: 'flex-end', opacity: 0.94 }}
         behavior={Platform.OS === 'ios' ? 'padding' : null} // Solo aplicar comportamiento de padding en iOS
         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30} // Ajustar offset para Android
       >

    <View style={{flex:1, justifyContent:'flex-end' , opacity:0.94}}> 
    <View style={GlobalStyles.ModalStyle}>
      <Text style={GlobalStyles.TitleFlex}>Ingresa el valor de tu Hr FLEX</Text>
    <View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.valor$}>$ </Text>
     <TextInput
     style={GlobalStyles.valorHr}
     value={valorHr}
     keyboardType='number-pad'
     onChangeText={handleChangeText}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
      <TouchableOpacity style={GlobalStyles.CerrarModal}>    
            <Button 
             title= 'Aceptar'
             onPress={()=> setModalVisible(false)}></Button>
      </TouchableOpacity>
    </View>
    </View>
    </KeyboardAvoidingView>

  </Modal>

  <KeyboardSpacer />

     <Info2
        infoVisible={infoVisible} 
        setInfoVisible={setInfoVisible} 
        infoOn2={infoOn2}
        AbrirModal={AbrirModal} >
      </Info2>
      <View style={{marginBottom:60}}>
      <Text style={GlobalStyles.sumaFlex}>Suma $ {valorHr*(suma[currentMonth] )} </Text>
      </View>
    </View>
    <View style={{width:"100%", position:'absolute', bottom:0, }}>
    <ToolBar2 Back={Back} AbrirModal={AbrirModal} infoOn2={infoOn2}></ToolBar2>      
    </View>
    </ImageBackground>
    </TouchableWithoutFeedback>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
 //   flex: 1,
 //   backgroundColor:`#4682b4`
  },
  text: {
    color:'white',
    borderWidth:3,
    borderColor:'white',
    textAlign:'center',
    fontWeight:'bold',
    borderRadius:10,
    padding:9,
    marginHorizontal:5,
    backgroundColor:'black',
    marginTop: 16,
    fontSize: 18,
  },
  almanaque: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#000',
  },
  dayText: {
    fontSize: 16,
  },

});

export default ControlFlex;
