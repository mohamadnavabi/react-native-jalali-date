import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import JalaliDatePicker from 'react-native-jalali-date';

export default function App() {
  const [showDatePicker, setshowDatePicker] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <JalaliDatePicker
        visible={showDatePicker}
        onClose={() => setshowDatePicker(false)}
        onChange={(result: number) => {
          console.log('Item changed', result);
        }}
        onButtonPress={(result: number) => {
          console.log('Button pressed', result);
          setshowDatePicker(false);
        }}
        initDate={{ year: 1372, month: 3, day: 12 }}
        minDate={{ year: 1355, month: 8, day: 12 }}
        maxDate="TODAY"
        buttonText="انتخاب"
      />

      <Pressable style={styles.button} onPress={() => setshowDatePicker(true)}>
        <Text style={styles.buttonText}>Toggle Date Picker</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4dc6ff',
    borderRadius: 25,
  },
  buttonText: {
    color: '#ffffff',
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
});
