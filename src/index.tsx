import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-jalali-date' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type JalaliDateProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'JalaliDateView';

export const JalaliDateView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<JalaliDateProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
