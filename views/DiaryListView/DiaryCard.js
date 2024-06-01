// DiaryCard.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { checkToken, getToken } from '../../ManageToken';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LoadingModal from '../LoadingModalView/LoadingModal';

const makeDiaryCard = (data, navigation, fetchData) => {

    return (
        
        <View style={styles.card} key={data.id}>
            <TouchableOpacity style={{alignItems: 'center',}} onPress={() => navigation.navigate('DiaryDetail', {id: data.id})}>
                <TopView data={data} navigation={navigation} fetchData={fetchData}/>
                {data.image_url ? 
                    <Image src={data.image_url} style={styles.image} /> :
                    <Image source={require('../../assets/images/test.png')} style={styles.image} />
                }
                <View style={styles.infoContainer}>
                    <Text style={styles.content}>{data.content}</Text>
                </View>
            </TouchableOpacity>
            <ScrollView horizontal={true} style={styles.TagCtn} showsHorizontalScrollIndicator={false}>
                {data.tags.map((element, index) => {
                    return (
                        <Tag data={element} key={index}/> 
                    )
                })}
            </ScrollView>
        </View>
    
   )
}

const makeDiaryList = (data, navigation, fetchData) => {

    if (data == null) {
        return (
            <ScrollView style={styles.list}>
            </ScrollView>
        )
    }

    return (
        <ScrollView style={styles.list}>
            {data.map(element => {
                return makeDiaryCard(element, navigation, fetchData);
            })}
        </ScrollView>
    )

    
}

const formatDate = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return `${yyyy}-${mm}-${dd}`;
};

const DiaryCard = ({defaultDate}) => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const [date, setDate] = useState(formatDate(new Date));

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

    async function defaultFetchData(d) {
        await checkToken();
        token = await getToken();

        setLoading(true);
    
        const response = await fetch('http://carvedrem.kro.kr:8080/api/diary/searchByDate?date=' + d, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token[0]}`,
            },
        });
        
        const ret = await response.json();
    
        if (ret.check == null || ret.check == true) {
            setData(ret.information.reverse());
            console.log("데이터 불러오기 성공");
            setLoading(false);
        } else {
            console.log("데이터 불러오기 실패");
        }
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            if (defaultDate) {
                setDate(defaultDate);
                defaultFetchData(defaultDate);
            } else {
                setDate(formatDate(new Date()));
                fetchData();
            }
            
        }
    }, [isFocused])

    return (
        <View style={{alignItems: 'center'}}>
            <LoadingModal isVisible={loading} />
            <DateView sDate={[date, setDate]} sData={[data, setData]} sLoading={[loading, setLoading]}/>
            {makeDiaryList(data, navigation, fetchData)}
        </View>
    )
    
};

//날짜 및 검색 버튼 
const DateView = ({sDate, sData, sLoading}) => {

    const [data, setData] = sData;
    const [loading, setLoading] = sLoading;

    const [date, setDate] = sDate;

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [tagText, setTagText] = useState('');

    const handleConfirm = (d) => {
        console.log("A date has been picked: ", d);
        setDate(formatDate(d));

        async function fetchData() {
            await checkToken();
            token = await getToken();

            setLoading(true);
        
            const response = await fetch('http://carvedrem.kro.kr:8080/api/diary/searchByDate?date=' + formatDate(d), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token[0]}`,
                },
            });
            
            const ret = await response.json();
        
            if (ret.check == null || ret.check == true) {
                setData(ret.information.reverse());
                console.log("데이터 불러오기 성공");
                setLoading(false);
            } else {
                console.log("데이터 불러오기 실패");
            }
        }

        fetchData();
        setDatePickerVisible(false);
    };

    const handleTagConfirm = async () => {

        async function searchByTag(tag) {
            await checkToken();
            token = await getToken();
        
            const response = await fetch('http://carvedrem.kro.kr:8080/api/diary/search?tag=' + tag, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token[0]}`,
                },
            });
            
            const ret = await response.json();
        
            if (ret.check == null || ret.check == true) {
                setData(ret.information.reverse());
                console.log("데이터 불러오기 성공");
                setLoading(false);
            } else {
                console.log("데이터 불러오기 실패");
            }
        }

        if (tagText.trim() !== '') {
            setModalVisible(false); // 모달 숨기기
            console.log("searching by tag: " + tagText);
            await searchByTag(tagText.trim());
            setTagText(''); // 입력 필드 초기화
        }
    };

    return(
        <View style={styles.dateCtn}>
            <TouchableOpacity style={styles.date} onPress={() => {setDatePickerVisible(true)}}>
                <Text style={styles.datetext}>{date}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                 <Image source={require('../../assets/images/searchBtn.png')} style={styles.searchBtn} />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                date={new Date(date)}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => {setDatePickerVisible(false)}}
                locale="ko_KR" // 한국어 설정
            />
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
                        onSubmitEditing={handleTagConfirm}
                        placeholderTextColor={'black'}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleTagConfirm}>
                        <Text style={styles.buttonText}>확인</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        </View>
    );
}

const handleDeleteBtn = (id, fetchData) => {

    Alert.alert("일기 삭제", "삭제하시겠습니까?", [
        {
            text: "확인",
            onPress: async () => {
                await checkToken();
                token = await getToken();
                const response = await fetch('http://carvedrem.kro.kr:8080/api/diary/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token[0]}`,
                    },
                });

                const ret = await response.json();

                if (ret.check == null || ret.check == true) {
                    console.log("삭제 성공");
                } else {
                    console.log("삭제 실패");
                }
                await fetchData();
            },
            style: 'destructive',
        },
        {
            text: "취소",
            style: 'cancel',
            onPress: console.log("삭제 취소")
        }
    ])

    
}

