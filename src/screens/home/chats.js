import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import message from '../../components/chat';
import {UserContext} from './homeNavigator';

export default function chats({navigation}) {
  const {token} = useContext(UserContext);
  const {userId} = useContext(UserContext);
  const receiverId = 1;
  return (
    <View>
      <Button
        title="open chat"
        onPress={() =>
          navigation.navigate('Message', {
            userId: userId,
            receiverId: receiverId,
          })
        }></Button>
    </View>
  );
}
