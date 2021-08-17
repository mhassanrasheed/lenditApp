import React, {useState, useEffect} from 'react';
import {Button, Text, TextInput, View, Image, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Camera} from '../../components/camera';
import {ImageUpload} from '../../components/imageUpload';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = navigation => {
  const [imageSource, setImageSource] = useState(null);
  const [singleFile, setSingleFile] = useState(null);
  const [name, setName] = useState('');
  const [imageName, setImageName] = useState(null);
  const [type, setType] = useState(null);
  const [token, setToken] = useState(null);

  getToken = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      setToken(token);
    } catch (e) {
      // read error
    }

    console.log('Done.');
  };

  getToken();

  useEffect(() => {
    ImageUpload(imageSource, imageName, type, 9, token);
    return () => {
      setImageName('');
      setImageSource('');
      setType('');
    };
  }, [type]);

  return (
    <View>
      <TextInput
        placeholder="object name"
        onChangeText={text => setName(text)}
      />
      <Button
        title="Take Picture"
        onPress={() => {
          Camera(setImageSource, setImageName, setType);
        }}
      />
      <Text>{token}</Text>
      {/* <Image
        source={require('/Users/mhass/Programming/lenditApp/src/images/example.png')}
        resizeMode="contain"
      /> */}
      <Image
        style={{width: 50, height: 50}}
        source={{
          uri: 'http://192.168.0.21:5000/postImages/image-1628557637324.jpg',
        }}
      />
    </View>
  );
};

export default Home;
