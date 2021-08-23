import React, {useState} from 'react';
import Alert from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Config from 'react-native-config';

URL = Config.API_URL;
/**
 * Allows to upload images to the server
 * @export
 * @param {*} imageSource
 * @param {*} imageName
 * @param {*} type
 * @param {*} id post id of which this image belongs to
 * @param {*} token user's personal token which a server requires to authenticate
 * the user
 */
export function ImageUpload(
  imageSource,
  imageName,
  type,
  id,
  token,
  setIsUploading,
) {
  let fd = new FormData();
  fd.append('postID', id);
  fd.append('image', {
    uri: imageSource,
    name: imageName,
    type: type,
  });

  var xhr = new XMLHttpRequest();
  xhr.open('POST', `${URL}/post/addImage`, true);
  xhr.setRequestHeader('content-type', 'multipart/form-data'); //application/x-www-form-urlencoded, multipart/form-data
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  xhr.onload = () => {
    if (xhr.status == 200) {
      console.warn(xhr.response);
      setIsUploading(false);
    } else {
      console.warn(xhr.response);
    }
  };
  xhr.send(fd);
}

/**
 * To fetch posts from the database
 *
 * @export
 * @param {*} setPosts a parameter to save all the posts
 */
export function GetPost(setPosts) {
  console.log('getting post');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `${URL}/post/`, true);
  xhr.onload = () => {
    if (xhr.status == 200) {
      console.log('postReceived');
      setPosts(JSON.parse(xhr.response));
    } else {
      console.log(xhr.response);
    }
  };
  xhr.send(null);
}

/**
 * Allows to upload new post to the database
 *
 * @export
 * @param {*} name
 * @param {*} description
 * @param {*} imageSource
 * @param {*} imageName
 * @param {*} type
 * @param {*} id
 * @param {*} token
 * @return {*}
 */
export function SubmitPost(
  name,
  description,
  imageSource,
  imageName,
  type,
  userId,
  token,
  setIsUploading,
) {
  if (name?.length === 0 && description?.length === 0)
    return console.warn('fields cannot be left empty');
  setIsUploading(true);
  var xhr = new XMLHttpRequest();
  var params =
    'name=' + name + '&description=' + description + '&userId=' + userId;
  xhr.open('POST', `${URL}/post/addItem`, true);
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  xhr.onload = () => {
    if (xhr.status == 200) {
      console.warn(xhr.response);
      let responseObj = JSON.parse(xhr.response);
      if (responseObj.message === 'Post Added') {
        ImageUpload(
          imageSource,
          imageName,
          type,
          responseObj.postId,
          token,
          setIsUploading,
        );
      }
    } else {
      console.warn('object', xhr.response);
    }
  };
  xhr.send(params);
}

/**
 * A login function which submits the user provided detials to the server
 * and if the user record exist then takes them to the home screen
 * @export
 * @param {*} email user provided
 * @param {*} password user provided
 * @param {*} {navigation, route} stack navigator function to take user to
 * the home navigator, if successful
 */
export function Login(email, password, {navigation, route}) {
  var xhr = new XMLHttpRequest();
  var params = 'email=' + email + '&password=' + password;
  xhr.open('POST', `${URL}/user/login`, true);
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  xhr.onload = async () => {
    try {
      if (xhr.status == 200) {
        let responseObj = JSON.parse(xhr.response);
        await AsyncStorage.setItem('token', responseObj.token);
        await AsyncStorage.setItem('user', JSON.stringify(responseObj.User));
        route.params?.setIsLogged(true);
        navigation.navigate({
          name: 'HomeNavigator',
          params: {token: responseObj.token},
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  xhr.send(params);
}

/**
 * The new user proived detials are submitted to the server to processs
 *
 * @export
 * @param {*} firstName
 * @param {*} lastName
 * @param {*} email
 * @param {*} mobileNumber
 * @param {*} password
 * @param {*} {navigation} if sucedded, then takes them to the home navigator
 */
export function Register(
  firstName,
  lastName,
  email,
  mobileNumber,
  password,
  {navigation},
) {
  var xhr = new XMLHttpRequest();
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
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  xhr.onload = () => {
    if (xhr.status == 200) {
      console.log(xhr.response);
      if (xhr.response == 'Account Created') {
        console.warn(xhr.response);
        navigation.navigate('Home');
      }
    }
  };
  xhr.send(params);
}
