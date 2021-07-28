import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

const TodayStatus = () => {
    return (
        <View style={styles.container}>
            <Text>today status</Text>
            <Badge style={styles.badge} value={<Text >My Custom Badge</Text>} />
            <Badge value="99+" status="success" />

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
    }
})
