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
import JalaliDatePicker from 'react-native-jalali-datepicker';

// ...

<JalaliDatePicker
  visible={true}
  onClose={() => {}}
  onButtonPress={(result) => {
    console.log(result);
  }}
  initDate="TODAY"
  minDate={{ year: 1369, month: 8, day: 29 }}
  buttonText="انتخاب"
/>;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
