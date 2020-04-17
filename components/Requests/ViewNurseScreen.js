import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TextInput, ScrollView, TouchableOpacity, ImageBackground} from 'react-native';
import {Icon} from 'react-native-elements';
import {convertDateTimeToDate} from './../Common/CommonFunction'
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';

export default class ViewNurseScreen extends Component {    
    constructor(props) {
        super(props)
        this.state = {
            id:this.props.route.params.id? this.props.route.params.id: '1',
            name: this.props.route.params.name? this.props.route.params.name: '',
            dob: this.props.route.params.dob? this.props.route.params.dob: '',
            phoneNumber: this.props.route.params.phoneNumber? this.props.route.params.phoneNumber: '',
            address: this.props.route.params.address? this.props.route.params.address: '',
            gender: this.props.route.params.gender? this.props.route.params.gender: '',
            email: this.props.route.params.email? this.props.route.params.email: '',
            image: this.props.route.params.image? this.props.route.params.image: '',   
        };
    }

    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps.route.params !== this.props.route.params) {
            this.setState(previousState => ({ 
                id:this.props.route.params.id? this.props.route.params.id: '1',
                name: this.props.route.params.name? this.props.route.params.name: '',
                dob: this.props.route.params.dob? this.props.route.params.dob: '',
                phoneNumber: this.props.route.params.phoneNumber? this.props.route.params.phoneNumber: '',
                address: this.props.route.params.address? this.props.route.params.address: '',
                gender: this.props.route.params.email? this.props.route.params.email: '',
                image: this.props.route.params.image? this.props.route.params.image: '',   
            }));
        }
    }


    render(){
        return(
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
            >
               {/* <View> */}
                <ScreenTopMenuBack navigation={this.props.navigation}></ScreenTopMenuBack>
                <View>
                    <View style={styles.logoContainer}>
                        <ImageBackground
                            source={{ uri: this.state.image }}
                            style={styles.logo} >
                            
                        </ImageBackground>
                    </View>
                </View>
                <View style={styles.textContainer}>                    
                    <Text style={styles.textInfor} >Tên hiển thị:  {this.state.name}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textInfor} >Số điện thoại: {this.state.phoneNumber}</Text>
                </View>
                <View style={styles.dobGenderContainer}>
                    <View style={styles.dobContainer}>
                        <Text style={styles.textInfor} >Ngày sinh: {convertDateTimeToDate(this.state.dob)}</Text>
                    </View>
                    <View style={styles.genderContainer}>
                        <Text style={styles.textInfor} >Giới tính: {this.state.gender? "Nữ" : "Nam"}</Text>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textInfor} >Địa chỉ: {this.state.address}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textInfor} >Email: {this.state.email}</Text>
                </View>
                {/* <View style={styles.buttonContainer}>  
                    <View/>                  
                    <TouchableOpacity style={styles.btnConfirm}
                        onPress={() => this.props.navigation.navigate('ChangePassword')}
                    >
                        <Text style={styles.textBtn}>Quay lại</Text>
                    </TouchableOpacity>
                </View> */}
                
                {/* <ScreenBottomMenu {...this.props}></ScreenBottomMenu> */}
                </ScrollView>
        );
    }
}

const { width: WIDTH } = Dimensions.get('window')

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
        flex: 45,
        borderWidth: 1,
        width: WIDTH - 55,
        height: 45,
        justifyContent: 'center',
        paddingLeft: 10,
        marginLeft: 10,
        marginRight: 30,
    },
    textInfor: {
        fontSize: 16,
    },
    buttonContainer: {
        marginLeft: 20,
        width: WIDTH-40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonView: {
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

});