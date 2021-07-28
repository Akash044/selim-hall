import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {userContext} from '../../../App';
import Information from '../Information/Information';

const UserProfile = () => {
  const [loggedUser, setLoggedUser] = useContext(userContext);
  const {email, name, photoUrl} = loggedUser;
  const [wannaUpdate, setWannaUpdate] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(
      `https://thawing-meadow-93763.herokuapp.com/boarder/${loggedUser.email}`,
    )
      .then(res => res.json())
      .then(data => {
        setUser(data);
      });
  }, []);

  const handleUpdate = value => {
    setWannaUpdate(value);
  };

  return (
    <View style={styles.container}>
      {wannaUpdate ? (
        <>
          <Information email={email} handleUpdate={handleUpdate} />
        </>
      ) : (
        <>
          <Image
            source={{uri: photoUrl}}
            style={{width: 200, height: 200, borderRadius: 10}}
          />
          <Text style={styles.text}>Room: {user.roomNo}</Text>
          <Text style={styles.text}>User: {user.name ? user.name : name}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>Dept: {user.dept}</Text>
          <Text style={styles.text}>Sec: {user.sec}</Text>
          <Text style={styles.text}>Roll: {user.roll}</Text>
          <Text style={styles.text}>Blood g: {user.bp}</Text>
          <Text style={styles.text}>Address: {user.address}</Text>
          <Button
            title="Edit or add information"
            onPress={() => setWannaUpdate(true)}
          />
        </>
      )}
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});
