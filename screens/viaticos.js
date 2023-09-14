import React, { useState, useEffect } from 'react';
import { View, Alert, Text, StyleSheet,StatusBar, ImageBackground, TextInput, TouchableOpacity, Modal, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, FlatList, ToastAndroid} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { GlobalStyles } from "../estilos/global_styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ToolBar3 from '../components/toolbar-3';
import InfoViaticos from './InfoViaticos';
import { Dropdown } from 'react-native-element-dropdown';
import { Fontisto, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Viaticos = () => {

  const [markedDates, setMarkedDates] = useState({});
  const [suma, setSuma] = useState({});
  const [currentMonth, setCurrentMonth] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleDateString('es', { month: 'long' }));
  const [aep, setAep] = useState('');
  const [cor, setCor] = useState('');
  const [mdz, setMdz] = useState('');
  const [ush, setUsh] = useState('');
  const [cdr, setCdr] = useState('');
  const [fte, setFte] = useState('');
  const [nqn, setNqn] = useState('');
  const [sla, setSla] = useState('')
  const [tuc, setTuc] = useState('')
  const [bhi, setBhi] = useState('')
  const [ros, setRos] = useState('')
  const [brc, setBrc] = useState('')
  const [totalPostas, setTotalPostas] = useState(0)
  const [key, setKey] = useState (0)
  const [random, setRandom] = useState(0,14)
  const [viaticos, setViaticos] = useState(0)
  const [dropDownVisible, setDropDownVisible] = useState(false)
  const [newCurrentMonth, setNewCurrenMonth] = useState()
  const [hideArrows, setHideArrows] = useState(false);
  const [sweep, setSweep] = useState(true)
 
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());

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
      { label: 'SLA x1', id: random , month: selectedMonth, key:key},
      { label: 'SLA x2', id: random , month: selectedMonth, key:key},
      { label: 'SLA x3', id: random , month: selectedMonth, key:key},
      { label: 'SLA x4', id: random , month: selectedMonth, key:key},
      { label: 'NQN x1', id: random , month: selectedMonth, key:key},
      { label: 'NQN x2', id: random , month: selectedMonth, key:key},
      { label: 'NQN x3', id: random , month: selectedMonth, key:key},
      { label: 'NQN x4', id: random , month: selectedMonth, key:key},
      { label: 'FTE x1', id: random , month: selectedMonth, key:key},
      { label: 'FTE x2', id: random , month: selectedMonth, key:key},
      { label: 'FTE x3', id: random , month: selectedMonth, key:key},
      { label: 'FTE x4', id: random , month: selectedMonth, key:key},
      { label: 'CDR x1', id: random , month: selectedMonth, key:key},
      { label: 'CDR x2', id: random , month: selectedMonth, key:key},
      { label: 'CDR x3', id: random , month: selectedMonth, key:key},
      { label: 'CDR x4', id: random , month: selectedMonth, key:key},
      { label: 'ROS x1', id: random , month: selectedMonth, key:key},
      { label: 'ROS x2', id: random , month: selectedMonth, key:key},
      { label: 'ROS x3', id: random , month: selectedMonth, key:key},
      { label: 'ROS x4', id: random , month: selectedMonth, key:key},
      { label: 'BRC x1', id: random , month: selectedMonth, key:key},
      { label: 'BRC x2', id: random , month: selectedMonth, key:key},
      { label: 'BRC x3', id: random , month: selectedMonth, key:key},
      { label: 'BRC x4', id: random , month: selectedMonth, key:key},

    ]);

  const navigation = useNavigation();

  const [filteredValues, setFilteredValues] = useState([]);

useEffect(() => {
  loadPersistedData();
  setCurrentMonth(new Date().toLocaleDateString('es', { month: 'long' }));
}, []);

