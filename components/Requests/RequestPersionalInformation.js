import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';



const { width: WIDTH } = Dimensions.get('window')

export default class ForgottenPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'Nguyễn Văn A',
            address: 'Số 123 đường abc, xyz',
            date: '01/01/2020',
            freeTime: '7h30-8h30'
        };
    }
    render() {
        const { gender } = this.state;
        return (
            <ScrollView style={{ flex: 1 }}>
                <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                <View>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>Thông tin lấy mẫu</Text>
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
                        defaultValue={this.state.name}
                        onChangeText={
                            (text) => {
                                this.setState(
                                    (previousState) => {
                                        return {
                                            name: text
                                        };
                                    }
                                )
                            }
                        }
                    />
                    {this.state.name != '' ? null : (
                        <Text style={styles.errorMessage}>
                            * Tên không được để trống.
                        </Text>
                    )}
                </View>
                <View style={styles.inputContainer}>
                    <Icon
                        name='map-marker'
                        type='material-community'
                        color='black'
                        size={32}
                        iconStyle={styles.inputIcon}
                    ></Icon>
                    <TextInput
                        style={styles.input}
                        placeholder={'Địa chỉ'}
                        underlineColorAndroid='transparent'
                        defaultValue={this.state.address}
                        onChangeText={
                            (text) => {
                                this.setState(
                                    (previousState) => {
                                        return {
                                            address: text
                                        };
                                    }
                                )
                            }
                        }
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
                        defaultValue={this.state.date}
                        onChangeText={
                            (text) => {
                                this.setState(
                                    (previousState) => {
                                        return {
                                            date: text
                                        };
                                    }
                                )
                            }
                        }
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon
                        name='alarm'
                        type='material-community'
                        color='black'
                        size={32}
                        iconStyle={styles.inputIcon}
                    ></Icon>
                    <TextInput
                        style={styles.input}
                        placeholder={'Giờ hẹn'}
                        underlineColorAndroid='transparent'
                        defaultValue={this.state.freeTime}
                        onChangeText={
                            (text) => {
                                this.setState(
                                    (previousState) => {
                                        return {
                                            freeTime: text
                                        };
                                    }
                                )
                            }
                        }
                    />
                </View>
                <TouchableOpacity style={styles.btnConfirm} 
                    onPress={() => this.props.navigation.dispatch(
                        CommonActions.navigate({
                            name: 'RequestConfirmScreen',
                            params: {
                                name: this.state.name,
                                address: this.state.address,
                                date: this.state.date,
                                freeTime: this.state.freeTime,
                                selectedTest: this.props.route.params.selectedTest,     
                            },
                        })
                    )}>
                    <Text style={styles.textBtn}>Tiếp</Text>
                </TouchableOpacity>
                <View>
                </View>
                {/* <ScreenBottomMenu></ScreenBottomMenu> */}
            </ScrollView>
        );
    }
}


//#25345D
//#0A6ADA
//#27CDCB
const styles = StyleSheet.create({
    errorMessage: {
        color: 'red',
        textAlign: "center",
    },
    logoContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 20
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
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 7,
        left: 37,
    },
    inputContainer: {
        marginTop: 10
    },
    btnConfirm: {
        width: WIDTH - 200,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#0A6ADA',
        justifyContent: 'center',
        marginTop: 80,
        marginLeft: 155
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