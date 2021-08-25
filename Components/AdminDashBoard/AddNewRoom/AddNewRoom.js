import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native';
// import {Input, Button, ThemeProvider} from 'react-native-elements';
import { Modal, Portal, Text, Button, Provider, TextInput,ActivityIndicator, Colors } from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
// import RNFetchBlob from 'rn-fetch-blob'

const AddNewRoom = () => {

  const [visible, setVisible] =useState(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};


  const [newRoomInfo, setNewRoomInfo] = useState({});
  const [imageData, setImageData] = useState({});

  const handleInputField = value => {
    console.log(value);
    setNewRoomInfo({...newRoomInfo, ...value, vacantStatus: true});
    console.log(newRoomInfo);
  };

  const handleImgInput = () => {
    const options = {
      includeBase64: true,
      maxWidth: 100,
      maxHeight: 100,
      quality: 0.1,
      // noData: true,
    };
    try{
      launchImageLibrary(options, response => {
        if (response.assets[0].uri) {
          console.log(response);
          setImageData({...response.assets[0]});
        }
      })
    }catch(err){
      alert("something went wrong, please try again")
    }
  };

  const handleAddRoom = () => {
    // console.log(newRoomInfo,imageData);
    setVisible(true);
    fetch('http://localhost:8085/addRoom', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...newRoomInfo, ...imageData}),
    })
      .then(res => res.json())
      .then(data => {
        setVisible(false);
        data && alert('room added successful');
        
      });
  };
  // console.log(imageData);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        placeholder="Enter Room No."
        leftIcon={<Icon name="sign-in" size={24} color="black" />}
        onChangeText={room => handleInputField({roomNo: room})}
      />
      <View>
        <Text>Select seat</Text>
        <Picker
          selectedValue={newRoomInfo.seat}
          style={{height: 50, width: 150}}
          onValueChange={(itemValue, itemIndex) =>
            handleInputField({seat: itemValue})
          }>
          <Picker.Item label="2 seat" value="2" />
          <Picker.Item label="3 seat" value="3" />
          <Picker.Item label="4 seat" value="4" />
        </Picker>
      </View>
      <TextInput
        placeholder="Enter Description"
        leftIcon={<Icon name="user" size={24} color="black" />}
        onChangeText={desc => handleInputField({description: desc})}
      />
      <View style={{flexDirection: 'row', justifyContent: 'center',marginTop:15}}>
        <Button
          icon="image"
          mode="outlined"
          onPress={handleImgInput}
        >Upload image </Button>
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
        <Button icon="plus" mode="contained" onPress={handleAddRoom} >Add Room </Button>
      </View>

      <Provider>
      <Portal>
        <Modal visible={visible} contentContainerStyle={containerStyle}>
          <Text>Uploading room information. Please wait</Text>
          <ActivityIndicator animating={true} color={Colors.red800} />
        </Modal>
      </Portal>
    </Provider>
    </KeyboardAvoidingView>
  );
};

export default AddNewRoom;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: 'center',
  },
});
