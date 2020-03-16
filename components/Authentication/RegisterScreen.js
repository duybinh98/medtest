import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import ScreenTopMenu from './../Common/ScreenTopMenu';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-native-datepicker';
import { CommonActions } from '@react-navigation/native';

//validate conditions
const required = values => values ? undefined : 'Bắt buộc';
const isNumber = values => values && isNaN(Number(values)) ? 'Phải nhập số' : undefined;
const isPhonenumber = values => values && values.length == 10 ? undefined : 'Phải có 10 số';
const isEmail = values =>
    values && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values) ? 'Email không hợp lệ' : undefined;
const isWeakPassword = values => values && values.length == 6 ? undefined : 'Mật khẩu phải có 6 kí tự';

//Field textInput for redux-form
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

class RegisterScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phonenumber: '',
            email: '',
            dob: '',
            password: '',
            gender: 'Nữ',
        };
        this.submit = this.submit.bind(this)
    }
    submit = values => {
        if (values.cfPassword !== values.password) {
            alert("Xác nhận mật khẩu không đúng!")
        } else {
            this.props.navigation.dispatch(
                CommonActions.navigate({
                    name: 'LoginScreen',
                    params: {
                        name: this.state.name,
                        phonenumber: this.state.phonenumber,
                        email: this.state.email,
                        dob: this.state.dob,
                        password: this.state.password,
                        gender: this.state.gender,
                    },
                })
            )
        }
    }

    render() {
        const { handleSubmit } = this.props;
        const { gender } = this.state;
        return (
            <View style={styles.background}>
                <ScrollView>
                    <ScreenTopMenu></ScreenTopMenu>
                    <View>
                        <View style={styles.logoContainer}>
                            <Text style={styles.logoText}>Đăng ký</Text>
                        </View>
                    </View>
                    <Field name="username" keyboardType="default" component={renderField} iconName="rename-box"
                        iconType="material-community" placeholder="Tên hiển thị" secureText={false}
                        onChange={(text) => { this.setState({ name: text }) }}
                        validate={[required]}
                    />
                    <Field name="phonenumber" keyboardType="phone-pad" component={renderField} iconName="cellphone"
                        iconType="material-community" placeholder="Số điện thoại" secureText={false}
                        onChange={(text) => { this.setState({ phonenumber: text }) }}
                        validate={[required, isNumber, isPhonenumber]}
                    />
                    <Field name="email" keyboardType="email-address" component={renderField} iconName="email-outline"
                        iconType="material-community" placeholder="Email" secureText={false}
                        onChange={(text) => { this.setState({ email: text }) }}
                        validate={[required, isEmail]}
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
                    <View style={styles.radioGroup} >
                        <View style={styles.genderContainer}>
                            <Icon
                                name='human-male-female'
                                type='material-community'
                                color='black'
                                size={32}
                                iconStyle={styles.genderIcon}
                            ></Icon>
                            <View style={styles.RadioButton}>
                                <RadioButton
                                    value="Male"
                                    checked={true}
                                    status={gender === 'Nam' ? 'checked' : 'unchecked'}
                                    onPress={() => { this.setState({ gender: 'Nam' }); }}
                                />
                                <Text style={styles.radioName}>Nam</Text>
                                <RadioButton
                                    value="Female"
                                    status={gender === 'Nữ' ? 'checked' : 'unchecked'}
                                    onPress={() => { this.setState({ gender: 'Nữ' }); }}
                                />
                                <Text style={styles.radioName}>Nữ</Text>
                            </View>
                        </View>
                    </View>
                    <Field name="password" keyboardType="default" component={renderField} iconName="lock-question"
                        iconType="material-community" placeholder="Mật khẩu" secureText={true}
                        onChange={(text) => { this.setState({ password: text }) }}
                        validate={[required, isWeakPassword]}
                    />
                    <Field name="cfPassword" keyboardType="default" component={renderField} iconName="lock-question"
                        iconType="material-community" placeholder="Xác nhận mật khẩu" secureText={true}
                        validate={[required, isWeakPassword]}
                    />
                    <TouchableOpacity style={styles.btnRegister} onPress={handleSubmit(this.submit)}>
                        <Text style={styles.textBtn}>Đăng ký</Text>
                    </TouchableOpacity>
                    <View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const RegisterForm = reduxForm({
    form: 'register',
})(RegisterScreen);
export default RegisterForm;
//#25345D
//#0A6ADA
//#27CDCB
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f1f0f0',
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
    radioGroup: {
        width: WIDTH - 25,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        backgroundColor: 'white'
    },
    genderContainer: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "flex-start",
        borderWidth: 2,
        borderColor: '#0A6ADA',
        backgroundColor: 'rgba(255,255,255,0.7)',
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
    RadioButton: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingTop: 2,
    },
    DatePicker: {
        width: WIDTH - 55,
        height: 45,
        backgroundColor: 'rgba(255,255,255,0.7)',
    }
})