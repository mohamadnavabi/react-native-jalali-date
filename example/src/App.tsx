import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import JalaliDatePicker from 'react-native-jalali-datepicker';

export default function App() {
  return (
    <View style={styles.container}>
      <JalaliDatePicker
        visible={true}
        onClose={() => {}}
        onButtonPress={(result) => {
          console.log(result);
        }}
        initDate="TODAY"
        minDate={{ year: 1369, month: 8, day: 29 }}
        buttonText="انتخاب"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
