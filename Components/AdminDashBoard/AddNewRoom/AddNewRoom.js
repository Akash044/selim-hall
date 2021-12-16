import React, { useContext, useState } from 'react';
import {StyleSheet,View,} from 'react-native';
import { Image } from 'react-native-elements';
import { Modal, Portal, Text, Button, Provider, TextInput, ActivityIndicator, Colors } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { userContext } from '../../../App';

const signUpValidationSchema = yup.object().shape({
  roomNo: yup.number().min(3).required('Room no. is Required'),
  description: yup.string().required('Description is Required'),

});


const AddNewRoom = () => {

  const [loggedUser, setLoggedUser] = useContext(userContext);
  const [imageData, setImageData] = useState({});
  const [takenImage, setTakenImage] = useState(false)
  const [visible, setVisible] = useState(false);
  const [newRoomInfo, setNewRoomInfo] = useState({
    seat:"2",
    vacantStatus: true,
  });
  
  const containerStyle = { 
    marginHorizontal: 30, 
    borderRadius: 10, 
    backgroundColor: 'white', 
    padding: 20, 
    zIndex: 99 
  };
  const handlePickerField = (value) => {
    console.log(value)
    setNewRoomInfo({...newRoomInfo,...value});
  }
  const handleImgInput = () => {
    const options = {
      includeBase64: true,
      // quality: 0.7,
    };
    try {
      launchImageLibrary(options, response => {
        if (!response.didCancel) {
          setImageData({ ...response.assets[0] });
          setTakenImage(true)
          // console.log(response);
        }
        // if (response.assets[0].uri) {
        //   // console.log(response);
        //   
        // }
      })
    } catch (err) {
      alert("something went wrong, please try again")
    }
  };

  const handleAddRoom = (value) => {
    setVisible(true);
    fetch('https://thawing-meadow-93763.herokuapp.com/addRoom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newRoomInfo,...value, ...imageData }),
    })
      .then(res => res.json())
      .then(data => {
        setVisible(false);
        data && alert('room added successful');
        // console.log(newRoomInfo.roomNo)
        setLoggedUser({ ...loggedUser, addedNew: value.roomNo })

      })
      .catch(err => {console.log(err)})
  };
  // console.log(imageData);

  return (<>
    <View style={styles.container}>

      <Formik
        validationSchema={signUpValidationSchema}
        initialValues={{
          roomNo: 0,
          description: '',

        }}
        onSubmit={values => handleAddRoom(values)}>
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
              placeholder="Enter Room No."
              leftIcon={<Icon name="sign-in" size={24} color="black" />}
              onChangeText={handleChange('roomNo')}
              onBlur={handleBlur('roomNo')}
              value={values.roomNo}
              keyboardType='numeric'
            />
            {errors.roomNo && (
              <Text style={{ fontSize: 14, color: 'red' }}>{errors.roomNo}</Text>
            )}
            <View>
              <Text>Select seat</Text>
              <Picker
                selectedValue={newRoomInfo.seat}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => 
                  handlePickerField({ seat: itemValue })
                }>
                <Picker.Item label="2 seat" value="2" />
                <Picker.Item label="3 seat" value="3" />
                <Picker.Item label="4 seat" value="4" />
              </Picker>
            </View>
            <TextInput
              placeholder="Enter Description"
              leftIcon={<Icon name="user" size={24} color="black" />}


              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              multiline={true}
            />
            {errors.description && (
              <Text style={{ fontSize: 14, color: 'red' }}>{errors.description}</Text>
            )}

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
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
              <Button
                icon="image"
                mode="outlined"
                onPress={handleImgInput}
              >Upload image </Button>
            </View>
            {takenImage && <View
              style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, zIndex: -110 }}>
              <Button icon="plus" mode="contained"
                onPress={handleSubmit}
                disabled={!isValid}
              >Add Room </Button>
            </View>}
          </>
        )}
      </Formik>
    </View>

    <Provider>
      <Portal>
        <Modal visible={visible} contentContainerStyle={containerStyle}>
          <Text>Uploading room information. Please wait</Text>
          <ActivityIndicator style={{ paddingTop: 10 }} animating={true} color={Colors.red800} />
        </Modal>
      </Portal>
    </Provider>
  </>
  );
};

export default AddNewRoom;

const styles = StyleSheet.create({
});
