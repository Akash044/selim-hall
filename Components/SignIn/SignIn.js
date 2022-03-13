import React, { useState } from 'react';
import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { userContext } from '../../App';
import {
  Modal,
  Portal,
  Text,
  Provider,
  ActivityIndicator,
  Colors,
  TextInput,
  Button
} from 'react-native-paper';
import NetInfo from "@react-native-community/netinfo";
import { Formik, Field } from 'formik';
import * as yup from 'yup';

const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
      'Please enter valid email',
    )
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(7, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const SignIn = () => {
  const [loggedUser, setLoggedUser] = useContext(userContext);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [netStatus, setNetStatus] = useState(true);
  const containerStyle = { marginHorizontal: 30, borderRadius: 10, backgroundColor: 'white', padding: 20, zIndex: 99 };


  const handleEmailPassSignIn = userInfo => {
    NetInfo.addEventListener(networkState => {
      setNetStatus(networkState.isConnected)
    });
    console.log(userInfo);
    setVisible(true);
    fetch('https://intense-ridge-49211.herokuapp.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setLoggedUser(data);
        setError(data.message);
        setVisible(false);

      })
      .catch(err => {
        console.log({err})
        
      })
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.containerText}>Sign in</Text>

      <Formik
        validationSchema={signInValidationSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => handleEmailPassSignIn(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <TextInput
              mode="outlined"
              name="email"
              placeholder="Email Address"
              style={styles.textInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
            )}
            <TextInput
              mode="outlined"
              name="password"
              placeholder="Password"
              style={styles.textInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && (
              <Text style={{ fontSize: 10, color: 'red' }}>
                {errors.password}
              </Text>
            )}
            <View style={{ marginTop: 10 }}>
              <Button disabled={!isValid} mode="contained" onPress={handleSubmit}> Sign in </Button>
            </View>
            {
              error.length > 0 && <Text>{error}</Text>
            }
          </>
        )}
      </Formik>
      <View>
        <Provider>
          <Portal>
            <Modal visible={visible} contentContainerStyle={containerStyle}>

              {
                !netStatus ? <Text style={{ marginTop: 250, color: "red" }}>Network failed. Please connect your device to network</Text> :<ActivityIndicator style={{ paddingTop: 10 }} animating={true} color={Colors.red800} />
                //  : <Text>Loading. Please wait</Text>
                // <ActivityIndicator animating={true} size="large" color={Colors.green800} style={{ marginTop: 250 }} />
              }
              
            </Modal>
          </Portal>
        </Provider>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerText: {
    paddingBottom: 10,
    fontSize: 20,
    zIndex: -99
  },
  inputContainer: {
    width: '95%',
    padding: 20,
    borderRadius: 10,
    elevation: 1,
    zIndex: -99
  },
});

export default SignIn;
