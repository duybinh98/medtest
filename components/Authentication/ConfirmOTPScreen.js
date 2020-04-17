import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import TopMenuOutside from '../Common/TopMenuOutside';
import { Field, reduxForm } from 'redux-form';
import { getApiUrl, convertDateTimeToDate, convertDateToDateTime } from './../Common/CommonFunction';
import renderField from '../../Validate/RenderField';


const required = values => values ? undefined : 'Bắt buộc';
const isNumber = values => values && isNaN(Number(values)) ? 'Phải nhập số' : undefined;
const isOTP = values => values && values.length == 6 ? undefined : 'Phải có 6 số';

const { width: WIDTH } = Dimensions.get('window')

class ConfirmOPTScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.route.params.name,
            phonenumber: this.props.route.params.phonenumber,
            email: this.props.route.params.email,
            dob: this.props.route.params.dob,
            password: this.props.route.params.password,
            gender: this.props.route.params.gender,
            backScreen: this.props.route.params.backScreen,
            otp: '',
        };
    }

    resendOTP = value => {
        fetch(getApiUrl() + '/users/resend-otp', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: this.state.phonenumber,
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.messageSent == true) {
                        Alert.alert(
                            'Gửi lại OTP',
                            result.message,
                        )
                    } else {
                        Alert.alert(
                            'Lỗi gửi lại OTP',
                            result.message,
                        )
                    }
                },
                (error) => {
                    this.setState({
                        error
                    });
                    Alert.alert(
                        'Lỗi gửi lại OTP',
                        result.message,
                    )
                }
            )
            ;
    }

    submit = values => {

        fetch(getApiUrl() + '/users/valid-phone-otp', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                otp: this.state.otp,
                name: this.state.name,
                phoneNumber: this.state.phonenumber,
                email: this.state.email,
                dob: convertDateToDateTime(this.state.dob),
                gender: this.state.gender === "Nữ" ? '0' : '1',
                password: this.state.password,
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.valid == true) {
                        Alert.alert(
                            'Xác nhận OTP',
                            result.message,
                        )
                        this.props.navigation.dispatch(
                            CommonActions.navigate({
                                name: 'LoginScreen',
                                params: {
                                },
                            })
                        )
                    } else {
                        Alert.alert(
                            'Lỗi xác nhận OTP',
                            result.message,
                        )
                    }
                },
                (error) => {
                    console.log(error)
                }
            );
    }


    render() {
        const { handleSubmit } = this.props;
        debugger;
        const abc = this.props.route.params.name;
        const a = this.state.name;
        return (
            <View style={styles.background}>
                <ScrollView>
                    <TopMenuOutside navigation={this.props.navigation} backScreen={'LoginScreen'}></TopMenuOutside>
                    <View>
                        <View style={styles.titleArea}>
                            <Text style={styles.logoText}>Xác nhận OTP</Text>
                        </View>
                    </View>
                    <Field name="otp" keyboardType="phone-pad" component={renderField} iconName="lock-question"
                        iconType="material-community" placeholder="Nhập mã OTP" secureText={false}
                        onChange={(text) => { this.setState({ otp: text }) }}
                        validate={[required, isNumber, isOTP]}
                    />
                    <TouchableOpacity style={styles.buttonConfirm}
                        onPress={handleSubmit(this.submit)}
                    >
                        <Text style={styles.textBtn}>Xác nhận</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonView}
                            onPress={() => {
                                this.state.backScreen ? this.props.navigation.navigate(this.state.backScreen) : this.props.navigation.goBack();
                            }}
                        >
                            <Text style={styles.textBtn}>Hủy đăng ký</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonView}
                            onPress={this.resendOTP}
                        >
                            <Text style={styles.textBtn}>Gửi lại OTP</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const ConfirmOPTForm = reduxForm({
    form: 'confirmOTP',
})(ConfirmOPTScreen);
export default ConfirmOPTForm;
//#25345D
//#0A6ADA
//#27CDCB
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f1f0f0',
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
    // btnResetPassword: {
    //     width: WIDTH - 170,
    //     height: 45,
    //     borderRadius: 5,
    //     backgroundColor: '#0A6ADA',
    //     justifyContent: 'center',
    //     marginTop: 10,
    //     marginHorizontal: 85
    // },
    buttonContainer: {
        marginLeft: 20,
        width: WIDTH - 40,
        height: 300,
        // height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        // backgroundColor: 'red'
    },
    buttonConfirm: {
        marginTop: 20,
        width: WIDTH - 80,
        height: 45,
        borderRadius: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#0A6ADA',
        paddingBottom: 3,
        marginHorizontal: 40
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