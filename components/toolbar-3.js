import React from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Splash from '../screens/Splash';
import { FontAwesome, Entypo, Fontisto, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const windowHeight = Dimensions.get('window').height;
const tabBarHeightPercentage = 8; // Ajusta el valor según lo que desees, por ejemplo, 8% (0.08)
const tabBarHeight = (windowHeight * tabBarHeightPercentage) / 100;

function ToolBar3({ AbrirModal , infoViaticos , Back, ControlFlex, Reset}){



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
    name='Home'
    component={Splash}
  
    options={{
      headerShown: false,
      tabBarIcon: ({ color }) => (
<Entypo name="home" size={36} color="white" /> 
     ),
      tabBarButton: (props) => (
        <TouchableOpacity
          {...props}
          onPress={() => Back()} />
          )        
    }}
  />



  <Tab.Screen
    name='$$$'
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

export default ToolBar3;