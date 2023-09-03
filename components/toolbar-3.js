import React from "react";
import { View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Splash from '../screens/Splash';
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const tabBarHeight = Platform.OS === 'ios' ? 80 : 55;

function ToolBar3({ AbrirModal , infoViaticos , Back}){



return(

    <View style={{width:"100%", position:'absolute', bottom:0 }}>
    <Tab.Navigator 

  screenOptions={{
      tabBarStyle: {
        borderBottomWidth:0.5,
        borderBottomColor:'#fffacd',
        borderTopEndRadius:25,
        borderTopStartRadius:25,
        borderTopWidth:2.5,
        borderTopColor:'#ffc0cb',
        backgroundColor: 'black', 
        height:tabBarHeight,
      },
      tabBarLabelStyle: {
                         fontSize: 13,
                         color: '#f0ffff', 
      },
      style: {
              flexDirection: 'row',
              justifyContent: 'space-between', 
              alignItems: 'center', 
              paddingHorizontal: 20, 
    }, 
    }}>
  
  <Tab.Screen
    name='Info'
    component={Splash}
    options={{
      headerShown: false,
      tabBarIcon: ({ color }) => (
        <Entypo name="info-with-circle" size={30} color="white" />
      ),
      tabBarButton: (props) => (
        <TouchableOpacity
          {...props}
          onPress={() => {infoViaticos() }} />
          )        
    }}/>

  <Tab.Screen
    name='Valor Bandejas'
    component={Splash}
  
    options={{
      headerShown: false,
      tabBarIcon: ({ color }) => (
        <FontAwesome name="money" size={36} color="white" />
      ),
      tabBarButton: (props) => (
        <TouchableOpacity
          {...props}
          onPress={() => AbrirModal() } />
          )        
    }}
  />
  <Tab.Screen
    name='Back'
    component={Splash}
  
    options={{
      headerShown: false,
      tabBarIcon: ({ color }) => (
        <Ionicons name="ios-arrow-back-circle" size={36} color="white" />
      ),
      tabBarButton: (props) => (
        <TouchableOpacity
          {...props}
          onPress={() => Back()} />
          )        
    }}
  />



  
</Tab.Navigator>
    </View>
)}

export default ToolBar3;