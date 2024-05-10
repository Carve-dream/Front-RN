// DiaryCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DiaryCard = () => {
    const navigation = useNavigation();
    return (
        <View>
        <DateView/>
        <TouchableOpacity onPress={() => navigation.navigate('DiaryDetail')}>
            <View style={styles.card}>
                <TopView/>
                <Image source={require('../../assets/images/test.png')} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.content}>나는 오늘 하늘을 나는 꿈을 꿨다.{'\n'}나는 오늘 하늘을 나는 꿈을 꿨다.{'\n'}나는 오늘 하늘을 나는 꿈을 꿨다.{'\n'}</Text>
                </View>
                <View style={styles.TagCtn}>
                    <Tag/> 
                    <Tag/>
                    <Tag/>
                </View>
             </View>
        </TouchableOpacity>
        </View>
    );
};

//날짜 및 검색 버튼 
const DateView = () => {
    return(
        <View style={styles.dateCtn}>
            <View style={styles.date}>
                <Text style={styles.datetext}>2024.04.15</Text>
            </View>
            <TouchableOpacity onPress={() => console.log('검색하기 버튼이 눌렸습니다.')}>
                 <Image source={require('../../assets/images/searchBtn.png')} style={styles.searchBtn} />
            </TouchableOpacity>
        </View>
    );
}



// 일기장 제목, 우상단 수정, 삭제 버튼
const TopView = ({}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.topView}>
            <Text style={styles.title}>오늘의 꿈 일기</Text>
            <View style={styles.btnCtn}>
                <ModifyBtn onPress={() => navigation.navigate('DiaryModify')} imageSource={require('../../assets/images/modify.png')} />
                <ModifyBtn onPress={() => console.log('삭제하기 버튼이 눌렸습니다.')} imageSource={require('../../assets/images/delete.png')} />
            </View>
        </View>
    );
};

const ModifyBtn = ({ onPress, imageSource }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={imageSource} style={styles.modifyBtnImage} />
        </TouchableOpacity>
    );
};

//태그 컴포넌트
const Tag = () => {
    return(
        <View>
            <View style={styles.tagBox} >
                <Text style={styles.tagText}> #하늘 </Text>
            </View>
        </View>
    );
};



//데이터 불러올때 코드
/*const DiaryCard = ({imageSource={require('../../assets/images/cookie.png') diary }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: diary.image_url }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{diary.title}</Text>
                <Text>{diary.content}</Text>
                <Text>{`Date: ${diary.date}`}</Text>
                <Text>{`Emotion: ${diary.emotion}`}</Text>
            </View>
        </View>
    );
}; */




const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        flex: 1,
        width: 330,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginTop: 35,
        marginLeft: 22,
        minHeight: 360,
        minWidth: 350,
        alignItems: 'center'
    },
    date: {
        flexDirection: 'row',
        width: 188,
        height:24,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    datetext:{
        textAlign: 'center', 
        color: '#333333',
        fontSize: 14, 
        fontWeight: '400'
    },
    image: {
        width: 300,
        height: 170,
        marginHorizontal: 16,
        marginVertical: 19,
    },
    infoContainer: {
        flex:1,
        minHeight: 60,
        minWidth: 280,
        textAlign:'left',
        
    },
    title: {
        textAlign: 'center', 
        color: '#333333', 
        fontSize: 16, 
        fontWeight: '700'
    },
    content: {
        fontSize: 13,
    },
    topView: {
        width: 319,
        height: 24, 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
        display: 'inline-flex',
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 19,
    },
    btnCtn:{
        width: 60,
        height: 24, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 158
    },
    modifyBtnImage: {
        width: 24,
        height: 24, 
    }, 
    tagBox: {
        width: 88, 
        height: 30,
        backgroundColor: '#C1C7F8',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:7
    },
    tagText: {
        margin: 4,
        color: '#F2F2F2', 
        fontSize: 14, 
        fontWeight: 'bold'
    },
    TagCtn:{
        flex:1,
        minHeight:40,
        minWidth:290,
        flexDirection: 'row',
        marginBottom : 30
    },
    dateCtn: {
        flexDirection: 'row',
        width: 400, 
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    searchBtn : {
        width: 30, 
        height: 30,
        marginLeft: 125,
        marginTop: 20
    }

     
    
});

export default DiaryCard;
