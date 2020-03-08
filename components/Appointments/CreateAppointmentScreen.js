import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import ScreenTopMenu from './../Common/ScreenTopMenu';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-native-datepicker';
import { format } from 'date-fns';


const required = values => values ? undefined : 'Bắt buộc';
const isNumber = values => values && isNaN(Number(values)) ? 'Phải nhập số' : undefined;
const isPhonenumber = values => values && values.length == 10 ? undefined : 'Phải có 10 số';

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


const submit = values => {
    if (values.cfPassword !== values.password) {
        alert("Xác nhận mật khẩu không đúng!")
    } else {
        alert(`Validation success. Values = ~${JSON.stringify(values)}`);
    }
}

const { width: WIDTH } = Dimensions.get('window')

class CreateAppointmentScreen extends Component {
    state = {
        name: '',
        phonenumber: '',
        email: '',
        dob: '',
        apointmentDate: '',
        apointmentTime: '',
        password: '',
        checked: 'Male',
    };
    render() {
        const { handleSubmit } = this.props;
        const { checked } = this.state;
        return (
            <View style={styles.background}>
                <ScrollView>
                    <ScreenTopMenu></ScreenTopMenu>
                    <View>
                        <View style={styles.logoContainer}>
                            <Text style={styles.logoText}>Đặt lịch khám</Text>
                        </View>
                    </View>
                    <Field name="username" keyboardType="default" component={renderField} iconName="rename-box"
                        iconType="material-community" placeholder="Tên hiển thị" secureText={false}
                        // onChange ={(text) => {this.setState({username : text})}}
                        validate={[required]}
                    />
                    <Field name="phonenumber" keyboardType="phone-pad" component={renderField} iconName="cellphone"
                        iconType="material-community" placeholder="Số điện thoại" secureText={false}
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
                    <TouchableOpacity style={styles.btnRegister} onPress={handleSubmit(submit)}>
                        <Text style={styles.textBtn}>Đăng ký</Text>
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