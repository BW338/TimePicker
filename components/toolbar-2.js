import React from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Splash from '../screens/Splash';
import { MaterialCommunityIcons, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const windowHeight = Dimensions.get('window').height;
const tabBarHeightPercentage = 8; // Ajusta el valor según lo que desees, por ejemplo, 8% (0.08)
const tabBarHeight = (windowHeight * tabBarHeightPercentage) / 100;
function ToolBar2({ AbrirModal , infoOn2 , Back, abrirRav, viaticos}){



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
        borderTopColor:'#fffacd',
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
          onPress={() => {infoOn2() }} />
          )        
    }}/>

<Tab.Screen
    name='RAV'
    component={Splash}
  
    options={{
      headerShown: false,
      tabBarIcon: ({ color }) => (
<MaterialIcons name="format-list-bulleted" size={36} color="white" />
      ),
      tabBarButton: (props) => (
        <TouchableOpacity
          {...props}
          onPress={() => abrirRav() } />
          )        
    }}
  />

<Tab.Screen
    name='Back'
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
    name='$$ HR FLEX'
    component={Splash}
  
    options={{
      headerShown: false,
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="account-cash-outline" size={36} color="white" />

      ),
      tabBarButton: (props) => (
        <TouchableOpacity
          {...props}
          onPress={() => AbrirModal() } />
          )        
    }}
  />



<Tab.Screen
    name='Viaticos'
    component={Splash}
  
    options={{
      headerShown: false,
      tabBarIcon: ({ color }) => (
        <MaterialIcons name="food-bank" size={36} color="white" />
      ),
      tabBarButton: (props) => (
        <TouchableOpacity
          {...props}
          onPress={() => viaticos()} />
          )        
    }}
  />


  
</Tab.Navigator>
    </View>
)}

export default ToolBar2;