// 일기장 제목, 우상단 수정, 삭제 버튼
const TopView = ({data, navigation, fetchData}) => {

    return (
        <View style={styles.topView}>
            <Text style={styles.title}>{data.title}</Text>
            <View style={styles.btnCtn}>
                <ModifyBtn onPress={() => navigation.navigate('DiaryModify', {id: data.id})} imageSource={require('../../assets/images/modify.png')} />
                <ModifyBtn onPress={() => handleDeleteBtn(data.id, fetchData)} imageSource={require('../../assets/images/delete.png')} />
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
const Tag = ({data}) => {
    return(
        <View>
            <View style={styles.tagBox} >
                <Text style={styles.tagText}> {data} </Text>
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
        height: 300,
        marginHorizontal: 16,
        marginVertical: 19,
    },
    infoContainer: {
        flex:1,
        height: 100,
        width: 300,
        textAlign:'left',
        
    },
    title: {
        textAlign: 'left', 
        color: '#333333', 
        fontSize: 16, 
        fontWeight: '700',
        width: 210,
        marginLeft: 0,
    },
    content: {
        fontSize: 13,
        paddingHorizontal: 0,
        width: 300,
        height: 50,
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
        marginLeft: 28,
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
        marginLeft:7,
    },
    tagText: {
        margin: 4,
        color: '#F2F2F2', 
        fontSize: 14, 
        fontWeight: 'bold'
    },
    TagCtn:{
        flex:1,
        height: 40,
        width: 319,
        flexDirection: 'row',
        marginBottom : 30,
        marginHorizontal: 20,
        position: 'absolute',
        marginTop: 440,
    },
    dateCtn: {
        flexDirection: 'row',
        height: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 20,
    },
    searchBtn : {
        width: 30, 
        height: 30,
        marginLeft: 125,
        marginTop: 20
    },
    list: {
        height: 580,
    },

    textInput: {
        fontSize: 14,
        color: '#333333',
        fontWeight: '500',
        lineHeight: 14,
        width: 300,
        
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
});

export default DiaryCard;
