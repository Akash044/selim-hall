import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {Button} from 'react-native-elements';
import {
  DateSelectionCalendar,
  DefaultTheme,
  Theme,
} from 'react-native-easy-calendar';
import {userContext} from '../../../App';
import MealCost from '../MealCost/MealCost';

const UserMealStatus = () => {
  const today = new Date().toISOString().substring(0, 10);
  const [loggedUser, setLoggedUser] = useContext(userContext);
  const [mealInfo, setMealInfo] = useState({});
  const [selectedDate, setSelectedDate] = useState(today);
  const [showMealCost, setShowMealCost] = useState(false);

  const {email} = loggedUser;

  const handleMealCost = value => {
    setShowMealCost(value);
  };

  const ymd = selectedDate.split('-');
  console.log(ymd[0]);

  const handleInputField = value => {
    setMealInfo({...mealInfo, ...value});
    console.log(mealInfo);
  };
  const handleSubmitBtn = () => {
    // setMealInfo({
    //   ...mealInfo,
    //   email: loggedUser.email,
    //   year: ymd[0],
    //   month: ymd[1],
    //   day: ymd[2],
    //   date: selectedDate,
    // });
    // console.log(selectedDate, mealInfo);
    fetch('https://thawing-meadow-93763.herokuapp.com/addMeal', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...mealInfo,
        email: loggedUser.email,
        year: ymd[0],
        month: ymd[1],
        day: ymd[2],
        date: selectedDate,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        data && alert('meal added successfully');
        setLoggedUser({...loggedUser, todayMeal: ymd[2]})
      })
      .catch(err => {console.log(err)})
  };

  // console.log(selectedDate, mealInfo);

  return (
    <KeyboardAvoidingView>
     
      {showMealCost ? (
        <>
          <MealCost email={email} handleMealCost={handleMealCost} />
        </>
      ) : (
        <>
         {/* calendar */}
          <View style={{height: 300, marginBottom: 30}}>
            <DateSelectionCalendar
              minDate={today}
              theme={CustomTheme}
              onSelectDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          </View>

          {/* dropdown menu */}
          <Text>Enter meal quantity</Text>
          <View
            style={{
              marginBottom: 30,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TextInput
              style={styles.input}
              onChangeText={value => handleInputField({morning: parseInt(value)})}
              placeholder="breakfast"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              onChangeText={value => handleInputField({lunch: parseInt(value)})}
              placeholder="lunch"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              onChangeText={value => handleInputField({dinner: parseInt(value)})}
              placeholder="dinner"
              keyboardType="numeric"
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button title="Submit" onPress={handleSubmitBtn} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center',marginTop:10}}>
            <Button title="check meal cost" onPress={() => setShowMealCost(true)} />
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

export default UserMealStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
const CustomTheme = {
  ...DefaultTheme,
  extraDayText: {
    color: 'orange',
  },
};
