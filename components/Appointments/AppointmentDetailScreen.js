import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import {getApiUrl} from './../Common/CommonFunction';
import { connect } from 'react-redux';

const { width: WIDTH } = Dimensions.get('window')

class AppointmentDetailScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appointmentId:this.props.route.params.appointment_id? this.props.route.params.appointment_id: '1',
            name: this.props.route.params.appointment_userName? this.props.route.params.appointment_userName: '',
            dob: this.props.route.params.appointment_DOB? this.props.route.params.appointment_DOB: '',
            phone: this.props.route.params.appointment_phoneNumber? this.props.route.params.appointment_phoneNumber: '',
            date: this.props.route.params.appointment_date? this.props.route.params.appointment_date: '',
            freeTime: this.props.route.params.appointment_time? this.props.route.params.appointment_time: '',
            status: this.props.route.params.appointment_status? this.props.route.params.appointment_status: '',
            statusName: this.props.route.params.appointment_statusName? this.props.route.params.appointment_statusName: '',
            backScreen: this.props.route.params.backScreen? this.props.route.params.backScreen: null,
        };
        this.onCancelAppointment = this.onCancelAppointment.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                appointmentId:this.props.route.params.appointment_id? this.props.route.params.appointment_id: '1',
                name: this.props.route.params.appointment_userName? this.props.route.params.appointment_userName: '',
                dob: this.props.route.params.appointment_DOB? this.props.route.params.appointment_DOB: '',
                phone: this.props.route.params.appointment_phoneNumber? this.props.route.params.appointment_phoneNumber: '',
                date: this.props.route.params.appointment_date? this.props.route.params.appointment_date: '',
                freeTime: this.props.route.params.appointment_time? this.props.route.params.appointment_time: '',
                status: this.props.route.params.appointment_status? this.props.route.params.appointment_status: 'Đang chờ xác nhận',
                backScreen: this.props.route.params.backScreen? this.props.route.params.backScreen: null,
            })
        }
    }


    onCancelAppointment(){
        fetch(getApiUrl()+"/appointments/update/"+this.state.appointmentId, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+this.props.token,
                },
                body: JSON.stringify({
                    status: 'canceled',

                }),
                })
        .then(res => res.json())
        .then(
            (result) => {
            this.props.navigation.dispatch(
            CommonActions.navigate({
                name: 'AppointmentListScreen',
                params: {
                },
            }))  
            },            
            (error) => {
                console.log(error)
            }
        )  
    }

    render() {
        const { gender } = this.state;
        return (
            <ScrollView style={{ flex: 1 }}>
                <ScreenTopMenuBack navigation={this.props.navigation} backScreen={this.state.backScreen}></ScreenTopMenuBack>
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
                    <Text style={styles.textInfor} >Trạng thái: {this.state.statusName}</Text>
                </View>
                <View style={styles.buttonContainer}>
                {this.state.status =='pending'?
                    <TouchableOpacity style={styles.buttonView}
                        onPress={() => this.onCancelAppointment()}
                    >
                        <Text style={styles.textBtn}>Hủy đơn</Text>
                    </TouchableOpacity>
                    : <View/>
                    }
                    <TouchableOpacity style={styles.buttonView}
                    onPress= {() => {
                        this.state.backScreen ? this.props.navigation.navigate(this.state.backScreen) : this.props.navigation.goBack();
                    }}
                    >
                        <Text style={styles.textBtn}>Quay lại</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.login.token,
        customerInfor: state.loadCustomer.customerInfor,
        isLoadSuccess: state.loadCustomer.isLoadSuccess,
        loadError: state.loadCustomer.LoadError
    };
}
const mapStateToDispatch = (dispatch) => {
    return {
        load: (customerInfor) => dispatch(loadCustomerInfor(customerInfor)),
    };
}

export default connect(mapStateToProps, mapStateToDispatch)(AppointmentDetailScreen);

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
        marginLeft: 20,
        width: WIDTH-40,
        flexDirection: 'row',
        justifyContent: 'space-between',
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