import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView,TextInput,Button ,KeyboardAvoidingView, Platform} from 'react-native'

const Information = (props) => {
    const [updatedInfo , setUpdatedInfo] = useState({});

    const handleInputField = (info) => {
        setUpdatedInfo({...updatedInfo, ...info});
    }

    const handleSubmitBtn = () =>{
        console.log(updatedInfo);
        fetch(`https://thawing-meadow-93763.herokuapp.com/boarder/${props.email}`,{
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedInfo),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        data && alert("info updated")
        // setStatus(rent.status);
      });

    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputField({name:value})}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputField({dept:value})}
          placeholder="Dept."
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputField({sec:value})}
          placeholder="Section"
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputField({roll:value})}
          placeholder="Roll"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputField({address:value})}
          placeholder="Address"
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputField({mobile:value})}
          placeholder="Mobile"
          keyboardType="numeric"
        />
         <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputField({bp:value})}
          placeholder="Blood group"
        />
        <View  style={{marginBottom:10}}>
        <Button onPress={handleSubmitBtn} title="Submit"/>
        </View>
       <Button onPress={()=>props.handleUpdate(false)} title="Back to profile"/>

      </KeyboardAvoidingView>
    )
}

export default Information

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        width:220,
        borderRadius:10,
        padding:10,
      },
})
