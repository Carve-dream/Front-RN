import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, FlatList } from 'react-native';
import CustomTabBar from '../../CustomTabBar/CustomTabBar';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useSelector, useDispatch } from 'react-redux';
import { fetchDiaryById } from '../../features/diary/diarySlice';
import DiaryCard from './DiaryCard';
import TopBar from '../../ChatView/TopBar';

const screenWidth = Dimensions.get('window').width; // 전체 화면 너비 가져오기
const screenHeight = Dimensions.get('window').height; // 전체 화면 높이 가져오기

//서버 테스트 용 코드 포함

const DiaryList = ({navigation}) => {
    const diary = useSelector(state => state.diary.diary);
    const status = useSelector(state => state.diary.status);
    const error = useSelector(state => state.diary.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDiaryById(1)); // 컴포넌트 마운트 시 일기 정보 불러오기
    }, [dispatch]);

    console.log(status, diary, error);

    return (
        <LinearGradient
            colors={['rgba(41, 32, 100, 0.80)', 'rgba(203, 157, 221, 0.80)', 'rgba(244, 191, 168, 0.80)', 'rgba(255, 255, 255, 0.80)']}
            style={styles.linearGradient}
        >
            <View style={styles.topCtn}>
             <TopBar navigation={navigation} title="꿈일지 목록"  />
            </View>
    
        <DiaryCard/>


        {status === 'loading' && <Text>Loading...</Text>} 
            {error && <Text>Error: {error}</Text>}
            {diary && (
                <View>
                    <Text style={styles.title}>{diary.title}</Text>
                    <Text>{diary.content}</Text>
                    <Image source={{ uri: diary.image_url }} style={styles.image} />
                    <Text>Sleep from {diary.start_sleep} to {diary.end_sleep}</Text>
                    <Text>Date: {diary.date}</Text>
                    <Text>Emotion: {diary.emotion}</Text>
                    <Text>Interpretation: {diary.interpretation}</Text>
                </View>
            )} 



            <CustomTabBar />
        </LinearGradient>
    );
};



/*
const DiaryList = ({ diaries }) => {
    return (
        <FlatList
            data={diaries}
            renderItem={({ item }) => <DiaryCard diary={item} />}
            keyExtractor={item => item.id.toString()}
        />
    );
};

*/

const styles = StyleSheet.create({ 
    linearGradient: {
        flex: 1,
        position: 'relative',
        width: screenWidth,
        height: screenHeight,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    image: {
        width: 100,
        height: 100
    },
    topCtn : {
        marginTop: 55
    }
});

export default DiaryList;
