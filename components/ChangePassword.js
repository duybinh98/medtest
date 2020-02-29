import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Button, Icon } from 'react-native-elements';
import ScreenTopMenu from './ScreenTopMenu';



const { width: WIDTH } = Dimensions.get('window')

export default class ChangePassword extends Component {
    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <ScreenTopMenu></ScreenTopMenu>
                <View>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>Đổi mật khẩu</Text>
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
                        placeholder={'Mật khẩu cũ'}
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
                        placeholder={'Mật khẩu mới'}
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
                        placeholder={'Xác nhận mật khẩu mới'}
                        underlineColorAndroid='transparent'
                    />
                </View>
                <TouchableOpacity style={styles.btnRsPassword}>
                    <Text style={styles.textBtn}>Xác nhận đổi mật khẩu</Text>
                </TouchableOpacity>
                <View>
                </View>
            </ScrollView>
        );
    }
}
//#25345D
//#0A6ADA
//#27CDCB
const styles = StyleSheet.create({
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