import React, { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'
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
    Avatar, Card, Title, Paragraph
} from 'react-native-paper';
import { userContext } from '../../../App';

const Room = (props) => {
    const [loggedUser, setLoggedUser] = useContext(userContext);
    const [visible, setVisible] = useState(false);
    const [updatedRoomInfo, setUpdatedRoomInfo] = useState({
        roomNo: props.item.roomNo,
        seat: props.item.seat,
        description: props.item.description
    })


    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, zIndex: 99 };

    // console.log('Room', props)

    const handleInputField = (value) => {
        setUpdatedRoomInfo({
            ...updatedRoomInfo, ...value
        })
    }


    const handleDeleteRoomBtn = roomId => {
        fetch(`https://thawing-meadow-93763.herokuapp.com/deleteRoom/${roomId}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                data && alert('Room deleted successfully');
                setLoggedUser({ ...loggedUser, deleted: roomId });
            })
            .catch(err => {console.log(err)})
    };


    const handleUpdateRoomBtn = roomId => {
        setVisible(true);
        console.log(roomId, updatedRoomInfo)
        // fetch(`https://thawing-meadow-93763.herokuapp.com/deleteRoom/${roomId}`, {
        //     method: 'PATCH',
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         setVisible(false);
        //         data && alert('Room deleted successfully');
        //         setLoggedUser({ ...loggedUser, updated: roomId });

        //     });
    };


    return (
        <>
            <Card style={styles.item}>
                <Card.Cover
                    source={{
                        uri: `data:${props.item.contentType};base64,${props.item.img}`,
                    }}
                />
                <Card.Title title={`Room No.: ${props.item.roomNo}`} />
                <Card.Content>
                    <Title>Description</Title>
                    <Paragraph>{props.item.description}</Paragraph>
                </Card.Content>
                <View style={styles.btn}>

                    <Card.Actions>
                        <Button icon="update"
                            mode="contained"
                            color="green"
                            onPress={() => handleUpdateRoomBtn(props.item._id)}>
                            Update
                        </Button>
                    </Card.Actions>
                    <Card.Actions>
                        <Button icon="delete"
                            mode="contained"
                            color="red"
                            onPress={() => handleDeleteRoomBtn(props.item._id)}>
                            Delete
                        </Button>
                    </Card.Actions>
                </View>
                <Provider  style={styles.btn2}>
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                            <TextInput
                                label="Room No."
                                value={updatedRoomInfo.roomNo}
                                onChangeText={text => handleInputField({ roomNo: text })}
                                keyboardType='numeric'
                            />
                            <TextInput
                                label="Seat"
                                value={updatedRoomInfo.seat}
                                onChangeText={text => handleInputField({ seat: text })}
                                keyboardType='numeric'
                            />
                            <TextInput
                                label="Description"
                                value={updatedRoomInfo.description}
                                onChangeText={text => handleInputField({ description: text })}
                                multiline={true}
                            />
                            <View>
                                <Button icon="update"
                                    mode="contained"
                                    color="green"
                                    style={{ marginTop: 10 }}
                                    onPress={() => handleUpdateRoomBtn(props.item._id)}>
                                    Update
                                </Button>
                                <Button icon="cancel"
                                    mode="contained"
                                    color="red"
                                    style={{ marginTop: 10 }}
                                    onPress={() => hideModal()}>
                                    Cancel
                                </Button>
                            </View>
                        </Modal>
                    </Portal>
                </Provider>

            </Card>

        </>
    )
}
const styles = StyleSheet.create({
    item: {
        // backgroundColor: '#f9c2ff',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        zIndex: -100
    },
    title: {
        fontSize: 18,
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        zIndex: -100
    },
    btn2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        zIndex: 100
    }
});
export default Room
