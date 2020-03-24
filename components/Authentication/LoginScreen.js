import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import ScreenTopMenu from './../Common/ScreenTopMenu';
import { Field, reduxForm } from 'redux-form';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
// import action from '../Store/Action/actions';
import { login } from '../Store/Reducers/LoginReducer';
// import { getApiUrl } from './../Common/CommonFunction';
import { loadCustomerInfor } from '../Store/Reducers/LoadInforReducer';

//validate conditions
const required = value => value ? undefined : 'Required';
const isNumber = value => value && isNaN(Number(value)) ? 'Must be phone number' : undefined;
const isPhonenumber = value => value && value.length == 10 ? undefined : 'Must be 10 digits';
const isWeakPassword = value => value && value.length > 6 ? undefined : 'Mật khẩu phải có 6 kí tự';

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

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            password: '',
            customerInfo: {
                "id": 1,
                "phoneNumber": "0123456789",
                "name": "Phạm Lê Quỳnh La",
                "dob": "1998-12-13T00:00:00.000+0000",
                "address": "1 Nguyễn Chí Thanh",
                "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
                "active": 0,
                "email": "lamplq@email.com",
                "role": "CUSTOMER",
                "gender": 1,
                "image": "https://www.kindpng.com/picc/m/10-104902_simple-user-icon-user-icon-white-png-transparent.png",
                "townCode": null,
                "districtCode": null
            },
        };
        this.submit = this.submit.bind(this)
    }
    submit = value => {
        let { phoneNumber, password } = this.state;
        this.props.login(phoneNumber, password);
        // callApiCustomerInfo = async () => {
        //     fetch(getApiUrl()+"/users/customers/detail/"+ "2")
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //         this.setState(previousState => ({
        //             customerInfo: result,
        //         }));
        //         },            
        //         (error) => {
        //             console.log(error)
        //         }
        //     )   
        // }
        this.props.load(this.state.customerInfo);
        this.props.navigation.dispatch(
            CommonActions.navigate({
                name: 'CustomerInformation',
                params: {
                    phonenumber: this.state.phoneNumber,
                    password: this.state.password,
                },
            })
        )
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <ScrollView style={{ flex: 1 }}>
                <ScreenTopMenu {...this.props} ></ScreenTopMenu>
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
                    onChange={(text) => { this.setState({ phoneNumber: text }) }}
                    validate={[required, isNumber, isPhonenumber]}
                />
                <Field name="password" keyboardType="default" component={renderField} iconName="lock-question"
                    iconType="material-community" placeholder="Mật khẩu" secureText={true}
                    onChange={(text) => { this.setState({ password: text }) }}
                    validate={[required, isWeakPassword]}
                />
                <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit(this.submit)}>
                    <Text style={styles.textBtn}>Đăng nhập</Text>
                </TouchableOpacity>
                <View style={styles.textLinkView} >
                    <Text
                        style={styles.textLink}
                        onPress={() => this.props.navigation.navigate('ResetPasswordScreen')}
                    >Quên mật khẩu?</Text>
                </View>
                <View style={styles.textLinkView} >
                    <Text
                        style={styles.textLink}
                        onPress={() => this.props.navigation.navigate('RegisterScreen')}
                    >Đăng ký ngay</Text>
                </View>
            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoginPending: state.isLoginPending,
        isLoginSuccess: state.isLoginSuccess,
        LoginError: state.LoginError,
        customerInfor: state.loadCustomer.customerInfor,
    };
}
const mapStateToDispatch = (dispatch) => {
    return {
        load: (customerInfor) => dispatch(loadCustomerInfor(customerInfor)),
        login: (phoneNumber, password) => dispatch(login(phoneNumber, password))
    };
}
const LoginForm = reduxForm({
    form: 'login',
})(LoginComponent);
export default connect(mapStateToProps, mapStateToDispatch)(LoginForm);

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