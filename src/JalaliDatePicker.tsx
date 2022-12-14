import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  FunctionComponent,
} from 'react';
import {
  View,
  Text,
  InteractionManager,
  TouchableOpacity,
  Platform,
} from 'react-native';
import type {
  DateObject,
  DateRange,
  InteractionManagerListener,
  JalaliDatePickerProps,
} from './JalaliDatePicker.presets';
import moment from 'moment-jalaali';
import Modal from 'react-native-modal';
import CustomPicker from './CustomPicker';
import styles from './JalaliDatePicker.styles';
import { isAndroidTwelve, persianDigits } from './helpers';

const DEFAULT_START_YEAR = 1340;
const DEFAULT_MONTH_DAYS = 31;

const todayMoment = moment().format('jYYYY/jM/jD').split('/');
const today: DateObject = {
  year: Number(todayMoment[0]),
  month: Number(todayMoment[1]),
  day: Number(todayMoment[2]),
};
const defaultDays = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

const defaultMonths = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

let interactionManager: InteractionManagerListener;

const JalaliDatePicker: FunctionComponent<JalaliDatePickerProps> = ({
  visible,
  onClose,
  initDate,
  minDate,
  maxDate,
  itemTextFontFamily,
  selectedItemTextFontFamily,
  onChange,
  containerStyle,
  withButton = true,
  buttonStyle,
  activeOpacity,
  onButtonPress,
  buttonText,
  buttonTextStyle,
  onLoading,
  isLtr = false,
}: JalaliDatePickerProps) => {
  const minDateIsObject =
    typeof minDate === 'object' && minDate.hasOwnProperty('year');
  const maxDateIsObject =
    typeof maxDate === 'object' && maxDate.hasOwnProperty('year');
  const initDateIsObject =
    typeof initDate === 'object' && initDate.hasOwnProperty('year');

  // Years config
  const yearStartFrom = minDateIsObject
    ? minDate.year
    : minDate === 'TODAY'
    ? today.year
    : DEFAULT_START_YEAR;
  const yearLength =
    (maxDateIsObject
      ? Number(maxDate.year) - Number(yearStartFrom)
      : maxDate === 'TODAY'
      ? today.year - Number(yearStartFrom)
      : Number(today.year) - DEFAULT_START_YEAR) + 1;
  const years = Array.from({ length: yearLength }, (_, index) =>
    (index + Number(yearStartFrom)).toString()
  );

  // Month and days config
  const [days, setDays] = useState(defaultDays);
  const [months, setMonths] = useState(defaultMonths);

  // Selected items
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    '': { months: [''], days: [['']] },
  });

  const dateRangeValues = Object.values(dateRange);

  // References
  const noActionTaken = useRef(true);

  useEffect(() => {
    getDateRange().then(setDateRange);
  }, []);

  useEffect(() => {
    if (Object.keys(dateRange)[0] !== '' && noActionTaken.current)
      setInitDate();
  }, [dateRange]);

  useEffect(() => {
    const selectedDays = dateRangeValues[year].days[month] || defaultDays;
    setDays(selectedDays);
  }, [dateRange, month, year]);

  useEffect(() => {
    if (onLoading) onLoading(loading);
  }, [loading]);

  const getDateRange = (): Promise<DateRange> => {
    return new Promise((resolve, reject) => {
      try {
        const obj: any = {};
        years.forEach((y, yIndex) => {
          obj[y] = { months: [], days: [] };
          let dMonths = defaultMonths;
          // Check min date
          if (yIndex === 0 && minDate) {
            if (minDate === 'TODAY')
              dMonths = dMonths.filter((_, i) => i >= moment().jMonth());
            else dMonths = dMonths.filter((_, i) => i + 1 >= minDate.month);
          }
          // Check max date
          if (yIndex + 1 === years.length && maxDate) {
            if (maxDate === 'TODAY')
              dMonths = dMonths.filter((_, i) => i <= moment().jMonth());
            else dMonths = dMonths.filter((_, i) => i + 1 <= maxDate.month);
          }

          /*
           * Get days base month
           */
          dMonths.forEach((m, mIndex) => {
            let dDays = Array.from(
              {
                length: getTotalDays(
                  Number(y),
                  defaultMonths.findIndex((month) => month === m)
                ),
              },
              (_, index) => (index + 1).toString()
            );
            // Check min day
            if (yIndex === 0 && mIndex === 0 && minDate) {
              if (minDate === 'TODAY')
                dDays = dDays.filter((_, i) => i + 1 >= moment().jDate());
              else dDays = dDays.filter((_, i) => i + 1 >= minDate.day);
            }
            // Check max day
            if (
              yIndex + 1 === years.length &&
              mIndex + 1 === dMonths.length &&
              maxDate
            ) {
              if (maxDate === 'TODAY')
                dDays = dDays.filter((_, i) => i + 1 <= moment().jDate());
              else dDays = dDays.filter((_, i) => i + 1 <= maxDate.day);
            }
            obj[y].months.push(m);
            obj[y].days.push(dDays);
            // obj[y][m] = dDays;
          });
        });
        resolve(obj);
      } catch (error) {
        reject(error);
      }
    });
  };

  const setInitDate = () => {
    interactionManager = InteractionManager.runAfterInteractions(() => {
      if (
        (initDate && month === 0 && year === 0) ||
        (minDate &&
          initDate === 'TODAY' &&
          minDateIsObject &&
          minDate.year >= today.year &&
          minDate.month >= today.month &&
          minDate.day >= today.day) ||
        (minDate &&
          initDateIsObject &&
          minDateIsObject &&
          minDate.year <= initDate.year &&
          minDate.month <= initDate.month &&
          minDate.day <= initDate.day)
      ) {
        let initialDate = {
          year: today.year,
          month: today.month,
          day: today.day,
        };

        if (minDateIsObject) {
          initialDate = {
            year: Number(minDate.year),
            month: Number(minDate.month),
            day: Number(minDate.day),
          };
        }
        if (
          initDateIsObject &&
          initDate.year !== 0 &&
          initDate.month !== 0 &&
          initDate.day !== 0
        ) {
          initialDate = {
            year: Number(initDate.year),
            month: Number(initDate.month),
            day: Number(initDate.day),
          };
        }

        try {
          const yearIndex = Object.keys(dateRange).findIndex(
            (year) => Number(year) === initialDate.year
          );
          const monthIndex = dateRangeValues[yearIndex].months.findIndex(
            (month) => month === defaultMonths[initialDate.month - 1]
          );
          const dayIndex = dateRangeValues[yearIndex].days[
            monthIndex
          ].findIndex((day) => Number(day) === initialDate.day);
          onSelected(yearIndex, monthIndex, dayIndex);
        } catch (error) {
          console.log('initDate has error: ', error);
        }
      }
    });
  };

  const getMonthsBaseOnYear = (yearIndex: number) => {
    const selectedYear = dateRangeValues[yearIndex];
    setMonths(selectedYear.months);
  };

  // Total days in month with local validition(because moment has a bug! => moment.jDaysInMonth(1400, 12) does not have 31 days, it have 29 days)
  const getTotalDays = (year: any, month: any): number => {
    if (year == 0) return DEFAULT_MONTH_DAYS;

    let days = moment.jDaysInMonth(year, month);
    while (
      moment(`${year}/${month + 1}/${days}`, 'jYYYY/jM/jD').format(
        'jYYYY/jMM/jDD'
      ) == 'Invalid date'
    )
      days--;

    return days;
  };

  const onPickerTouchStart = useCallback(() => {
    noActionTaken.current = false;
    setLoading(true);
  }, []);

  const onChangeItem = () => {
    const selected = {
      year: Number(years[year]),
      month:
        defaultMonths.findIndex(
          (m) => m == dateRangeValues[year].months[month]
        ) + 1,
      day: Number(days[day]),
    };

    return {
      year: selected.year,
      month: selected.month,
      day: selected.day,
      moment: moment(
        `${selected.year}/${selected.month}/${selected.day}`,
        'jYYYY/jMM/jDD'
      ),
    };
  };

  const onSelected = (
    selectedYear?: number | undefined,
    selectedMonth?: number | undefined,
    selectedDay?: number | undefined
  ) => {
    if (selectedYear !== undefined) {
      setYear(selectedYear);
      getMonthsBaseOnYear(selectedYear);
    }

    if (selectedMonth !== undefined) setMonth(selectedMonth);

    if (selectedDay !== undefined) setDay(selectedDay);

    setLoading(false);

    if (onChange && !noActionTaken.current) onChange(onChangeItem());
  };

  const onButtonPressed = () => onButtonPress(onChangeItem());

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver={!isAndroidTwelve}
      style={styles.modal}
      backdropOpacity={0.5}
      statusBarTranslucent
      onModalHide={() => {
        noActionTaken.current = true;
        interactionManager?.cancel();
      }}
    >
      <View
        style={[styles.container, containerStyle]}
        onTouchStart={onPickerTouchStart}
      >
        <View style={styles.pickersWrapper(isLtr)}>
          {/* Date column */}
          <View style={[styles.column, styles.dayColumn]}>
            <CustomPicker
              data={days.map(persianDigits)}
              selectedItem={day}
              onItemSelected={(day) => onSelected(undefined, undefined, day)}
              itemTextFontFamily={itemTextFontFamily}
              selectedItemTextFontFamily={selectedItemTextFontFamily}
            />
          </View>
          {/* Month column */}
          <View style={[styles.column, styles.monthColumn]}>
            <CustomPicker
              data={months}
              selectedItem={month}
              onItemSelected={(month) => onSelected(undefined, month)}
              itemTextFontFamily={itemTextFontFamily}
              selectedItemTextFontFamily={selectedItemTextFontFamily}
            />
          </View>
          {/* Year column */}
          <View style={[styles.column, styles.yearColumn]}>
            <CustomPicker
              data={years.map(persianDigits)}
              selectedItem={year}
              onItemSelected={(year) => onSelected(year)}
              itemTextFontFamily={itemTextFontFamily}
              selectedItemTextFontFamily={selectedItemTextFontFamily}
            />
          </View>
        </View>

        {withButton && (
          <TouchableOpacity
            activeOpacity={activeOpacity || 0.5}
            disabled={loading}
            style={[styles.button, buttonStyle]}
            onPress={onButtonPressed}
          >
            <Text
              style={[styles.buttonText(itemTextFontFamily), buttonTextStyle]}
            >
              {buttonText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default JalaliDatePicker;
