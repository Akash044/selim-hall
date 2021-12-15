import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { userContext } from '../../App';
import { ScrollView } from 'react-native-gesture-handler';

const LoginPage = ({ navigation }) => {
  const [isDone, setIsDone] = useState(true);
  const [loggedUser, setLoggedUser] = useContext(userContext);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '1055803709063-ahanmesrud8rahuv77275eplck978lso.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const handleGoogleSingIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // this.setState({userInfo});
      console.log(userInfo.user);

      console.log('39', loggedUser);

      isAdminHandle(userInfo);
      // userInfo.user.id && navigation.push("Admin");
    } catch (error) {
      console.log({ error });
    }
  };
  // ${userInfo.user.email}
  const isAdminHandle = userInfo => {
    setIsDone(false);
    fetch(
      `https://thawing-meadow-93763.herokuapp.com/isAdmin?email=${userInfo.user.email}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log('52', loggedUser, data);
        if (data) {
          setLoggedUser({
            email: userInfo.user.email,
            id: userInfo.user.id,
            name: userInfo.user.name,
            photoUrl: userInfo.user.photo,
            isAdmin: true,
            isUser: false,
          });
        } else {
          fetch(
            `https://thawing-meadow-93763.herokuapp.com/isUser?email=${userInfo.user.email}`,
          )
            .then(res => res.json())
            .then(data => {
              console.log(data);

              if (data) {
                setLoggedUser({
                  email: userInfo.user.email,
                  id: userInfo.user.id,
                  name: userInfo.user.name,
                  photoUrl: userInfo.user.photo,
                  isAdmin: false,
                  isUser: true,
                });
              } else {
                alert('You are not an user, please book room');
                setLoggedUser({
                  email: userInfo.user.email,
                  id: userInfo.user.id,
                  name: userInfo.user.name,
                  photoUrl: userInfo.user.photo,
                  isAdmin: false,
                  isUser: false,
                });
              }
            });
        }
        setIsDone(true);
      });
  };

  console.log('64', loggedUser);

  return (
    <KeyboardAvoidingView style={styles.container}>
    
        <View style={styles.SignInView}>
          <SignIn />

        </View>
        <View style={styles.GoogleBtn}>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.small}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleSingIn}
          />
          {!isDone && <ActivityIndicator size="large" color="red" />}
        </View>
        {/* <Text >Or....</Text> */}
     
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  GoogleBtn: {
    flex: 1,
    marginTop:50
  },
  SignInView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default LoginPage;
