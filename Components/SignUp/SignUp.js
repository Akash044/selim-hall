import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-community/picker';
import { Image } from 'react-native-elements';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { userContext } from '../../App';

const signUpValidationSchema = yup.object().shape({
  name: yup.string().required('User name is Required'),
  roll: yup.string().required('User roll is Required'),
  contactNo: yup.number().min(11).required('User name is Required'),
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
      'Please enter valid email',
    )
    .email('Please enter valid email')
    .required('Email Address is Required'),
  address: yup.string().required('User address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

const SignUp = ({ route, navigation }) => {
  const { roomNo, id } = route.params;
  const [imageData, setImageData] = useState({});
  const [deptSec, setDeptSec] = useState({
    dept: 'CSE',
    sec: 'A'

  });
  const [takenImg, setTakenImg] = useState(false)
  // console.log("hiiii",route.params, id);
  const [loggedUser, setLoggedUser] = useContext(userContext);


  const handlePickerField = value => {
    // console.log(value);
    setDeptSec({ ...deptSec, ...value });
    // console.log(newRoomInfo);
  };

  const updateRoomVacantStatus = () => {
    console.log("called")
    fetch('http://localhost:8085/bookedRoom', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, status: false }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setLoggedUser({ ...loggedUser, booked: id })
        // data && alert('boarder info added successfully');
      })
      .catch(err => {console.log(err)})
  }

  const handleRegisterBtn = values => {
    // console.log(values);
    const info = { ...values, ...deptSec }
    fetch('http://localhost:8085/addBoarder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...info, ...imageData }),
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        data && alert('boarder info added successfully');
        data && updateRoomVacantStatus();

      })
      .catch(err => {console.log(err)})
  };

  const handleImgInput = () => {
    const options = {
      includeBase64: true,
      maxWidth: 100,
      maxHeight: 100,
      // quality: 0.8,
      // noData: true,
    };
    try {
      launchImageLibrary(options, response => {
        if (!response.didCancel) {
          setImageData({ ...response.assets[0] });
          setTakenImg(true)
        }
      })
    } catch (err) {
      alert("something went wrong, please try again")
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, }} showsVerticalScrollIndicator={true}>
      <View style={styles.inputContainer}>
        <Text style={styles.containerText}>Register for room no: {roomNo}</Text>

        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{
            name: '',
            roll: '',
            contactNo: '',
            email: '',
            address: '',
            roomNo: roomNo,
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
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
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
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.roll}</Text>
              )}

              <View >
                <Text>Select Department</Text>
                <Picker
                  selectedValue={deptSec.dept}
                  style={{ height: 50, width: 120 }}
                  onValueChange={(itemValue, itemIndex) =>
                    handlePickerField({ dept: itemValue })
                  }>
                  <Picker.Item label="CSE" value="CSE" />
                  <Picker.Item label="EEE" value="EEE" />
                  <Picker.Item label="ECE" value="ECE" />
                  <Picker.Item label="ETE" value="ETE" />
                  <Picker.Item label="ME" value="ME" />
                  <Picker.Item label="MSE" value="MSE" />
                  <Picker.Item label="IPE" value="IPE" />
                  <Picker.Item label="MTE" value="MTE" />
                  <Picker.Item label="CFPE" value="CFPE" />
                  <Picker.Item label="GCE" value="GCE" />
                  <Picker.Item label="CE" value="CE" />
                  <Picker.Item label="BECM" value="BECM" />
                  <Picker.Item label="URP" value="URP" />
                  <Picker.Item label="ARCH." value="ARCH." />
                </Picker>
                <Text>Select Section</Text>
                <Picker
                  selectedValue={deptSec.sec}
                  style={{ height: 50, width: 120 }}
                  onValueChange={(itemValue, itemIndex) =>
                    handlePickerField({ sec: itemValue })
                  }>
                  <Picker.Item label="A" value="A" />
                  <Picker.Item label="B" value="B" />
                  <Picker.Item label="C" value="C" />

                </Picker>

              </View>


              <View>
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
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.contactNo}
                  </Text>
                )}
              </View>

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
                name="address"
                placeholder="Address"
                style={styles.textInput}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
              />
              {errors.email && (
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.address}</Text>
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
                <Text style={{ fontSize: 10, color: 'red' }}>
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
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
                {imageData?.uri && (
                  <Image
                    source={{ uri: imageData.uri }}
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
              {takenImg && <View style={{ marginTop: 20 }}>
                <Button
                  onPress={handleSubmit}
                  disabled={!isValid}
                  mode="contained">
                  Register
                </Button>
              </View>}
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
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
  picker: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default SignUp;
