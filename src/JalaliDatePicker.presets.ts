import { TextStyle, ViewStyle } from 'react-native';
import { Moment } from 'moment-jalaali';

type DateType = {
  year: number | string;
  month: number | string;
  day: number | string;
};

export type ResultDateType = {
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
  initDate?: DateType | keyof typeof today;
  minDate?: DateType | keyof typeof today;
  maxDate?: DateType | keyof typeof today;
  onClose: () => void;
  activeOpacity?: number;
  containerStyle?: ViewStyle;
  withButton?: boolean;
  buttonStyle?: ViewStyle;
  onChange?: (arg: ResultDateType) => void;
  onButtonPress: (arg: ResultDateType) => void;
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
