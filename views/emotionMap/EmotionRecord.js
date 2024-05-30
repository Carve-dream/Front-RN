import React, { useCallback,useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { checkToken, getToken } from "../../ManageToken";
import { useNavigation, useFocusEffect  } from '@react-navigation/native';


//'../../assets/images/ellipse-blank.png'

const EmotionRecord = () => {
    const [emotions, setEmotions] = useState([]);

    // 현재 날짜를 가져와서 year와 month를 설정
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1 더하기

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

            setEmotions(json.information); // 가져온 데이터를 상태에 저장
        } catch (error) {
            console.error(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchEmotions();
        }, [])
    );

    useEffect(() => {
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
            {Array.isArray(emotions) && emotions.slice(Math.max(emotions.length - 7, 0)).map((emotion, index) => (
                <Image
                    key={index}
                    source={emotion.emotion ? emotionImages[emotion.emotion] : require('../../assets/images/ellipse-blank.png')} // 감정 미표시 - 별 이미지로 수정
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
