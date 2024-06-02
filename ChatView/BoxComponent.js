import React, { useState,useEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { fetchUserData } from '../api/userData';
import { checkToken, getToken } from '../ManageToken';

//챗봇 - 꿈 일기 목록 조회 
const BoxComponent = () => {

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
            await checkToken();
            token = await getToken();
            
            setLoading(true);
    
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
            console.log(arr);
            setData(arr);
            setLoading(false);
        }
        setData([]);
        loadUserData();
        fetchData();
    }, []);

    return (
        <View>
            <Text style={styles.text}>최근 꿈 일기 목록을 불러왔어요.{"\n"}분석하고 싶은 꿈 일기를 선택해주세요!</Text>
            <ScrollView style={styles.container} >
                <Text>{userName} 님의 꿈 일기 목록</Text>
                <View style={styles.listCtn}>
                    {data.map((element, index) => {
                        if (index < 10) {
                            return (
                                <List key={index} title={element.title} id={element.id}/>
                            )
                        }
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

//일기 목록 불러오기 예시
const List = ({title, id}) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.listContainer} onPress={() => {navigation.navigate('DiaryDetail', {id: id})}}>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C1C7F8',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        maxHeight: 175,
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
    listCtn: {
        marginBottom: 25
    }
});

export default BoxComponent;
