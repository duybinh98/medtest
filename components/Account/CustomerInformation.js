import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';

const { width: WIDTH } = Dimensions.get('window')
export default class ForgottenPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '2',
            name: 'Nguyễn Văn A',
            dob: '01/01/1970',
            phone: '0123456789',
            gender: 'Nữ',
            address: 'Số 123 đường abc, xyz',
            email: '123@123.com',
            image: 'https://getdrawings.com/free-icon/react-icon-69.png',
            districtCode: null,
            // cityCode: null,
            townCode: null,            
        };
    }

    componentDidMount() {
        this.getApiData();
    }

    getApiData() {
        fetch("http://192.168.1.11:8080/users/customers/detail/"+this.state.id)
        .then(res => res.json())
        .then(
            (result) => {
            this.setState(previousState => ({
                isLoaded: true,
                name: result.name,
                address: result.address,
                email: result.email,
                phone: result.phonenumber,
                image: result.image,
                districtCode: result.districtCode,
                cityCode: result.cityCode,
                townCode: result.townCode,
                dob: result.dob.substring(0,10),
                gender: result.gender,

            }));
            },            
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            }
        )
    }

    render() {
        const { gender } = this.state;
        return (
            <ScrollView style={{ flex: 1 }}>
                <ScreenTopMenuBack navigation={this.props.navigation} backScreen='HomeScreen'></ScreenTopMenuBack>
                <View>
                    <View style={styles.logoContainer}>
                        <ImageBackground
                            source={{ uri: this.state.image }}
                            style={styles.logo} >
                            <TouchableOpacity><Icon
                                name='camera'
                                type='material-community'
                                color='gray'
                                size={32}
                                iconStyle={styles.imageIcon}
                                onPress={() => console.log('hello')}
                            ></Icon></TouchableOpacity>
                        </ImageBackground>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textInfor} >Tên hiển thị:  {this.state.name}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textInfor} >Số điện thoại: {this.state.phone}</Text>
                </View>
                <View style={styles.dobGenderContainer}>
                    <View style={styles.dobContainer}>
                        <Text style={styles.textInfor} >Ngày sinh: {this.state.dob}</Text>
                    </View>
                    <View style={styles.genderContainer}>
                        <Text style={styles.textInfor} >Giới tính: {this.state.gender?"Nữ": "Nam"}</Text>
                    </View>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.textInfor} >Địa chỉ: {this.state.address}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textInfor} >Email: {this.state.email}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.btnConfirm}
                    onPress={() => this.props.navigation.dispatch(
                        CommonActions.navigate({
                            name: 'UpdateInformation',
                            params: {                 
                                name: this.state.name,
                                address: this.state.address,
                                email: this.state.email,
                                phone: this.state.phonenumber,
                                image: this.state.image,
                                districtCode: this.state.districtCode,
                                cityCode: this.state.cityCode,
                                townCode: this.state.townCode,
                                dob: this.state.dob,
                                gender: this.state.gender,
                            },
                        })
                    )  }
                    >
                        <Text style={styles.textBtn}>Chỉnh sửa thông tin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnConfirm}
                        onPress={() => this.props.navigation.navigate('ChangePassword')}
                    >
                        <Text style={styles.textBtn}>Đổi mật khẩu</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }
}


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
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 20
    },
    logoText: {
        fontSize: 30,
        color: '#25345D',
    },
    textContainer: {
        marginTop: 10,
        borderWidth: 1,
        width: WIDTH - 55,
        height: 45,
        marginHorizontal: 25,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    dobGenderContainer: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 10,
    },
    dobContainer: {
        flex: 70,
        borderWidth: 1,
        width: WIDTH - 55,
        height: 45,
        justifyContent: 'center',
        paddingLeft: 10,
        marginLeft: 25,
    },
    genderContainer: {
        flex: 40,
        borderWidth: 1,
        width: WIDTH - 55,
        height: 45,
        justifyContent: 'center',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 30,
    },
    textInfor: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btnConfirm: {
        width: 130,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#0A6ADA',
        justifyContent: 'center',
        marginTop: 30,
    },
    textBtn: {
        color: 'white',
        textAlign: "center",
        fontSize: 16,
    },
    imageIcon: {
        position: 'relative',
        top: 92,
        left: 45,
    },
})