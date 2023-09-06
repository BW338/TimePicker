import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ToastAndroid, TextInput, StatusBar, TouchableOpacity, Modal, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ImageBackground} from 'react-native';
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
  const [ravVisible, setRavVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [hideArrows, setHideArrows] = useState(false);
  const [sweep, setSweep] = useState(true)
  const navigation = useNavigation();
  const [f1, setF1] = useState('---')
  const [Frav, setFRav] = useState({});

  useEffect(() => {
    loadPersistedData();
    
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleDateString('es', { month: 'long' });
    const currentDay = currentDate.toLocaleDateString('es', { day: '2-digit' });
    
    if (Platform.OS === 'android') {
      // Muestra el Toast con una duración de 5 segundos (5000 milisegundos)
      ToastAndroid.show('Cargando datos...', ToastAndroid.SHORT);
    }

  //  console.log('Se carga el mes: ' + currentMonth + ' ' + currentDay);
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
  }, [markedDates, suma, valorHr, Frav]);

  const handleChangeText = (newValor) => {
    setValorHr(newValor);
  };

  const loadPersistedData = async () => {
  
    try {
      const storedDataFlex = await AsyncStorage.getItem('calendarDataFlex');
      if (storedDataFlex) {
        const { markedDates: storedMarkedDates, 
                suma: storedSuma , Frav: storedFRav,
                valorHr: storedvalorHr} = JSON.parse(storedDataFlex);
        setFRav(storedFRav);
        setMarkedDates(storedMarkedDates);
        setValorHr(storedvalorHr);
        setSuma(storedSuma);

      }
    } catch (error) {
      console.log('Error al cargar los datos:', error);
    }
  };

  const saveDataToStorage = async () => {
    try {
      const dataToStore = JSON.stringify({ markedDates, suma, valorHr, Frav});
      await AsyncStorage.setItem('calendarDataFlex', dataToStore);
    } catch (error) {
      console.log('Error al guardar los datos:', error);
    }
  };

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    const updatedMarkedDates = { ...markedDates };
    const updatedSuma = { ...suma };
  
    // Crear una instancia de Date con la fecha en la zona horaria local
    const localDate = new Date(selectedDate);
  
    // Incrementar la fecha por un día
    localDate.setDate(localDate.getDate() + 1);
  
    // Obtener la fecha ajustada
    const adjustedDate = localDate.toISOString().split('T')[0];
  
    // Actualizar Frav antes de guardar
    setFRav((prevSelectedDates) => ({
      ...prevSelectedDates,
      [adjustedDate]: '',
    }));
  
    // Llama a saveDataToStorage para guardar los cambios
    saveDataToStorage();
  
    // Verificar si la fecha ya está marcada en el calendario
    if (updatedMarkedDates[selectedDate]) {
      const isBlue = updatedMarkedDates[selectedDate].customStyles.container.backgroundColor === 'blue';
  
      if (isBlue) {
        // Si la fecha está marcada en azul, cambiarla a verde y ajustar la suma
        updatedSuma[currentMonth] = (updatedSuma[currentMonth] || 0) + 2;
        updatedMarkedDates[selectedDate].customStyles.container.backgroundColor = 'green';
        updatedMarkedDates[selectedDate].customStyles.text.color = 'white';
      } else {
        // Si la fecha está marcada en verde, eliminarla y ajustar la suma
        delete updatedMarkedDates[selectedDate];
        updatedSuma[currentMonth] = (updatedSuma[currentMonth] || 0) - 4;
  
        // Clonar Frav en un nuevo objeto y eliminar la fecha seleccionada
        const newFrav = { ...Frav };
        delete newFrav[adjustedDate];
  
        // Actualizar Frav con el nuevo objeto
        setFRav(newFrav);
      }
    } else {
      // Si la fecha no está marcada, marcarla en azul y ajustar la suma
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
  
    // Actualizar markedDates y suma
    setMarkedDates({ ...updatedMarkedDates });
    setSuma(updatedSuma);
  };

  

  const handleMonthChange = (newMonth) => {
    const selectedDate = new Date(newMonth.timestamp);
    const monthName = selectedDate.toLocaleString('es', { month: 'long' });
    setCurrentMonth(monthName);    
  };

  const AbrirModal = () => {
    setModalVisible(true);
  };

  const abrirRav = () => {
    if(ravVisible == false){
    setRavVisible(true)
  }else{
    setRavVisible(false);

    saveDataToStorage();

  }
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
      <Modal 
         visible={modalVisible}
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
     value={valorHr.toString()}
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
<Modal
    visible={ravVisible}
    animationType='slide'
    transparent={true} >
   <KeyboardAvoidingView
    style={{ flex: 1, justifyContent: 'flex-start', marginBottom:0}}
    behavior={Platform.OS === 'ios' ? 'padding' : null} // Solo aplicar comportamiento de padding en iOS
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30} // Ajustar offset para Android
    >

<ScrollView style={{ flex: 1 }}>

      
<View style={styles.registoRav}>
  <Text style={styles.ravTitulo}>REGISTRO FLEX - RAV</Text>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
    {/* Columna izquierda */}
    <View
      style={{
        flexDirection: 'column',
        width: '50%', // Ajusta el ancho según tu preferencia
        marginRight: '0%', // Agrega margen entre las columnas
      }}
    > 

    <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <Text style={{ marginHorizontal: 2, fontWeight: 'bold', fontSize: 20 }}>Dia |</Text>
        <Text style={{ marginLeft: 2, fontWeight: 'bold', fontSize: 20, textAlign: 'right' }}>Nro RAV</Text>
        </View>  
      </View>

      <View style={{ flexDirection: 'column' }}>
        {Object.entries(Frav)
          .filter(([date, info], index) => {
            const localDate = new Date(date);
            const month = localDate.toLocaleString('es', { month: 'long' });
            return month === currentMonth && index % 2 === 0; // Filtrar elementos pares para la columna izquierda
          })
          .map(([date, info]) => {
            const localDate = new Date(date);
            const day = localDate.getDate();

            return (
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                }}
                key={date}
              >
                <Text style={styles.diaRav}>{day}</Text>
                <TextInput
                  style={styles.nroRav}
             //     value={info}
                  keyboardType='number-pad'
                  onChangeText={(text) => {
                    setFRav((prevSelectedDates) => ({
                      ...prevSelectedDates,
                      [date]: text,
                    }));
                  }}
                  placeholder="Nro de RAV"
                  placeholderStyle={styles.estiloPlaceHolder} // Aplicar estilo al placeholder

                />
              </View>
            );
          })}
      </View>
    </View>

    {/* Columna derecha */}
    <View
      style={{
        flexDirection: 'column',
        width: '50%', // Ajusta el ancho según tu preferencia
      }}
    >

