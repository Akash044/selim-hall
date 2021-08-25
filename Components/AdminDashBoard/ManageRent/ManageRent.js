import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {
  FAB,
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  TextInput,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';

const Item = props => (
  <View style={styles.item}>
    <Text style={styles.title}>Email: {props.item.email}</Text>
    <Text style={styles.title}>TrxID: {props.item.trxId}</Text>
    <Text style={styles.title}>Month: {props.item.month}</Text>
    <Text style={styles.title}>Year: {props.item.year}</Text>
    <Text style={styles.title}>Status: {props.item.status}</Text>
    <View>
      <Text style={{...styles.title, marginTop: 10}}>Change Status</Text>
      <Picker
        selectedValue={props.item.status}
        style={{height: 50, width: 150}}
        onValueChange={(itemValue, itemIndex) =>
          props.handleChangeStatus({status: itemValue, trxID: props.item.trxId})
        }>
        <Picker.Item label="pending" value="pending" />
        <Picker.Item label="paid" value="paid" />
        <Picker.Item label="unsuccessful" value="unsuccessful" />
      </Picker>
    </View>
  </View>
);

const ManageRent = () => {
  const [visible, setVisible] = useState(false);
  const containerStyle = {backgroundColor: 'white', padding: 30};
  const [rentStatus, setRentStatus] = useState([]);
  const [status, setStatus] = useState('');

  // useEffect(async () => {
  //   firebase
  //     .messaging()
  //     .hasPermission()
  //     .then(enabled => {
  //       if (enabled) {
  //         console.log('user has permissions');
  //       } else {
  //         console.log("user doesn't have permissions");
  //         NotiPermission();
  //       }
  //     });

  //   let fcmToken = await AsyncStorage.getItem('fcmToken');
  //   console.log('fcm token', fcmToken);
  //   if (!fcmToken) {
  //     fcmToken = await firebase.messaging().getToken();
  //     if (fcmToken) {
  //       console.log('fcm token from firebase', fcmToken);
  //       await AsyncStorage.getItem('fcmToken', fcmToken);
  //     }
  //   }
  // }, []);

  // const sendNotification = async () => {
  //   const FIREBASE_API_KEY = '';
  //   const message = {
  //     registration_ids: [''],
  //     notification: {
  //       title: '',
  //       body: '',
  //       vibrate: 1,
  //       sounds: 1,
  //       show_in_foreground: true,
  //       priority: 'high',
  //       content_available: true,
  //     },
  //   };

  //   let headers = new Headers({
  //     Content_Type: 'application/json',
  //     Authorization: 'key' + FIREBASE_API_KEY,
  //   });

  //   let response = await fetch('https://fcm.googleapis.com/fcm/send', {
  //     method: 'POST',
  //     headers,
  //     body: JSON.stringify(message),
  //   });
  //   response = await response.json();
  //   console.log(response);
  // };

  useEffect(() => {
    setVisible(true);
    fetch('https://thawing-meadow-93763.herokuapp.com/paidRents')
      .then(res => res.json())
      .then(data => {
        const allPending = data.filter(element => element.status === 'pending');
        // console.log(allPending);
        setRentStatus(data);
        setVisible(false);
      });
  }, [status]);

  const handleChangeStatus = rent => {
    console.log(rent.status);
    fetch(
      `https://thawing-meadow-93763.herokuapp.com/paidRents/${rent.trxID}`,
      {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({status: rent.status}),
      },
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // data && alert("payment status updated")
        setStatus(rent.status);
      });
  };

  const renderItem = ({item}) => (
    <Item
      key={item._id}
      item={item}
      status={rentStatus.status}
      handleChangeStatus={handleChangeStatus}
    />
  );

  return (
    <SafeAreaView>
      <FlatList
        data={rentStatus}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
      <Provider>
        <Portal>
          <Modal visible={visible} contentContainerStyle={containerStyle}>
            <Text>Loading. Please wait</Text>
            <ActivityIndicator animating={true} color={Colors.red800} />
          </Modal>
        </Portal>
      </Provider>
    </SafeAreaView>
  );
};

export default ManageRent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
  },
});
