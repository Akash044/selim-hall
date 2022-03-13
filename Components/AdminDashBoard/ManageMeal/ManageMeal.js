import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

const mealCostValidationSchema = yup.object().shape({
  marketerName: yup.string().required('Name is Required'),
  todayCost: yup.number().min(1).required('Today cost is Required'),
  morning: yup.number().min(1).required('Morning meal rate is required'),
  lunch: yup.number().min(1).required('Lunch meal rate is required'),
  dinner: yup.number().min(1).required('Dinner meal rate is required'),
});

const ManageMeal = () => {
  const today = new Date();
  const [date, setDate] = useState({});
  const [load, setLoad] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const handleDatePicked = selectedDate => {
    setIsDatePickerVisible(false);
    const newDate = selectedDate?.nativeEvent.timestamp;
    const dd = String(newDate?.getDate()).padStart(2, '0');
    const mm = String(newDate?.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = String(newDate?.getFullYear());

    setDate({
      today: {
        day: dd,
        month: mm,
        year: yyyy,
      },
    });
    
  };

  const handleUploadBtn = mr => {
    setLoad(true);

    fetch('https://intense-ridge-49211.herokuapp.com/addMealRate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...mr, ...date }),
    })
      .then(res => res.json())
      .then(data => {
        data && alert('added successfully');
        setLoad(false);
      })
      .catch(err => {console.log(err)})
  };

  return (
    <View>
      {isDatePickerVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={today}
          display="default"
          onChange={handleDatePicked}
        />
      )}

      <View style={styles.inputContainer}>
        <Title>Meal Rate</Title>
        <Button onPress={()=> setIsDatePickerVisible(true)} mode="outlined">
          {
            date.today ? <Text style={{ fontSize: 16 }}> {"selected-> "}
              {date.today?.day}-{date.today?.month}-{date.today?.year}
            </Text> : "select date"
          }
        </Button>
        <Formik
          validationSchema={mealCostValidationSchema}
          initialValues={{
            marketerName: '',
            todayCost: 0,
            morning: 0,
            lunch: 0,
            dinner: 0,
          }}
          onSubmit={values => handleUploadBtn(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <TextInput
                mode="outlined"
                name="marketerName"
                placeholder="Marketer's Name"
                onChangeText={handleChange('marketerName')}
                onBlur={handleBlur('marketerName')}
              />
              {errors.marketerName && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.marketerName}
                </Text>
              )}
              <TextInput
                mode="outlined"
                name="todayCost"
                placeholder="Today cost"
                onChangeText={handleChange('todayCost')}
                onBlur={handleBlur('todayCost')}
                keyboardType="numeric"
              />
              {errors.todayCost && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.todayCost}
                </Text>
              )}
              <TextInput
                mode="outlined"
                name="morning"
                placeholder="Morning meal rate"
                onChangeText={handleChange('morning')}
                onBlur={handleBlur('morning')}
                keyboardType="numeric"
              />
              {errors.morning && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.morning}
                </Text>
              )}
              <TextInput
                mode="outlined"
                name="lunch"
                placeholder="Lunch meal rate"
                onChangeText={handleChange('lunch')}
                onBlur={handleBlur('lunch')}
                keyboardType="numeric"
              />
              {errors.lunch && (
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.lunch}</Text>
              )}
              <TextInput
                mode="outlined"
                name="dinner"
                placeholder="Dinner meal rate"
                onChangeText={handleChange('dinner')}
                onBlur={handleBlur('dinner')}
                keyboardType="numeric"
              />
              {errors.dinner && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.dinner}
                </Text>
              )}
              <View style={{ marginTop: 10 }}>
                <Button
                  icon="upload"
                  mode="contained"
                  loading={load}
                  disabled={!isValid}
                  onPress={handleSubmit}>
                  Submit
                </Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default ManageMeal;

const styles = StyleSheet.create({
  cont: {
    // flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E6E6FA',
    textAlign: 'center',
  },
  inputContainer: {
    padding: 10,
  },
  btn: {
    paddingHorizontal: 70,
    paddingTop: 10,
  },
});
