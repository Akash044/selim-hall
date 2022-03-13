import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { userContext } from '../../../App';

const TodayStatus = () => {
    const today = new Date().toISOString().substring(0, 10);
    const [loggedUser, setLoggedUser] = useContext(userContext);
    const [todayStatus, setTodayStatus] = useState({})
    useEffect(() => {
        fetch(`https://intense-ridge-49211.herokuapp.com/boarderMeal/${loggedUser.email}`)
        .then(res => res.json())
        .then(data => {
          console.log("my meals", data);
        //   setMealData(data);
          const todayMeal = data.filter(meal => meal.date == today)
          console.log(todayMeal, today);
          setTodayStatus({
              todayMealInfo: todayMeal[0]=== undefined? 0+"----------"+0+"---------"+0 : todayMeal[0].morning+"----------"+todayMeal[0].lunch+"---------"+todayMeal[0].dinner,
          })
        })
        .catch(err => {console.log(err)})
    
      },[loggedUser.todayMeal])
      console.log(todayStatus);
    return (
        <View style={styles.container} >
            <Text>today {today} status</Text>
            <Text style={styles.title}>Meal quantity</Text>
            <Text style={styles.title}>Morning{"   "}Lunch{"   "}Dinner</Text>
            <Text  style={styles.title}> {todayStatus?.todayMealInfo}</Text>

        </View>
    )
}

export default TodayStatus

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        elevation:4
    },
    badge:{
        padding: 10,
        color:"white"
    },
    title:{
        fontSize:20
    }
})