<View style={{flexDirection:'row', justifyContent:'space-between'}}> 
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <Text style={{ marginHorizontal: 2, fontWeight: 'bold', fontSize: 20 }}>Dia |</Text>
        <Text style={{ marginLeft: 2, fontWeight: 'bold', fontSize: 20, textAlign: 'right' }}>Nro RAV</Text>
        </View> 
      </View>

      <View style={{ flexDirection: 'column' }}>
        {Object.entries(Frav)
          .filter(([date, info], index) => {
            const localDate = new Date(date);
            const month = localDate.toLocaleString('es', { month: 'long' });
            return month === currentMonth && index % 2 === 1; // Filtrar elementos impares para la columna derecha
          })
          .map(([date, info]) => {
            const localDate = new Date(date);
            const day = localDate.getDate();

            return (
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                }}
                key={date}
              >
                <Text style={styles.diaRav}>{day}</Text>
                <TextInput
                  style={styles.nroRav}
              //    value={info}
                  keyboardType='number-pad'
                  onChangeText={(text) => {
                    setFRav((prevSelectedDates) => ({
                      ...prevSelectedDates,
                      [date]: text,
                    }));
                  }}
                  placeholder="Nro de RAV"
                />
              </View>
            );
          })}
      </View>
    </View>
  </View>
<View style={{height:50}}></View> 
  <TouchableOpacity style={styles.cerrarModal}>
    <Button
      title='Cerrar'
      onPress={() => { abrirRav() }}
      color='brown'
    ></Button>
  </TouchableOpacity>
  
</View>

</ScrollView>

    </KeyboardAvoidingView>
    </Modal>
    <View style={{width:"100%", position:'absolute', bottom:0, }}>
    <ToolBar2 Back={Back} AbrirModal={AbrirModal} infoOn2={infoOn2} abrirRav={abrirRav}></ToolBar2>      
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
  registoRav:{
    flex:1,
    justifyContent:'flex-start' , 
    opacity:1.90,
    marginTop:100,
    backgroundColor:`#add8e6`,
    borderWidth:3,
    padding:3,
    margin:10,
    borderRadius:10,
  //  borderColor:'red',
  },
  ravTitulo:{
    fontSize:28,
    textAlign:'center',
    backgroundColor:'white',
    borderWidth:2,
    borderRadius:16,
    
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
  diaFlex: {
    marginLeft:4,
    padding:2,
    textAlign:'center',
    fontWeight:'bold',
    textTransform:'uppercase',
    marginVertical:2,
    color:'black',
    fontSize:18,

  },
  ravFlex: {
    flex:1,
    padding:0,
    marginLeft:8,
    textAlign:'center',
    fontWeight:'bold',
    textTransform:'uppercase',
    marginVertical:2,
    color:'black',
    fontSize:20,
  },
  dayText: {
    fontSize: 16,
  },
  nroRav: {
    flex:1,
    marginLeft:1,
    padding:1,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'black',
    fontSize: 18,
  },
    diaRav:{
    backgroundColor:'#faf0e6',
    marginLeft:4,
    padding:2,
    textAlign:'center',
    fontWeight:'bold',
    textTransform:'uppercase',
    marginVertical:2,
    color:'black',
    fontSize:20,
  },
   cerrarModal:{
    position:'absolute',
    bottom:0,
    width:'70%',
    marginHorizontal:'15%',
    marginVertical:'2%',
   },
});

export default ControlFlex;
