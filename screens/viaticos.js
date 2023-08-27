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
  const [aep, setAep] = useState('000');
  const [cor, setCor] = useState('000');
  const [mdz, setMdz] = useState('000');
  const [ush, setUsh] = useState('000');
  const [cdr, setCdr] = useState('000');
  const [fte, setFte] = useState('000');
  const [nqn, setNqn] = useState('000');
  const [sla, setSla] = useState('000')
  const [tuc, setTuc] = useState('000')
  const [bhi, setBhi] = useState('000')
  const [totalPostas, setTotalPostas] = useState(0)
  const [key, setKey] = useState (0)
  const [random, setRandom] = useState(0,14)
  const [viaticos, setViaticos] = useState(0)

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
  
  //FUNCION QUE SUMA Y MANTIENE ACTUALIZADO EL TOTAL DE VIATICOS****************
  useEffect(()=> {
    const sumaNum = parseInt(suma[currentMonth]*aep || 0);
    const totalPostasNum = parseInt(totalPostas[currentMonth] || 0);
    const sumatoria = sumaNum + totalPostasNum
    setViaticos(sumatoria)
//  console.log('sumatoria: $' + viaticos)
    totalPostasNum < 0 ? setTotalPostas(0) : console.log('') 

  },[suma, totalPostas, aep, currentMonth]);

  useEffect(() => {
    loadPersistedData();
     setCurrentMonth (new Date().toLocaleDateString('es', { month: 'long' })) // Establecer el mes actual al cargar la aplicación
  }, []);

  useEffect(() => {
    saveDataToStorage();
  }, [markedDates, suma, valorHr, aep, cor, bhi,tuc, mdz, nqn, fte, ush, sla, cdr, totalPostas]);

  const handleChangeText = (fieldName, newValor) => {
   
    if(fieldName === 'aep'){
    newValor == NaN ? setAep(0):
    setAep(newValor);
    }
    if(fieldName === 'cor'){
      newValor != Number ? setCor(0):
      setCor(newValor);
      console.log('COR = ' + cor)
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
                cdr: storedCdr, totalPostas: storedTotalPostas } = JSON.parse(storedData);
        
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
        setTotalPostas(storedTotalPostas)

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
                                           tuc, sla, bhi, fte, nqn, mdz, cdr, totalPostas });
      await AsyncStorage.setItem('calendarData', dataToStore);
    } catch (error) {
      console.log('Error al guardar los datos:', error);
    }
  };

  
  const handleDropdownChange = (item) => {
  
    if (item.value !== 'postas') {  
    const randomID = Math.floor(Math.random() * 101) * Math.floor(Math.random() * 101) * 3.3123124;
    setRandom(randomID);
    
    const newKey = randomID * 3.3123124;
    
    const updatedSelectedValues = [...selectedValues, { ...item, month: currentMonth, id: randomID, key: newKey }];
    setSelectedValues(updatedSelectedValues);
    saveSelectedValues(updatedSelectedValues);
    
     if (item.label.includes('COR')) {
      const multiplicador = parseInt(item.label.substring(5));
      const corNumero = parseInt(cor);
      const corTotal = corNumero * multiplicador;   
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + corTotal;  
      setTotalPostas(updatedTotalPostas);
  
      console.log('Bandeja: $' + cor);
      console.log('Multiplicador ' + multiplicador);
      console.log('Total de postas: $' + updatedTotalPostas[currentMonth]);
      console.log('-------------------------------------------------');
    
    }if (item.label.includes('MDZ')) {
      const multiplicador = parseInt(item.label.substring(5));
      const mdzNumero = parseInt(mdz);
      const mdzTotal = mdzNumero * multiplicador;
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + mdzTotal;
      setTotalPostas(updatedTotalPostas);
   
    }if (item.label.includes('SLA')) {
      const multiplicador = parseInt(item.label.substring(5));
      const slaNumero = parseInt(sla);
      const slaTotal = slaNumero * multiplicador;
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + slaTotal;
      setTotalPostas(updatedTotalPostas);
    
    }if (item.label.includes('BHI')) {
      const multiplicador = parseInt(item.label.substring(5));
      const bhiNumero = parseInt(bhi);
      const bhiTotal = bhiNumero * multiplicador;
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + bhiTotal;
      setTotalPostas(updatedTotalPostas);
    }if (item.label.includes('TUC')) {
      const multiplicador = parseInt(item.label.substring(5));
      const tucNumero = parseInt(tuc);
      const tucTotal = tucNumero * multiplicador;
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + tucTotal;
      setTotalPostas(updatedTotalPostas);
    }if (item.label.includes('USH')) {
      const multiplicador = parseInt(item.label.substring(5));
      const ushNumero = parseInt(ush);
      const ushTotal = ushNumero * multiplicador;
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + ushTotal;
      setTotalPostas(updatedTotalPostas);
    }
  }
  };
  
  const handleDeleteItem = (item, itemId, itemMonth, itemLabel) => {
    const mes = itemMonth;
    const etiqueta = item.label;
  
     if (etiqueta.trim().includes('COR')) {
      const restadorXCOR = etiqueta.trim().substring(5);
      const corNumero = parseInt(cor);
      const totalPostasNumero = parseInt(totalPostas);
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[mes] = (updatedTotalPostas[mes] || 0) - corNumero * restadorXCOR;
      setTotalPostas(updatedTotalPostas);
   
    }if (etiqueta.trim().includes('MDZ')) {
      const restadorXMDZ = etiqueta.trim().substring(5);
      const mdzNumero = parseInt(mdz);
      const totalPostasNumero = parseInt(totalPostas);
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[mes] = (updatedTotalPostas[mes] || 0) - mdzNumero * restadorXMDZ;
      setTotalPostas(updatedTotalPostas);
    
    }if (etiqueta.trim().includes('SLA')) {
      const restadorXSLA = etiqueta.trim().substring(5);
      const slaNumero = parseInt(sla);
      const totalPostasNumero = parseInt(totalPostas);
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[mes] = (updatedTotalPostas[mes] || 0) - slaNumero * restadorXSLA;
      setTotalPostas(updatedTotalPostas);
    
    }if (etiqueta.trim().includes('BHI')) {
      const restadorXBHI = etiqueta.trim().substring(5);
      const bhiNumero = parseInt(bhi);
      const totalPostasNumero = parseInt(totalPostas);
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[mes] = (updatedTotalPostas[mes] || 0) - bhiNumero * restadorXBHI;
      setTotalPostas(updatedTotalPostas);
    }if (etiqueta.trim().includes('TUC')) {
      const restadorXTUC = etiqueta.trim().substring(5);
      const tucNumero = parseInt(tuc);
      const totalPostasNumero = parseInt(totalPostas);
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[mes] = (updatedTotalPostas[mes] || 0) - tucNumero * restadorXTUC;
      setTotalPostas(updatedTotalPostas);
    }if (etiqueta.trim().includes('USH')) {
      const restadorXUSH = etiqueta.trim().substring(5);
      const ushNumero = parseInt(ush);
      const totalPostasNumero = parseInt(totalPostas);
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[mes] = (updatedTotalPostas[mes] || 0) - ushNumero * restadorXUSH;
      setTotalPostas(updatedTotalPostas);
    }

    setSelectedValues((prevData) =>
      prevData.filter((item) => !(item.id === itemId && item.month === mes))
    );
  
    saveSelectedValues(
      selectedValues.filter((item) => !(item.id === itemId && item.month === mes))
    );
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
      if (updatedMarkedDates[selectedDate].customStyles.container.backgroundColor === 'black') {
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
    suma < 0 ? setSuma(0) : setSuma(updatedSuma)
  //  setSuma(updatedSuma);
  //  setViaticos(totalPostas)
  //  console.log(viaticos)
    
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

  const infoViaticos = ()=> {
    console.log('InfoViaticos')
    if(infoVisible == false){
      setInfoVisible(true);
    }else{
      setInfoVisible(false);
    }
  };
  



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={GlobalStyles.contenedorViaticos}>
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
        textMonthFontSize:22,
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
        infoViaticos={infoViaticos}
        AbrirModal={AbrirModal} >
      </InfoViaticos> 

      <View style={GlobalStyles.VContInferior}>
      <View style={GlobalStyles.VInfIzq}>
  <Text style={GlobalStyles.bandejasAEP}>
        Bandejas AEP x  
        <Text> </Text>  
        <Text style={GlobalStyles.contadorBandejasAep}> 
                     {suma[currentMonth] || 0}
                     </Text> </Text>
        <Text style={GlobalStyles.totalAep$}>${(suma[currentMonth])*aep  || 0} </Text>
        
        <Text style={GlobalStyles.totalPostas$}>
        Postas ${totalPostas[currentMonth ||0]}
        </Text>
        <View style={{borderWidth:0, width:'90%', marginTop:'0%'}}>
        <Text style={GlobalStyles.totalViaticos } numberOfLines={3}>
        Total viaticos: 
        ${viaticos}
        </Text>
        </View>     
        </View>                
        <View style={{ flex:1}}>
  <Dropdown
        style={styles.dropdown}
        menuStyle={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={[{ label: 'POSTAS', id: -1, value: 'postas' }, ...postas]} // Agregamos un elemento con el título "Postas"
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
        scrollEnabled={true}
        style={styles.FlatList }
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
    marginTop:2,
    opacity:0.8,
    backgroundColor:'#f0fff0',
    borderRadius:10,
    height: 45,
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
    paddingHorizontal:5,
    paddingVertical:2,
    alignItems: 'center',
    borderWidth:1.5,
    borderStyle:'dashed',
    borderRadius:12,
    marginTop:6,
    
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  FlatList:{
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 3,
    marginTop:6,
    backgroundColor:`#f0fff0` 
  },

});

export default Viaticos;
