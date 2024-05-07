import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import CustomTabBar from '../../CustomTabBar/CustomTabBar';
import { LinearGradient } from 'expo-linear-gradient';
import CalendarView from './CalendarView';
import EmotionRecord from './EmotionRecord';


const EmotionMapView = (navigation) => {
    const weekRange = getWeekRange(); // 일주일 날짜 범위를 문자열로 가져옴

    return (
        <LinearGradient
            colors={['rgba(41, 32, 100, 0.80)', 'rgba(203, 157, 221, 0.80)', 'rgba(244, 191, 168, 0.80)', 'rgba(255, 255, 255, 0.80)']}
            style={styles.linearGradient}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                <CustomTabBar />
                <View style={styles.topCtn}>
                    <View style={styles.topBar}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>감정지도</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.boxCtn}>
                    <View style={styles.mainBox}>
                        <CalendarView />
                        <Text style={styles.eText}>일주간 감정 기록</Text>
                        <EmotionRecord />
                        <Text style={styles.eText}>{weekRange}</Text>
                        <Text style={styles.eText}>감정 통계</Text>
              
                    </View>
                </View>
            </ScrollView>


        </LinearGradient>
    );
};


const getWeekRange = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 일요일이 0, 월요일이 1, ... 토요일이 6
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek); // 이번 주의 시작 날짜 (일요일)
    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() + (6 - dayOfWeek)); // 이번 주의 끝 날짜 (토요일)

    // 날짜를 YYYY.MM.DD 형식으로 포맷팅하는 함수
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    return `${formatDate(weekStart)}-${formatDate(weekEnd)}`;
};


const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    scrollView: {

    },
    topCtn: {
        marginTop: 55,
        marginBottom: 20,
    },
    topBar: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
    },
    headerContainer: {
        alignItems: 'center',
        flex: 1,
        padding: 10,
    },
    headerText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#464E82',
    },
    boxCtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    mainBox: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        minHeight: 610,
        minwidth: 360,
        alignItems: 'center',
    },
    eText: {
        paddingTop: 13,
        fontWeight: 'bold',
        fontSize: 15,
    }

});

export default EmotionMapView;
