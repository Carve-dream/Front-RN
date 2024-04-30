import { FlatList, StyleSheet, SafeAreaView, Text, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import TopBar from './TopBar';
import Input from './Input';
import Button from './Button';
import Message from './Message';
import BoxComponent from './BoxComponent';
import { useState, useRef, useEffect } from 'react';

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

const ChatView = ({ navigation, name }) => {
  StatusBar.setBarStyle('light-content');
  //채팅창 인사말
  const [messages, setMessages] = useState([
    { id: 'date', text: formatDate(new Date()), sender: 'date' },
    { id: '0', text: '안녕하세요! 저는 당신의 꿈을 분석하고, 꿈 속 상징들의 의미 파악을 통해 스스로의 감정을 파악할 수 있도록 돕는 가상 심리학자 꾸미예요', sender: 'other' },
    { id: '1', text: `${name}님의 무의식 속으로 탐험을 떠나볼까요?`, sender: 'other' },
    { id: '2', text: '', sender: 'buttons' }, // 일기장 보기, 상담하기 버튼
  ]);

  const sendMessage =  (question) => {
    // 사용자가 메시지를 보냄
    if (question.trim().length > 0) {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now().toString(), text: question, sender: 'user' }
      ]);

      const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiaWF0IjoxNzE0NDg1ODMzLCJleHAiOjE3MTQ0ODk0MzN9.oUPQYOMZGdw8K5ZFT1aHadX_W3A5nAJC4U6CN0SOgzGAWEG3MXJ3U_OHZbh6VXhwrriIV7ySA1kQRF3lLjyQFg';

      fetch('http://carvedrem.kro.kr:8080/api/gptChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ message: question }),
      })

        .then(response => response.json())
        .then(data => {
          console.log(data.information.answer);
          // 상대방 응답 메시지 추가
          setMessages(prevMessages => [
            ...prevMessages,
            { id: Date.now().toString(), text: data.information.answer, sender: 'other' }
          ]);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }



    // 상대방 응답 메세지 생성
    // setTimeout(() => {
    //   let responseText = 'writing...'; // 기본 응답

    //   if (question == '꿈일기 불러오기') {
    //     responseText = <BoxComponent />; //꿈일기 목록 불러오기
    //   } else if (question == '상징의미 파악하기') {
    //     // to do 
    //   } else if (question == '감정 분석하기') {
    //     // to do
    //   }

    //   // 상대방 응답 메세지 추가
    //   setMessages(messages => [...messages, { id: Date.now().toString(), text: responseText, sender: 'other' }]);
    // }, 500); // 응답 지연 시간 설정

  }

  // FlatList ref 생성
  const flatListRef = useRef();

  // FlatList를 자동 스크롤하는 함수
  useEffect(() => {
    flatListRef.current.scrollToEnd({ animated: true });
  }, [messages]);


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/*상단바*/}
        <TopBar navigation={navigation} title="꾸미와의 대화" />

        {/* 채팅 창 */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (item.sender === 'buttons') {
              return <Button item={item} sendMessage={sendMessage} />;
            } else if (item.sender === 'date') {
              return <Text style={styles.dataText}>{item.text}</Text>;
            }
            else {
              return <Message item={item} />;
            }
          }}
          style={styles.chatContainer}
        />

        {/* 메세지 보내기 입력창 */}
        <Input sendMessage={sendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#464E82', // -> 확인
  },
  chatContainer: {
    flex: 1,
    padding: 15,
  },
  dataText: {
    paddingBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
});

export default ChatView;