useEffect(() => {
  loadPersistedData();
  
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleDateString('es', { month: 'long' });
  const currentDay = currentDate.toLocaleDateString('es', { day: '2-digit' });
  
  if (Platform.OS === 'android') {
    // Muestra el Toast con una duración de 5 segundos (5000 milisegundos)
    ToastAndroid.show('Cargando datos...', ToastAndroid.LONG);
  }

//  console.log('Se carga el mes: ' + currentMonth + ' ' + currentDay);
//*** Deshabilita cambio de mes para EVITAR QUE SE PRODUZCA CONFLICTO EN LOS REGISTROS LOS DIAS 1 de cada mes/////
  if(currentDay === '01'){
 //   console.log('Cambio de mes deshabilitado');
  setHideArrows(true);
  setSweep(false)
}else{
  setHideArrows(false);
  setSweep(true)
/////////************************************************************************* */
}
setCurrentMonth(new Date().toLocaleDateString('es', { month: 'long' }));

}, []);

useEffect(() => {
//  console.log('se carga el mes: ' + currentMonth);
  // Filtra los valores cuando selectedValues cambia
  const newFilteredValues = selectedValues.filter((item) => item.month === currentMonth);
  setFilteredValues(newFilteredValues);
}, [currentMonth, selectedValues]);


  useEffect(() => {
    saveDataToStorage();
  }, [markedDates, suma, aep, cor, bhi,tuc, mdz, nqn, fte, ush, sla, cdr,ros, brc, totalPostas]);

  const input = (fieldName, newValor) => {
   
    if(fieldName === 'aep'){
    setAep(newValor);
    }
    if(fieldName === 'cor'){
      setCor(newValor)
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
    if(fieldName === 'ros'){
      setRos(newValor);
    }
    if(fieldName === 'brc'){
      setBrc(newValor);
    }
  };

  const loadPersistedData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('calendarData');
      if (storedData) {
        const { markedDates: storedMarkedDates,
                suma: storedSuma , 
                aep: storedAep, cor:storedCor, ush:storedUsh,
                mdz:storedMdz, sla:storedSla, tuc: storedTuc,
                fte:storedFte, nqn:storedNqn, bhi:storedBhi,
                cdr: storedCdr, brc:storedBrc, ros: storedRos,
                totalPostas: storedTotalPostas,
                } = JSON.parse(storedData);
                
        setMarkedDates(storedMarkedDates);
        setSuma(storedSuma);
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
        setBrc(storedBrc)
        setRos(storedRos)
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
      const dataToStore = JSON.stringify({ markedDates, suma, aep, cor, ush,
                                           tuc, sla, bhi, fte, nqn, mdz, cdr,ros, brc, totalPostas });
      await AsyncStorage.setItem('calendarData', dataToStore);
    } catch (error) {
      console.log('Error al guardar los datos:', error);
    }
  };
 
  const handleDropdownChange = (item) => {
  
    if (item.value !== 'postas') {  
    
     if (item.label.includes('COR')) {
      if (Platform.OS === 'android' && (cor == 0 || isNaN(cor || cor == '0'))) {
        setModalVisible(true)
        ToastAndroid.show('No hay valor cargado para CORDOBA', ToastAndroid.SHORT); 
      }if (Platform.OS === 'android'  && (cor === 0  || isNaN(cor || cor == '0'))) {
        setModalVisible(true)
 //       Toast.show('No hay valor cargado para CORDOBA', { duration: Toast.durations.SHORT });
    
      }if(isNaN(cor) || cor == ''){ setCor('0')
    
    }if(!isNaN(cor) && cor !== 0 && cor !== '' && cor !=='0'){  
      const multiplicador = parseInt(item.label.substring(5));
      const corNumero = parseInt(cor);
      const corTotal = corNumero * multiplicador;   
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + corTotal;  
      setTotalPostas(updatedTotalPostas);
     
   //   console.log('COR: ' + cor)

      const randomID = Math.floor(Math.random() * 101) * Math.floor(Math.random() * 101) * 3.3123124;
      setRandom(randomID)
      const newKey = randomID * 3.3123124;
      const updatedSelectedValues = [...selectedValues, { ...item, month: currentMonth, id: randomID, key: newKey }];
      setSelectedValues(updatedSelectedValues);
      saveSelectedValues(updatedSelectedValues);

     
      }            
    }if (item.label.includes('MDZ')) {
      if (Platform.OS === 'android' && (mdz == 0 || isNaN(mdz))) {
        ToastAndroid.show('No hay valor cargado para MENDOZA', ToastAndroid.SHORT); 
        setModalVisible(true)
      }if (Platform.OS === 'android'  && (mdz === 0  || isNaN(mdz))) {
 //       Toast.show('No hay valor cargado para MENDOZA', { duration: Toast.durations.SHORT });
        setModalVisible(true)
      }
      if(isNaN(mdz) || mdz ==''){setMdz('0')}
      if(!isNaN(mdz) && mdz !== 0 && mdz !== '' && mdz !=='0' && mdz !=='00' && mdz !=='000' && mdz !=='0000'){
      const multiplicador = parseInt(item.label.substring(5));
      const mdzNumero = parseInt(mdz);
      const mdzTotal = mdzNumero * multiplicador;
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + mdzTotal;
      setTotalPostas(updatedTotalPostas);
     
      const randomID = Math.floor(Math.random() * 101) * Math.floor(Math.random() * 101) * 3.3123124;
      setRandom(randomID);
      const newKey = randomID * 3.3123124;
      const updatedSelectedValues = [...selectedValues, { ...item, month: currentMonth, id: randomID, key: newKey }];
      setSelectedValues(updatedSelectedValues);
      saveSelectedValues(updatedSelectedValues);
    }
    }if (item.label.includes('SLA')) {
      if (Platform.OS === 'android' && (sla == 0 || isNaN(sla))) {
        ToastAndroid.show('No hay valor cargado para SALTA', ToastAndroid.SHORT); 
        setModalVisible(true)
    }if(Platform.OS === 'android'  && (sla === 0  || isNaN(sla))) {
//      Toast.show('No hay valor cargado para SALTA', { duration: Toast.durations.SHORT });
      setModalVisible(true)
      }
      if(isNaN(sla) || sla == '') {setSla('0')}
      if(!isNaN(sla) && sla !== 0 && sla !== '' && sla !=='0' ){
      const multiplicador = parseInt(item.label.substring(5));
      const slaNumero = parseInt(sla);
      const slaTotal = slaNumero * multiplicador;
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + slaTotal;
      setTotalPostas(updatedTotalPostas);

      const randomID = Math.floor(Math.random() * 101) * Math.floor(Math.random() * 101) * 3.3123124;
      setRandom(randomID);
      const newKey = randomID * 3.3123124;
      const updatedSelectedValues = [...selectedValues, { ...item, month: currentMonth, id: randomID, key: newKey }];
      setSelectedValues(updatedSelectedValues);
      saveSelectedValues(updatedSelectedValues);
  }
    }if (item.label.includes('BHI')) {
      if (Platform.OS === 'android' && (bhi == 0 || isNaN(bhi) || bhi == '0')) {
        ToastAndroid.show('No hay valor cargado para BAHIA BLANCA', ToastAndroid.SHORT); 
        setModalVisible(true)
      }if (Platform.OS === 'android'  && (bhi === 0  || isNaN(bhi)|| bhi == '0')) {
     //   Toast.show('No hay valor cargado para BAHIA BLANCA', { duration: Toast.durations.SHORT });
        setModalVisible(true)
      }
      if(isNaN(bhi) || bhi == ''){ setBhi('0')}
      if(!isNaN(bhi) && bhi !== 0 && bhi !== '' && bhi !=='0'){ 
      const multiplicador = parseInt(item.label.substring(5));
      const bhiNumero = parseInt(bhi);
      const bhiTotal = bhiNumero * multiplicador;   
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + bhiTotal;  
      setTotalPostas(updatedTotalPostas);

      const randomID = Math.floor(Math.random() * 101) * Math.floor(Math.random() * 101) * 3.3123124;
      setRandom(randomID);
      const newKey = randomID * 3.3123124;
      const updatedSelectedValues = [...selectedValues, { ...item, month: currentMonth, id: randomID, key: newKey }];
      setSelectedValues(updatedSelectedValues);
      saveSelectedValues(updatedSelectedValues);
      }
    }if (item.label.includes('TUC')) {
      if (Platform.OS === 'android' && (tuc == 0 || isNaN(tuc))) {
        ToastAndroid.show('No hay valor cargado para TUCUMAN', ToastAndroid.SHORT); 
        setModalVisible(true)
      }if (Platform.OS === 'android'  && (tuc === 0  || isNaN(tuc))) {
 //       Toast.show('No hay valor cargado para TUCUMAN', { duration: Toast.durations.SHORT });
        setModalVisible(true)
      }
      if(isNaN(tuc) || tuc == ''){setTuc(0)}
      if(!isNaN(tuc) && tuc !== 0 && tuc !== '' && (tuc !=='0' && tuc !=='00'&& tuc !=='000' && tuc !=='0000')){
      const multiplicador = parseInt(item.label.substring(5));
      const tucNumero = parseInt(tuc);
      const tucTotal = tucNumero * multiplicador;
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + tucTotal;
      setTotalPostas(updatedTotalPostas);

      const randomID = Math.floor(Math.random() * 101) * Math.floor(Math.random() * 101) * 3.3123124;
      setRandom(randomID);
      const newKey = randomID * 3.3123124;
      const updatedSelectedValues = [...selectedValues, { ...item, month: currentMonth, id: randomID, key: newKey }];
      setSelectedValues(updatedSelectedValues);
      saveSelectedValues(updatedSelectedValues);
      }
    }if (item.label.includes('USH')) {
      if (Platform.OS === 'android' && (ush == 0 || isNaN(ush))) {
        ToastAndroid.show('No hay valor cargado para USHUAIA', ToastAndroid.SHORT); 
        setModalVisible(true) 
      }if(Platform.OS === 'android'  && (ush === 0  || isNaN(ush))) {
 //       Toast.show('No hay valor cargado para USHUAIA', { duration: Toast.durations.SHORT });
        setModalVisible(true)
      }
      if(isNaN(ush) || ush ==''){setUsh(0)}
      if(!isNaN(ush) && ush !== 0 && ush !== '' && ush !=='0' && ush !=='000'&& ush !=='00' !=='0000'){
      const multiplicador = parseInt(item.label.substring(5));
      const ushNumero = parseInt(ush);
      const ushTotal = ushNumero * multiplicador;
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + ushTotal;
      setTotalPostas(updatedTotalPostas);

      const randomID = Math.floor(Math.random() * 101) * Math.floor(Math.random() * 101) * 3.3123124;
      setRandom(randomID);
      const newKey = randomID * 3.3123124;
      const updatedSelectedValues = [...selectedValues, { ...item, month: currentMonth, id: randomID, key: newKey }];
      setSelectedValues(updatedSelectedValues);
      saveSelectedValues(updatedSelectedValues);}}
    }if (item.label.includes('NQN')) {
      if (Platform.OS === 'android' && (nqn == 0 || isNaN(nqn))) {
        ToastAndroid.show('No hay valor cargado para NEUQUÉN', ToastAndroid.SHORT); 
        setModalVisible(true) 
      }if(Platform.OS === 'android'  && (nqn === 0  || isNaN(nqn))) {
 //       Toast.show('No hay valor cargado para USHUAIA', { duration: Toast.durations.SHORT });
        setModalVisible(true)
      }
      if(isNaN(nqn) || nqn ==''){setNqn(0)}
      if(!isNaN(nqn) && nqn !== 0 && nqn !== '' && nqn !=='0' && nqn !=='000'&& nqn !=='00' !=='0000'){
      const multiplicador = parseInt(item.label.substring(5));
      const nqnNumero = parseInt(nqn);
      const nqnTotal = nqnNumero * multiplicador;
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + nqnTotal;
      setTotalPostas(updatedTotalPostas);

      const randomID = Math.floor(Math.random() * 101) * Math.floor(Math.random() * 101) * 3.3123124;
      setRandom(randomID);
      const newKey = randomID * 3.3123124;
      const updatedSelectedValues = [...selectedValues, { ...item, month: currentMonth, id: randomID, key: newKey }];
      setSelectedValues(updatedSelectedValues);
      saveSelectedValues(updatedSelectedValues);
      }
    
    }if (item.label.includes('FTE')) {
      if (Platform.OS === 'android' && (fte == 0 || isNaN(fte))) {
        ToastAndroid.show('No hay valor cargado para CALAFATE', ToastAndroid.SHORT); 
        setModalVisible(true) 
      }if(Platform.OS === 'android'  && (nqn === 0  || isNaN(fte))) {
    //       Toast.show('No hay valor cargado para USHUAIA', { duration: Toast.durations.SHORT });
        setModalVisible(true)
      }
      if(isNaN(fte) || fte ==''){setFte(0)}
      if(!isNaN(fte) && fte !== 0 && fte !== '' && fte !=='0' && fte !=='000'&& fte !=='00' !=='0000'){
      const multiplicador = parseInt(item.label.substring(5));
      const fteNumero = parseInt(fte);
      const fteTotal = fteNumero * multiplicador;
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + fteTotal;
      setTotalPostas(updatedTotalPostas);
    
      const randomID = Math.floor(Math.random() * 101) * Math.floor(Math.random() * 101) * 3.3123124;
      setRandom(randomID);
      const newKey = randomID * 3.3123124;
      const updatedSelectedValues = [...selectedValues, { ...item, month: currentMonth, id: randomID, key: newKey }];
      setSelectedValues(updatedSelectedValues);
      saveSelectedValues(updatedSelectedValues);
      }
    
    }if (item.label.includes('CDR')) {
      if (Platform.OS === 'android' && (cdr == 0 || isNaN(cdr))) {
        ToastAndroid.show('No hay valor cargado para COMODORO', ToastAndroid.SHORT); 
        setModalVisible(true) 
      }if(Platform.OS === 'android'  && (nqn === 0  || isNaN(fte))) {
    //       Toast.show('No hay valor cargado para USHUAIA', { duration: Toast.durations.SHORT });
        setModalVisible(true)
      }
      if(isNaN(cdr) || crd ==''){setCdr(0)}
      if(!isNaN(cdr) && cdr !== 0 && cdr !== '' && cdr !=='0' && cdr !=='000'&& cdr !=='00' !=='0000'){
      const multiplicador = parseInt(item.label.substring(5));
      const cdrNumero = parseInt(cdr);
      const cdrTotal = cdrNumero * multiplicador;
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + cdrTotal;
      setTotalPostas(updatedTotalPostas);
    
      const randomID = Math.floor(Math.random() * 101) * Math.floor(Math.random() * 101) * 3.3123124;
      setRandom(randomID);
      const newKey = randomID * 3.3123124;
      const updatedSelectedValues = [...selectedValues, { ...item, month: currentMonth, id: randomID, key: newKey }];
      setSelectedValues(updatedSelectedValues);
      saveSelectedValues(updatedSelectedValues);
      }
    
    }if (item.label.includes('ROS')) {
      if (Platform.OS === 'android' && (ros == 0 || isNaN(ros))) {
        ToastAndroid.show('No hay valor cargado para COMODORO', ToastAndroid.SHORT); 
        setModalVisible(true) 
      }if(Platform.OS === 'android'  && (ros === 0  || isNaN(ros))) {
    //       Toast.show('No hay valor cargado para USHUAIA', { duration: Toast.durations.SHORT });
        setModalVisible(true)
      }
      if(isNaN(ros) || ros ==''){setRos(0)}
      if(!isNaN(ros) && ros !== 0 && ros !== '' && ros !=='0' && ros !=='000'&& ros !=='00' !=='0000'){
      const multiplicador = parseInt(item.label.substring(5));
      const rosNumero = parseInt(ros);
      const rosTotal = rosNumero * multiplicador;
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + rosTotal;
      setTotalPostas(updatedTotalPostas);
    
      const randomID = Math.floor(Math.random() * 101) * Math.floor(Math.random() * 101) * 3.3123124;
      setRandom(randomID);
      const newKey = randomID * 3.3123124;
      const updatedSelectedValues = [...selectedValues, { ...item, month: currentMonth, id: randomID, key: newKey }];
      setSelectedValues(updatedSelectedValues);
      saveSelectedValues(updatedSelectedValues);
      }
    
    }if (item.label.includes('BRC')) {
      if (Platform.OS === 'android' && (brc == 0 || isNaN(brc))) {
        ToastAndroid.show('No hay valor cargado para COMODORO', ToastAndroid.SHORT); 
        setModalVisible(true) 
      }if(Platform.OS === 'android'  && (brc === 0  || isNaN(brc))) {
    //       Toast.show('No hay valor cargado para USHUAIA', { duration: Toast.durations.SHORT });
        setModalVisible(true)
      }
      if(isNaN(brc) || brc ==''){setBrc(0)}
      if(!isNaN(brc) && brc !== 0 && brc !== '' && brc !=='0' && brc !=='000'&& brc !=='00' !=='0000'){
      const multiplicador = parseInt(item.label.substring(5));
      const brcNumero = parseInt(brc);
      const brcTotal = brcNumero * multiplicador;
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[currentMonth] = (updatedTotalPostas[currentMonth] || 0) + brcTotal;
      setTotalPostas(updatedTotalPostas);
    
      const randomID = Math.floor(Math.random() * 101) * Math.floor(Math.random() * 101) * 3.3123124;
      setRandom(randomID);
      const newKey = randomID * 3.3123124;
      const updatedSelectedValues = [...selectedValues, { ...item, month: currentMonth, id: randomID, key: newKey }];
      setSelectedValues(updatedSelectedValues);
      saveSelectedValues(updatedSelectedValues);
      }
    
    }
  };
  
  const handleDeleteItem = (item, itemId, itemMonth, itemLabel) => {
    const mes = itemMonth;
    const etiqueta = item.label;
    
    (cor === 0 || isNaN(cor) || cor === '') ?  setSelectedValues((prevData) =>
    prevData.filter((item) => !(itemLabel.includes('COR') && item.month === mes))) : console.log('')
  

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
      if(isNaN(tuc)){setTuc(0)  
      }
      else{
      const restadorXTUC = etiqueta.trim().substring(5);
      const tucNumero = parseInt(tuc);
      const totalPostasNumero = parseInt(totalPostas);
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[mes] = (updatedTotalPostas[mes] || 0) - tucNumero * restadorXTUC;
      setTotalPostas(updatedTotalPostas);
      }
    }if (etiqueta.trim().includes('USH')) {
      const restadorXUSH = etiqueta.trim().substring(5);
      const ushNumero = parseInt(ush);
      const totalPostasNumero = parseInt(totalPostas);
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[mes] = (updatedTotalPostas[mes] || 0) - ushNumero * restadorXUSH;
      setTotalPostas(updatedTotalPostas);
    }if (etiqueta.trim().includes('NQN')) {
      const restadorXNQN = etiqueta.trim().substring(5);
      const nqnNumero = parseInt(nqn);
      const totalPostasNumero = parseInt(totalPostas);
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[mes] = (updatedTotalPostas[mes] || 0) - nqnNumero * restadorXNQN;
      setTotalPostas(updatedTotalPostas);
    }if (etiqueta.trim().includes('FTE')) {
      const restadorXFTE = etiqueta.trim().substring(5);
      const fteNumero = parseInt(fte);
      const totalPostasNumero = parseInt(totalPostas);
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[mes] = (updatedTotalPostas[mes] || 0) - fteNumero * restadorXFTE;
      setTotalPostas(updatedTotalPostas);
    }if (etiqueta.trim().includes('CDR')) {
      const restadorXCDR = etiqueta.trim().substring(5);
      const cdrNumero = parseInt(cdr);
      const totalPostasNumero = parseInt(totalPostas);
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[mes] = (updatedTotalPostas[mes] || 0) - cdrNumero * restadorXCDR;
      setTotalPostas(updatedTotalPostas);
    }if (etiqueta.trim().includes('ROS')) {
      const restadorXROS = etiqueta.trim().substring(5);
      const rosNumero = parseInt(ros);
      const totalPostasNumero = parseInt(totalPostas);
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[mes] = (updatedTotalPostas[mes] || 0) - rosNumero * restadorXROS;
      setTotalPostas(updatedTotalPostas);
    }if (etiqueta.trim().includes('BRC')) {
      const restadorXBRC = etiqueta.trim().substring(5);
      const brcNumero = parseInt(brc);
      const totalPostasNumero = parseInt(totalPostas);
      const updatedTotalPostas = { ...totalPostas };
      updatedTotalPostas[mes] = (updatedTotalPostas[mes] || 0) - brcNumero * restadorXBRC;
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
      <Ionicons name="ios-home" size={22} color="black" />
        <Text style={styles.itemText}>{item.label}</Text>
        <FontAwesome name="trash" size={20} color="black" />
      </View>
    </TouchableOpacity>
  );
