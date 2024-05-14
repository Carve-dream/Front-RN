import React, { useState } from 'react';
import { View, Text,Image, TextInput, TouchableOpacity, ScrollView, Modal, StyleSheet, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../../ChatView/TopBar';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import EmotionPickerModal from './EmotionModal'

const screenWidth = Dimensions.get('window').width; 
const screenHeight = Dimensions.get('window').height; 

//전체 뷰
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
    const dateState = useState(new Date());
    const titleState = useState("");
    const selectedEmotionState = useState(null);

    const bedTimeState = useState(new Date());
    const wakeTimeState = useState(new Date());

    const diaryTextState = useState('');

    const tagsState = useState([]);

    const data = {
        "date": dateState[0],
        "title": titleState[0],
        "selectedEmotion": selectedEmotionState[0],
        "bedTime": bedTimeState[0],
        "wakeTime": wakeTimeState[0],
        "diaryText": diaryTextState[0],
        "tags": tagsState[0],
    }
    return(
        <View style={styles.boxCtn}>
            <View style={styles.mainBox}>
                <DiaryTop dateState={dateState} titleState={titleState} selectedEmotionState={selectedEmotionState}/>
                <SleepTimePicker bedTimeState={bedTimeState} wakeTimeState={wakeTimeState}/>
                <DiaryEntry diaryTextState={diaryTextState}/>
                <TagManager tagsState={tagsState}/>
                <View style={styles.saveCtn}>
                    <SaveBtn data={data}/>
                </View>
            </View>
        </View>
    );
}



//날짜, 제목, 오늘의 감정
const DiaryTop = (state) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [emotionModalVisible, setEmotionModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [date, setDate] = state.dateState;
    const [title, setTitle] = state.titleState;
    const [selectedEmotion, setSelectedEmotion] = state.selectedEmotionState;

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

const toTime = (date) => {
    return (` ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`)
}

//시간 작성
const SleepTimePicker = (state) => {
    const [isBedTimePickerVisible, setBedTimePickerVisibility] = useState(false);
    const [isWakeTimePickerVisible, setWakeTimePickerVisibility] = useState(false);

    const [bedTime, setBedTime] = state.bedTimeState;
    const [wakeTime, setWakeTime] = state.wakeTimeState;
    
    const showBedTimePicker = () => {
        setBedTimePickerVisibility(true);
    };

    const hideBedTimePicker = () => {
        setBedTimePickerVisibility(false);
    };

    const handleConfirmBedTime = (date) => {
        setBedTime(date);
        hideBedTimePicker();
    };

    const showWakeTimePicker = () => {
        setWakeTimePickerVisibility(true);
    };

    const hideWakeTimePicker = () => {
        setWakeTimePickerVisibility(false);
    };

    const handleConfirmWakeTime = (date) => {
        setWakeTime(date);
        hideWakeTimePicker();
    };

    return (
    <View style={styles.timeCtn}>

        <TouchableOpacity style={styles.touchable} onPress={showBedTimePicker}>
            <Text style={styles.text}>취침 시간</Text>
            <Text style={styles.text}>{toTime(bedTime)}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
            isVisible={isBedTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmBedTime}
            onCancel={hideBedTimePicker}
            headerTextIOS="취침 시작시간 선택"
            locale="ko_KR" 
            is24Hour={true}
        />

        <TouchableOpacity style={styles.touchable} onPress={showWakeTimePicker}>
            <Text style={styles.text}>기상 시간</Text>
            <Text style={styles.text}>{toTime(wakeTime)}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
            isVisible={isWakeTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmWakeTime}
            onCancel={hideWakeTimePicker}
            headerTextIOS="일어난 시간 선택"
            locale="ko_KR" 
            is24Hour={true}
        />
    </View>
    );
};

//일기 작성
const DiaryEntry = (state) => {

    const [isFocused, setIsFocused] = useState(false);

    const [diaryText, setDiaryText] = state.diaryTextState;

    return (
        <View>
            <TouchableOpacity style={styles.textInputWrapper} activeOpacity={1} onPress={() => setIsFocused(true)}>
                {!isFocused && !diaryText && (
                    <View style={styles.placeholderContainer}>
                        <Text style={styles.titlePlaceholder}>일기내용</Text>
                        <Text style={styles.subtitlePlaceholder}>꿈 일기 내용을 적어주세요!</Text>
                    </View>
                )}
                <TextInput
                    style={styles.textInput}
                    multiline
                    onChangeText={text => setDiaryText(text)}
                    value={diaryText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(diaryText !== '')}
                />
            </TouchableOpacity>
        </View>
    );
};

//태그
const TagManager = (state) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [tagText, setTagText] = useState('');

    const [tags, setTags] = state.tagsState;

    const addTag = () => {
        if (tagText.trim() !== '') {
            setTags([...tags, `#${tagText.trim()}`]);
            setTagText(''); // 입력 필드 초기화
            setModalVisible(false); // 모달 숨기기
        }
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, idx) => idx !== index));
    };


    return (
        <View style={styles.tagCtn} >
        <Text style={styles.tags} >태그</Text>

            <ScrollView horizontal style={styles.tagContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+ 추가하기</Text>
            </TouchableOpacity>
            
                    {tags.map((tag, index) => (
                    <View key={index} style={styles.addButton}>
                        <Text style={styles.addButtonText}>{tag}</Text>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => removeTag(index)}>
                            <Text style={styles.deleteButtonText}>x</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.Taginput}
                        placeholder="#"
                        value={tagText}
                        onChangeText={setTagText}
                        autoFocus={true}
                        onSubmitEditing={addTag}
                    />
                    <TouchableOpacity style={styles.button} onPress={addTag}>
                        <Text style={styles.buttonText}>확인</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        </View>
    );
};

const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNzE1MjgyOTI5LCJleHAiOjE3MTUyODY1Mjl9.lUDaDfFJ1rWHIBszwNmh2IJgxLz1LxVXYZNCskXSa46V6xsy5t3TnI2GeNmy9yUYMv5prxdzcs4funysX7KRhg";

const requestSave = (props) => {

    const emotionDict = {
        "두려워요": "FEAR",
        "그리워요": "YEARNING",
        "기뻐요": "JOY",
        "화나요": "ANGER",
        "찝찝해요": "AWKWARDNESS",
        "황당해요": "ABSURDITY",
        "흥분돼요": "EXCITED",
        "설레요": "THRILL",
        "미스테리해요": "MYSTERY",
    };

    const title = props.data["title"];
    const diaryText = props.data["diaryText"];
    const bedTime = props.data["bedTime"];
    const wakeTime = props.data["wakeTime"];
    const selectedEmotion = emotionDict[props.data["selectedEmotion"]];
    const date = props.data["date"];
    const tags = props.data["tags"];

    const response = fetch('http://carvedrem.kro.kr:8080/api/diary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ 
            'title': title,
            'content': diaryText,
            'start_sleep': toTime(bedTime),
            'end_sleep': toTime(wakeTime),
            'emotion': selectedEmotion,
            'date': date,
            'tags': tags,
        }),
    });
    return response.then(res => res.json()).then(data => {
        console.log(data);
    })
}

