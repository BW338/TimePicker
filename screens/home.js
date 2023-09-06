import React, { useState } from "react";
import { Button, View, Text, TouchableOpacity, ImageBackground, StatusBar,Alert, Modal, ToastAndroid, Vibration} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { GlobalStyles } from "../estilos/global_styles";
import { Foundation, AntDesign, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ToolBar from '../components/Toolbar';
import Info from "../screens/info";
import { useNavigation } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

const Home = () => {

  const navigation = useNavigation();

  const [esreloj1visible, setreloj1visible] = useState(false);
  const [esreloj2visible, setreloj2visible] = useState(false);
  const [esreloj3visible, setreloj3visible] = useState(false);

  const [modal, setmodal] = useState(false);

  const [checkin, setCheckin] = useState('Check-in');
  const [HrETD, setHrETD] = useState('E T D');
  const [HrETA, setHrETA] = useState('  E T A  ');

  const [ETDprevisto, setETDprevisto] = useState(' ETD previsto');
  const [Atareal , setATAreal] = useState('AtaReal');
  const [UETA, setUETA] = useState(NaN);
  const [Dif, setDif] = useState('dif');
  const [Total, setTotal] = useState('total');
  
  const [ulteta, setulteta] = useState('Ultimo Aterrizaje');
  const [TVS, setTSV] = useState(' T S V ');
  const [TTEE, setTTEE] = useState(' TT EE ');
  
  const [Flex, setFlex] = useState('HS FLEX');
  const [flexColor , setflexColor] = useState('transparent');
  const [opFlex, setopFlex] = useState('0.30');

  const [vencColor, setvencColor] = useState('yellow');
  
  const [infoVisible, setinfoVisible] = useState(false);

//SELECTOR HORARIO

////Checkin
const mostrarreloj1 = () => {
  setreloj1visible(true);
};

const cerrarreloj1 = () => {
  setreloj1visible(false);
  setCheckin('Check-in');
};

///// Despegue

const mostrarreloj2 = () => {
  setreloj2visible(true);
};

const cerrarreloj2 = () => {
  setreloj2visible(false);
  setHrETD('E T D');

};

///// Aterrizaje

const mostrarreloj3 = () => {
  setreloj3visible(true);
};

const cerrarreloj3 = () => {
  setreloj3visible(false);
  setHrETA('  E T A   ');
};

const Reset = () => {
      setCheckin('Check-in');
      setHrETD('E T D');
      setHrETA('  E T A  ');
      setulteta('Ultimo Aterrizaje');
      setTSV(' T S V ');
      setTTEE(' TT EE ');
      setFlex('HS FLEX');
      setvencColor('yellow');
      setflexColor('transparent');

        if (Platform.OS === 'android') {
        ToastAndroid.show('Reset', ToastAndroid.SHORT);
      
      }  else  if (Platform.OS === 'android') {
        Toast.show('Reset', { duration: Toast.durations.SHORT });
      }
    
      };

  const IrAFlex =()=>{
      navigation.navigate('ControlFlex');
    }
  const IrAViaticos =()=>{

        navigation.navigate('Viaticos');
        }


const infoOn =()=>{
if(infoVisible == false){
  setinfoVisible(true);
}else{
  setinfoVisible(false);
}
};


//////////////// C A L C U L A R ----------------------------------------------------------------------------------
   const calcular =()=>{
    if(checkin === 'Check-in'){  
      Alert.alert('ATENCION!' , 'Debes ingresar al menos horario de presentacion');
      setulteta('Ultimo Aterrizaje');
      setTSV(' T S V ');
      setTTEE(' TT EE ');
      setFlex('HS FLEX');
      setvencColor('yellow');
      
    } else {    
  
  // Convertir a milisegundos ---Chekin - ETD - ETA ----
  
   let CK = moment(checkin, 'HH:mm').toDate(); 
   let CKms = CK.getTime(); 
  
   let ETD = moment(HrETD, 'HH:mm').toDate();
   let ETDms = ETD.getTime();

   let ETA = moment(HrETA, 'HH:mm').toDate();
   let ETAms = ETA.getTime(); 
  //----------------------------------------------------------------
  
   // Restar las fechas para obtener la diferencia en milisegundos
  
  let differenceMS = (ETAms - CKms) + (1800000) /// ese Millon.800 es = a media hora ;
  let TTEEms = (ETAms - (CKms /* + 3600000*/ ));
  
  // Convertir la diferencia a un horario

  const difference = new Date(differenceMS);
  const TTEEs = new Date(TTEEms);
  
  const hoursTSV = difference.getUTCHours();
  const minutesTSV = difference.getUTCMinutes();
  (!isNaN(hoursTSV)) ? setTSV(hoursTSV + ':' + minutesTSV.toString().padStart(2,'0') + ' TSV ') : setTSV(' TSV'); 
  
  if(HrETD === 'E T D'){
    setTSV(' T S V ');
  
  }if(HrETA === '  E T A  '){
    setTTEE('TT EE');
    setFlex('FLEX');
  }
  
  const hoursTTEE = TTEEs.getUTCHours();
  const minutesTTEE = TTEEs.getUTCMinutes();
  (!isNaN(hoursTTEE)) ? setTTEE(hoursTTEE + ':' + minutesTTEE.toString().padStart(2,'0') + ' TT EE') : setTTEE(' TT EE '); 
  
  
  //// Descuentos segun horario Check-In--------
  const CKh = CK.getHours();
  const CKm = CK.getMinutes();
  let multiplo = 0; ////la var multiplo marca la multiplicacion de la hora segun presentacion-----
  
  
  if(CKh == 23){
    multiplo = 3;
  
  }if(CKh == 0){
  multiplo = 3;
  
  }if(CKh == 1){
    multiplo = 2.5;
  
  }if(CKh == 2){
    multiplo = 2;
  
  }if(CKh == 3){
    multiplo = 1.5;
  
  }if(CKh == 4){
    multiplo = 1;
  
  }if(CKh == 5){
    multiplo = 0.5;
  }
  ///////////////////////////////////////////////////////////////////////////
  /// PARCHE PARA TABLA 877 GUIA UTIL -SINDICATO-
  ///////////////////////////////////////////////////////////////////////
  if(CKh==11 && ( CKm >= 15)){
   multiplo = 0.25
  }
  if((CKh == 11 && CKm >= 30) || (CKh == 12 && CKm < 45)){
    multiplo = 0.5
  }
  if(CKh == 12 && CKm >= 45){
      multiplo = 0.75
  }
  if(CKh ==13 || (CKh == 14 && CKm < 15)){
      multiplo =1
  }
  if( CKh == 14 && CKm >= 15){
      multiplo = 1.25
  }
  if(CKh ==14 && CKm >= 30 || (CKh == 15 && CKm <= 45)){
      multiplo = 1.5
  }
  if( CKh == 15 && CKm >= 45){
    multiplo = 1.75
}
if(CKh == 16 || (CKh ==17 && CKm < 15) || (CKh ==17 && CKm < 15)){
  multiplo =2 
}
if((CKh ==17 && CKm >= 15)){
  multiplo = 2.25 
}
if((CKh ==17 && CKm > 15) || (CKh ==18 && CKm < 45)){
  multiplo =2.5 
}
if( CKh == 18 && CKm >= 45){
  multiplo = 2.75
}
if( CKh >= 19){
  multiplo = 3
}
/////↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
///////------------------------------------------------------
  ///////////////------------------------------

  // Calculo de ULTIMO ATERRIZAJE SEGUN PRESENTACION
   let ultetaMS = CKms + ((3600000 * 13) - (3600000 * multiplo));
   let ultetaDate = new Date(ultetaMS);

  //////-------------------------------------
   /////////// CALCULO para planilla FLEX (TODO HORA ZULU /+3hs/)

   ////CALCULO DE HORAS FLEX ---------//////
  
  ((hoursTTEE == 8 && minutesTTEE > 0) || hoursTTEE > 8 && hoursTTEE < 10 || hoursTTEE == 10 && minutesTTEE == 0) ? setFlex('2 HS FLEX') : 
  ((hoursTTEE == 10 && minutesTTEE > 0) || hoursTTEE > 10) ? setFlex('4 HS FLEX') :  setFlex('HS FLEX');

  (hoursTTEE >= 8 && minutesTTEE > 0) || (hoursTTEE > 8 ) ? setflexColor('#7cfc00')  : (setflexColor('transparent'));
  
  Flex === 'HS FLEX' ? setopFlex('0.3') : setopFlex('1');

   let ETDprevistoms = (CKms + 14400000);
   let ETDprevistoDate = new Date(ETDprevistoms);
   setETDprevisto(ETDprevistoDate.getHours() + ':' + ETDprevistoDate.getMinutes().toString().padStart(2,'0'));

   let ATArealms = (ETAms + 10800000);
   let ATArealToDate = new Date(ATArealms);
   setATAreal(ATArealToDate.getHours() + ':' + ATArealToDate.getMinutes().toString().padStart(2,'0'));

   let Difms = ATArealms - ETDprevistoms;
   let DifToDate = new Date(Difms);
   setDif(DifToDate.getUTCHours() + ':' + DifToDate.getMinutes().toString().padStart(2,'0'));

   let Totalms = Difms + 3600000;
   let TotalToDate = new Date (Totalms);
   setTotal(TotalToDate.getUTCHours() + ':' + TotalToDate.getMinutes().toString().padStart(2,'0'));
  
///////////--------------------
   //////////////// SE RESTA LA MEDIA HORA DEL FIN DE SERVICIo
   ultetaMS = ultetaMS - 3600000/2;
   ultetaDate = new Date(ultetaMS);
   setulteta(ultetaDate.getHours() + ':' + ultetaDate.getMinutes().toString().padStart(2,'0') +  ' ULT-ETA');

 //////////---------------------



    //Calculo segun ETA/////////////////////////////////////////////////////////   
  setUETA(ultetaDate.getHours());
  console.log('Ult ETA sin entrar en calculo: '+ UETA);
/*
  if(CKh != 23 && CKh != 0 && CKh != 1 && CKh != 2 && CKh != 3 && CKh != 4 && CKh != 5 ){ 
  
  if(ultetaDate.getHours() == 0){
  ultetaMS = ultetaMS - 3600000/2;
  ultetaDate = new Date(ultetaMS);
  
  }if(ultetaDate.getHours() == 1){
    ultetaMS = ultetaMS - 3600000 * 1;
    ultetaDate = new Date(ultetaMS);
   
  }if(ultetaDate.getHours() == 2){
    ultetaMS = ultetaMS - 3600000*1.5;
    ultetaDate = new Date(ultetaMS);

  
  }if(ultetaDate.getHours() == 3){
    ultetaMS = ultetaMS - 3600000*2;
    ultetaDate = new Date(ultetaMS);

  
  }if(ultetaDate.getHours() == 4){
    ultetaMS = ultetaMS - 3600000*2.5;
    ultetaDate = new Date(ultetaMS);
  
  }if(ultetaDate.getHours() == 5 ){
    ultetaMS = ultetaMS - 3600000*3
    ultetaDate = new Date(ultetaMS);

  
   }if( ultetaDate.getHours() == 6){
    ultetaMS = ultetaMS - 3600000*3
    ultetaDate = new Date(ultetaMS);
 
  }if( ultetaDate.getHours() == 7){
    ultetaMS = ultetaMS - 3600000*3
    ultetaDate = new Date(ultetaMS);
 
  }if( ultetaDate.getHours() == 8){
    ultetaMS = ultetaMS - 3600000*3
    ultetaDate = new Date(ultetaMS);

 
  }if( ultetaDate.getHours() == 9){
    ultetaMS = ultetaMS - 3600000*3
    ultetaDate = new Date(ultetaMS);
   
  }if( ultetaDate.getHours() == 10){
    ultetaMS = ultetaMS - 3600000*3
    ultetaDate = new Date(ultetaMS);
   
  }if( ultetaDate.getHours() == 11){
    ultetaMS = ultetaMS - 3600000*3
    ultetaDate = new Date(ultetaMS);
   }
  }
  */
const etaTime = ETA.getHours();
const ultetaTime = ultetaDate.getHours();
const diff = (etaTime - ultetaTime); 
    
let ultMin = ultetaDate.getMinutes();
let etdMin = ETA.getMinutes();

if ((ultetaDate.getHours() < ETA.getHours() || ultetaDate.getHours() == ETA.getHours() && ultMin < etdMin) && (diff < 10 )||
ultetaDate.getHours() <= 23 && ultetaDate.getHours() > 21 && ultetaDate.getHours() > ETA.getHours() && (ETA.getHours() > 22 || ETA.getHours() < 5 ) || 
   (CK.getHours() == 9  && ETA.getHours() <= 8 ) || (CK.getHours() == 8  && ETA.getHours() <= 7 ) || (CK.getHours() == 7 && ETA.getHours() <= 7 ) ||
   (CK.getHours() == 6  && ETA.getHours() <= 6 ) || (CK.getHours() == 5  && ETA.getHours() <= 5 ) || (CK.getHours() == 4 && ETA.getHours() <= 4 ) ||
   (CK.getHours() == 3  && ETA.getHours() <= 3 ) || (CK.getHours() == 2  && ETA.getHours() <= 2 ) || (CK.getHours() == 1 && ETA.getHours() <= 1 )) {

    Vibration.vibrate(100);

    console.log('ult eta: ' + ultetaTime);
    console.log('///////////');

    console.log(' eta: ' + etaTime);

(Toast.show({type:'error', text1:'ATENCION! REVISAR HORARIO ATERRIZAJE'}), 

setvencColor('red')) 

} else{
setvencColor('yellow');
}
//////////-----------------------------
    }
   }
  
    return (
        <>  
        
        <StatusBar backgroundColor='#2E86C1'
                   barStyle="dark-content" />

  <ImageBackground source={require('../assets/bg1.jpg')} style={GlobalStyles.fondo}>
  <Modal visible={modal}
         animationType='slide'
         transparent={true} >
    <View style={{flex:1, justifyContent:'flex-end' , opacity:0.94}}> 
    <View style={GlobalStyles.ModalStyle}>
      <Text style={GlobalStyles.TitleFlex}>Planilla Hs FLEX</Text>
      <Text style={GlobalStyles.TextoFlex}>{'ETD PREVISTO ---- ' + ETDprevisto  }</Text>
      <Text style={GlobalStyles.TextoFlex}>{'ATA REAL --------- ' + Atareal}</Text>
      <Text style={GlobalStyles.TextoFlex}>{'DIFERENCIA ------ ' + Dif}</Text>
      <Text style={GlobalStyles.TextoFlex}>{'PRE-POST VUELO - ' + '1:00'}</Text>
      <Text style={GlobalStyles.TextoFlex}>{'TOTAL ------------ ' + Total}</Text>
      <Text style={{textAlign:'center'}}>Todo en hora Z (G.T.M)</Text>
      <TouchableOpacity style={GlobalStyles.CloseModal}>    
            <Button 
             title= 'Cerrar'
             onPress={()=> setmodal(false)}></Button>
      </TouchableOpacity>

    </View>
    </View>
  </Modal>

  <Info infoVisible={infoVisible} 
        setinfoVisible={setinfoVisible} 
        infoOn={infoOn}
  ></Info>    
  
{/* ///////////////////////////////////////////////////////////////////////////// */}
<Toast ref={() => {Toast.setRef()}}/>   
  
  {/* ///// ATENCION!! ESTA LINEA ESTABA GENERANDO UNA ADVERTENCIA, COMO PRUEBA ESTA ANULADA */}

  <View style={GlobalStyles.box1}>

 <View style={GlobalStyles.cont_reloj}>    
  
 <MaterialCommunityIcons name="car-clock"
                         size={40} 
                         color="black" 
                         onPress={mostrarreloj1} />
  
       <TouchableOpacity style={GlobalStyles.relojes}
        onPress={()=>{mostrarreloj1();}} >
        <Text style={GlobalStyles.txBotones}>{checkin}</Text>
        </TouchableOpacity>
       
        <DateTimePickerModal
        isVisible={esreloj1visible}
        mode='time'
        numberOfLines={1}
        display='default'
        minuteInterval={5}
        is24Hour
         onConfirm={(time) => {
         setCheckin(time.getHours() + ':' + time.getMinutes().toString().padStart(2,'0'));
          setreloj1visible(false);
        }} 
         onCancel={cerrarreloj1} />
          
          </View>

<View  style={GlobalStyles.cont_reloj}>
<MaterialIcons name="flight-takeoff"
               size={40} 
               color="black"
               onPress={mostrarreloj2} />
<TouchableOpacity style={GlobalStyles.relojes}
        onPress={()=>{mostrarreloj2();}} >

        <Text style={GlobalStyles.txBotones}>{HrETD}</Text>
       
        </TouchableOpacity> 
        <DateTimePickerModal
        isVisible={esreloj2visible}
        mode='time'
        is24Hour
        onConfirm={(time) => {
          setHrETD(time.getHours() + ':' + time.getMinutes().toString().padStart(2,'0'));
          setreloj2visible(false);}}  
          onCancel={cerrarreloj2} />
</View>
</View>

<View style={GlobalStyles.box2}>
<View  style={GlobalStyles.cont_relojB}>
<MaterialCommunityIcons name="airplane-landing"
                        size={40}
                        color="black"
                        onPress={mostrarreloj3} />
<TouchableOpacity style={GlobalStyles.relojes}
                  onPress={()=>{mostrarreloj3();}}
                  
                   >

        <Text style={GlobalStyles.txBotones}>{HrETA}</Text>
       
        </TouchableOpacity>
        
        <DateTimePickerModal
        isVisible={esreloj3visible}
        mode='time'
        is24Hour
        display="default"
        onConfirm={(time) => {
          setHrETA(time.getHours() + ':' + time.getMinutes().toString().padStart(2,'0'));
          setreloj3visible(false);
        }
        }  
          onCancel={cerrarreloj3} />
</View>
</View>

<View style={GlobalStyles.box3}>

<View style={GlobalStyles.resultA}>      
    
    <View style={GlobalStyles.cont_relojC}>
    <AntDesign name="warning"
               size={40} 
               color={vencColor} />
      <Text style={GlobalStyles.txETA}
       numberOfLines={2}>{ulteta}</Text>
      </View>
    <View style={GlobalStyles.cont_relojC}>  
    <MaterialCommunityIcons name="timetable" size={40} color="black" />
    <Text style={GlobalStyles.txETA}>{TVS}</Text>
      </View>      
</View>      
 
<View style={GlobalStyles.resultA}>      
    
    <View style={GlobalStyles.cont_reloj}>
    <Ionicons name="timer" size={40} color="black" />
      <Text style={GlobalStyles.txETA}
       numberOfLines={2}>{TTEE}</Text>
     
      </View>
    <View style={{...GlobalStyles.cont_reloj}}>  
    <Foundation name="clipboard-notes"
                size={42} color={flexColor}
                onPress={()=>{flexColor == '#7cfc00' ? setmodal(true) : false}}/>                                       
    <Text style={GlobalStyles.txFLEX}
          onPress={()=>{flexColor == '#7cfc00' ? setmodal(true) : false}}>{Flex}</Text>
      </View>      
</View>  

</View>

<View style={{width:"100%", position:'absolute', bottom:0, }}>

<ToolBar calcular={calcular}
         Reset={Reset} 
         infoOn={infoOn} 
         ControlFlex={IrAFlex}
         viaticos={IrAViaticos}  />

</View>
      </ImageBackground>
      </>
    )
};



export default Home;