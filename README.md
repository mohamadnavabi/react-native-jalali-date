# react-native-jalali-date

Jalali date picker for React Native both platform (Android and iOS)

<p align="center">
  <img src="https://github.com/mohamadnavabi/react-native-jalali-date/blob/master/example/Android.png?raw=true" width="300" max-width="300" title="Android example">
  <img src="https://github.com/mohamadnavabi/react-native-jalali-date/blob/master/example/iOS.png?raw=true" width="250" max-width="300" alt="iOS example">
</p>

## Installation

```sh
npm install react-native-jalali-date @react-native-picker/picker
```

```sh
yarn add react-native-jalali-date @react-native-picker/picker
```

<b>Add this line to ios/Podfile:<b>

```js
pod 'RNCPicker', :path => '../node_modules/@react-native-picker/picker'
```

## Usage

```js
import JalaliDatePicker, { moment } from 'react-native-jalali-date';

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
/>;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
