import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {TextInput, Button, Title} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Image} from 'react-native-elements';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import tw from 'tailwind-react-native-classnames';
import { userContext } from '../../../App';

const guestInfoValidationSchema = yup.object().shape({
  guestName: yup.string().required('name is Required'),
  mobile: yup.number().min(11).required('mobile no. is required'),
  address: yup.string().required('address is required'),
});

const UserGuest = () => {
  const  [loggedUser, setLoggedUser] = useContext(userContext);
  // console.log(loggedUser);
  const todayDate = new Date();
  const [guestInfo, setGuestInfo] = useState({
    guestName: '',
    mobile: '',
    address: '',
  });
  const [date, setDate] = useState({});
  const [load, setLoad] = useState(false);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [imageData, setImageData] = useState({});

  const showDateTimePicker = () => {
    setIsDateTimePickerVisible(true);
  };

  const handleDatePicked = selectedDate => {
    console.log(selectedDate)
    const newDate = selectedDate?.nativeEvent.timestamp;
    const dd = String(newDate?.getDate()).padStart(2, '0');
    const mm = String(newDate?.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = String(newDate?.getFullYear());

    setDate({
      today: {
        day: dd,
        month: mm,
        year: yyyy,
      },
    });
    setIsDateTimePickerVisible(false);
  };

  const handleImgInput = () => {
    const options = {
      includeBase64: true,
      maxWidth: 100,
      maxHeight: 100,
      quality: 0.1,
      // noData: true,
    };
    try {
      launchCamera(options, response => {
        console.log(response);
        if (response.didCancel) {
          alert('Please take a photo');
        } else if (response.assets[0].uri) {
          console.log(response);
          setImageData({...response.assets[0]});
        }
      });
    } catch (err) {
      alert('something went wrong, please try again');
    }
  };

  const handleUploadBtn = info => {
    console.log(info, date, imageData);
    setLoad(true);

    fetch('https://thawing-meadow-93763.herokuapp.com/addGuest', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...info, ...date, ...imageData, relativeEmail:loggedUser.email}),
    })
      .then(res => res.json())
      .then(data => {
        data && alert('added successfully');
        data &&
          setGuestInfo({
            guestName: '',
            mobile:'',
            address: '',
          });
          data && setImageData({})
        setLoad(false);
      })
      .catch(err => {console.log(err)})
  };

  return (
    <View style={styles.container}>
      {isDateTimePickerVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={todayDate}
          display="default"
          onChange={handleDatePicked}
        />
      )}
      <View style={styles.inputContainer}>
        <Title>Guest Information</Title>
        <Button onPress={showDateTimePicker} mode="outlined">
          select date
        </Button>
        {date.today?.day && (
          <Text style={{fontSize: 16, margin: 'auto'}}>
            {date.today.day}-{date.today.month}-{date.today.year}
          </Text>
        )}
        <Formik
          validationSchema={guestInfoValidationSchema}
          initialValues={guestInfo}
          onSubmit={values => handleUploadBtn(values)}>
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
                name="guestName"
                placeholder="Enter guest name"
                onChangeText={handleChange('guestName')}
                onBlur={handleBlur('guestName')}
                // value={guestInfo.guestName}
              />
              {errors.guestName && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.guestName}
                </Text>
              )}
              <TextInput
                mode="outlined"
                name="mobile"
                placeholder="Mobile no."
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                keyboardType="numeric"
                // value={guestInfo.mobile}
              />
              {errors.mobile && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.mobile}
                </Text>
              )}
              <TextInput
                mode="outlined"
                name="address"
                placeholder="Address"
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                // value={guestInfo.address}
              />
              {errors.address && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.address}
                </Text>
              )}
              {/* <TextInput
                mode="outlined"
                name="dinner"
                placeholder="Dinner meal rate"
                onChangeText={handleChange('dinner')}
                onBlur={handleBlur('dinner')}
                keyboardType="numeric"
              />
              {errors.dinner && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.dinner}
                </Text>
              )} */}
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
              <View style={{marginTop: 10}}>
                <Button
                  icon="upload"
                  mode="contained"
                  loading={load}
                  disabled={!isValid}
                  onPress={handleSubmit}>
                  Submit
                </Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default UserGuest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  inputContainer: {
    padding: 10,
  },
});
