import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, FlatList } from 'react-native';
import CustomTabBar from '../../CustomTabBar/CustomTabBar';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useSelector, useDispatch } from 'react-redux';
import { fetchDiaryById } from '../../features/diary/diarySlice';
import DiaryCard from './DiaryCard';
import TopBar from '../../ChatView/TopBar';

const screenWidth = Dimensions.get('window').width; 
const screenHeight = Dimensions.get('window').height; 

//서버 테스트 용 코드 포함

const DiaryList = ({navigation}) => {
    // const diary = useSelector(state => state.diary.diary);
    // const status = useSelector(state => state.diary.status);
    // const error = useSelector(state => state.diary.error);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchDiaryById(1)); // 컴포넌트 마운트 시 일기 정보 불러오기
    // }, [dispatch]);

    // console.log(status, diary, error);


    return (
        <LinearGradient colors={['rgba(41, 32, 100, 0.80)', 'rgba(203, 157, 221, 0.80)', 'rgba(244, 191, 168, 0.80)', 'rgba(255, 255, 255, 0.80)']} style={styles.linearGradient}>
        <View style={styles.topCtn}>
             <TopBar navigation={navigation} title="꿈일지 목록"  />
        </View>
        <DiaryCard/>
        </LinearGradient>
    );
};



// 데이터 연동시 카드 불러오기
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
