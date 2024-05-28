import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { fetchUserData } from '../api/userData';
import { checkToken, getToken } from '../ManageToken';


//챗봇 - 꿈 일기 목록 조회 
const BoxComponent = ( {sendMessage}) => {

    const [userName, setUserName] = useState('');

    const loadUserData = async () => {
        const data = await fetchUserData();
        setUserName(data.information.name);
    };

    useFocusEffect(
        useCallback(() => {
            loadUserData();
        }, [])
    );

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await checkToken();
            token = await getToken();

            const response = await fetch('http://carvedrem.kro.kr:8080/api/diary?page=0', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token[0]}`,
                },
            });

            const ret = await response.json();

            if (ret.check == null || ret.check == true) {
                setData(ret.information);
                console.log("데이터 불러오기 성공");
                setLoading(false);
            } else {
                console.log("데이터 불러오기 실패");
            }
        }
        setData([]);
        loadUserData();
        fetchData();
    }, []);

    return (
        <View>
           {/* <Text style={styles.text}>최근 꿈 일기 목록을 불러왔어요.{"\n"}분석하고 싶은 꿈 일기를 선택해주세요!</Text>*/}
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContentContainer}>
                <Text>{userName} 님의 꿈 일기 목록</Text>
                {data.map((element, index) => {
                    return (
                        <List 
                        key={index} 
                        title={element.title} 
                        id={element.id} 
                        date={element.date} 
                        sendMessage={sendMessage}
                        />
                    )
                })}
            </ScrollView>
        </View>
    );
};

//일기 목록 불러오기 예시
const List = ({ key, title, id, date, sendMessage}) => {
    const fetchDiaryContent = async (diaryId) => {
        try {
            const token = await getToken();
            const response = await fetch(`http://carvedrem.kro.kr:8080/api/diary/${diaryId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token[0]}`,
                },
            });

            const ret = await response.json();
            if (ret.check == null || ret.check == true) {
                return ret.information.content;
            } else {
                console.log("꿈 일기 내용을 불러오는데 실패했습니다.");
                return "";
            }
        } catch (error) {
            console.error("오류 발생:", error);
            return "";
        }
    };

    const selectDiary = async () => {
        const content = await fetchDiaryContent(id);
        sendMessage(`[${content}] 해몽해줘`);
    }

    return (
        <TouchableOpacity 
        key={key} 
        style={styles.listContainer} 
        onPress={selectDiary}
        >
            <Text style={{ fontSize: 14, }}>{title}</Text>
            <Text style={{ fontSize: 12, paddingTop: 5, }}>{date}</Text>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C1C7F8',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width:245,
        marginLeft: 50,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
    },
    listContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 10,
    },
});

export default BoxComponent;
