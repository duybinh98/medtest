import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-native-datepicker';
import { Icon } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import { getApiUrl, convertDateAndTimeToDateTime, convertDateTimeToDate, formatMonth } from './../Common/CommonFunction';
import { connect } from 'react-redux';
import { load as loadAccount } from '../Store/Reducers/InitialValue'
import renderField from '../../Validate/RenderField'

//validate conditions
const required = values => values ? undefined : 'Bắt buộc';
const isNumber = values => values && isNaN(Number(values)) ? 'Phải nhập số' : undefined;
const isPhonenumber = values => values && values.length == 10 ? undefined : 'Phải có 10 số';

const { width: WIDTH } = Dimensions.get('window')

class CreateAppointmentScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerInfor: this.props.customerInfor,
            name: this.props.customerInfor ? this.props.customerInfor.name : '',
            phonenumber: this.props.customerInfor ? this.props.customerInfor.phoneNumber : '',
            dob: this.props.customerInfor ? convertDateTimeToDate(this.props.customerInfor.dob) : '',
            apointmentDate: (new Date().getDate() + 1) + '-' + formatMonth(new Date().getMonth() + 1) + '-' + new Date().getFullYear(),
            apointmentTime: '07:30',
        };
        this.submit = this.submit.bind(this)
    }
    componentDidMount = value => {
        const customerInfor = {
            username: this.props.customerInfor ? this.props.customerInfor.name : '',
            phonenumber: this.props.customerInfor ? this.props.customerInfor.phoneNumber : '0000000000',
            address: this.props.customerInfor ? this.props.customerInfor.address : '',
            email: this.props.customerInfor ? this.props.customerInfor.email : '',
        }
        this.props.load(customerInfor)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                customerInfor: this.props.customerInfor,
                name: this.props.customerInfor ? this.props.customerInfor.name : '',
                phonenumber: this.props.customerInfor ? this.props.customerInfor.phoneNumber : '',
                dob: this.props.customerInfor ? convertDateTimeToDate(this.props.customerInfor.dob) : '',
            })
            const customerInfor = {
                username: this.props.customerInfor ? this.props.customerInfor.name : '',
                phonenumber: this.props.customerInfor ? this.props.customerInfor.phoneNumber : '0000000000',
                address: this.props.customerInfor ? this.props.customerInfor.address : '',
                email: this.props.customerInfor ? this.props.customerInfor.email : '',
            }
            this.props.load(customerInfor)
        }

    }


    submit = values => {
        fetch(getApiUrl() + '/appointments/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token,
            },
            body: JSON.stringify({
                customerID: this.state.customerInfor.id,
                meetingTime: convertDateAndTimeToDateTime(this.state.apointmentDate, this.state.apointmentTime),
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)

                    this.props.navigation.dispatch(
                        CommonActions.navigate({
                            name: 'AppointmentDetailScreen',
                            params: {
                                appointment_id: result.appointment_id,
                                appointment_userName: this.state.name,
                                appointment_phoneNumber: this.state.phonenumber,
                                appointment_DOB: this.state.dob,
                                appointment_date: this.state.apointmentDate,
                                appointment_time: this.state.apointmentTime,
                                appointment_status: 'pending',
                                appointment_statusName: 'Đợi xác nhận',
                                appointment_createdTime: result.appointment_createdTime,
                                appointment_createdDate: result.appointment_createdTime,
                                backScreen: 'HomeScreen',
                            },
                        })
                    )
                    this.props.reset();
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        error
                    });
                }
            );
    }

    render() {
        const { handleSubmit } = this.props;
        // debugger;
        return (
            <View style={styles.background}>
                <ScrollView>
                    <ScreenTopMenuBack navigation={this.props.navigation} backScreen='HomeScreen'></ScreenTopMenuBack>
                    <View>
                        <View style={styles.titleArea}>
                            <Text style={styles.logoText}>Đặt lịch khám</Text>
                        </View>
                    </View>
                    <Field name="username" keyboardType="default" component={renderField} iconName="rename-box"
                        iconType="material-community" placeholder="Tên hiển thị" secureText={false}
                        onChange={(text) => { this.setState({ name: text }) }} editable={false}
                        validate={[required]} initialValue="123"
                    />
                    <Field name="phonenumber" keyboardType="phone-pad" component={renderField} iconName="cellphone"
                        iconType="material-community" placeholder="Số điện thoại" secureText={false}
                        onChange={(text) => { this.setState({ phonenumber: text }) }} editable={false}
                        validate={[required, isNumber, isPhonenumber]}
                    />
                    <View style={styles.inputContainer}>
                        <DatePicker
                            style={styles.DatePicker}
                            date={this.state.apointmentDate}
                            mode="date"
                            placeholder="Ngày hẹn"
                            format="DD-MM-YYYY"
                            minDate={new Date().getDate() + 1}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 7,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    borderRadius: 15,
                                    height: 45,
                                    borderRadius: 15,
                                    borderWidth: 2,
                                    borderColor: '#0A6ADA',
                                    backgroundColor: 'rgba(255,255,255,0.7)',
                                    width: 250,
                                }
                            }}
                            onDateChange={(date) => { this.setState({ apointmentDate: date }) }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon
                            name="alarm"
                            type="material-community"
                            color='black'
                            size={32}
                            iconStyle={styles.inputIcon}
                        ></Icon>
                        <DatePicker
                            style={styles.DatePicker}
                            date={this.state.apointmentTime}
                            mode="time"
                            placeholder="Giờ hẹn"
                            format="HH:mm"
                            customStyles='dateInput'
                            showIcon={false}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 7,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    borderRadius: 15,
                                    height: 45,
                                    borderRadius: 15,
                                    borderWidth: 2,
                                    borderColor: '#0A6ADA',
                                    backgroundColor: 'rgba(255,255,255,0.7)',
                                    width: 250,
                                }
                            }}
                            onDateChange={(time) => { this.setState({ apointmentTime: time }) }}
                        />
                    </View>
                    <TouchableOpacity style={styles.btnRegister} onPress={handleSubmit(this.submit)}>
                        <Text style={styles.textBtn}>Đặt lịch</Text>
                    </TouchableOpacity>
                    <View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

