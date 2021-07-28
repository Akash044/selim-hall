import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Button, Title} from 'react-native-paper';
import {Formik, Field} from 'formik';
import * as yup from 'yup';

const signUpValidationSchema = yup.object().shape({
  name: yup.string().required('User name is Required'),
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
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

const SignUp = ({route, navigation}) => {
  const {roomNo} = route.params;

  const handleRegisterBtn = values => {
    console.log(values)
    fetch('http://localhost:8085/addBoarder', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        data && alert('boarder info added successfully');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.containerText}>Register for room no: {roomNo}</Text>

        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={values => handleRegisterBtn(values)}>
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
                
                name="name"
                placeholder="User name"
                style={styles.textInput}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {errors.name && (
                <Text style={{fontSize: 10, color: 'red'}}>{errors.name}</Text>
              )}

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

              <TextInput
                mode="outlined"
                name="confirmPassword"
                placeholder="confirmPassword"
                style={styles.textInput}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry
              />
              {errors.confirmPassword && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.confirmPassword}
                </Text>
              )}

              <View style={{marginTop: 20}}>
                <Button
                  onPress={handleSubmit}
                  disabled={!isValid}
                  mode = "contained"
                >
                  Register
              </Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal:20
  },
  containerText: {
    paddingBottom: 10,
    fontSize: 18,
  },
  inputContainer: {
    // width: '70%',
    // borderWidth: 2,
    // padding: 10,
    // borderRadius: 10,
  },
});

export default SignUp;
