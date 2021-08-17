import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

/**
 * A custom button which is reused in the app
 *
 * @export a custom button
 * @param {*} {text, onPress, align, marginTop = 10}
 * @return {*} view containing the button
 */
export default function CustomButton({text, onPress, align, marginTop = 10}) {
  return (
    <View>
      <Pressable
        style={[styles.button, {marginTop: marginTop}]}
        onPress={onPress}>
        <Text style={[styles.buttonText, {textAlign: align}]}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#89CFF0',
    marginTop: 10,
    marginLeft: 2,
    marginRight: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
