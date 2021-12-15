import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const hallData = [{
    imageURL:"./Images/shahidul hall.jpg",
    name:"Shahid Shahidul Islam Hall",
    totalSeat:"225"
},{
    image:"./Images/hamid hall.jpg",
    name:"Shahid Abdul Hamid Hall",
    totalSeat:"225"
},{
    image:"./Images/tinshed hall.jpg",
    name:"Tin Shed Hall",
    totalSeat:"100"
},{
    image:"./Images/LH.jpg",
    name:"Deshratna Sheikh Hasina Hall",
    totalSeat:"120"
},{
    image:"./Images/Zia hall-01.jpg",
    name:"Shahid President Ziaur Rahman Hall",
    totalSeat:"500"
},{
    image:"./Images/Bangabondhu HALL.jpg",
    name:"Bangabondhu Sheikh Mujibur Rahman Hall",
    totalSeat:"250"
},{
    image:"./Images/selim hall.jpg",
    name:"Shahid Lieutenant Salim hall",
    totalSeat:"350"
}]

export default function Halls() {
  return (
    <View>
      {
          hallData.map(hd => <SelectHall hd={hd}></SelectHall>)
      }
    </View>
  )
}

const styles = StyleSheet.create({})