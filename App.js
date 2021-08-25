import React, {createContext, useState} from 'react';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from './Components/HomePage/HomePage';
import LoginPage from './Components/LoginPage/LoginPage';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import AdminDashBoard from './Components/AdminDashBoard/AdminDashBoard';
import SignUp from './Components/SignUp/SignUp';
import SearchResult from './Components/SearchResult/SearchResult';


const screenStack = createStackNavigator();

export const userContext = createContext();

const App = () => {
  const [loggedUser, setLoggedUser] = useState({});

  const signOut =  () => {
    setLoggedUser({});
   
  };
  return (
    <userContext.Provider value={[loggedUser, setLoggedUser]}>
      <SafeAreaProvider>
        <NavigationContainer>
          <screenStack.Navigator initialRouteName="Home">
          {/* <screenStack.Screen name="User" component={UserDashboard} /> */}
          {/* <screenStack.Screen name="Admin" component={AdminDashBoard} /> */}

            {loggedUser.isAdmin ? (
              <screenStack.Screen
              options={{
                headerRight: () => (
                  <View style={{flexDirection: 'row'}}>
                    <View style={{paddingTop: 9}}>
                      <Text>{loggedUser?.email.split(".")[0]} </Text>
                    </View>
                    <View style={{paddingRight: 5}}>
                      <Button onPress={signOut}>logout</Button>
                    </View>
                  </View>
                ),
              }}
              
              
              name="Admin" component={AdminDashBoard} />
            ) : loggedUser.isUser ? ( 
              <screenStack.Screen
              options={{
                headerRight: () => (
                  <View style={{flexDirection: 'row'}}>
                    <View style={{paddingTop: 9}}>
                      <Text>{loggedUser?.name} </Text>
                    </View>
                    <View style={{paddingRight: 5}}>
                      <Button onPress={signOut} > logout </Button>
                    </View>
                  </View>
                ),
              }}
              
              name="User" component={UserDashboard} />
            ) : (
              <>
                <screenStack.Screen name="Home" component={HomePage} />
                <screenStack.Screen name="Login" component={LoginPage} />
                <screenStack.Screen name="SignUp" component={SignUp} />
                <screenStack.Screen name="Search" component={SearchResult} />
              </>
            )}
          </screenStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </userContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({});



// adb -s emulator-5554 reverse tcp:8085 tcp:8085