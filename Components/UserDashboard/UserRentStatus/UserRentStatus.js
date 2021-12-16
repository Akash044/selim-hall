import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  SafeAreaView,
  Button,
  ScrollView
} from 'react-native';
import {userContext} from '../../../App';


const Item = ({item}) => (
  <View style={styles.item}>
    <Text style={styles.title}>Month{"            "} Year {"          "} Status </Text>
    <Text style={styles.title}>     {item.month} {"                "} {item.year} {"         "} {item.status}</Text>
  </View>
);

const UserRentStatus = () => {
  const [loggedUser, setLoggedUser] = useContext(userContext);
  const [paidRents, setPaidRents] = useState([]);
  const [rent, setRent] = useState({});
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch(`https://thawing-meadow-93763.herokuapp.com/paidRents/${loggedUser.email}`)
      .then(res => res.json())
      .then(data => {
        setPaidRents(data);
      });
  }, [load]);

  const handleInputField = value => {
    setRent({...rent, ...value,email: loggedUser.email});
  };

  const handlePayBtn = () => { 
    setRent({...rent, status: 'pending'});

    fetch('https://thawing-meadow-93763.herokuapp.com/addRent', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(rent),
    })
      .then(res => res.json())
      .then(data => {
        data && alert('payment successful');
        setLoad(!load);
      })
      .catch(err => {console.log(err)})
  };

  const renderItem = ({item}) => <Item item={item} />;

  return (
    <KeyboardAvoidingView>
      <View style={{flexDirection:"column",justifyContent:"center"}}>
      <Text style={styles.title}>Pay your rent via bkash</Text>
      <Text style={styles.title}>bKash no: 01737605991</Text>
      </View>
     
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={value => handleInputField({day: value})}
          placeholder="Day"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={value => handleInputField({month: value})}
          placeholder="month"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={value => handleInputField({year: value})}
          placeholder="year"
          keyboardType="numeric"
        />
      </View>

      <View>
        <TextInput
          style={styles.input}
          onChangeText={value => handleInputField({trxId: value})}
          placeholder="Enter transaction id"
          // keyboardType="text"
        />
      </View>
      <View style={{flexDirection:"row",justifyContent:"center",marginTop:10}}>
        <Button title="Pay" onPress={handlePayBtn} />
      </View>
      <View>
        <Text style={styles.title}>Payment status:</Text>
      </View>
      
      <FlatList
        data={paidRents}
        renderItem={renderItem}
        keyExtractor={item => item.trxId}
      />
    </KeyboardAvoidingView>
  );
};

export default UserRentStatus;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    borderRadius:7,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:10,
  },
  title: {
    fontSize: 18,
  },
});
