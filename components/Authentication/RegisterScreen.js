import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import ScreenTopMenu from './../Common/ScreenTopMenu';


const { width: WIDTH } = Dimensions.get('window')

export default class ForgottenPassword extends Component {
    state = {
        checked: 'Male',
    };
    render() {
        const { checked } = this.state;
        return (
            <View>
                <ScreenTopMenu></ScreenTopMenu>
                <View>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>Đăng ký</Text>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Icon
                        name='rename-box'
                        type='material-community'
                        color='black'
                        size={32}
                        iconStyle={styles.inputIcon}
                    ></Icon>
                    <TextInput
                        style={styles.input}
                        placeholder={'Tên hiển thị'}
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon
                        name='cellphone'
                        type='material-community'
                        color='black'
                        size={32}
                        iconStyle={styles.inputIcon}
                    ></Icon>
                    <TextInput
                        style={styles.input}
                        placeholder={'Số điện thoại'}
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon
                        name='email-outline'
                        type='material-community'
                        color='black'
                        size={32}
                        iconStyle={styles.inputIcon}
                    ></Icon>
                    <TextInput
                        style={styles.input}
                        placeholder={'Email'}
                        underlineColorAndroid='transparent'
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon
                        name='calendar'
                        type='material-community'
                        color='black'
                        size={32}
                        iconStyle={styles.inputIcon}
                    ></Icon>
                    <TextInput
                        style={styles.input}
                        placeholder={'Ngày sinh'}
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={styles.radioGroup} >
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
                            status={checked === 'Male' ? 'checked' : 'unchecked'}
                            onPress={() => { this.setState({ checked: 'Male' }); }}
                        />
                        <Text style={styles.radioName}>Nam</Text>
                        <RadioButton
                            value="Female"
                            status={checked === 'Female' ? 'checked' : 'unchecked'}
                            onPress={() => { this.setState({ checked: 'Female' }); }}
                        />
                        <Text style={styles.radioName}>Nữ</Text>
                    </View>

                </View>
                <View style={styles.inputContainer}>
                    <Icon
                        name='lock-question'
                        type='material-community'
                        color='black'
                        size={32}
                        iconStyle={styles.inputIcon}
                    ></Icon>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder={'Mật khẩu'}
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon
                        name='lock-question'
                        type='material-community'
                        color='black'
                        size={32}
                        iconStyle={styles.inputIcon}
                    ></Icon>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder={'Xác nhận mật khẩu'}
                        underlineColorAndroid='transparent'
                    />
                </View>
                <TouchableOpacity style={styles.btnRegister}>
                    <Text style={styles.textBtn}>Đăng ký</Text>
                </TouchableOpacity>
                <View>
                </View>
            </View>
        );
    }
}
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
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 7,
        left: 37,
    },
    inputContainer: {
        marginTop: 7
    },
    btnRegister: {
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
    radioGroup: {
        width: WIDTH - 55,
        height: 45,
        marginTop: 10,
        flexDirection: 'row',
        marginHorizontal: 25,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#0A6ADA',
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingLeft: 10,
    },
    radioName: {
        marginTop: 7,
        fontSize: 16,
        color: 'gray'
    },
    genderIcon: {
        position: "absolute",
        top: 5,
        left: 0,
        color: 'gray',
    },
    RadioButton: {
        flexDirection: 'row',
        paddingLeft: 45,
        paddingTop: 2,
    }
})