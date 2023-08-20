import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, FlatList} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { GlobalStyles } from "../estilos/global_styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ToolBar3 from '../components/toolbar-3';
import InfoViaticos from './InfoViaticos';
import { Dropdown } from 'react-native-element-dropdown';
import { Fontisto, FontAwesome } from '@expo/vector-icons';

const Viaticos = () => {

  const [markedDates, setMarkedDates] = useState({});
  const [suma, setSuma] = useState({});
  const [currentMonth, setCurrentMonth] = useState('');
  const [valorHr, setValorHr] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleDateString('es', { month: 'long' }));
  const [aep, setAep] = useState(0)
  const [cor, setCor] = useState(0)
  const [mdz, setMdz] = useState(0)
  const [ush, setUsh] = useState(0)
  const [cdr, setCdr] = useState(0)
  const [fte, setFte] = useState(0)
  const [nqn, setNqn] = useState(0)
  const [sla, setSla] = useState(0)
  const [tuc, setTuc] = useState(0)
  const [bhi, setBhi] = useState(0)
  const [totalPostas, setTotalPostas] = useState(0)
  const [key, setKey] = useState (0)
  const [random, setRandom] = useState(0,14)

    const [selectedValues, setSelectedValues] = useState(['postas']);
    const [postas] = useState([
      { label: 'COR x1', id: random , month: selectedMonth, key:key},
      { label: 'COR x2', id: random , month: selectedMonth, key:key},
      { label: 'COR x3', id: random , month: selectedMonth, key:key}, 
      { label: 'COR x4', id: random , month: selectedMonth, key:key},
      { label: 'MDZ x1', id: random , month: selectedMonth, key:key},
      { label: 'MDZ x2', id: random , month: selectedMonth, key:key },
      { label: 'MDZ x3', id: random , month: selectedMonth, key:key},
      { label: 'MDZ x4', id: random , month: selectedMonth, key:key},
      { label: 'USH x1', id: random , month: selectedMonth, key:key },
      { label: 'USH x2', id: random , month: selectedMonth, key:key },
      { label: 'USH x3', id: random , month: selectedMonth, key:key},
      { label: 'USH x4', id: random , month: selectedMonth, key:key  },
      { label: 'TUC x1', id: random , month: selectedMonth, key:key },
      { label: 'TUC x2', id: random , month: selectedMonth, key:key },
      { label: 'TUC x3', id: random , month: selectedMonth, key:key},
      { label: 'TUC x4', id: random , month: selectedMonth, key:key },
      { label: 'BHI x1', id: random , month: selectedMonth, key:key},
      { label: 'BHI x2', id: random , month: selectedMonth, key:key},
      { label: 'BHI x3', id: random , month: selectedMonth, key:key},
      { label: 'BHI x4', id: random , month: selectedMonth, key:key},
    ]);

  const navigation = useNavigation();
  
  useEffect(() => {
    loadPersistedData();
     setCurrentMonth (new Date().toLocaleDateString('es', { month: 'long' })) // Establecer el mes actual al cargar la aplicación
  }, []);

  useEffect(() => {
    saveDataToStorage();
  }, [markedDates, suma, valorHr, aep, cor, bhi,tuc, mdz, nqn, fte, ush, sla, cdr]);

  const handleChangeText = (fieldName, newValor) => {
   
    if(fieldName === 'aep'){
    setAep(newValor);
    }
    if(fieldName === 'cor'){
    setCor(newValor);
    }
    if(fieldName === 'sla'){
      setSla(newValor);
    }
    if(fieldName === 'tuc'){
      setTuc(newValor);
    }
    if(fieldName === 'bhi'){
      setBhi(newValor);
    }
    if(fieldName === 'ush'){
      setUsh(newValor);
    }
    if(fieldName === 'cdr'){
      setCdr(newValor);
    }
    if(fieldName === 'nqn'){
      setNqn(newValor);
    }
    if(fieldName === 'fte'){
      setFte(newValor);
    }
    if(fieldName === 'mdz'){
      setMdz(newValor);
    }
  };

  const loadPersistedData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('calendarData');
      if (storedData) {
        const { markedDates: storedMarkedDates,
                suma: storedSuma , 
                valorHr: storedvalorHr, 
                aep: storedAep, cor:storedCor, ush:storedUsh,
                mdz:storedMdz, sla:storedSla, tuc: storedTuc,
                fte:storedFte, nqn:storedNqn, bhi:storedBhi,
                cdr: storedCdr } = JSON.parse(storedData);
        
        setMarkedDates(storedMarkedDates);
        setSuma(storedSuma);
        setValorHr(storedvalorHr);
        setAep(storedAep)
        setCor(storedCor)
        setUsh(storedUsh)
        setSla(storedSla)
        setTuc(storedTuc)
        setCdr(storedCdr)
        setBhi(storedBhi)
        setMdz(storedMdz)
        setFte(storedFte)
        setNqn(storedNqn)

        const storedSelectedValues = await AsyncStorage.getItem('selectedValues');
        if (storedSelectedValues) {
          setSelectedValues(JSON.parse(storedSelectedValues));
        }}

    } catch (error) {
      console.log('Error al cargar los datos:', error);
    }
  };

  const saveDataToStorage = async () => {
    try {
      const dataToStore = JSON.stringify({ markedDates, suma, valorHr, aep, cor, ush,
                                           tuc, sla, bhi, fte, nqn, mdz, cdr });
      await AsyncStorage.setItem('calendarData', dataToStore);
    } catch (error) {
      console.log('Error al guardar los datos:', error);
    }
  };

  
  const handleDropdownChange = (item, itemId, itemKey, itemLabel) => {

    const randomID = (Math.floor(Math.random()* 101) * Math.floor(Math.random()* 101) * 3.3123124)
    setRandom(randomID);

    setKey(randomID * 3.3123124)

    const updatedSelectedValues = [...selectedValues, { ...item, month: currentMonth, id:randomID, key:key}];
    setSelectedValues(updatedSelectedValues);
    saveSelectedValues(updatedSelectedValues);
    
//   console.log('se genera ITEM ID: ' + itemId + '/ ' + random)
//   console.log('*******************************************')
//   console.log('se genera ITEM KEY: ' + itemKey + '/' + key)
//   console.log('------------------------------------------')

      if(item.label.includes('COR')){
//    console.log('POSTA A ' + item.label)
      const multiplicador = item.label.substring(5)
      const corNumero = parseInt(cor);
      const totalPostasNumero = parseInt(totalPostas);      
      setTotalPostas((((corNumero * multiplicador) + totalPostasNumero)))
      console.log('Bandeja: $' + cor)
      console.log('Multiplicador ' + multiplicador)
      console.log('Suma de las postas: $' + totalPostasNumero)
      console.log('-------------------------------------------------')
    } 
};
const handleDeleteItem = (item, itemId, itemMonth, itemLabel) => {
 
  const mes = itemMonth
  const etiqueta = item.label

  if(etiqueta.trim().includes('COR')){
    const restadorXCOR = etiqueta.trim().substring(5)
    const corNumero = parseInt(cor);
    const totalPostasNumero = parseInt(totalPostas);
    setTotalPostas(((totalPostasNumero - corNumero * restadorXCOR))) 
  }


//  console.log('se borra ITEM con LABEL: ' + etiqueta)
//  console.log('Se borra ITEM con ID: ' + itemId)
//  console.log('Se borra ITEM con id: ' + item.id)
//  console.log('Se borra ITEM con Month: ' + itemMonth)
//  console.log('Se borra ITEM con month: ' + item.month)
//  console.log('///////////////////////////////////////////// ' )

  setSelectedValues((prevData) =>
  prevData.filter((item) => !(item.id === itemId && item.month === mes))
  );
  saveSelectedValues(selectedValues);
};

  const saveSelectedValues = async (values) => {
    try {
      const valuesToStore = JSON.stringify(values);
      await AsyncStorage.setItem('selectedValues', valuesToStore);
    } catch (error) {
      console.log('Error al guardar los valores seleccionados:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDeleteItem(item, item.id, item.month, item.key, item.label)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.label}</Text>
        <FontAwesome name="trash" size={20} color="black" />
      </View>
    </TouchableOpacity>
  );
  
  const filteredValues = selectedValues.filter((item) => item.month === currentMonth);

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    const updatedMarkedDates = { ...markedDates };
    const updatedSuma = { ...suma };

    if (updatedMarkedDates[selectedDate]) {
      if (updatedMarkedDates[selectedDate].customStyles.container.backgroundColor === `black`) {
        updatedSuma[currentMonth] = (updatedSuma[currentMonth] || 0) + 1;
        updatedMarkedDates[selectedDate].customStyles.container.backgroundColor = 'green';
        updatedMarkedDates[selectedDate].customStyles.text.color = 'white';
      } else {
        delete updatedMarkedDates[selectedDate];
        updatedSuma[currentMonth] = ( (updatedSuma[currentMonth] || 0) - 2) ;
      }
    } else {
      updatedSuma[currentMonth] =( (updatedSuma[currentMonth] || 0) + 1 ) ;
      updatedMarkedDates[selectedDate] = {
        selected: true,
        customStyles: {
          container: {
            backgroundColor: `black`,
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

  const infoViaticos =()=>{
    if(infoVisible == false){
      setInfoVisible(true);
    }else{
      setInfoVisible(false);
    }
  };
  



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.container}>
      <Text style={GlobalStyles.tituloViaticos}>
** REGISTRO VIATICOS **</Text>
      <Calendar
        hideExtraDays={true}
        enableSwipeMonths
        style={{
            borderWidth:3,
            borderColor:'black',
            borderRadius:20,
            padding:4,
            marginHorizontal:7,
        }}
       theme={{
        monthTextColor:`#008b8b`,
        textMonthFontSize:24,
        textMonthFontWeight:'bold',
        arrowColor:'black',
        arrowHeight:60,
        arrowWidth:60,
        calendarBackground:`#fffaf0`,
        dayTextColor:'black',
        textInactiveColor:'red',
        textSectionTitleColor: `#008b8b`,
        textDayFontSize:16,
        textDisabledColor:'grey',
        }}

        markedDates={markedDates}
        markingType={'custom'}
        onDayPress={handleDayPress}
        onMonthChange={handleMonthChange}
        renderDay={(day, selected) => {
          let style = {};

          if (selected) {
            style.backgroundColor = 'red';
            style.textColor = 'white';
          }

          return (
            <View style={[styles.almanaque, style]}>
              <Text style={styles.dayText}>{day.day}</Text>
            </View>
          );
        }} />

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
      <Text style={GlobalStyles.modalViaticos}>Ingresa el valor de cada bandeja</Text>

<View style={{flexDirection:'row',
              justifyContent:'space-between',
            //  borderColor:'black',
            //  borderWidth:2,
                }}>

<View style={{flexDirection:'column',
            //  borderColor:'red',
            //  borderWidth:2,
              width:'50%'
              }}>
    <View style={{flexDirection: 'row'}}>
     <Text style={GlobalStyles.escalas}>AEP $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={aep.toString()}
     onChangeText={(newValor) => handleChangeText('aep', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>cor $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={cor.toString()}
     onChangeText={(newValor) => handleChangeText('cor', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>USH $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={ush.toString()}
     onChangeText={(newValor) => handleChangeText('ush', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>SLA $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={sla.toString()}
     onChangeText={(newValor) => handleChangeText('sla', newValor)} 
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>TUC $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={tuc.toString()}
     onChangeText={(newValor) => handleChangeText('tuc', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>

</View>
<View style={{flexDirection:'column',
              width:'50%',
            //  borderColor:'red',
            //  borderWidth:2
              }}>
    <View style={{flexDirection: 'row'}}>
     <Text style={GlobalStyles.escalas}>CDR $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={cdr.toString()}
     onChangeText={(newValor) => handleChangeText('cdr', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>BHI $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={bhi.toString()}
     onChangeText={(newValor) => handleChangeText('bhi', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>MDZ $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={mdz.toString()}
     onChangeText={(newValor) => handleChangeText('mdz', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>FTE $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={fte.toString()}
     onChangeText={(newValor) => handleChangeText('fte', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>NQN $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={nqn.toString()}
     onChangeText={(newValor) => handleChangeText('nqn', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>

</View>


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

      <InfoViaticos
        infoVisible={infoVisible} 
        setInfoVisible={setInfoVisible} 
        InfoViaticos={infoViaticos}
        AbrirModal={AbrirModal} >
      </InfoViaticos> 

      <View style={{flex:0.95, justifyContent:'space-between', flexDirection:'row', alignContent:'center'}}>
      <View>
  <Text style={GlobalStyles.bandejasAEP}>
        Bandejas AEP x  
        <Text> </Text>  
        <Text style={GlobalStyles.contadorBandejasAep}> 
                     {suma[currentMonth] || 0}
                     </Text> </Text>
        <Text style={GlobalStyles.totalAep$}>${(suma[currentMonth])*aep  || 0} </Text>
        
        <Text style={GlobalStyles.totalPostas$}>
        ${totalPostas}

        </Text>

        </View>                
        <View>
  <Dropdown
        style={styles.dropdown}
        menuStyle={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={postas}
        search
        labelField="label"
        placeholder="Postas"
        searchPlaceholder="Buscar.."
        onChange={(item) => handleDropdownChange(item)}
        renderLeftIcon={() => (
          <Fontisto name="hotel" size={32} color="black" marginRight={4} />
        )}
      />
    <FlatList
        data={filteredValues}
        keyExtractor={(item) => item.id * item.key}
        renderItem={renderItem}
        style={{ borderStyle: 'dotted', borderWidth: 1.2, borderRadius: 15, padding: 2, marginTop:6, backgroundColor:`#f0fff0` }}
      />
</View>        
     </View>
    </View>

    <View style={{width:"100%", position:'absolute', bottom:0, }}>
    <ToolBar3 Back={Back} AbrirModal={AbrirModal} infoViaticos={infoViaticos}></ToolBar3>      
    </View>
    </View>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'auto',
    backgroundColor:`#f0e68c`
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
  dropdown: {
    borderWidth: 2,
    padding: 4,
    marginTop: 6,
    opacity:0.8,
    backgroundColor:'#f0fff0',
    borderRadius:10,
    height: 40,
    width: '100%',
    marginRight: '16%',
    borderBottomColor: 'grey',
    borderBottomWidth: 2.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 1,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default Viaticos;
