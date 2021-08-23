import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import EntryPoint from './EntryPoint';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from './src/screens/registration/signUp';
import LogIn from './src/screens/registration/logIn';
import HomeNavigator from './src/screens/home/homeNavigator';
import {AuthContext} from './src/components/context';
import Config from 'react-native-config';

URL = Config.API_URL;

function loginReducer(prevState, action) {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        userId: action.userId,
        userToken: action.token,
        isLoading: true,
      };
    case 'LOGIN':
      return {
        ...prevState,
        userId: action.userId,
        userToken: action.token,
        isLoading: true,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        userId: null,
        userToken: null,
        isLoading: true,
      };
    case 'REGISTER':
      return {
        ...prevState,
        userId: action.userId,
        userToken: action.token,
        isLoading: true,
      };
  }
}
/**
 * Accessing user detials, if already logged in or not
 * Passes login status to entry point component
 * @export
 * @return {*} Entry point component
 */
export default function App() {
  const Stack = createStackNavigator();
  const initialLoginState = {
    isLoading: false,
    userId: null,
    userToken: null,
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('token');
        userId = await AsyncStorage.getItem('userId');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken, userId: userId});
    }, 2000);
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: (email, password) => {
        var xhr = new XMLHttpRequest();
        var params = 'email=' + email + '&password=' + password;
        let userToken = null;
        xhr.open('POST', `${URL}/user/login`, true);
        xhr.setRequestHeader(
          'content-type',
          'application/x-www-form-urlencoded',
        );
        xhr.onload = async () => {
          try {
            if (xhr.status == 200) {
              let responseObj = JSON.parse(xhr.response);
              userToken = responseObj.token;
              await AsyncStorage.setItem('token', responseObj.token);
              await AsyncStorage.setItem(
                'userId',
                JSON.stringify(responseObj.User.id),
              );
              dispatch({
                type: 'LOGIN',
                userId: responseObj.User.id,
                token: userToken,
              });
            } else if (xhr.status == 404) {
              console.log(JSON.parse(xhr.response).message);
            }
          } catch (error) {
            console.log(error);
          }
        };
        xhr.send(params);
      },
      signOut: () => {
        AsyncStorage.clear();
        dispatch({type: 'LOGOUT'});
      },
      signUp: (firstName, lastName, email, mobileNumber, password) => {
        var xhr = new XMLHttpRequest();
        let userToken = null;
        var params =
          'firstName=' +
          firstName +
          '&lastName=' +
          lastName +
          '&email=' +
          email +
          '&mobileNumber=' +
          mobileNumber +
          '&password=' +
          password;
        xhr.open('POST', `${URL}/user/Register`, true);
        xhr.setRequestHeader(
          'content-type',
          'application/x-www-form-urlencoded',
        );
        xhr.onload = async () => {
          try {
            if (xhr.status == 200) {
              console.log(xhr.response);
              let responseObj = JSON.parse(xhr.response);
              if (responseObj.message == 'Account Created') {
                userToken = responseObj.token;
                await AsyncStorage.setItem('token', responseObj.token);
                await AsyncStorage.setItem(
                  'userId',
                  JSON.stringify(responseObj.User.id),
                );
                dispatch({
                  type: 'REGISTER',
                  userId: responseObj.User.id,
                  token: userToken,
                });
              }
            }
          } catch (error) {
            console.log(error);
          }
        };
        xhr.send(params);
      },
    }),
    [],
  );

  if (loginState.isLoading) {
    console.log('object', loginState.userToken);
    SplashScreen.hide();
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken === null ? (
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
          </Stack.Navigator>
        ) : (
          <HomeNavigator
            userId={loginState.userId}
            token={loginState.userToken}
          />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
