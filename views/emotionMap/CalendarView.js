import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { fetchDiaryData } from '../../api/fetchDiaryData';
import { checkToken, getToken } from '../../ManageToken';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const CalendarView = () => {

    const formatDate = (date) => {
        let dd = date.getDate();
        let mm = date.getMonth() + 1; 
        const yyyy = date.getFullYear();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return `${yyyy}-${mm}-${dd}`;
    };

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
    const [calendarHeight, setCalendarHeight] = useState(500); // 기본 달력 높이

    const navigation = useNavigation();

    useFocusEffect(useCallback(() => {
        setSelectedDate(formatDate(new Date()));
    }, []));

    // 캘린더의 헤더를 2024.05 형태로 지정
    const renderCustomHeader = (date) => {
        const headerDate = `${date.getFullYear()}.${(date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}`;

        return (
            <TouchableOpacity style={styles.customHeader} onPress={showDatePicker}>
                <Text style={styles.headerText}>{headerDate}</Text>
            </TouchableOpacity>
        );
    };

    // 날짜별 일기 여부 표시
    const [diaryDates, setDiaryDates] = useState({});

    // 달의 주 수에 따라 달력 높이 조정
    useEffect(() => {
        adjustCalendarHeight(selectedDate);
        async function fetchData() {
            checkToken();
            token = await getToken();

            const [year, month, day] = selectedDate.split('-');

            const response = await fetch('http://carvedrem.kro.kr:8080/api/emotion?year=' + year + '&month=' + month, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token[0]}`,
                },
            });
            
            const ret = await response.json();
        
            if (ret.check == null || ret.check == true) {
                console.log("데이터 불러오기 성공");
            } else {
                console.log("데이터 불러오기 실패");
            }
            const formattedData = ret.information.reduce((acc, diary) => {
                acc[diary.date] = {
                    marked: true, //작게 표시
                    dotColor: '#EF82A1',
                    //  selected: true, //크게 표시
                    //  selectedColor: '#C1C7F8',
                };
                return acc;
            }, {});
            setDiaryDates(formattedData);
        }
        
        fetchData();
    }, [selectedDate]);

    const adjustCalendarHeight = (date) => {
        const year = parseInt(date.substring(0, 4));
        const month = parseInt(date.substring(5, 7)) - 1;
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const weeks = Math.ceil((firstDay + totalDays) / 7);
        setCalendarHeight(weeks * 50 + 70); // 주당 높이 조정 + 헤더 높이
        // console.log(weeks)
    };

    // onMonthChange 핸들러. 달력 슬라이드 시 높이 조정
    const onMonthChange = (month) => {
        console.log('month changed', month);
        setSelectedDate(month.dateString);
        const { dateString } = month; // dateString을 사용하여 달력 높이 조정
        setSelectedDate(dateString);
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

    const handleDayPress = (day) => {
        console.log('day changed', day);
        navigation.navigate("꿈일기 목록", day);
    }

    return (
        <View style={styles.container}>
            <CalendarList
                style={[styles.cal, { height: calendarHeight }]}
                renderHeader={(date) => renderCustomHeader(date)}
                current={selectedDate}
                onDayPress={(day) => { handleDayPress(day) }}
                onMonthChange={onMonthChange}

                markedDates={diaryDates} // 일기가 있는 날짜 표시

                hideExtraDays={true} // 이전 달, 다음 달 날짜 숨기기
                horizontal={true} // 옆으로 슬라이드 해서 넘기기
                pagingEnabled={true} // 옆으로 슬라이드 해서 넘기기

                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    todayTextColor: 'white',
                    todayBackgroundColor: '#C1C7F8',
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
                date={new Date(selectedDate)}
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
