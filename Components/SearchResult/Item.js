import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

export default function Item(props) {
  return (
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
      <Card.Actions>
        <Button onPress={() => props.handleSearch(props.item.roomNo)}>
          Book Now
        </Button>
      </Card.Actions>
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
