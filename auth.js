import React from 'react';

export const authContext = React.useMemo(
  () => ({
    signIn: (email, password) => {
      var xhr = new XMLHttpRequest();
      var params = 'email=' + email + '&password=' + password;
      let userToken = null;
      xhr.open('POST', `${URL}/user/login`, true);
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.onload = async () => {
        try {
          if (xhr.status == 200) {
            let responseObj = JSON.parse(xhr.response);
            userToken = responseObj.token;
            await AsyncStorage.setItem('token', responseObj.token);
            await AsyncStorage.setItem(
              'user',
              JSON.stringify(responseObj.User),
            );
            dispatch({type: 'LOGIN', email: email, token: userToken});
          } else if (xhr.status == 404) {
            console.log(JSON.parse(xhr.response).message);
          }
        } catch (error) {
          console.log(error);
        }
      };
      xhr.send(params);
    },
    signOut: () => {
      dispatch({type: 'LOGOUT'});
    },
    signUp: (firstName, lastName, email, mobileNumber, password) => {
      var xhr = new XMLHttpRequest();
      let userToken = null;
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
      xhr.onload = async () => {
        try {
          if (xhr.status == 200) {
            console.log(xhr.response);
            let responseObj = JSON.parse(xhr.response);
            if (responseObj.message == 'Account Created') {
              // console.log('response', xhr.response);
              userToken = responseObj.token;
              await AsyncStorage.setItem('token', responseObj.token);
              await AsyncStorage.setItem(
                'user',
                JSON.stringify(responseObj.User),
              );
              dispatch({type: 'REGISTER', email: email, token: userToken});
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      xhr.send(params);
    },
  }),
  [],
);
