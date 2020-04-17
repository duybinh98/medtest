import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import TopMenuOutside from './../Common/TopMenuOutside';
import { Field, reduxForm } from 'redux-form';
import { getApiUrl } from './../Common/CommonFunction'
import renderField from '../../Validate/RenderField';
import ScreenTopMenuBack from '../Common/ScreenTopMenuBack';


const required = values => values ? undefined : 'Bắt buộc';
const isNumber = values => values && isNaN(Number(values)) ? 'Phải nhập số' : undefined;
const isPhonenumber = values => values && values.length == 10 ? undefined : 'Phải có 10 số';

const { width: WIDTH } = Dimensions.get('window')

class ResetPasswordScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phonenumber: '',
        };
    }


    submit = values => {
        fetch(getApiUrl() + '/users/forgot-password', {
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
                    console.log('.' + result.changedSuccess + '.')
                    if (result.changedSuccess == true) {
                        Alert.alert(
                            'Lấy lại mật khẩu',
                            result.message,
                        )
                        this.props.navigation.dispatch(
                            CommonActions.navigate({
                                name: 'LoginScreen',
                                params: {
                                },
                            })
                        )
                        this.props.reset();
                    } else {
                        Alert.alert(
                            'Lỗi lấy lại mật khẩu',
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
        return (
            <View style={styles.background}>
                <ScrollView>
                    <TopMenuOutside navigation={this.props.navigation} backScreen={'LoginScreen'}></TopMenuOutside>
                    <View>
                        <View style={styles.titleArea}>
                            <Text style={styles.logoText}>Quên mật khẩu</Text>
                        </View>
                    </View>
                    <Field name="phonenumber" keyboardType="phone-pad" component={renderField} iconName="cellphone"
                        iconType="material-community" placeholder="Số điện thoại" secureText={false}
                        onChange={(text) => { this.setState({ phonenumber: text }) }}
                        validate={[required, isNumber, isPhonenumber]}
                    />
                    <TouchableOpacity style={styles.btnResetPassword} onPress={handleSubmit(this.submit)}>
                        <Text style={styles.textBtn}>Thay đổi mật khẩu</Text>
                    </TouchableOpacity>
                    <View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const ResetPasswordForm = reduxForm({
    form: 'resetPassword',
})(ResetPasswordScreen);
export default ResetPasswordForm;
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
        width: Dimensions.get('window').width - 30,
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
    btnResetPassword: {
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
})