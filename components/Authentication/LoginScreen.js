import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';

export default class abc extends Component {
    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                <View>
                    <View style={styles.logoContainer}>
                        <Image
                            source={{ uri: 'https://getdrawings.com/free-icon/react-icon-69.png' }}
                            style={styles.logo}
                        ></Image>
                        <Text style={styles.logoText}>Đăng nhập</Text>
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
                <TouchableOpacity style={styles.btnLogin}>
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
}
const { width: WIDTH } = Dimensions.get('window')
//#25345D
//#0A6ADA
//#27CDCB
const styles = StyleSheet.create({
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
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