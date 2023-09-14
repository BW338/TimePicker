import React from "react";
import { View, TouchableOpacity, Dimensions  } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Splash from '../screens/Splash';
import { Ionicons } from '@expo/vector-icons';
import { Entypo , Fontisto, MaterialIcons  } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
const windowHeight = Dimensions.get('window').height;
const tabBarHeightPercentage = 8; // Ajusta el valor según lo que desees, por ejemplo, 8% (0.08)
const tabBarHeight = (windowHeight * tabBarHeightPercentage) / 100;

function ToolBar({ calcular , Reset , infoOn , ControlFlex, viaticos}){

return(

    <View style={{width:"100%", position:'absolute', bottom:0 }}>
    <Tab.Navigator

  screenOptions={{
    
      tabBarStyle: {
      borderBottomWidth:0.5,
      borderBottomColor:'#87cefa',
      borderTopEndRadius:25,
      borderTopStartRadius:25,
      borderTopWidth:2.5,
      borderTopColor:'#87cefa',
      backgroundColor: 'black', 
      height:tabBarHeight,

        
    }, tabBarLabelStyle: {
      fontSize: 13,
      color: '#f0ffff', 

},
    style: {
      borderWidth:3,
      borderColor:'black',
      flexDirection: 'row',
      justifyContent: 'space-between', 
      alignItems: 'center', 
      paddingHorizontal: 20, 
      backgroundColor:'black',

    }, 
    }}>
  
  <Tab.Screen
    name='Info'
    component={Splash}
    options={{
      headerShown: false,
      tabBarIcon: ({ color }) => (
        <Entypo name="info-with-circle" size={28} color="white" />
      ),
      tabBarButton: (props) => (
        <TouchableOpacity
          {...props}
          onPress={() => {infoOn() }}
          />
          )        
    }}
  />
   <Tab.Screen
    name='viaticos'
    component={Splash}
    options={{
      headerShown: false,
      tabBarIcon: ({ color }) => (
        <MaterialIcons name="food-bank" size={36} color="white" />
      ),
      tabBarButton: (props) => (
        <TouchableOpacity
          {...props}
          onPress={() => {viaticos() }}
          />
          )        
    }}
  />

  <Tab.Screen
    name='Enter'
    component={Splash}
  
    options={{
      headerShown: false,
      tabBarIcon: ({ color }) => (
        <Ionicons name="caret-forward-circle-outline" color='white' size={36}></Ionicons>
      ),
      tabBarButton: (props) => (
        <TouchableOpacity
          {...props}
          onPress={() => {calcular() }} />
          )        
    }}
  />

<Tab.Screen
    name='Reset'
    component={Splash}
  
    options={{
      headerShown: false,
      tabBarIcon: ({ color }) => (
        <Ionicons name="md-refresh-circle-outline" size={36} color="white" />
      ),
      tabBarButton: (props) => (
        <TouchableOpacity
          {...props}
          onPress={() => Reset()} />
          )        
    }}
  />

<Tab.Screen
    name='HS Flex'
    component={Splash}
  
    options={{
      headerShown: false,
      tabBarIcon: ({ color }) => (
        <Fontisto name="date" size={30} color="white" />
      ),
      tabBarButton: (props) => (
        <TouchableOpacity
          {...props}
          onPress={() => ControlFlex()} />
          )        
    }}
  />
  
</Tab.Navigator>
    </View>
)}

export default ToolBar;