/*  const dropdownOn =()=>{
    if(cor=== 0 || isNaN(cor) || cor === '' || cor ==='0'){
    setModalVisible(true)
      setDropDownVisible(false)
    }
    else{
      setDropDownVisible(true)
    }
  };*/
  

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

  //  setSuma(0)
  //  setSuma(updatedSuma);
  //  setViaticos(totalPostas)
  //  console.log(viaticos)
    
  };

  const handleMonthChange = (newMonth) => {

    const selectedDate = new Date(newMonth.timestamp);
    const monthName = selectedDate.toLocaleString('es', { month: 'long' });
    setCurrentMonth(monthName);
    const monthIndex = selectedDate.getMonth(); // Obtén el índice del mes (0-indexado)
    setCurrentMonthIndex(monthIndex);
  //  console.log('Mes: ' + monthName)

  };
  
 /* const handleMonthChange = (newMonth) => {
    const selectedDate = moment(newMonth.timestamp).tz('UTC'); // Convierte a UTC
    const monthName = selectedDate.format('MMMM'); // Obtiene el nombre del mes en UTC
  

  
    const newCurrentMonth = selectedDate.format('MMMM'); // Formatea el mes y el año
  
    // Actualiza el estado de currentMonth
    setCurrentMonth(newCurrentMonth);
  };
  */
  useEffect(() => {
    // Este efecto se ejecutará después de que el estado de currentMonth se haya actualizado
    const sumaNum = parseInt(suma[currentMonth]*aep || 0);
    const totalPostasNum = parseInt(totalPostas[currentMonth] || 0);
    const sumatoria = sumaNum + totalPostasNum
    setViaticos(sumatoria)
//  console.log('sumatoria: $' + viaticos)
    totalPostasNum < 0 ? setTotalPostas(0) : console.log('') 
  //  console.log('*mes : ' + currentMonth);
  //  console.log('valores filtado mes: ' + filteredValues)

  }, [currentMonth, suma, totalPostas, aep]); 
  
  const AbrirModal = () => {
    setModalVisible(true);
  };

  const Back =()=>{
    navigation.navigate('Home');
  
  };

  const IrAFlex=()=>{
    navigation.navigate('ControlFlex')
  };

  const infoViaticos = ()=> {
 //   console.log('InfoViaticos')
    if(infoVisible == false){
      setInfoVisible(true);
    }else{
      setInfoVisible(false);
    }
  };

  const disabledDates = {};

 const Reset = (itemMonth) => {

  const mesActual = itemMonth;

    Alert.alert(
      '¿Deseas resetear todos los valores del mes de ' + currentMonth + '?',
      'Esta acción restablecerá todos los valores para este mes.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Resetear',
          onPress: () => {
            const updatedMarkedDates = { ...markedDates };

            // Recorre todas las claves de fechas y elimina las del mes actual
            for (const dateKey in updatedMarkedDates) {
              const [year, month] = dateKey.split('-').map(Number);
              if (year === new Date().getFullYear() && month === currentMonthIndex + 1) {
                delete updatedMarkedDates[dateKey];
              }
            }
            // Actualiza el estado de las fechas marcadas solo para el mes actual
            setMarkedDates(updatedMarkedDates);

            // Borra contador de bandejas AEP (valor suma[currentMonth])
            setSuma({ ...suma, [currentMonth]: 0 });
            
            // Borra sumador de monto de postas (valor totalPostas[currentMonth])
            setTotalPostas({...totalPostas, [currentMonth] : 0})

            // Borra postas seleccionadas del mes
            const updatedSelectedValues = selectedValues.filter((item) => item.month !== currentMonth);

          // Actualiza el estado de los elementos para eliminar los del mes actual
          setSelectedValues(updatedSelectedValues);
          
          saveSelectedValues(updatedSelectedValues);
         // saveSelectedValues(
          //  selectedValues.filter((item) => !( item.month === mesActual)));
          },
        },
      ]
    );
  };

  return (

    <>  
        
    <StatusBar backgroundColor='#BEC4FE'
               barStyle="dark-content" 
                />
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <ImageBackground source={require('../assets/bgVIaticos.jpg')} style={GlobalStyles.fondoViaticos}>
<View style={{marginTop:2}}>
      <Text style={GlobalStyles.tituloViaticos}>
      ⇩  REGISTRO VIATICOS ⇩</Text>
</View>
<View style={{width:'100%', alignContent:'center'}}>
      <Calendar
        hideExtraDays={true}
        enableSwipeMonths={sweep}
        hideArrows={hideArrows}
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
        arrowHeight:20,
        arrowWidth:20,
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
</View>
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
      <Text style={styles.modalBandejas}>INGRESA EL VALOR DE CADA BANDEJA</Text>

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
     value={aep ? aep.toString() : ''}
     onChangeText={(newValor) => input('aep', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>COR $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={cor ? cor.toString() : ''}
     onChangeText={(newValor) => input('cor', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>USH $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={ush ? ush.toString() : ''}
     onChangeText={(newValor) => input('ush', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>SLA $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={sla ? sla.toString() : ''}
     onChangeText={(newValor) => input('sla', newValor)} 
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>TUC $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={tuc ? tuc.toString() : ''}
     onChangeText={(newValor) => input('tuc', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>

<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>ROS $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={ros ? ros.toString() : ''}
     onChangeText={(newValor) => input('ros', newValor)}
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
     value={cdr ? cdr.toString() : ''}
     onChangeText={(newValor) => input('cdr', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>BHI $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={bhi ? bhi.toString() : ''}
     onChangeText={(newValor) => input('bhi', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>MDZ $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={mdz ? mdz.toString() : ''}
     onChangeText={(newValor) => input('mdz', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>FTE $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={fte ? fte.toString() : ''}
     onChangeText={(newValor) => input('fte', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>
<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>NQN $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={nqn ? nqn.toString() : ''}
     onChangeText={(newValor) => input('nqn', newValor)}
     placeholder="$$$$$"
     clearTextOnFocus={true}
     ></TextInput>
</View>

<View style={{flexDirection: 'row' }}>
     <Text style={GlobalStyles.escalas}>BRC $ </Text>
     <TextInput
     style={GlobalStyles.valorEscalas$}
     keyboardType='number-pad'
     value={brc ? brc.toString() : ''}
     onChangeText={(newValor) => input('brc', newValor)}
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
        Total viaticos
        ${viaticos ||0}
        </Text>
        </View>     
        </View>                
        <View style={{ flex:1}}>
          
  <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownMenu}
   //     menuStyle={styles.dropdownMenu}
        itemContainerStyle={styles.dropdownItemMenu}
        disabled={dropDownVisible}
        placeholderStyle={styles.cartelPostas}
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
    <ToolBar3 Back={Back}
     AbrirModal={AbrirModal} 
     infoViaticos={infoViaticos}
     ControlFlex={IrAFlex}
     Reset={Reset}
     ></ToolBar3>      
    </View>
    </ImageBackground>
    </TouchableWithoutFeedback>
    </>

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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf:'flex-start',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth:2,
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
  dropdownMenu: {
    borderWidth: 2,
    borderColor:'darkblue',
    padding: 1,
    marginTop:1,
    opacity:1,
    backgroundColor:'#f0fff0',
    borderRadius:10,
    width: '100%',
    marginRight: '16%',
    borderBottomColor: 'grey',
    borderBottomWidth: 2.5,
  },
  dropdownItemMenu: {
    borderWidth: 2,
    margin:1,
    borderColor:'darkblue',
    opacity:1,
    backgroundColor:'#f0fff0',
    borderRadius:10,
    width: '100%',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    marginRight: 5,
  },
  cartelPostas: {
    fontWeight:'bold',
    fontSize: 16,
    fontStyle:'italic',
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
    backgroundColor:'#dcdcdc',
    borderBlockColor:'grey',
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
  modalBandejas:{   
      //textDecorationLine:'underline',
      padding:2,
      paddingBottom:'0%',
      backgroundColor:'lightblue',
      borderWidth:2,
      borderLeftColor:'green',
      borderTopColor:'green',
      borderRadius:20,
      textAlign:'center',
      fontWeight:'900',
      fontSize:25,
      textShadowColor: 'white',
      textShadowOffset: { width: 4, height: 2 },
      textShadowRadius: 10,
    },
});

export default Viaticos;
