import React, {useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {TextInput, Button, Title} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Image} from 'react-native-elements';
import {Formik, Field} from 'formik';
import * as yup from 'yup';

const signUpValidationSchema = yup.object().shape({
  name: yup.string().required('User name is Required'),
  roll: yup.string().required('User name is Required'),
  dept: yup.string().required('User name is Required'),
  contactNo: yup.number().min(11).required('User name is Required'),
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
  const [imageData, setImageData] = useState({});

  const handleRegisterBtn = values => {
    console.log(values);
    fetch('http://localhost:8085/addBoarder', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...values,...imageData}),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        data && alert('boarder info added successfully');
      });
  };

  const handleImgInput = () => {
    const options = {
      includeBase64: true,
      maxWidth: 100,
      maxHeight: 100,
      quality: 0.8,
      // noData: true,
    };
    try{
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          alert('Please select a photo');
        } else if (response.assets[0].uri) {
          console.log(response);
          setImageData({...response.assets[0]});
        }
      })
    }catch(err){
      alert("something went wrong, please try again")
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.containerText}>Register for room no: {roomNo}</Text>

        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{
            name: '',
            roll: '',
            dept:'',
            contactNo:'',
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
                name="roll"
                placeholder="User roll"
                style={styles.textInput}
                onChangeText={handleChange('roll')}
                onBlur={handleBlur('roll')}
                value={values.roll}
                keyboardType='numeric'
              />
              {errors.roll && (
                <Text style={{fontSize: 10, color: 'red'}}>{errors.roll}</Text>
              )}

              <TextInput
                mode="outlined"
                name="dept"
                placeholder="User dept"
                style={styles.textInput}
                onChangeText={handleChange('dept')}
                onBlur={handleBlur('dept')}
                value={values.dept}
              />
              {errors.dept && (
                <Text style={{fontSize: 10, color: 'red'}}>{errors.dept}</Text>
              )}
              <TextInput
                mode="outlined"
                name="contactNo"
                placeholder="User contact no."
                style={styles.textInput}
                onChangeText={handleChange('contactNo')}
                onBlur={handleBlur('contactNo')}
                value={values.contactNo}
                keyboardType='numeric'
              />
              {errors.contactNo && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.contactNo}
                </Text>
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

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 15,
                }}>
                <Button icon="image" mode="outlined" onPress={handleImgInput}>
                  Upload image{' '}
                </Button>
              </View>
              <View>
              {imageData?.uri && (
                  <Image
                    source={{uri: imageData.uri}}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      marginTop: 10,
                    }}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                )}
              </View>
              <View style={{marginTop: 20}}>
                <Button
                  onPress={handleSubmit}
                  disabled={!isValid}
                  mode="contained">
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
    paddingHorizontal: 20,
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
  textInput: {
    height: 35,
  },
});

export default SignUp;
