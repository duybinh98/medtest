import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import ScreenTopMenu from './../Common/ScreenTopMenu';
import { Field, reduxForm } from 'redux-form';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { login } from '../Store/Reducers/LoginReducer';
import { loadCustomerInfor } from '../Store/Reducers/LoadInforReducer';
import { load as loadAccount } from '../Store/Reducers/InitialValue';
import renderField from '../../Validate/RenderField';

//validate conditions
const required = value => value ? undefined : 'Bắt buộc';
const isNumber = value => value && isNaN(Number(value)) ? 'Phải nhập số điện thoại' : undefined;
const isPhonenumber = value => value && value.length == 10 ? undefined : 'Phải có 10 số';
const isWeakPassword = value => value && value.length >= 6 ? undefined : 'Mật khẩu phải có ít nhất 6 kí tự';

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            password: '',
            customerInfoFromLogin: this.props.customerInforReducer ? this.props.customerInforReducer : null,
            isLoginSuccess: this.props.isLoginSuccess
        };
        this.submit = this.submit.bind(this)
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                isLoginSuccess: this.props.isLoginSuccess
            })
        }
    }
    submit = value => {
        const { phoneNumber, password } = this.state;
        this.props.login(phoneNumber, password)
        let count = 0;

        var waitForIt = setInterval(() => {
            if (this.props.isLoginSuccess == true || count > 50) {
                clearInterval(waitForIt);
            }
            else console.log('wait')
            count += 1
        }, 100);
        setTimeout(() => {
            if (this.props.customerInfoFromLogin != null) {
                this.props.load(this.props.customerInfoFromLogin)
                if (this.props.customerInfoFromLogin.address === null) {
                    this.props.navigation.dispatch(
                        CommonActions.navigate({
                            name: 'UpdateAddress',
                            params: {
                            },
                        })
                    )
                } else {
                    this.props.navigation.dispatch(
                        CommonActions.navigate({
                            name: 'HomeScreen',
                            params: {
                                customerInfor: this.state.customerInfoFromLogin
                            },
                        })
                    )
                }
                this.props.reset();
            }
            else {
                console.log('error at screen ' + this.props.LoginError);
                console.log('error at screen aa' )
            }
        }
            , 10000)
        // 
    }
    render() {
        const { handleSubmit } = this.props;
        // // debugger;
        // const abc = this.props.customerInforReducer;
        // const a = this.state.customerInfoFromLogin;
        return (
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
            >
                {/* <ScreenTopMenu {...this.props} ></ScreenTopMenu> */}
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
        // initialValues: state.initialValue.data,
        isLoginPending: state.login.isLoginPending,
        isLoginSuccess: state.login.isLoginSuccess,
        LoginError: state.login.LoginError,
        customerInfoFromLogin: state.login.customerInfo,
        customerInforReducer: state.loadCustomer.customerInfor,
    };
}
const mapStateToDispatch = (dispatch) => {
    return {
        // loadInitValue: (data) => dispatch(loadAccount(data)),
        load: (customerInfor) => dispatch(loadCustomerInfor(customerInfor)),
        login: (phoneNumber, password) => dispatch(login(phoneNumber, password))
    };
}
const LoginForm = reduxForm({
    form: 'login',
    enableReinitialize: true,
})(LoginComponent);

export default connect(mapStateToProps, mapStateToDispatch)(LoginForm);

const { width: WIDTH } = Dimensions.get('window')
//#25345D
//#0A6ADA
//#27CDCB
const styles = StyleSheet.create({
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