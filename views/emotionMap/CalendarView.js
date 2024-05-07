import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const CalendarView = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('2024-05-07');
    const [calendarHeight, setCalendarHeight] = useState(500); // 기본 달력 높이


    // 캘린더의 헤더를 2024.05 형태로 지정
    const renderCustomHeader = (date) => {
        const headerDate = `${date.getFullYear()}.${(date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}`;

        return (
            <TouchableOpacity style={styles.customHeader} onPress={showDatePicker}>
                <Text style={styles.headerText}>{headerDate}</Text>
            </TouchableOpacity>
        );
    };

    // 달의 주 수에 따라 달력 높이 조정
    useEffect(() => {
        adjustCalendarHeight(selectedDate);
    }, [selectedDate]);

    const adjustCalendarHeight = (date) => {
        const year = parseInt(date.substring(0, 4));
        const month = parseInt(date.substring(5, 7)) - 1;
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const weeks = Math.ceil((firstDay + totalDays) / 7);
        setCalendarHeight(weeks * 50 + 70); // 주당 높이 조정 + 헤더 높이
        console.log(weeks)
    };

    // onMonthChange 핸들러. 달력 슬라이드 시 높이 조정
    const onMonthChange = (month) => {
        console.log('month changed', month);
        const { dateString } = month; // dateString을 사용하여 달력 높이 조정
        adjustCalendarHeight(dateString);
    };


    //날짜 선택
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        setSelectedDate(`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`);
        hideDatePicker();
    };


    return (
        <View style={styles.container}>
            <CalendarList
                style={[styles.cal, { height: calendarHeight }]}
                renderHeader={(date) => renderCustomHeader(date)}
                current={selectedDate}
                onDayPress={(day) => { console.log('day changed', day) }}
                onMonthChange={onMonthChange}

                hideExtraDays={true} // 이전 달, 다음 달 날짜 숨기기
                horizontal={true} // 옆으로 슬라이드 해서 넘기기
                pagingEnabled={true} // 옆으로 슬라이드 해서 넘기기

                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    todayTextColor: '#5872C4',
                    dayTextColor: '#2d4150',
                    textDayFontWeight: 'bold', //날짜
                    textMonthFontWeight: 'bold', //달
                    textDayHeaderFontWeight: 'bold', //요일
                    'stylesheet.calendar.header': {
                        dayTextAtIndex0: {
                            color: '#EF82A1',
                        },
                        dayTextAtIndex6: {
                            color: '#5872C4',
                        },
                    },
                }}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                locale="ko_KR"
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',
        paddingTop: 20,
    },
    cal: {
        borderRadius: 10,
        paddingBottom: 15,
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 275,
    },

});

export default CalendarView;
