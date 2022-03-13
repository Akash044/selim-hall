import React, {useEffect, useState} from 'react';
import Mailer from 'react-native-mail';
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
        style={{height: 50, width: 150, color: '#FFFFFF'}}
        onValueChange={(itemValue, itemIndex) =>
          props.handleChangeStatus({status: itemValue, trxID: props.item.trxId, email:props.item.email})
        }>
        <Picker.Item label="pending" value="pending" />
        <Picker.Item label="paid" value="paid" />
        <Picker.Item label="unsuccessful" value="unsuccessful" />
      </Picker>
    </View>
  </View>
);

const ManageRent = () => {
  const [visible, setVisible] = useState(true);
  const containerStyle = { marginHorizontal: 30, borderRadius: 10,backgroundColor: 'white', padding: 30,  zIndex: 99};
  const [rentStatus, setRentStatus] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    setVisible(true);
    fetch('https://intense-ridge-49211.herokuapp.com/paidRents')
      .then(res => res.json())
      .then(data => {
        const allPending = data.filter(element => element.status === 'pending');
        // console.log(allPending);
        setRentStatus(data);
        setVisible(false);
      })
      .catch(err => {console.log(err)})
  }, [status]);

  // const handleEmail = (rent) => {
  //   Mailer.mail({
  //     subject: 'Rent payment status',
  //     recipients: [rent.email],
  //     body: `Your payment is ${rent.status} and TrxID is ${rent.trxID}. If face any difficulty, please contact 01737605991`,
  //     isHTML: true,
  //     attachment: {
  //       path: '',  // The absolute path of the file from which to read data.
  //       type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
  //       name: '',   // Optional: Custom filename for attachment
  //     }
  //   }, (error, event) => {
  //     Alert.alert(
  //       error,
  //       event,
  //       [
  //         {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
  //         {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
  //       ],
  //       { cancelable: true }
  //     )
  //   });
  // }

  const handleChangeStatus = rent => {
    console.log(rent.status);
    fetch(
      `https://intense-ridge-49211.herokuapp.com/paidRents/${rent.trxID}`,
      {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({status: rent.status, email: rent.email, trxID: rent.trxID}),
      },
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        data.updateInfo && alert("payment status updated")
        data.mailResponse && alert("Email has been sent to user")
        // handleEmail(rent);
        setStatus(rent.status);
      }).catch(err => {
        alert(err.message)
      })
  };

  const renderItem = ({item}) => (
    <Item
      key={item._id}
      item={item}
      status={rentStatus.status}
      handleChangeStatus={handleChangeStatus}
    />
  );

  return (<>
    <SafeAreaView>
      <FlatList
        data={rentStatus}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
    <Provider>
        <Portal>
          <Modal visible={visible} contentContainerStyle={containerStyle}>
            <Text>Loading... Please wait</Text>
            <ActivityIndicator style={{ paddingTop: 10 }} animating={true} color={Colors.red800} />
          </Modal>
        </Portal>
      </Provider>
    </>
  );
};

export default ManageRent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#A32CC4',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
   
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF'
  },
});
