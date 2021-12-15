import React, {useEffect, useState} from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ActivityIndicator ,Colors, Text } from 'react-native-paper';
import NetInfo from "@react-native-community/netinfo";
import Item from './Item';


const SearchResult = ({navigation}) => {
  const [vacantRooms, setVacantRooms] = useState([]);
  const [netStatus, setNetStatus] = useState(true);

  useEffect(() => {

    NetInfo.addEventListener(networkState => {
      setNetStatus(networkState.isConnected)
    });

    fetch('https://thawing-meadow-93763.herokuapp.com/allRooms')
      .then(res => res.json())
      .then(rooms => {
        const vacRooms = rooms.filter(room => room.vacantStatus === true);
        setVacantRooms(vacRooms);
      });
  }, []);
 console.log(vacantRooms);
  const handleSearch = (value) => {
    navigation.navigate("SignUp",value)
  };
  const renderItem = ({item}) => <Item item={item} handleSearch={handleSearch}/>;
  return (
    <View>
      <FlatList
        data={vacantRooms}
        renderItem={renderItem}
        keyExtractor={item => item.roomNo}
      />
      {
        !netStatus ? <Text style={{marginTop:250 ,color:"red"}}>Network failed. Please connect your device to network</Text> :
        <ActivityIndicator animating={true} size="large" color={Colors.green800} style={{marginTop:250}} />
      }
      
    </View>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  item: {
    // backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
  },
});
