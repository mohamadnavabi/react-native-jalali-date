# react-native-jalali-date

Jalali date picker for React Native both platform (Android and iOS)

<p align="center">
  <img src="https://github.com/mohamadnavabi/react-native-jalali-date/blob/master/example/Android.png?raw=true" width="300" max-width="300" title="Android example">
  <img src="https://github.com/mohamadnavabi/react-native-jalali-date/blob/master/example/iOS.png?raw=true" width="250" max-width="300" alt="iOS example">
</p>

## Installation

```sh
npm install react-native-jalali-date
```

```sh
yarn add react-native-jalali-date
```

<b>Add this line to ios/Podfile:<b>

```js
pod 'RNCPicker', :path => '../node_modules/@react-native-picker/picker'
```

## Usage

```js
import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import JalaliDatePicker, { moment } from 'react-native-jalali-date';

export default function App() {
  const [showDatePicker, setshowDatePicker] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <JalaliDatePicker
        visible={showDatePicker}
        onClose={() => setshowDatePicker(false)}
        onChange={(result) => {
          console.log('Item changed', result);
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
