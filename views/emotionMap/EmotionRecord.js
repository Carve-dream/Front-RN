import React, { useCallback,useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { checkToken, getToken } from "../../ManageToken";
import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import LoadingModal from '../LoadingModalView/LoadingModal';


//'../../assets/images/ellipse-blank.png'

const EmotionRecord = () => {
    const [emotions, setEmotions] = useState([]);
    const [loading, setLoading] = useState(false);

    // 현재 날짜를 가져와서 year와 month를 설정
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1 더하기

    async function fetchEmotions() {
        setLoading(true);
        token = await getToken();

        let arr = [];
    
        for (let index = 0; true; index++) {
            
            const response = await fetch('http://carvedrem.kro.kr:8080/api/diary?page=' + index, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token[0]}`,
                },
            });
            
            const ret = await response.json();
        
            if (ret.check == null || ret.check == true) {
                if (ret.information.length == 0) {
                    break;
                }
                ret.information.map((element) => {
                    arr.unshift(element);
                })
                console.log("데이터 불러오기 성공");
            } else {
                console.log("데이터 불러오기 실패");
                break;
            }
        }
        //array를 정렬해야 됨.
        arr.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        })
        setEmotions(arr);
        setLoading(false);
    }

    useFocusEffect(
        useCallback(() => {
            fetchEmotions();
        }, [])
    );


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
            <LoadingModal isVisible={loading} />
            {Array.isArray(emotions) && emotions.slice(0, 7).reverse().map((emotion, index) => (
                <Image
                    key={index}
                    source={emotion.emotion ? emotionImages[emotion.emotion] : require('../../assets/emoji/blank.png')} // 감정 미표시 - 별 이미지로 수정
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
