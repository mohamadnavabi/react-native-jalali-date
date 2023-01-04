declare module 'react-native-jalali-date' {
  import JalaliDatePicker from 'react-native-jalali-date/src';
  import moment from 'moment-jalaali';

  export { ResultDateType } from 'react-native-jalali-date/src/JalaliDatePicker.presets';
  export { moment };
  export default JalaliDatePicker;
}
