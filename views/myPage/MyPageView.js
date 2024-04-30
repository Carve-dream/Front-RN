import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomTabBar from '../../CustomTabBar/CustomTabBar';
import { LinearGradient } from 'expo-linear-gradient'; 

const MyPageView = () => {
    return (
        <LinearGradient
            colors={['rgba(41, 32, 100, 0.80)', 'rgba(203, 157, 221, 0.80)', 'rgba(244, 191, 168, 0.80)', 'rgba(255, 255, 255, 0.80)']}
            style={styles.linearGradient}
        >
            <CustomTabBar />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({ // 스타일 정의 추가
    linearGradient: {
        flex: 1,
    },
});

export default MyPageView;
