import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import Splash from '../screens/Splash';
import Viaticos from '../screens/viaticos';
import ControlFlex from '../screens/control-flex';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash" // ruta inicial
        screenOptions={{ headerShown: false }} // Oculta las cabeceras en todas las pantallas
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ControlFlex" component={ControlFlex} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Viaticos" component={Viaticos} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;