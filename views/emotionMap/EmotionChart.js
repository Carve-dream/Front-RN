import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Svg, Circle } from 'react-native-svg';

const EmotionChart = () => {
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

        </View>
    );
}

// 데이터 연동 시 population 수정
const data = [
    { name: '설레요', population: 10, color: '#FA9189' },
    { name: '그리워요', population: 0, color: '#FCAE7D' },
    { name: '두려워요', population: 20, color: '#FFE699' },
    { name: '찝찝해요', population: 0, color: '#FAFFB5' },
    { name: '미스테리해요', population: 15, color: '#E3CBF7' },
    { name: '황당해요', population: 30, color: '#9EB0D8' },
    { name: '흥분돼요', population: 0, color: '#D7F6FF' },
    { name: '기뻐요', population: 20, color: '#B3F4BB' },
    { name: '화나요', population: 0, color: '#D2BDFF' },
];

const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
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
