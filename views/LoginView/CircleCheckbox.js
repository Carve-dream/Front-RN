import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//로그인 유지하기 체크박스
const CircleCheckbox = ({ checked, onChange, label }) => {

    return (
        <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => onChange(!checked)}>
            <View style={[styles.checkbox, { backgroundColor: checked ? '#EF82A1' : 'white' }]}>
                <Icon name="check" size={13} color={'#464E82'} />
            </View>
            {label && <Text style={styles.label}>{label}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginLeft: 260,
    },
    label: {
        color: 'white',
        marginLeft: 8,
    },
});

export default CircleCheckbox;
