import {styles} from 'ansi-colors';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from 'react-native';
import CustomButton from './customButton';
import {sendMessage} from '../../backend/serverRequest';

export default function Chat({route, navigation}) {
  const [message, setMessage] = useState('');
  return (
    <View style={styless.container}>
      <Text>Message</Text>
      <View style={styless.sendMessage}>
        <TextInput
          placeholder="Type a message..."
          value={message}
          style={{
            borderWidth: 2,
            borderRadius: 20,
            height: '10%',
            width: '85%',
          }}
          onChangeText={text => setMessage(text)}
        />
        <Pressable
          style={styless.button}
          onPress={() => {
            sendMessage(
              route?.params?.receiverId,
              route?.params?.userId,
              message,
            );
          }}>
          <Text style={styless.buttonText}>send</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styless = StyleSheet.create({
  container: {
    flex: 1,
  },
  sendMessage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 5,
  },
  button: {
    borderRadius: 8,
    padding: '2%',
    backgroundColor: '#89CFF0',
    marginTop: 10,
    marginLeft: 2,
    marginRight: 2,
    height: '10%',
    maxWidth: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
