import React from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

/**
 * Allows a user to take new photos from the camera
 *
 * @export
 * @param {*} setImageSource
 * @param {*} setImageName
 * @param {*} setType
 */
export function Camera(setImageSource, setImageName, setType) {
  let options = {
    noData: true,
    selectionLimit: 0,
    saveToPhotos: true,
    storageOptions: {
      path: 'images',
    },
  };

  launchCamera(options, response => {
    console.log(response);
    if (response.didCancel) {
      console.log('User does not want to use camera');
    } else if (response.error) {
      console.log('error occured:' + response.error);
    } else {
      setImageSource(response.assets[0].uri);
      setImageName(response.assets[0].fileName);
      setType(response.assets[0].type);
    }
  });
}

/**
 * Allows the user to select images from the image library, gallery
 *
 * @export
 * @param {*} setImageSource
 * @param {*} setImageName
 * @param {*} setType
 */
export function Gallery(setImageSource, setImageName, setType) {
  let options = {
    noData: true,
    selectionLimit: 0,
    saveToPhotos: true,
    storageOptions: {
      path: 'images',
    },
  };

  launchImageLibrary(options, response => {
    console.log(response);
    if (response.didCancel) {
      console.log('User does not want to use camera');
    } else if (response.error) {
      console.log('error occured:' + response.error);
    } else {
      setImageSource(response.assets[0].uri);
      setImageName(response.assets[0].fileName);
      setType(response.assets[0].type);
    }
  });
}
