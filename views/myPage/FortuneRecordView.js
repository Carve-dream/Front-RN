import React, { useCallback,useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet,ScrollView, Image, Dimensions, StatusBar, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import TopBar from '../../ChatView/TopBar';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { checkToken, getToken } from '../../ManageToken';
import { fetchUserData } from '../../api/userData';
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

    const [userName, setUserName] = useState(null);
    const [date, setDate] = useState(new Date()); 
    const [fortunes, setFortunes] = useState([]);
    
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


   

    const fetchFortuneCookie = async (year, month) => {
        await checkToken();
        const token = await getToken();
        try {
            const response = await fetch(`http://carvedrem.kro.kr:8080/api/fortune?page=0&year=${year}&month=${month}`, {
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

    useEffect(() => {
        loadUserData();
        fetchFortuneCookie(date.getFullYear(), date.getMonth() + 1);
    }, [date]);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.listCtn} >
                <Image source={require('../../assets/images/fortune.png')} style={styles.fortuneImage}/>
                <Text style={styles.UserName}>{userName} 님의 포춘쿠키 기록</Text>
                <DatePicker setDate={setDate} fetchFortuneCookie={fetchFortuneCookie}/>
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


const DatePicker = ({ setDate, fetchFortuneCookie }) => {
    const [date, setLocalDate] = useState(new Date());
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

    const handleConfirm = (selectedDate) => {
        console.log("A date has been picked: ", selectedDate);
        setLocalDate(selectedDate);
        setDate(selectedDate);
        hideDatePicker();

        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        fetchFortuneCookie(year, month);
    };
    
    return (
        <View style={styles.diaryTopCtn}>
            <TouchableOpacity style={styles.dateCtn} onPress={showDatePicker}>
                    <Text style={styles.date} >{formatDate(date)}</Text>
                     <View title={formatDate(date)}>
                         <Text style={styles.toggleIcon}>▼</Text>
                     </View>
            </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    locale="ko_KR" // 한국어 설정
                    date={date}
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

