import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { checkToken, getToken } from "../../ManageToken";

//'../../assets/images/ellipse-blank.png'

// 일주일 간의 날짜를 생성하는 함수
const generateWeekDays = () => {
    const weekDays = [];
    const today = new Date();
    const todayDayOfWeek = today.getDay();
    const daySinceSunday = todayDayOfWeek;
    for (let i = 1; i <= 7; i++) {
        const day = new Date(today);
        day.setDate(day.getDate() - daySinceSunday + i);
        weekDays.push(day.toISOString().split('T')[0]);  // YYYY-MM-DD 형식
    }
    return weekDays;
};

const EmotionRecord = () => {
    const [emotions, setEmotions] = useState([]);

    // 현재 날짜를 가져와서 year와 month를 설정
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1 더하기

    useEffect(() => {
        const fetchEmotions = async () => {
            await checkToken();
            const token = await getToken();
            try {
                const response = await fetch('http://carvedrem.kro.kr:8080/api/emotion?year=' + year + '&month=' + month, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token[0]}`,
                    },
                });
                const json = await response.json();
                console.log(json.information);

                const weekDays = generateWeekDays();
                const weekEmotions = weekDays.map(date => {
                    const foundEmotion = json.information.find(emotion => emotion.date === date);
                    return foundEmotion || { date, emotion: null }; // 없는 날짜에는 emotion을 null로 설정
                });

                setEmotions(weekEmotions); // 가져온 데이터를 상태에 저장
            } catch (error) {
                console.error(error);
            }
        };

        fetchEmotions();
    }, []);


    // 감정과 해당 감정의 이미지를 매핑
    const emotionImages = {
        FEAR: require('../../assets/emoji/scared.png'),
        YEARNING: require('../../assets/emoji/miss.png'),
        JOY: require('../../assets/emoji/glad.png'),
        ANGER: require('../../assets/emoji/angry.png'),
        AWKWARDNESS: require('../../assets/emoji/uncomfortable.png'),
        ABSURDITY: require('../../assets/emoji/confused.png'),
        EXCITED: require('../../assets/emoji/excited.png'),
        THRILL: require('../../assets/emoji/happy.png'),
        MYSTERY: require('../../assets/emoji/mysterious.png'),
    };

    return (
        <View style={styles.container}>
            {Array.isArray(emotions) && emotions.map((emotion, index) => (
                <Image
                    key={index}
                    source={emotion.emotion ? emotionImages[emotion.emotion] : require('../../assets/images/ellipse-blank.png')}
                    style={styles.image}
                />
            ))}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    image: {
        width: 35,
        height: 35,
        marginRight: 10,
        marginTop: 10,
    },
    eText: {
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 15,
    }
});

export default EmotionRecord;
