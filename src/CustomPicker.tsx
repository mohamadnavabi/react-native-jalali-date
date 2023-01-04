import React from 'react';
import Picker from './Picker';
import type { CustomPickerProps } from './JalaliDatePicker.presets';

// Custom picker component
const CustomPicker = React.memo((props: CustomPickerProps) => (
  <Picker
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
