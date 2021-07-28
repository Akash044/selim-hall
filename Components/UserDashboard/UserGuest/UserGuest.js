import React from 'react'
import { StyleSheet, Text, View } from 'react-native';


const UserGuest = () => {
    return (
        <View style={styles.container}>
            <Text>this is user guest page</Text>
        </View>
    )
}

export default UserGuest

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
