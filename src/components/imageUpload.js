import React from 'react';
import Alert from 'react-native';

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
export default function ImageUpload(imageSource, imageName, type, id, token) {
  let fd = new FormData();
  fd.append('postID', id);
  fd.append('image', {
    uri: imageSource,
    name: imageName,
    type: type,
  });

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://192.168.0.21:5000/post/addImage', true);
  xhr.setRequestHeader('content-type', 'multipart/form-data'); //application/x-www-form-urlencoded, multipart/form-data
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  xhr.onload = () => {
    if (xhr.status == 200) {
      console.warn(xhr.response);
    } else {
      console.warn(xhr.response);
    }
  };
  xhr.send(fd);
}
