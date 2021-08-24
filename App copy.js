// import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import EntryPoint from './src/components/EntryPoint';

/**
 * Accessing user detials, if already logged in or not
 * Passes login status to entry point component
 * @export
 * @return {*} Entry point component
 */
export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      if (user) {
        console.log('user is:', user);
        setIsLogged(true);
        SplashScreen.hide();
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return <EntryPoint isLogged />;
}
