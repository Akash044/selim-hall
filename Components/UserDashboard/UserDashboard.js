import React from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import UserBottomTabs from '../UserDashboard/UserBottomTabs/UserBottomTabs'

const UserDashboard = ({navigation}) => {
  return (
      <UserBottomTabs />
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    elevation: 4,
    borderRadius: 10,
  },
  containerText: {
    paddingBottom: 10,
  },
});
export default UserDashboard;
