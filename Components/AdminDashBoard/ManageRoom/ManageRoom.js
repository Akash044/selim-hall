import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
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

const ManageRoom = () => {
  const [visible, setVisible] = useState(false);
  const containerStyle = {backgroundColor: 'white', padding: 20, zIndex: 99};
  const [allRooms, setAllRooms] = useState([]);
  const [id, setId] = useState({});

  useEffect(() => {
    setVisible(true);
    fetch('http://localhost:8085/allRooms')
      .then(res => res.json())
      .then(rooms => {
        // console.log(rooms);
        setAllRooms(rooms);
        setVisible(false);
        // console.log('16 ', allRooms);
      });
  }, [id]);

  const handleDeleteRoomBtn = roomId => {
    fetch(`http://localhost:8085/deleteRoom/${roomId}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        data && alert('Room deleted successfully');
        setId({deletedRoomNo: roomId});
      });
  };

  const handleUpdateRoomBtn = roomId => {
    fetch(`http://localhost:8085/deleteRoom/${roomId}`, {
      method: 'PATCH',
    })
      .then(res => res.json())
      .then(data => {
        data && alert('Room deleted successfully');
        setId({deletedRoomNo: roomId});
      });
  };

  return (
    <ScrollView style={styles.container}>
      {allRooms.map(room => (
        <View key={room._id}>
          <View>
            <Text>Room no. {room.roomNo}</Text>
          </View>
          <View style={styles.btn}>
            <View>
              <Button
                icon="update"
                mode="contained"
                color="green"
                onPress={() => handleUpdateRoomBtn(room._id)}>
                Update
              </Button>
            </View>
            <View>
              <Button
                icon="delete"
                mode="contained"
                color="red"
                onPress={() => handleDeleteRoomBtn(room._id)}>
                Delete
              </Button>
            </View>
          </View>
        </View>
      ))}
      <Provider>
        <Portal>
          <Modal visible={visible} contentContainerStyle={containerStyle}>
            <Text>Loading. Please wait</Text>
            <ActivityIndicator animating={true} color={Colors.red800} />
          </Modal>
        </Portal>
      </Provider>
    </ScrollView>
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
}
