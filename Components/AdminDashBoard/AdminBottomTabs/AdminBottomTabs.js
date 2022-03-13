import React, { useState } from 'react';
import {StyleSheet,Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import AddNewRoom from '../AddNewRoom/AddNewRoom';
import ManageRoom from '../ManageRoom/ManageRoom';
import ManageMeal from '../ManageMeal/ManageMeal';
import ManageRent from '../ManageRent/ManageRent';
import ManageBoarder from '../ManageBoarder/ManageBoarder';
import MealQuantityStatus from '../MealStatus/MealQuantityStatus';

const Tab = createMaterialBottomTabNavigator();



const AdminBottomTabs = () => {
  const [barColor, setBarColor] = useState("#5e23dc")

  const handleChangeColor = () => {

  }
  
  return (
    <Tab.Navigator
      initialRouteName="AddRoom"
      activeColor="white"
      barStyle={{backgroundColor: '#5e23dc', color: 'white'}}>
      <Tab.Screen
        name="AddRoom"
        component={AddNewRoom}
        options={{
          tabBarLabel: 'Room',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="plus"  color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MRoom"
        component={ManageRoom}
        options={{
          tabBarLabel: 'Room',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="screwdriver" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MMeal"
        component={ManageMeal}
        options={{
          tabBarLabel: 'Rate',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="food" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="MealQS"
        component={MealQuantityStatus}
        options={{
          tabBarLabel: 'Quantity',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="basket" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MRent"
        component={ManageRent}
        options={{
          tabBarLabel: 'Rent',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MBoarder"
        component={ManageBoarder}
        options={{
          tabBarLabel: 'Boarder',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="nature-people" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminBottomTabs;

const styles = StyleSheet.create({});