let AppointmentForm = reduxForm({
    form: 'createAppointment',
    enableReinitialize: true,
    destroyOnUnmount: false,
    // keepDirtyOnReinitialize: true,
    // forceUnregisterOnUnmount: true
})(CreateAppointmentScreen);
AppointmentForm = connect(
    state => ({
        initialValues: state.initialValue.data, // pull initial values from account reducer
        customerInfor: state.loadCustomer.customerInfor,
        token: state.login.token
    }),
    { load: loadAccount } // bind account loading action creator
)(AppointmentForm);
export default AppointmentForm;
//#25345D
//#0A6ADA
//#27CDCB
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f1f0f0',
    },
    backIcon: {
        position: "absolute",
        top: 10,
        left: 20,
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
    logoText: {
        fontSize: 30,
        color: '#25345D',
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 15,
        fontSize: 16,
        paddingLeft: 65,
        borderWidth: 2,
        borderColor: '#0A6ADA',
        backgroundColor: 'rgba(255,255,255,0.7)',
        color: 'black',
    },
    inputIcon: {
        flexDirection: 'column',
        position: 'absolute',
        left: 7,
        paddingBottom: 5,
    },
    inputContainer: {
        width: WIDTH - 25,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 1,
        paddingTop: 5,
    },
    btnRegister: {
        width: WIDTH - 170,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#0A6ADA',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 85
    },
    textBtn: {
        color: 'white',
        textAlign: "center",
        fontSize: 16,
    },
    radioName: {
        marginTop: 7,
        fontSize: 16,
        color: 'gray'
    },
    genderIcon: {
        position: "relative",
        top: 5,
        left: 5,
        color: 'gray',
    },
    DatePicker: {
        width: WIDTH - 55,
        height: 45,
        backgroundColor: 'rgba(255,255,255,0.7)',
    }
})