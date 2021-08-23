import React, {useState} from 'react';
import {Text, View, TextInput, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/customButton';
import {Login} from '../../../backend/serverRequest';
import {AuthContext} from '../../components/context';

/**
 * Log in screen which allows a current user to log back in
 * if a user credentials match with database it takes them to home navigator
 * @export
 * @param {*} {route, navigation} passed down to the the login function
 * @return View contating a login form
 */
export default function LogIn({route, navigation}) {
  const [email, setEmail] = useState('aims@aims.com');
  const [mobileNumber, setMobileNumber] = useState('123456');
  const [password, setPassword] = useState('hassan');
  // const [token, setToken] = useState(null);
  const {signIn} = React.useContext(AuthContext);
  const token = React.useContext(AuthContext);
  console.log('token isss', token);
  const loginHandle = (email, password) => {
    signIn(email, password);
  };

  return (
    <View style={{padding: 10, margin: 20}}>
      <TextInput
        placeholder="email"
        onChangeText={text => {
          setEmail(text);
        }}
        style={{borderWidth: 2, marginBottom: 10}}
        defaultValue={email}
      />
      <TextInput
        placeholder="Password"
        onChangeText={text => {
          setPassword(text);
        }}
        style={{borderWidth: 2, marginBottom: 10}}
        defaultValue={password}
      />
      <CustomButton
        text="Log In"
        onPress={() => {
          // Login(email, password, {navigation, route});
          loginHandle(email, password);
        }}
        align="center"
      />
      <CustomButton
        text="Don't have an account?"
        onPress={() => navigation.navigate('SignUp')}
        align="center"
      />
    </View>
  );
}
