import React, { useState, useEffect } from "react";
import { View, ImageBackground, TouchableOpacity, TouchableNativeFeedback, Animated, Text, AlertIOS, ToastAndroid } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { GlobalStyles } from "../estilos/global_styles";

export default function Splash({ navigation }) {
  const [fadeAnim] = useState(new Animated.Value(0));

  const Ingresar = () => {
    navigation.replace('Home'); // Utiliza replace en lugar de navigate
  }

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }
    ).start();
  }, []);

  return (
    <ImageBackground source={require('../assets/sky2.jpg')} style={GlobalStyles.fondo}>
      <View>
      <TouchableOpacity onPress={Ingresar}>
      <Text style={GlobalStyles.Title}>Time Picker</Text>
      </TouchableOpacity>
      </View>
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableNativeFeedback>
            <SimpleLineIcons name="plane" size={80} color="white"
              title='Ingresar'
              background={TouchableNativeFeedback.Ripple('#ffffff', false)}
              onPress={Ingresar}
            />
          </TouchableNativeFeedback>
        </Animated.View>
        <TouchableOpacity onPress={Ingresar}>
          <Animated.Text style={{ color: 'white', fontSize: 32, opacity: fadeAnim }}>Ingresar</Animated.Text>
        </TouchableOpacity>
      </View>
      <View style={{marginBottom:4}}>
      <Animated.Text style={{ color: 'white',
                              fontSize: 14,
                              opacity: fadeAnim }}>Version 1.2.2</Animated.Text>
      </View>
    </ImageBackground>
  );
}