//저장하기 버튼
const SaveBtn = (props) => {
    const navigation = useNavigation();

    async function handleSave(p, d) {
        await requestSave(p);
        navigation.navigate(d);
    }

    return(
        <View>
            <TouchableOpacity onPress={() => {handleSave(props, 'DiaryList')}} style={styles.confirmButton}>
                <Text style={styles.confirmText}>저장하기</Text>
            </TouchableOpacity>
        </View>
    );
}



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
        paddingLeft: 15,
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
        marginRight: 27,
    },
    emotionImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    touchable: {
        width: 130, 
        height: 66, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        alignItems: "center",
        padding: 10,
        marginBottom: 20,
        marginRight: 30
    },
    text: {
        fontSize: 15, 
        fontWeight: '700',
        color: '#434343',
        padding: 3,
        marginBottom: -3
    },
    timeCtn:{
        flexDirection: 'row',
        margin:5,
    },


    textInputWrapper: {
        width: 323, 
        height: 140, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    placeholderContainer: {
        position: 'absolute',
        top: 0,
        left: 10,
        right: 10,
        alignItems: "center",
    },
    titlePlaceholder: {
        fontSize: 14,
        color: '#434343',
        fontWeight: '600', 
        marginBottom: 25,
        marginTop: 10
    },
    subtitlePlaceholder: {
        fontSize: 14,
        color: '#434343',
        fontWeight: '400',
    },
    tags:{
        color: '#434343', 
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 20,
        marginTop:8
    },
    textInput: {
        height: '100%',
        fontSize: 16,
        color: 'black',
        textAlignVertical: 'top'
    },
    tagCtn:{
        width: 325, 
        height: 73, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        marginTop: 20,
    },

    addButton: {
        width: 90, 
        height: 30,
        backgroundColor: '#C1C7F8',
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 5,
        marginRight: 8
    },
    addButtonText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '600',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        marginBottom:-10
    },
    deleteButtonText: {
        color: 'white',
        paddingHorizontal: 5,
        fontSize: 12,
        marginLeft:55,
        marginTop: -20
    },
    tagContainer: {
        marginTop: 10,
        minHeight: 40,
        marginLeft: 25,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    Taginput: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: 200,
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#EF82A1',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 5,
        marginBottom: 20,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#434343',
    },
    confirmButton: {
        width: 240,
        height: 40,
        padding: 10,
        backgroundColor: '#EF82A1',
        borderRadius: 10,
        marginTop: 40, 
        marginBottom: 30
    },
    confirmText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
    saveCtn: {
        marginTop: 25
    }
});

export default DiaryWrite;