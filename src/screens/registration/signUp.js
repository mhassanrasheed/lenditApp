import React, {useState} from 'react';
import {Text, View, TextInput, Button, Alert} from 'react-native';
import {Register} from '../../../backend/serverRequest';
import CustomButton from '../../components/customButton';
import {AuthContext} from '../../components/context';

/**
 * Sign up screen which allows new user to register to the service
 * @export
 * @param {object} {navigation} when a user succefully register,
 * it takes them to the home navigator
 * @returns view containing the form which allows a new user to provide their detials
 */
export default function SignUp({navigation}) {
  const [firstName, setFirstName] = useState('aims');
  const [lastName, setLastName] = useState('aims');
  const [email, setEmail] = useState('aims@aims.com');
  const [mobileNumber, setMobileNumber] = useState('123456');
  const [password, setPassword] = useState('hassan');
  const {signUp} = React.useContext(AuthContext);
  const registerHandle = (
    firstName,
    lastName,
    email,
    mobileNumber,
    password,
  ) => {
    signUp(firstName, lastName, email, mobileNumber, password);
  };

  return (
    <View style={{padding: 10, margin: 20}}>
      <TextInput
        placeholder="First Name"
        onChangeText={text => setFirstName(text)}
        style={{borderWidth: 2, marginBottom: 10}}
        defaultValue={firstName}
      />
      <TextInput
        placeholder="Last Name"
        onChangeText={text => {
          setLastName(text);
        }}
        style={{borderWidth: 2, marginBottom: 10}}
        defaultValue={lastName}
      />
      <TextInput
        placeholder="email"
        onChangeText={text => {
          setEmail(text);
        }}
        style={{borderWidth: 2, marginBottom: 10}}
        defaultValue={email}
      />
      <TextInput
        placeholder="Mobile Number"
        onChangeText={text => {
          setMobileNumber(text);
        }}
        style={{borderWidth: 2, marginBottom: 10}}
        defaultValue={mobileNumber}
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
        text="Sign Up"
        onPress={() => {
          registerHandle(firstName, lastName, email, mobileNumber, password);
        }}
        align="center"
      />
    </View>
  );
}
