import { View, RefreshControl, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card,} from 'react-native-paper';
import NetInfo from "@react-native-community/netinfo";


const wait = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    })
}

const MealQuantityStatus = () => {
    const today = new Date().toISOString().substring(0, 10);
    const [todayMeals, setTodayMeals] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [netStatus, setNetStatus] = useState(true);
    const [quantity, setQuantity] = useState({
        totalMorningMeal: 0,
        totalLunchMeal: 0,
        totalDinnerMeal: 0,
    })

    console.log(today)

    const onRefresh = () => {
        NetInfo.addEventListener(networkState => {
            setNetStatus(networkState.isConnected)
        });
        setRefreshing(true)
        fetch('https://intense-ridge-49211.herokuapp.com/allMeals')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const todayMeals = data.filter(element => element.date == today)
                todayMeals.map(meal => {
                    quantity.totalMorningMeal = + parseInt(meal.morning);
                    quantity.totalLunchMeal = + parseInt(meal.lunch);
                    quantity.totalDinnerMeal = + parseInt(meal.dinner);
                })
                setTodayMeals(todayMeals);
                console.log(todayMeals)
            })
            .catch(err => {
                alert(err.message);
            })
        wait(2000).then(() => {
            setRefreshing(false);
        }
            , [refreshing]).catch(err => { console.log(err) })
    }

    useEffect(() => {

        fetch('http://localhost:8085/allMeals')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const todayMeal = data.filter(element => element.date === today)

                setTodayMeals(todayMeal);
                console.log(todayMeals)
            })
            .catch(err => {
                alert(err.message);
            })

    }, [])
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >

            <Card style={styles.item}>

                <Card.Title title={`Total Meal Quantity Status`} />

                <View style={styles.btn}>

                    <Card.Actions>
                        <Button
                        >
                            Morning: {quantity.totalMorningMeal}
                        </Button>
                    </Card.Actions>
                    <Card.Actions>
                        <Button >
                            Lunch: {quantity.totalLunchMeal}
                        </Button>
                    </Card.Actions>
                    <Card.Actions>
                        <Button >
                            Dinner: {quantity.totalDinnerMeal}
                        </Button>
                    </Card.Actions>
                </View>


            </Card>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    item: {
        // backgroundColor: '#f9c2ff',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        zIndex: -100
    },
    title: {
        fontSize: 18,
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        zIndex: -100
    },
    btn2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        zIndex: 100
    }
});

export default MealQuantityStatus