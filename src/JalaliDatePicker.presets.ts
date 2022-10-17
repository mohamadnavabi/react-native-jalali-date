import { TextStyle, ViewStyle } from 'react-native';
import { Moment } from 'moment-jalaali';

type dateType = {
  year: number | string;
  month: number | string;
  day: number | string;
};

type outputDateType = {
  year: number | string;
  month: number | string;
  day: number | string;
  moment: Moment;
};

enum today {
  TODAY = 'TODAY',
}

export interface JalaliDatePickerProps {
  visible: boolean;
  initDate?: dateType | keyof typeof today;
  minDate?: dateType | keyof typeof today;
  maxDate?: dateType | keyof typeof today;
  onClose: () => void;
  activeOpacity?: number;
  containerStyle?: ViewStyle;
  withButton?: boolean;
  buttonStyle?: ViewStyle;
  onChange?: (arg: outputDateType) => void;
  onButtonPress: (arg: outputDateType) => void;
  buttonText: string;
  buttonTextStyle?: TextStyle;
  itemTextFontFamily?: string;
  selectedItemTextFontFamily?: string;
  onLoading?: (loading: boolean) => void;
}

export interface CustomPickerProps {
  selectedItem?: number;
  data: string[];
  onItemSelected: (arg: number) => void;
  itemTextFontFamily?: string;
  itemTextColor?: string;
  selectedItemTextFontFamily?: string;
  selectedItemTextColor?: string;
  selectedItemTextSize?: number;
  pickerItemStyle?: ViewStyle | ViewStyle[];
  onTouchStart?: TouchEvent;
}

export type DateObject = {
  year: number;
  month: number;
  day: number;
};

export type DateRange = {
  [key: string]: {
    months: string[];
    days: [string[]];
  };
};

export type InteractionManagerListener = {
  then: (
    onfulfilled?: (() => any) | undefined,
    onrejected?: (() => any) | undefined
  ) => Promise<any>;
  done: (...args: any[]) => any;
  cancel: () => void;
};
