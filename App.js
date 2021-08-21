import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUp from './src/screens/registration/signUp';
import LogIn from './src/screens/registration/logIn';
import Home from './src/screens/home/home';
import HomeNavigator from './src/screens/home/homeNavigator';
import type {Node} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

/**
 * Stack navigator which allows a user to login or sign up
 * when a user successfully login/register it takes up to the home navigator
 * @export
 * @return stack.navigator from which to access login, signup screens
 */
export default function App() {
  const Stack = createStackNavigator();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  });
  // useEffect(async () => {
  //   try {
  //     let user = await AsyncStorage.getItem('user');
  //     if (user) {
  //       console.log(user);
  //       setIsLogged(true);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   return () => {
  //     cleanup;
  //   };
  // }, [isLogged]);

  // console.log('object', isLogged);

  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName={isLogged ? 'HomeNavigator' : 'Login'}> */}
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
