import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, FlatList, RefreshControl  } from 'react-native';
import {
  Modal,
  Portal,
  Text,
  Provider,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import NetInfo from "@react-native-community/netinfo";
import { userContext } from '../../../App';
import Room from './Room';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  })
}

const ManageRoom = ({navigation}) => {
  const [loggedUser, setLoggedUser] = useContext(userContext);
  const [allRooms, setAllRooms] = useState([]);
  const [visible, setVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [netStatus, setNetStatus] = useState(true);
  const { deleted, updated, addedNew } = loggedUser;

  const containerStyle = { marginHorizontal: 30, borderRadius: 10, backgroundColor: 'white', padding: 20, zIndex: 99 };

  //  useEffect(() => {
  //    navigation.addListener('focus', async() =>{
  //     setVisible(true);
  //    await fetch('https://intense-ridge-49211.herokuapp.com/allRooms')
  //       .then(res => res.json())
  //       .then(rooms => {
  //         console.log("hijiii", rooms);
  //         setAllRooms(rooms);
  //         setVisible(false);
  //         // console.log('16 ', allRooms);
  //       })
  //       .catch(err => {console.log(err)}) 
  //    } )
  //  })


  const onRefresh = () => {
    NetInfo.addEventListener(networkState => {
      setNetStatus(networkState.isConnected)
    });
    setRefreshing(true)
    setVisible(true);
    fetch('https://intense-ridge-49211.herokuapp.com/allRooms')
      .then(res => res.json())
      .then(rooms => {
        console.log("hijiii", rooms);
        setAllRooms(rooms);
        setVisible(false);
        // console.log('16 ', allRooms);
      })
      .catch(err => {
        
      })
    wait(4000).then(() => {
      setRefreshing(false);
    }
    ,[refreshing]).catch(err => {console.log(err)})
  }

  useEffect(() => {
    NetInfo.addEventListener(networkState => {
      setNetStatus(networkState.isConnected)
    });

    console.log(netStatus)

    setVisible(true);
    fetch('https://intense-ridge-49211.herokuapp.com/allRooms')
      .then(res => res.json())
      .then(rooms => {
        console.log("hijiii");
        setAllRooms(rooms);
        setVisible(false);
        // console.log('16 ', allRooms);
      })
      .catch(err => {console.log(err)})
  }, []);
  // addedNew, updated

  useEffect(() => {
    setVisible(true);
    const restRooms = allRooms.filter(restRoom => restRoom._id != deleted);
    setAllRooms(restRooms);
    setVisible(false);
  }, [deleted])


  const renderItem = ({ item }) => <Room item={item} />;
  return (<>

    <View>
      {allRooms.length ? <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
        data={allRooms}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      /> : <Text style={{ fontSize: 30 }}>Empty room</Text>
      }
      
    </View>
    <Provider>
      <Portal>
        <Modal visible={visible} contentContainerStyle={containerStyle}>
        {!netStatus ? <Text style={{ marginTop: 250, color: "red" }}>Network failed. Please connect your device to network</Text> :<ActivityIndicator style={{ paddingTop: 10 }} animating={true} color={Colors.red800} />}
        </Modal>
      </Portal>
    </Provider>
  </>
  );
};

export default ManageRoom;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // flex: 1,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    zIndex: -1,
  },
});

{
  /* <FAB
        // style={styles.fab}
        small
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
      <FAB
        // style={styles.fab}
        small
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
      <FAB
        // style={styles.fab}
        small
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
      <FAB
        // style={styles.fab}
        small
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
      <FAB
        // style={styles.fab}
        small
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
      <FAB
        // style={styles.fab}
        small
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
      <FAB
        // style={styles.fab}
        small
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
      <FAB
        // style={styles.fab}
        small
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
      <FAB
        // style={styles.fab}
        small
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
      <FAB
        // style={styles.fab}
        small
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
      <FAB
        // style={styles.fab}
        small
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
      <FAB
        // style={styles.fab}
        small
        icon="plus"
        onPress={() => console.log('Pressed')}
      /> */










  // <View key={room._id}>
  //     <View>
  //       <Text>Room no. {room.roomNo}</Text>
  //     </View>
  //     <View style={styles.btn}>
  //       <View>
  //         <Button
  //           icon="update"
  //           mode="contained"
  //           color="green"
  //           onPress={() => handleUpdateRoomBtn(room._id)}>
  //           Update
  //         </Button>
  //       </View>
  //       <View>
  //         <Button
  //           icon="delete"
  //           mode="contained"
  //           color="red"
  //           onPress={() => handleDeleteRoomBtn(room._id)}>
  //           Delete
  //         </Button>
  //       </View>
  //     </View>
  //   </View>
  // ))
}
