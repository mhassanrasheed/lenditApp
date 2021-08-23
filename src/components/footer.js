import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomButton from './customButton';
import {AuthContext} from './context';

export default function Footer({navigation}) {
  const {signOut} = useContext(AuthContext);

  return (
    <View style={styles.footer}>
      <CustomButton
        text="New Post"
        onPress={() => navigation.navigate('AddPost')}
        align="center"
        marginTop={0}
      />
      <CustomButton
        text="Home"
        onPress={() => navigation.navigate('UserFeed')}
        align="center"
        marginTop={0}
      />
      <CustomButton
        text="Log Out"
        onPress={() => {
          signOut();
        }}
        align="center"
        marginTop={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
