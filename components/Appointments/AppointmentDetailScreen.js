import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';

const { width: WIDTH } = Dimensions.get('window')

export default class ForgottenPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.route.params.appointment_userName? this.props.route.params.appointment_userName: 'Nguyễn Văn A',
            dob: this.props.route.params.appointment_DOB? this.props.route.params.appointment_DOB: '01/01/1970',
            phone: this.props.route.params.appointment_phoneNumber? this.props.route.params.appointment_phoneNumber: '0123456789',
            date: this.props.route.params.appointment_date? this.props.route.params.appointment_date: '01/01/2020',
            freeTime: this.props.route.params.appointment_time? this.props.route.params.appointment_time: '7h30-8h30',
            status: this.props.route.params.appointment_status? this.props.route.params.appointment_status: 'Đang chờ xác nhận'
        };
    }
    render() {
        const { gender } = this.state;
        return (
            <ScrollView style={{ flex: 1 }}>
                <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                <View>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>Lịch hẹn</Text>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textInfor} >Họ và tên:  {this.state.name}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textInfor} >Số điện thoại: {this.state.phone}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textInfor} >Ngày sinh: {this.state.dob}</Text>
                </View>
                <View style={styles.dateTimeContainer}>
                    <View style={styles.dateContainer}>
                        <Text style={styles.textInfor} >Ngày : {this.state.date}</Text>
                    </View>
                    <View style={styles.timeContainer}>
                        <Text style={styles.textInfor} >Giờ: {this.state.freeTime}</Text>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textInfor} >Trạng thái: {this.state.status}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonView}>
                        <Text style={styles.textBtn}>Hủy đơn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonView}
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}
                    >
                        <Text style={styles.textBtn}>Quay lại</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }
}


//#25345D
//#0A6ADA
//#27CDCB
const styles = StyleSheet.create({
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    logoContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 20
    },
    logoText: {
        fontSize: 30,
        color: '#25345D',
    },
    textContainer: {
        marginTop: 10,
        // borderWidth: 1,
        width: WIDTH - 55,
        height: 45,
        marginHorizontal: 25,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 10,
    },
    dateContainer: {
        flex: 70,
        // borderWidth: 1,
        width: WIDTH - 55,
        height: 45,
        justifyContent: 'center',
        paddingLeft: 10,
        marginLeft: 25,
    },
    timeContainer: {
        flex: 40,
        // borderWidth: 1,
        width: WIDTH - 55,
        height: 45,
        justifyContent: 'center',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 30,
    },
    textInfor: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonView: {
        width: 130,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#0A6ADA',
        justifyContent: 'center',
        marginTop: 30,
    },
    textBtn: {
        color: 'white',
        textAlign: "center",
        fontSize: 16,
    },
})