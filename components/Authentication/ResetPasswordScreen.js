import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import { Field, reduxForm } from 'redux-form';
import {getApiUrl} from './../Common/CommonFunction'
import renderField from '../../Validate/RenderField';


const required = values => values ? undefined : 'Bắt buộc';
const isNumber = values => values && isNaN(Number(values)) ? 'Phải nhập số' : undefined;
const isPhonenumber = values => values && values.length == 10 ? undefined : 'Phải có 10 số';

const { width: WIDTH } = Dimensions.get('window')

class ResetPasswordScreen extends Component {    
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phonenumber: '',
        };
    }


    submit = values => {
    // alert(`Validation success. Values = ~${JSON.stringify(values)}`);
    console.log(values.phonenumber)
    console.log(values.phonenumber)
    console.log(values)
    
    fetch(getApiUrl()+'/users/forgot-password', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phoneNumber: values.phonenumber.toString(),
        }),
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                this.props.navigation.dispatch(
                    CommonActions.navigate({
                        name: 'LoginScreen',
                        params: {
                        },
                    })
                )
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
                    {/* <ScreenTopMenuBack navigation={this.props.navigation} backScreen={'LoginScreen'}></ScreenTopMenuBack> */}
                    <View>
                        <View style={styles.logoContainer}>
                            <Text style={styles.logoText}>Quên mật khẩu</Text>
                        </View>
                    </View>
                    <Field name="phonenumber" keyboardType="phone-pad" component={renderField} iconName="cellphone"
                        iconType="material-community" placeholder="Số điện thoại" secureText={false}
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