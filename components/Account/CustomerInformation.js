import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import { getApiUrl, convertDateTimeToDate, convertDateToDateTime } from './../Common/CommonFunction';
import { connect } from 'react-redux';
import { loadCustomerInfor } from '../Store/Reducers/LoadInforReducer';


const { width: WIDTH } = Dimensions.get('window')
class customerInformation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerInfor: null,
            customerId: this.props.customerInfor ? this.props.customerInfor.id : '-1',
            token: this.props.token ? this.props.token : null,
            // name: this.props.customerInfor ? this.props.customerInfor.name : '',
        };
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState(previousState => ({
                token: this.props.token,
                // customerInfor: this.props.route.params.customerInfor ? this.props.route.params.customerInfor : this.state.customerInfor
                customerInfor: this.props.customerInfor ? this.props.customerInfor : null
            }));
        }
    }
    componentDidMount() {
        this.callApiCustomerInfor();
    }
    callApiCustomerInfor() {
        fetch(getApiUrl() + '/users/customers/detail/' + this.state.customerId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token,
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.message) {
                        alert(result.message);
                    } else {
                        console.log(result)
                        this.setState(previousState => ({
                            customerInfor: result,
                        }));
                    }
                },
                (error) => {
                    console.log(error)
                }
            )

    }

    render() {
        const { gender } = this.state;
        const { abc } = this.props;
        return (
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <ScreenTopMenuBack navigation={this.props.navigation} backScreen='HomeScreen'></ScreenTopMenuBack>
                <View>
                    <View style={styles.logoContainer}>
                        <ImageBackground
                            source={{ uri: this.state.customerInfor ? this.state.customerInfor.image : '' }}
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
                    <Text style={styles.textInfor} >Tên hiển thị:  {this.state.customerInfor ? this.state.customerInfor.name : ""}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textInfor} >Số điện thoại:  {this.state.customerInfor ? this.state.customerInfor.phoneNumber : ""}</Text>
                </View>
                <View style={styles.dobGenderContainer}>
                    <View style={styles.dobContainer}>
                        <Text style={styles.textInfor} >Ngày sinh:  {this.state.customerInfor ? convertDateTimeToDate(this.state.customerInfor.dob) : ""}</Text>
                    </View>
                    <View style={styles.genderContainer}>
                        <Text style={styles.textInfor} >Giới tính: {this.state.customerInfor ? this.state.customerInfor.gender === 0 ? "Nữ" : "Nam" : ""}</Text>
                    </View>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.textInfor} >Địa chỉ: {this.state.customerInfor ? this.state.customerInfor.address : ""}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textInfor} >Email: {this.state.customerInfor ? this.state.customerInfor.email : ""}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.btnConfirm}
                        onPress={() => this.props.navigation.dispatch(
                            CommonActions.navigate({
                                name: 'UpdateInformation',
                                params: {
                                    customerInfo: this.state.customerInfor
                                },
                            })
                        )}
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
const mapStateToProps = (state) => {
    return {
        token: state.login.token,
        customerInfor: state.loadCustomer.customerInfor,
        isLoadSuccess: state.loadCustomer.isLoadSuccess,
        loadError: state.loadCustomer.LoadError
    };
}
const mapStateToDispatch = (dispatch) => {
    return {
        load: (customerInfor) => dispatch(loadCustomerInfor(customerInfor)),
    };
}

export default connect(mapStateToProps, mapStateToDispatch)(customerInformation);

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