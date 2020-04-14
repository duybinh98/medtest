import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import { getApiUrl } from './../Common/CommonFunction';
import { connect } from 'react-redux';

const { width: WIDTH } = Dimensions.get('window')

class AppointmentDetailScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appointmentId: this.props.route.params.appointment_id ? this.props.route.params.appointment_id : '1',
            name: this.props.route.params.appointment_userName ? this.props.route.params.appointment_userName : '',
            dob: this.props.route.params.appointment_DOB ? this.props.route.params.appointment_DOB : '',
            phone: this.props.route.params.appointment_phoneNumber ? this.props.route.params.appointment_phoneNumber : '',
            date: this.props.route.params.appointment_date ? this.props.route.params.appointment_date : '',
            freeTime: this.props.route.params.appointment_time ? this.props.route.params.appointment_time : '',
            status: this.props.route.params.appointment_status ? this.props.route.params.appointment_status : '',
            statusName: this.props.route.params.appointment_status ? this.props.route.params.appointment_status : '',
            backScreen: this.props.route.params.backScreen ? this.props.route.params.backScreen : null,
        };
        this.setStatusNameAndColor(this.props.route.params.appointment_status ? this.props.route.params.appointment_status : '')
        this.onCancelAppointment = this.onCancelAppointment.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                appointmentId: this.props.route.params.appointment_id ? this.props.route.params.appointment_id : '1',
                name: this.props.route.params.appointment_userName ? this.props.route.params.appointment_userName : '',
                dob: this.props.route.params.appointment_DOB ? this.props.route.params.appointment_DOB : '',
                phone: this.props.route.params.appointment_phoneNumber ? this.props.route.params.appointment_phoneNumber : '',
                date: this.props.route.params.appointment_date ? this.props.route.params.appointment_date : '',
                freeTime: this.props.route.params.appointment_time ? this.props.route.params.appointment_time : '',
                status: this.props.route.params.appointment_status ? this.props.route.params.appointment_status : '',
                statusName: this.props.route.params.appointment_status ? this.props.route.params.appointment_status : '',
                backScreen: this.props.route.params.backScreen ? this.props.route.params.backScreen : null,
            })
            this.setStatusNameAndColor(this.props.route.params.appointment_status ? this.props.route.params.appointment_status : '')
        }
    }

    setStatusNameAndColor(status) {
        switch (status) {
            case 'pending':
                this.setState(previousState => ({
                    statusName: 'Đợi xác nhận',
                }));
                break;
            case 'accepted':
                this.setState(previousState => ({
                    statusName: 'Đã được xác nhận',
                }));
                break;
            case 'rejected':
                this.setState(previousState => ({
                    statusName: 'Đơn bị từ chối',
                }));
                break;
            case 'canceled':
                this.setState(previousState => ({
                    statusName: 'Đơn đã hủy',
                }));
                break;
        }
    }


    onCancelAppointment() {
        fetch(getApiUrl() + "/appointments/update/" + this.state.appointmentId, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token,
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
                <View style={styles.background}>
                    <View style={styles.titleArea}>
                        <Text style={styles.logoText}>Lịch hẹn</Text>
                    </View>
                    <View style={styles.infoArea}>
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
                    </View>
                </View>


                <View style={styles.buttonContainer}>
                    {this.state.status == 'pending' ?
                        <TouchableOpacity style={styles.buttonView}
                            onPress={() => this.onCancelAppointment()}
                        >
                            <Text style={styles.textBtn}>Hủy đơn</Text>
                        </TouchableOpacity>
                        : <View />
                    }
                    <TouchableOpacity style={styles.buttonView}
                        onPress={() => {
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
    background: {
        flex: 1,
        backgroundColor: '#f1f0f0',
        flexDirection: 'column',
        alignItems: 'center',
    },
    titleArea: {
        height: 50,
        width: Dimensions.get('window').width - 25,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 3,
        borderRadius: 10,
        marginHorizontal: 15,
    },
    infoArea: {
        height: 280,
        width: Dimensions.get('window').width - 25,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 10,
        paddingTop: 3
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
        paddingBottom: 10,
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
        paddingLeft: 0,
        marginLeft: 25,
    },
    timeContainer: {
        flex: 40,
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
        width: WIDTH - 40,
        height: 120,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    buttonView: {
        marginTop: 30,
        width: 130,
        height: 45,
        borderRadius: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#0A6ADA',
        paddingBottom: 3
    },
    textBtn: {
        color: '#0A6ADA',
        textAlign: "center",
        fontSize: 16,
    },
})