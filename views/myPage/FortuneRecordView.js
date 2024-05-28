import React, { useCallback,useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet,ScrollView, Image, Dimensions, StatusBar, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import TopBar from '../../ChatView/TopBar';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { checkToken, getToken } from '../../ManageToken';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

//테스트 데이터
/*const data = [
    { id: 1, date: "2024.05.12", text: "포춘쿠키 내용 1" },
    { id: 2, date: "2024.05.13", text: "포춘쿠키 내용 2" },
    { id: 3, date: "2024.05.13", text: "포춘쿠키 내용 3" },
    { id: 4, date: "2024.05.13", text: "포춘쿠키 내용 4" },
  ];

*/


const FortuneRecordView = () => {
    return (

        <View style={styles.fullScreen}>
            <View style={styles.topCtn}>
                <TopBar title="포춘쿠키 기록" />
            </View>
            <FortuneListView/>
        </View>
      );
};


const FortuneListView = () => {

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


    const [fortunes, setFortunes] = useState([]);

    useEffect(() => {
        const fetchFortuneCookie = async () => {
            await checkToken();
            token = await getToken();
            try {
                  const response = await fetch('http://carvedrem.kro.kr:8080/api/fortune?page=0', {
                  method: 'GET', 
                  headers: {
                    'Authorization': `Bearer ${token[0]}`,
                    'Content-Type': 'application/json',
                  },
                });
                const data = await response.json();
                console.log("Received data:", data);

                if (data && Array.isArray(data.information)) {
                    setFortunes(data.information);
                } else {
                    console.error('Received data does not contain "information" key or it is not an array:', data);
                    setFortunes([]); // 데이터 형식이 맞지 않을 경우 빈 배열로 초기화
                }
                
            } catch (error) {
                console.error('Error fetching fortune cookie:', error);
            }
        };

        fetchFortuneCookie();
    }, []);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.listCtn} >
                <Image source={require('../../assets/images/fortune.png')} style={styles.fortuneImage}/>
                <Text style={styles.UserName}>김꾸미 님의 포춘쿠키 기록</Text>
                <DatePicker/>
            </View>
            {fortunes.map((fortune) => (
                <View key={fortune.id} style={styles.itemContainer}>
                    <Text style={styles.dateText}>{fortune.createAt.split('T')[0]}</Text>
                    <Text style={styles.contentText}>{fortune.content}</Text>
                </View>
            ))}
        </ScrollView>
    );
};


const DatePicker = () => {
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    //날짜 포멧팅 함수
    const formatDate = (date) => {
        let mm = date.getMonth() + 1; 
        const yyyy = date.getFullYear();
        if (mm < 10) mm = '0' + mm;
        return `${yyyy}.${mm}`;
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
        </View>
    );
};




const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#464E82',
        width: screenWidth,
        height: screenHeight,
    },
    container: {
      flex:1,
      backgroundColor: '#F5F5F5',
      width: '90%',
      marginLeft:20,
      borderRadius: 15,
      marginTop:10,
    },
    contentContainer: {
        flexGrow: 1, 
    },
    topCtn : {
        marginTop: 55,
        marginBottom: 20
    },
    listCtn: {
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: 'column',
    },
    fortuneImage: {
        width: 165,
        height: 109.81,
        alignItems: "center",
        justifyContent: 'center'
      },
      itemContainer: {
        backgroundColor: 'white',
        padding: 30,
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        alignItems: "center",
        justifyContent: 'center'
      },
      dateText: {
        marginBottom: 20,
        marginTop:-20,
        color: '#333333', 
        fontSize: 14,
        fontWeight: '600',
      },
      contentText: {
        color: '#333333', 
        fontSize: 14,
        fontWeight: '600'
      },
      UserName:{
        color: '#333333', 
        fontSize: 17,
        fontWeight: '600', 
        marginTop: 5,

      },
      diaryTopCtn:{
        width: 340, 
        height: 30, 
        margin:10,
        marginLeft: 14,
        flexDirection: 'column', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    dateCtn: {
        width: 200, 
        height: 35, 
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 15
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
});

export default FortuneRecordView;

