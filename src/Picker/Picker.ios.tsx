import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker as IOSPicker } from '@react-native-picker/picker';

interface Props {
  data: Array<string>;
  selectedItem?: number;
  onItemSelected?: Function;
  disabled?: boolean;
}

const Picker: React.FC<Props> = (props) => {
  const [selectedItem, setSelectedItem] = useState(props.selectedItem || 0);
  const { data, onItemSelected, disabled } = props;
  if (!data || data.length === 0) return null;
  return (
    <View pointerEvents={disabled ? 'none' : 'auto'} style={{ width: '100%' }}>
      <IOSPicker
        {...props}
        selectedValue={data[selectedItem]}
        onValueChange={(value, index): void => {
          if (onItemSelected) onItemSelected(index);
          setSelectedItem(index);
        }}
      >
        {data.map((i, index) => (
          <IOSPicker.Item key={index} label={i} value={i} />
        ))}
      </IOSPicker>
    </View>
  );
};

export default Picker;
