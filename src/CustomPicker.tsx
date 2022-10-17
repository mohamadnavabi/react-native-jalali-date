import React from 'react';
import { WheelPicker } from 'react-native-wheel-picker-android';
import type { CustomPickerProps } from './JalaliDatePicker.presets';

// Custom picker component
const CustomPicker = React.memo((props: CustomPickerProps) => (
  <WheelPicker
    selectedItemTextFontFamily={props.selectedItemTextFontFamily}
    selectedItemTextColor={props.selectedItemTextColor}
    itemTextFontFamily={props.itemTextFontFamily}
    itemTextColor={props.itemTextColor}
    selectedItemTextSize={props.selectedItemTextSize || 22}
    hideIndicator={true}
    itemStyle={props.pickerItemStyle}
    {...props}
  />
));

export default CustomPicker;
