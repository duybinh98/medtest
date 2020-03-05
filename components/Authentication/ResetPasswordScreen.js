import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button, Icon } from 'react-native-elements';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';



const { width: WIDTH } = Dimensions.get('window')

export default class ForgottenPassword extends Component {
    render() {
        return (
            <View>
                <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                <View>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>Quên mật khẩu</Text>
                    </View>
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
                <TouchableOpacity style={styles.btnRsPassword}>
                    <Text style={styles.textBtn}>Thay đổi mật khẩu</Text>
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
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 30
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
        color: 'rgba(255,255,255,0.7)',
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
    btnRsPassword: {
        width: WIDTH - 170,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#0A6ADA',
        justifyContent: 'center',
        marginTop: 40,
        marginHorizontal: 85
    },
    textBtn: {
        color: 'white',
        textAlign: "center",
        fontSize: 16,
    },
})