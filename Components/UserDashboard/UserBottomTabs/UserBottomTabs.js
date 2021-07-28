import React from 'react';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import UserProfile from '../UserProfile/UserProfile';
import UserRentStatus from '../UserRentStatus/UserRentStatus';
import UserMealStatus from '../UserMealStatus/UserMealStatus';
import UserGuest from '../UserGuest/UserGuest';
import TodayStatus from '../TodayStatus/TodayStatus';

const Tab = createMaterialBottomTabNavigator();

const UserBottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Today"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#694fad' }}>
      <Tab.Screen
        name="Today"
        component={TodayStatus}
        options={{
          tabBarLabel: 'Today',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="URent"
        component={UserRentStatus}
        options={{
          tabBarLabel: 'Rent',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="UMeal"
        component={UserMealStatus}
        options={{
          tabBarLabel: 'Meal',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="UGuest"
        component={UserGuest}
        options={{
          tabBarLabel: 'Guest',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserBottomTabs;

const styles = StyleSheet.create({});
