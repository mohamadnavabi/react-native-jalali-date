import { Platform } from 'react-native';

export const isAndroidTwelve =
  Platform.OS === 'android' &&
  (Platform.Version == 31 || Platform.Version == 32);

export const persianDigits = (text: string) => {
  const num: Record<string, string> = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
  };
  text = text.replace(/./g, function (c: string) {
    return num[c] || c;
  });
  return text;
};
