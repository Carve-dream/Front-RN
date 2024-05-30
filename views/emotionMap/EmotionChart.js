import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Svg, Circle } from 'react-native-svg';
import { checkToken, getToken } from "../../ManageToken";
import { useFocusEffect  } from '@react-navigation/native';


const EmotionChart = () => {
    const [data, setData] = useState([]);
    const [showLegend, setShowLegend] = useState(true); // 범례를 보여줄지 결정하는 상태
    // 현재 날짜를 가져와서 year와 month를 설정
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1 더하기

    useFocusEffect(useCallback(() => {
        const fetchData = async () => {
            const token = await getToken();
            try {
                const response = await fetch('http://carvedrem.kro.kr:8080/api/emotion/graph?year=' + year + '&month=' + month, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token[0]}`,
                    },
                });
                const apiData = await response.json();
                
                if (apiData.information) {
                    // API 데이터를 차트 데이터 형식으로 변환
                    const chartData = [
                        { name: '설레요', population: apiData.information.THRILL || 0, color: '#FA9189' },
                        { name: '그리워요', population: apiData.information.YEARNING || 0, color: '#FCAE7D' },
                        { name: '두려워요', population: apiData.information.FEAR || 0, color: '#FFE699' },
                        { name: '찝찝해요', population: apiData.information.AWKWARDNESS || 0, color: '#FAFFB5' },
                        { name: '미스테리해요', population: apiData.information.MYSTERY || 0, color: '#E3CBF7' },
                        { name: '황당해요', population: apiData.information.ABSURDITY || 0, color: '#9EB0D8' },
                        { name: '흥분돼요', population: apiData.information.EXCITED || 0, color: '#D7F6FF' },
                        { name: '기뻐요', population: apiData.information.JOY || 0, color: '#B3F4BB' },
                        { name: '화나요', population: apiData.information.ANGER || 0, color: '#D2BDFF' },
                    ];

                    const totalPopulation = chartData.reduce((acc, curr) => acc + curr.population, 0);
                    if (totalPopulation === 0) {
                        // 모든 데이터가 0이면 회색으로 전체를 둘러싼 데이터 추가
                        chartData.splice(0, chartData.length, { name: 'No Data', population: 1, color: '#D3D3D3' });
                        setShowLegend(false); // 범례를 숨김
                    } else {
                        setShowLegend(true); // 범례를 표시
                    }

                    setData(chartData);

                } else {
                    console.error('error api information');
                }
            } catch (error) {
                console.error('API 요청 실패', error);
            }
        };

        fetchData();
    }, []));

    return (
        <View style={{ alignItems: 'center' }}>
            <PieChart
                data={data}
                width={200}
                height={200}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"10"}
                center={[40, 0]}
                hasLegend={false}
                absolute
            />
            {/*도넛형태 그래프*/}
            <Svg height="200" width="200" style={{ position: 'absolute' }}>
                <Circle
                    cx="100" // width / 2
                    cy="100" // height / 2
                    r="60" // 흰색 원(내부 원)의 반지름
                    fill="white" // 내부 원의 색상을 흰색으로 설정
                />
            </Svg>

            {/*각 항목 텍스트*/}
            {showLegend && (
                <View style={styles.container}>
                    {data.map((item, index) => (
                        item.population > 0 && (
                            <View key={index} style={styles.legendItem}>
                                <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                                <Text style={[styles.text, { color: item.legendFontColor }]}>
                                    {item.name}
                                </Text>
                            </View>
                        )

                    ))}
                </View>
            )}


        </View>
    );
}



const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-round',
        width: '80%',
        marginTop: 10,
        marginBottom: 20,
    },
    legendItem: {
        flexDirection: 'row',
        margin: 3,
    },
    colorBox: {
        width: 10,
        height: 10,
        marginRight: 5,
    },
    text: {
        fontSize: 12,
    },
});

export default EmotionChart;
