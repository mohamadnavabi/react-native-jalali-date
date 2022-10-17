# react-native-jalali-datepicker

Jalali date picker for React Native both platform (Android and iOS)

## Installation

```sh
npm install react-native-jalali-datepicker moment-jalaali react-native-wheel-picker-android react-native-modal
```

or

```sh
yarn add react-native-jalali-datepicker moment-jalaali react-native-wheel-picker-android react-native-modal
```

## Usage

```js
import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import JalaliDatePicker from 'react-native-jalali-datepicker';

export default function App() {
  const [showDatePicker, setshowDatePicker] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <JalaliDatePicker
        visible={showDatePicker}
        onClose={() => setshowDatePicker(false)}
        onChange={(result) => {
          console.log('Item changed', result);
          console.log(result);
        }}
        onButtonPress={(result) => {
          console.log('Button pressed', result);
          setshowDatePicker(false);
        }}
        initDate={{ year: 1372, month: 3, day: 12 }}
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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
