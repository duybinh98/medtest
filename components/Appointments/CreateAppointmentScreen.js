import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-native-datepicker';
import { CommonActions } from '@react-navigation/native';
import {getApiUrl, convertDateAndTimeToDateTime} from './../Common/CommonFunction';

//validate conditions
const required = values => values ? undefined : 'Bắt buộc';
const isNumber = values => values && isNaN(Number(values)) ? 'Phải nhập số' : undefined;
const isPhonenumber = values => values && values.length == 10 ? undefined : 'Phải có 10 số';

//Field input for redux-form
const renderField = ({
    iconName, iconType, keyboardType, meta: { touched, error, warning }, secureText,
    input: { onChange, ...restInput }, placeholder
}) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.inputContainer}>
                <Icon
                    name={iconName}
                    type={iconType}
                    color='black'
                    size={32}
                    iconStyle={styles.inputIcon}
                ></Icon>
                <TextInput style={styles.input} placeholder={placeholder} secureTextEntry={secureText}
                    keyboardType={keyboardType} onChangeText={onChange} {...restInput} autoCapitalize='none'
                ></TextInput>
            </View>
            {touched && ((error && <Text style={{ color: 'red', paddingLeft: 35 }}>{error}</Text>) ||
                (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))}
        </View>
    );
}

const { width: WIDTH } = Dimensions.get('window')

class CreateAppointmentScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // customerId: this.props.route.params.customerId ? this.props.route.params.customerId : '-1',
            customerId: '1',
            name: '',
            phonenumber: '',
            dob: '',
            apointmentDate: '',
            apointmentTime: '',
            customerInformation: this.props.route.params.customerInformation ? this.props.route.params.customerInformation : '-1',
        };
        this.submit = this.submit.bind(this)
    }
    submit = values => {        
        fetch(getApiUrl()+'/appointments/create', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({            
            meetingTime: convertDateAndTimeToDateTime(this.state.apointmentDate,this.state.apointmentTime),
            customerID: this.state.customerId,
        }),
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.props.navigation.dispatch(
                    CommonActions.navigate({
                        name: 'AppointmentDetailScreen',
                        params: {
                            appointment_userName: this.state.customerInformation.name,
                            phonenumber: this.state.customerInformation,
                            dob: this.state.customerInformation,
                            appointment_date: this.state.apointmentDate,
                            appointment_time: this.state.apointmentTime,
                            backScreen: 'HomeScreen',
                        },
                    })
                )
            },
            (error) => {
            this.setState({                
                error
            });
            Alert.alert("hi"+error);
            }
        );
        
        
        
        
        
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <View style={styles.background}>
                <ScrollView>
                    <ScreenTopMenuBack navigation={this.props.navigation} backScreen='HomeScreen'></ScreenTopMenuBack>
                    <View>
                        <View style={styles.logoContainer}>
                            <Text style={styles.logoText}>Đặt lịch khám</Text>
                        </View>
                    </View>
                    <Field name="username" keyboardType="default" component={renderField} iconName="rename-box"
                        iconType="material-community" placeholder="Tên hiển thị" secureText={false}
                        onChange ={(text) => {this.setState({name : text})}}
                        validate={[required]}
                    />
                    <Field name="phonenumber" keyboardType="phone-pad" component={renderField} iconName="cellphone"
                        iconType="material-community" placeholder="Số điện thoại" secureText={false}
                        onChange ={(text) => {this.setState({phonenumber : text})}}
                        validate={[required, isNumber, isPhonenumber]}
                    />
                    <View style={styles.inputContainer}>
                        <DatePicker
                            style={styles.DatePicker}
                            date={this.state.dob}
                            mode="date"
                            placeholder="Ngày sinh"
                            format="DD-MM-YYYY"
                            minDate="01-01-1900"
                            maxDate={new Date()}
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
                            onDateChange={(date) => { this.setState({ dob: date }) }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <DatePicker
                            style={styles.DatePicker}
                            date={this.state.apointmentDate}
                            mode="date"
                            placeholder="Ngày hẹn"
                            format="DD-MM-YYYY"
                            minDate={new Date()}
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
                        <DatePicker
                            style={styles.DatePicker}
                            date={this.state.apointmentTime}
                            mode="time"
                            placeholder="Giờ hẹn"
                            format="HH:mm"
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

const AppointmentForm = reduxForm({
    form: 'createAppointment',
})(CreateAppointmentScreen);
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
    nameHeader: {
        alignItems: "center",
        backgroundColor: '#25345D',
    },
    nameText: {
        margin: 10,
        fontSize: 25,
        color: 'white',
    },
    logoContainer: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 10
    },
    logoText: {
        fontSize: 40,
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
        position: 'absolute',
        left: 7,
    },
    inputContainer: {
        width: WIDTH - 25,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        backgroundColor: 'white'
    },
    btnRegister: {
        width: WIDTH - 170,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#0A6ADA',
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