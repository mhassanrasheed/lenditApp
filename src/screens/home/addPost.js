import React, {useState, Component, useContext} from 'react';
import {Camera, Gallery} from '../../components/camera';
import {ImageUpload, SubmitPost} from '../../../backend/serverRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from './homeNavigator';
import Footer from '../../components/footer';
import {
  View,
  Image,
  Modal,
  Text,
  TextInput,
  Button,
  Pressable,
  StyleSheet,
} from 'react-native';
import CustomButton from '../../components/customButton';

export default function AddPost({navigation}) {
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [imageSource, setImageSource] = useState('');
  const [imageName, setImageName] = useState(null);
  const [type, setType] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const {token} = useContext(UserContext);
  const {userId} = useContext(UserContext);
  console.log('token isss', token, 'user', userId);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <CustomButton
                text="Camera"
                onPress={() => {
                  Camera(setImageSource, setImageName, setType);
                  setModalVisible(!modalVisible);
                }}
                align="center"
              />
              <CustomButton
                text="Gallery"
                onPress={() => {
                  Gallery(setImageSource, setImageName, setType);
                  setModalVisible(!modalVisible);
                }}
                align="center"
              />
            </View>
            <CustomButton
              text="Cancel"
              onPress={() => setModalVisible(!modalVisible)}
              align="center"
            />
          </View>
        </View>
      </Modal>
      <TextInput
        placeholder="Title..."
        onChangeText={text => {
          setName(text);
        }}
        value={name}
        style={{borderWidth: 2, marginBottom: 10}}
      />
      <TextInput
        placeholder="Description...."
        onChangeText={text => {
          setDescription(text);
        }}
        value={description}
        numberOfLines={10}
        multiline={true}
        style={{borderWidth: 2, marginBottom: 10, justifyContent: 'flex-start'}}
      />
      <CustomButton
        text="Add an Image"
        onPress={() => setModalVisible(!modalVisible)}
        align="center"
      />
      <CustomButton
        text="Submit"
        disabled={isUploading}
        onPress={() =>
          SubmitPost(
            name,
            description,
            imageSource,
            imageName,
            type,
            userId,
            token,
            setIsUploading,
            setName,
            setImageSource,
            setImageName,
            setDescription,
            setType,
          )
        }
        align="center"
      />
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    height: '35%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
