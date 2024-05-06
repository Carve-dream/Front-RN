import React, { useState } from 'react';
import { View, Text,Image, TextInput, TouchableOpacity, Modal, StyleSheet, Dimensions, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../../ChatView/TopBar';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import EmotionPickerModal from './EmotionModal'

const screenWidth = Dimensions.get('window').width; 
const screenHeight = Dimensions.get('window').height; 

//전체뷰
const DiaryWrite = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <View style={styles.mainBoxCtn}>
                <View style={styles.topCtn}>
                    <TopBar navigation={navigation} title="꿈 일지 작성하기"  />
                </View>
            <MainBoard/>
            </View>
        </View>
    );
};


//일기 작성 보드
const MainBoard = () => {
    return(
        <View style={styles.boxCtn}>
            <View style={styles.mainBox}>
                <DiaryTop/>
            </View>
        </View>
    );
}


//날짜, 제목, 오늘의 감정
const DiaryTop = () => {
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [title, setTitle] = useState("");
    const [emotionModalVisible, setEmotionModalVisible] = useState(false);
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    //날짜 포멧팅 함수
    const formatDate = (date) => {
        let dd = date.getDate();
        let mm = date.getMonth() + 1; 
        const yyyy = date.getFullYear();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return `${yyyy}.${mm}.${dd}`;
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        setDate(date);
        hideDatePicker();
    };

    return (
        <View style={styles.diaryTopCtn}>
            <View style={styles.dateCtn}>
                    <Text style={styles.date} >{formatDate(date)}</Text>
                     <TouchableOpacity title={formatDate(date)} onPress={showDatePicker}>
                         <Text style={styles.toggleIcon}>▼</Text>
                     </TouchableOpacity>
            </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    locale="ko_KR" // 한국어 설정
                />
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="제목"
                style={styles.input}
                placeholderTextColor="#434343"
            />


            <TouchableOpacity onPress={() => setEmotionModalVisible(true)} style={styles.iconCtn}>
                <Text style={styles.iconText}>오늘의 감정</Text>
                {selectedImage && <Image source={selectedImage} style={styles.emotionImage} />}
            </TouchableOpacity>

            <EmotionPickerModal 
                emotionModalVisible={emotionModalVisible}
                setEmotionModalVisible={setEmotionModalVisible}
                setSelectedEmotion={setSelectedEmotion}
                setSelectedImage={setSelectedImage}
            />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#464E82',
      position: 'relative',
      width: screenWidth,
      height: screenHeight,
    },
    topCtn : {
        marginTop: 55,
        marginBottom: 20
    },
    boxCtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 275
    },
    mainBox: {
        flexDirection: 'column',
        flex: 1,
        width: 100,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        minHeight: 530,
        minWidth: 360,
        alignItems: 'center'
    },
    mainBoxCtn: {
        flex: 1,
        width: '100%',
    },
    input: {
        width: 330, 
        height: 35, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        alignItems: "center",
        marginTop: 15,
        padding: 15,
        fontSize: 15, 
        fontWeight: '700'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    diaryTopCtn:{
        width: 340, 
        height: 150, 
        margin:10,
        marginLeft: 14,
        flexDirection: 'column', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    dateCtn: {
        width: 200, 
        height: 35, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 10
    },
    toggleIcon: {
        color: '#434343',
        fontSize: 14, 
    },
    date: {
        marginLeft: 15,
        marginRight: 7,
        flexDirection: 'row',
        color: '#434343',
        fontSize: 15, 
        fontWeight: '700'
    },
    iconCtn : {
        width: 140, 
        height: 35, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 15
    },
    iconText:{
        color: '#434343',
        fontSize: 15, 
        fontWeight: '700',
        marginLeft: 15,
        marginRight: 40,
    },
    emotionImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    }
});

export default DiaryWrite;