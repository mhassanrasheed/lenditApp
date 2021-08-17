import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

const {config, fs} = RNFetchBlob;

const UserFeed = navigation => {
  let PictureDir = fs.dirs.PictureDir;
  var now = new Date();
  console.log(PictureDir);

  let options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
      notification: false,
      path:
        PictureDir + '/me_' + Math.floor(now.getTime() + now.getSeconds() / 2), // this is the path where your downloaded file will live in
      description: 'Downloading image.',
    },
  };
  config(options)
    .fetch('GET', 'http://192.168.0.21:5000/postImages/image-1628557637324.jpg')
    .then(res => {
      console.log(res);
    });
  const getImage = () => {
    console.log('getting post');
    var xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      'http://192.168.0.21:5000/postImages/image-1628557637324.jpg',
      true,
    );
    // xhr.setRequestHeader('application/x-www-form-urlencoded'); //application/x-www-form-urlencoded, multipart/form-data
    xhr.onload = () => {
      if (xhr.status == 200) {
        // console.log(xhr.response);
      } else {
        // console.log(xhr.response);
      }
    };
    xhr.send(null);
  };

  const [screenShot, setScreenshot] = useState(undefined);

  const getPictures = postId => {
    console.log('getting Images');
    var xhr = new XMLHttpRequest();
    params = 'postId=' + postId;
    xhr.open('POST', 'http://192.168.0.21:5000/post/postImages', true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded'); //application/x-www-form-urlencoded, multipart/form-data
    xhr.onload = () => {
      if (xhr.status == 200) {
        console.log(JSON.parse(xhr.response)[0].id);
      } else {
        console.log(xhr.response);
      }
    };
    xhr.send(params);
  };
  const getPost = () => {
    console.log('getting post');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://192.168.0.21:5000/post/', true);
    // xhr.setRequestHeader('application/x-www-form-urlencoded'); //application/x-www-form-urlencoded, multipart/form-data
    xhr.onload = () => {
      if (xhr.status == 200) {
        // console.log(JSON.parse(xhr.response)[0].id);
        // getPictures(JSON.parse(xhr.response)[0].id);
      } else {
        console.log(xhr.response);
      }
    };
    xhr.send(null);
  };

  let image_url = {
    uri: 'https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png',
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>lendIt</Text>
      </View>
      <TextInput
        placeholder="Search"
        style={{borderWidth: 2, borderRadius: 3, height: '8%'}}
      />
      <View style={styles.userFeed}>
        <View style={styles.post}></View>
        <Button onPress={getPost} title="GetPost" />
        {/* <Image
          source={require('/Users/mhass/Programming/lenditApp/src/images/example.png')}
          resizeMode="contain"
        /> */}
        <Image
          source={{
            uri: 'https://cataas.com/cat',
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '8%',
    width: '100 %',
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userFeed: {
    height: '76%',
    width: '100%',
    backgroundColor: 'yellow',
    borderColor: 'red',
    borderWidth: 2,
  },
  post: {
    height: '70%',
    width: '100%',
    borderBottomWidth: 2,
  },
});

export default UserFeed;
