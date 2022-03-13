import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import { Button } from 'react-native-elements';

const MealCost = props => {
  const tDate = new Date()
  const m = String(tDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  const y = String(tDate.getFullYear());
  const [search, setSearch] = useState({
    month: m, year: y

  });
  const [mealData, setMealData] = useState([])
  const [mealRates, setMealRates] = useState([])
  const [mealsAndRate, setMealsAndRate] = useState([]);

  const ar = [];


  useEffect(() => {
    fetch(`https://intense-ridge-49211.herokuapp.com/boarderMeal/${props.email}`)
      .then(res => res.json())
      .then(data => {
        console.log("my meals", data);
        setMealData(data);
      })
      .catch(err => {console.log(err)})

  }, [])

  useEffect(() => {
    fetch(`https://intense-ridge-49211.herokuapp.com/allMealRate`)
      .then(res => res.json())
      .then(data => {
        console.log("all meal rate0", data);
        setMealRates(data);
      })
      .catch(err => {console.log(err)})

  }, [])
 
  const handleCheckMealCost = () => {

    const myMealMonth = mealData.filter(meal => parseInt(meal.year) == parseInt(search.year) && parseInt(meal.month) == parseInt(search.month));
    console.log("my matched meal--> ", myMealMonth);

    const mealMonth = mealRates.filter(mealRate => parseInt(mealRate.today.year) == parseInt(search.year) && parseInt(mealRate.today.month) == parseInt(search.month));
    console.log("matched meal rate month--> ", mealMonth)

    myMealMonth.forEach(myMeal => {

      mealMonth.forEach(meal => {

        if (myMeal.day === meal.today.day) {
          console.log(myMeal.day, meal.today.day)
          ar.push({
            date: myMeal.date,
            mq: myMeal.morning,
            lq: myMeal.lunch,
            dq: myMeal.dinner,
            mr: meal.morning,
            lr: meal.lunch,
            dr: meal.dinner,
            mc: myMeal.morning * meal.morning,
            lc: myMeal.lunch * meal.lunch,
            dc: myMeal.dinner * meal.dinner
          })
          setMealsAndRate([...mealsAndRate, {
            date: myMeal.date,
            mq: myMeal.morning,
            lq: myMeal.lunch,
            dq: myMeal.dinner,
            mr: meal.morning,
            lr: meal.lunch,
            dr: meal.dinner,
            mc: myMeal.morning * meal.morning,
            lc: myMeal.lunch * meal.lunch,
            dc: myMeal.dinner * meal.dinner
          }])
        }
      });
    });
  }




  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback((value) => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      const dd = String(selectedDate.getDate()).padStart(2, '0');
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = String(selectedDate.getFullYear());
  
      showPicker(false);
      setDate(selectedDate);
      setSearch({
        month: mm,
        year: yyyy
      })
    },
    [date, showPicker],
  );



  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
        <TouchableOpacity onPress={() => showPicker(true)}>
          <Text style={styles.title}>Select month and year</Text>
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
          <Text style={{ fontWeight:'bold' }}>{search.month}  {search.year}</Text>
          </View>
        </TouchableOpacity>
        {show && (
          <MonthPicker
            onChange={onValueChange}
            value={date}
            minimumDate={new Date()}
            maximumDate={new Date(2025, 5)}
            locale="en"
          />
        )}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
        <Button
          title="Check"
          onPress={handleCheckMealCost}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
        <Button
          title="go back meal page"
          onPress={() => props.handleMealCost(false)}
        />
      </View>
      <Text style={styles.text}> Date{"          "} Morning{" "} Lunch{" "} Dinner {" ( meal*rate=total)"}</Text>
      <ScrollView style={styles.scrollView}>
        {
          mealsAndRate?.map((mNr) =>
            <View key={mNr.date} style={styles.text}>

              <Text style={styles.text} >{mNr.date}</Text>
              <Text style={styles.text}>{mNr.mq}{'*'}{mNr.mr}{'='}{mNr.mc}</Text>
              <Text style={styles.text}>{mNr.lq}{'*'}{mNr.lr}{'='}{mNr.lc} </Text>
              <Text style={styles.text}>{mNr.dq}{'*'}{mNr.dr}{'='}{mNr.dc} </Text>

            </View>)
        }
      </ScrollView>

    </View>
  );
};

export default MealCost;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    width: 220,
    borderRadius: 10,
    padding: 10,
  },
  scrollView: {
    backgroundColor: 'pink',
    // marginHorizontal: 20,
    marginVertical: 10,
  },
  text: {
    flexDirection: "row",
    padding: 10,
    // fontSize: 22,
    backgroundColor: "salmon",
    borderRadius: 10,
    marginTop: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    borderRadius:10,
    borderWidth:4,
    padding:8
  }
});


