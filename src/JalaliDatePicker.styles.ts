import { StyleSheet } from 'react-native';

export default StyleSheet.create<any>({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  pickersWrapper: {
    flexDirection: 'row',
  },
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
  },
  buttonText: (fontFamily: string) => ({
    color: '#fff',
    fontFamily,
  }),
});
