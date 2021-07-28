import React, {useState} from 'react';
import {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {userContext} from '../../App';

import {TextInput, Button, Title} from 'react-native-paper';
import {Formik, Field} from 'formik';
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
    .min(7, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const SignIn = props => {
  // console.log(props)
  const [loggedUser, setLoggedUser] = useContext(userContext);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState("");
  // const handleInputField = (value) => {
  //   setUserInfo({ ...userInfo, ...value });
  //   console.log(userInfo)
  // };

  const handleEmailPassSignIn = userInfo => {
    console.log(userInfo);
    fetch('http://localhost:8085/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userInfo),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setLoggedUser(data);
        setError(data.message);

      });
  };

  return (
    <View>
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
              <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
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
              <Text style={{fontSize: 10, color: 'red'}}>
                {errors.password}
              </Text>
            )}
            <View style={{marginTop: 10}}>
              <Button disabled={!isValid} mode="contained" onPress={handleSubmit}> Sign in </Button>
            </View>
            {
              error.length > 0 && <Text>{error}</Text> 
            }
          </>
        )}
      </Formik>
    </View>
  );
};
const styles = StyleSheet.create({
  containerText: {
    paddingBottom: 10,
    fontSize:20
  },
  inputContainer: {
    width: '90%',
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
});

export default SignIn;
