import React, {useState, useEffect, useContext, useMemo} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  FlatList,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from './homeNavigator';
import CustomButton from '../../components/customButton';
import {GetPost} from '../../../backend/serverRequest';
import {AuthContext} from '../../components/context';

/**
 * A userfeed which contains all the post added from other users
 *
 * @export
 * @param {*} {navigation, route}
 * @return {*} view contatining posts from all the other users
 */
export default function UserFeed({navigation, route}) {
  const [posts, setPosts] = useState(null);
  const {token} = useContext(UserContext);
  const {signOut} = useContext(AuthContext);

  const Item = ({post}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{post.name}</Text>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          style={{
            width: 100,
            height: 100,
          }}
          source={{
            uri: `http://192.168.0.21:5000/postImages/${post?.postImages[0]?.image}`,
          }}
        />
      </View>
      <Text style={styles.description}>{post.description}</Text>
    </View>
  );
  const renderItem = ({item}) => <Item post={item} />;
  useMemo(() => GetPost(setPosts), []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={{borderWidth: 2, borderRadius: 3, height: '8%'}}
      />
      <FlatList
        style={styles.userFeed}
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.footer}>
        <CustomButton
          text="New Post"
          onPress={() => navigation.navigate('AddPost')}
          align="center"
          marginTop={0}
        />
        <CustomButton
          text="Log Out"
          onPress={() => {
            AsyncStorage.clear();
            signOut();
          }}
          align="center"
          marginTop={0}
        />
      </View>
    </View>
  );
}

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
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  userFeed: {
    height: '76%',
    width: '100%',
  },
  post: {
    height: '60%',
    width: '100%',
    borderBottomWidth: 2,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 2,
    flex: 1,
  },
  title: {
    fontSize: 32,
  },
  description: {
    fontSize: 24,
  },
});
