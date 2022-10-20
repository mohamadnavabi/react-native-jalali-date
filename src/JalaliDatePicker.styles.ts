import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create<any>({
  container: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    ...Platform.select({
      android: {
        padding: 15,
      },
    }),
    paddingHorizontal: 15,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  pickersWrapper: (isLtr: boolean) => ({
    flexDirection: isLtr ? 'row-reverse' : 'row',
  }),
  column: {
    flex: 0.7,
    alignItems: 'center',
  },
  dayColumn: {
    flex: 0.65,
  },
  yearColumn: {
    flex: 0.75,
  },
  monthColumn: {
    flex: 1,
  },
  button: {
    backgroundColor: '#4dc6ff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 15,
    ...Platform.select({
      ios: {
        marginBottom: 25,
      },
    }),
  },
  buttonText: (fontFamily: string) => ({
    color: '#ffffff',
    fontFamily,
    ...Platform.select({
      ios: {
        paddingVertical: 5,
      },
    }),
  }),
});
