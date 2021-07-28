import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View,TextInput,ScrollView} from 'react-native';
import {Button} from 'react-native-elements';

const MealCost = props => {
  const [search, setSearch] = useState({});
  const [mealData, setMealData] = useState([])
  const [mealRates, setMealRates] = useState([])
  const [mealsAndRate, setMealsAndRate] = useState([]);

   
  useEffect(() => {
    fetch(`https://thawing-meadow-93763.herokuapp.com/boarderMeal/${props.email}`)
    .then(res => res.json())
    .then(data => {
      console.log("my meals", data);
      setMealData(data);
    });

  },[])

  useEffect(() => {
    fetch(`http://localhost:8085/allMealRate`)
    .then(res => res.json())
    .then(data => {
      console.log("all meal rate0", data);
    setMealRates(data);
    });

  },[])
  const handleInputField = value => {
    setSearch({...search, ...value});
    // console.log(search);
  };
  const handleCheckMealCost = () => {

    const myMealMonth = mealData.filter(meal => parseInt(meal.year) == parseInt(search.year) && parseInt(meal.month) == parseInt(search.month));
       console.log(myMealMonth);
   
    const mealMonth = mealRates.filter(mealRate => parseInt(mealRate.today.year) == parseInt(search.year) && parseInt(mealRate.today.month) == parseInt(search.month));
       console.log(mealMonth)

    myMealMonth.forEach(myMeal => {

      mealMonth.forEach(meal => {

        if (parseInt(myMeal.day) === parseInt(meal.today.day)){
          setMealsAndRate([...mealsAndRate,{
            date:myMeal.date, 
            mq:myMeal.morning,
            lq:myMeal.lunch,
            dq:myMeal.dinner,
            mr: meal.morning,
            lr:meal.lunch,
            dr:meal.dinner,
            mc: myMeal.morning * meal.morning,
            lc: myMeal.lunch * meal.lunch,
            dc: myMeal.dinner * meal.dinner
           }])
        }});
   });

    // console.log("meal and rate", mealsAndRate);
    // mealsAndRate.map((meal=>{
    //   console.log(meal.date);
    // }))

  }
  return (
    <View>
      <View style={{justifyContent:"center",alignItems:"center"}}>
        <TextInput
          style={styles.input}
          onChangeText={value => handleInputField({month: value})}
          placeholder="Month"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={value => handleInputField({year: value})}
          placeholder="Year"
          keyboardType="numeric"
        />
      </View>
      
      <View style={{flexDirection:"row",justifyContent:"center",marginTop:10}}>
        <Button
          title="Check"
          onPress={handleCheckMealCost}
        />
      </View>
      <View style={{flexDirection:"row",justifyContent:"center",marginTop:10}}>
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
    marginVertical:10,
  },
  text: {
    flexDirection: "row",
    padding: 10,
    // fontSize: 22,
    backgroundColor:"salmon",
    borderRadius:10,
    marginTop:5,
  },
});


