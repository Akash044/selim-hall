import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
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
import Boarder from './Boarder';

const ManageBoarder = () => {
    const [boarders, setBoarders] = useState([])
    const [visible, setVisible] = useState(false);

    const containerStyle = { marginHorizontal: 30, borderRadius: 10, backgroundColor: 'white', padding: 20, zIndex: 99 };

    useEffect(() => {
        setVisible(true);
        fetch('https://thawing-meadow-93763.herokuapp.com/boarders')
        .then(res => res.json())
        .then(boarders => {
          console.log("hijiii");
          setBoarders(boarders);
          setVisible(false);
                // console.log('16 ', allRooms);
        })
        .catch(err => {console.log(err)})
    }, [])
    const renderItem = ({ item }) => <Boarder item={item} />;
    return (<>
  
      <View>
        {boarders.length ? 
        <FlatList
          data={boarders}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        /> : <Text style={{ fontSize: 30 }}>Empty boarders</Text>
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
}

export default ManageBoarder

const styles = StyleSheet.create({})
