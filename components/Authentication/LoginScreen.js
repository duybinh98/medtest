import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import ScreenTopMenu from './../Common/ScreenTopMenu';
import { Field, reduxForm } from 'redux-form';

const required = value => value ? undefined : 'Required';
const isNumber = value => value && isNaN(Number(value)) ? 'Must be phone number' : undefined;
const isPhonenumber = value => value && value.length == 10 ? undefined : 'Must be 10 digits';
const isEmail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
const isWeakPassword = value => value && value.length > 6 ? undefined : 'Your password is weak!';


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
    alert(`Validation success. Values = ~${JSON.stringify(values)}`);
}

const LoginComponent = props => {
    const { handleSubmit } = props;
    return (
        <ScrollView style={{ flex: 1 }}>
            <ScreenTopMenu ></ScreenTopMenu>
            <View>
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: 'https://getdrawings.com/free-icon/react-icon-69.png' }}
                        style={styles.logo}
                    ></Image>
                    <Text style={styles.logoText}>Đăng nhập</Text>
                </View>
            </View>
            <Field name="phonenumber" keyboardType="phone-pad" component={renderField} iconName="cellphone"
                iconType="material-community" placeholder="Số điện thoại" secureText={false}
                validate={[required, isNumber, isPhonenumber]}
            />
            <Field name="password" keyboardType="default" component={renderField} iconName="lock-question"
                iconType="material-community" placeholder="Mật khẩu" secureText={true}
                validate={[required]}
                warn={isWeakPassword}
            />
            <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit(submit)}>
                <Text style={styles.textBtn}>Đăng nhập</Text>
            </TouchableOpacity>
            <View style={styles.textLinkView} >
                <Text
                    style={styles.textLink}
                    onPress={() => { alert("Change password") }}
                >Quên mật khẩu?</Text>
            </View>
            <View style={styles.textLinkView} >
                <Text
                    style={styles.textLink}
                    onPress={() => { alert("Signup") }}
                >Đăng ký ngay</Text>
            </View>
        </ScrollView>
    );
}

const LoginForm = reduxForm({
    form: 'login',
    // validate
})(LoginComponent);
export default LoginForm;
const { width: WIDTH } = Dimensions.get('window')
//#25345D
//#0A6ADA
//#27CDCB
const styles = StyleSheet.create({
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
    logo: {
        width: 120,
        height: 120,

    },
    logoContainer: {
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 20
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
        // color: 'rgba(255,255,255,0.7)',
        color: 'black',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 7,
        left: 35,
    },
    inputContainer: {      
        marginTop: 10
    },
    btnLogin: {
        width: WIDTH - 170,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#0A6ADA',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 85
    },
    textBtn: {
        color: 'white',
        textAlign: "center",
        fontSize: 16,
    },
    textLinkView: {
        marginHorizontal: 110,
    },
    textLink: {
        color: 'gray',
        marginTop: 20,
        textAlign: "center",
        textDecorationLine: 'underline',
        fontSize: 16,
    },

})