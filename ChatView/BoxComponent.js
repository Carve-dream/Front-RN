import React, { useState,useEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { fetchUserData } from '../api/userData';

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

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <View>
            <Text style={styles.text}>최근 꿈 일기 목록을 불러왔어요.{"\n"}분석하고 싶은 꿈 일기를 선택해주세요!</Text>
            <View style={styles.container}>
                <Text>{userName} 님의 꿈 일기 목록</Text>
                <List1 />
                <List2 />
                <List3 />
            </View>
        </View>
    );
};

//일기 목록 불러오기 예시
const List1 = () => {
    return (
        <View style={styles.listContainer}>
            <Text>list 1</Text>
        </View>
    )
}

const List2 = () => {
    return (
        <View style={styles.listContainer}>
            <Text>list 2</Text>
        </View>
    )
}

const List3 = () => {
    return (
        <View style={styles.listContainer}>
            <Text>list 3</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C1C7F8',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
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
