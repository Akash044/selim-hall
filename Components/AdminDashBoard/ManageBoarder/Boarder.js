import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

const Boarder = (props) => {
  console.log(props.item)
    return (
        <Card style={styles.item}>
          <Card.Cover
            source={{
              uri: `data:${props.item.type};base64,${props.item.base64}`,
            }}
          /> 
          <Card.Title title={`Room No: ${props.item.roomNo}`} />
          <Card.Title title={`Name: ${props.item.name}`} />
          <Card.Content>
            <Title>Roll</Title>
            <Paragraph>{props.item.roll}</Paragraph>
          </Card.Content>
          <Card.Content>
            <Title>Department</Title>
            <Paragraph>{props.item.dept}</Paragraph>
          </Card.Content>
          <Card.Content>
            <Title>Section</Title>
            <Paragraph>{props.item.sec}</Paragraph>
          </Card.Content>
          <Card.Content>
            <Title>Contact No</Title>
            <Paragraph>{props.item.contactNo}</Paragraph>
          </Card.Content>
          <Card.Content>
            <Title>Address</Title>
            <Paragraph>{props.item.address}</Paragraph>
          </Card.Content>
          {/* <Card.Actions>
            <Button onPress={() => props.handleSearch(props.item.roomNo)}>
              Book Now
            </Button>
          </Card.Actions> */}
        </Card>
      );
}
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

export default Boarder
