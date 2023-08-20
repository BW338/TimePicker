import { StyleSheet, Text, View } from 'react-native';
import HomeStack from './routes/homeStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <View style={styles.container}>
      <HomeStack></HomeStack> 

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});