import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import {
  Modal,
  Portal,
  Text,
  Provider,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import { userContext } from '../../../App';
import Room from './Room';

const ManageRoom = () => {
  const [loggedUser, setLoggedUser] = useContext(userContext);
  const [allRooms, setAllRooms] = useState([]);
  const [visible, setVisible] = useState(true);
  const { deleted, updated, addedNew } = loggedUser;

  const containerStyle = { marginHorizontal: 30, borderRadius: 10, backgroundColor: 'white', padding: 20, zIndex: 99 };



  useEffect(() => {
    setVisible(true);
    fetch('https://thawing-meadow-93763.herokuapp.com/allRooms')
      .then(res => res.json())
      .then(rooms => {
        console.log("hijiii");
        setAllRooms(rooms);
        setVisible(false);
        // console.log('16 ', allRooms);
      })
      .catch(err => {console.log(err)})
  }, [addedNew, updated]);

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
        data={allRooms}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      /> : <Text style={{ fontSize: 30 }}>Empty room</Text>
      }
    </View>
    <Provider>
      <Portal>
        <Modal visible={visible} contentContainerStyle={containerStyle}>
          <Text>Loading. Please wait</Text>
          <ActivityIndicator style={{ paddingTop: 10 }} animating={true} color={Colors.red800} />
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
