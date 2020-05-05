import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import TopMenuFirstScreen from './../Common/TopMenuFirstScreen';
import { Field, reduxForm } from 'redux-form';
import { CommonActions } from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import { getApiUrl, convertDateTimeToDate, convertDateToDateTime } from './../Common/CommonFunction';
import { connect } from 'react-redux';
import { load as loadAccount } from '../Reducers/InitialValue';
import { login, logout } from '../Reducers/LoginReducer';
import { loadCustomerInfor } from '../Reducers/LoadInforReducer';

import renderField , {required, notContainSpecialCharacters} from '../../Validate/RenderField';

//Render combobox selected value
const _renderDistrictRow = rowData => {
    const { districtId, districtName } = rowData;
    return (
        <View>
            <Text style={{ fontSize: 18 }}>{`${districtName}`}</Text>
        </View>
    );
}
const _renderTownRow = rowData => {
    const { townName } = rowData;
    return (
        <View>
            <Text style={{ fontSize: 18 }}>{`${townName}`}</Text>
        </View>
    );
}

const { width: WIDTH } = Dimensions.get('window')

class UpdateAddress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerId: this.props.customerInfor ? this.props.customerInfor.id : '-1',
            selectTownList: [],
            address: '',
            districtCode: '',
            townCode: '',

            customerInfor: this.props.customerInforLoad ? this.props.customerInforLoad : null,

            townName: 'Chọn phường...',
            districtName: 'Chọn quận...',
            districtList: [],
            townList: [],
            disableDropdownTown: true,
            disabledButton: false,
        };
        this.submit = this.submit.bind(this)
        this._unsubscribeSiFocus = this.props.navigation.addListener('focus', e => {
            console.warn('focus signIn');
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        });
        this._unsubscribeSiBlur = this.props.navigation.addListener('blur', e => {
            console.warn('blur signIn');
            BackHandler.removeEventListener(
                'hardwareBackPress',
                this.handleBackButton,
            );
        });
    }

    handleBackButton = () => {
        Alert.alert(
            'Cảnh báo!',
            'Bạn có muốn tắt ứng dụng?',
            [{
                text: 'Hủy',
                onPress: () => { return null },
                style: 'cancel',
            },
            {
                text: 'Xác nhận',
                onPress: () => {
                    this.props.logout();
                    BackHandler.exitApp();
                }
            },
            ], {
            cancelable: false,
        },
        );
        return true;
    };
    componentWillUnmount() {
        this._unsubscribeSiFocus();
        this._unsubscribeSiBlur();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentDidMount = value => {
        this.props.navigation.addListener('focus', () => {
            this.resetScreen();
        });
        this.callApiGetDistrictCode();
        // this.callApiGetTownCode();
    }
    resetScreen() {
        this.setState({
            townName: 'Chọn phường...',
            districtName: 'Chọn quận...',
        })
        this.districtDropdown.select(-1);
        this.townDropdown.select(-1);
        this.props.reset();
    }
    callApiGetDistrictCode() {
        fetch(getApiUrl() + "/management/districts/district-town-list")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState(previousState => ({
                        districtList: result,
                    }));
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    _renderDistrictButtonText = rowData => {
        const { districtCode, districtName } = rowData;
        const { townCode, townName } = rowData.listTown[0];
        this.setState({
            districtName: districtName,
            districtCode: districtCode,
            townCode: townCode,
            townName: townName
        })
        this.townDropdown.select(-1);
        return `${districtName}`;
    }
    _renderTownButtonText = listTown => {
        const { townCode, townName } = listTown;
        this.setState({
            townName: townName,
            townCode: townCode
        })
        return `${townName}`;
    }
    submit = values => {
        if (this.state.districtName == 'Chọn quận...' || this.state.townName == 'Chọn phường...') {
            alert('Bạn phải chọn quận và phường!')
        } else {
            this.props.customerInforLoad.address = this.state.address;
            this.props.customerInforLoad.townCode = this.state.townCode;
            this.props.customerInforLoad.districtCode = this.state.districtCode;
            this.setState({
                customerInfor: this.props.customerInforLoad
            })
            this.callApi()

        }
    }
    skip = values => {
        this.resetScreen();
        this.props.navigation.dispatch(
            CommonActions.navigate({
                name: 'HomeScreen',
                params: {
                },
            })
        )
    }
    selectItem(id) {
        this.setState({
            disableDropdownTown: false,
            selectTownList: this.state.districtList[id].listTown,
        })
    }
    callApi = async () => {
        this.setState({
            disabledButton: true,
        })
        fetch(getApiUrl() + '/users/customers/detail/address/update/' + this.state.customerId, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token,
            },
            body: JSON.stringify({
                address: this.state.address,
                townCode: this.state.townCode,
                districtCode: this.state.districtCode
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        disabledButton: false,
                    })
                    if (result.success == false) {
                        if (result.message == 'Người dùng hiện tại đang bị khoá! Vui lòng liên hệ tới phòng khám để xử lý!') {
                            Alert.alert(
                                'Thông báo',
                                result.message,
                                [
                                    {
                                        text: 'Xác nhận',
                                        onPress: () => {
                                            this.resetScreen();
                                            this.props.logout();
                                            this.props.navigation.navigate('LoginScreen');
                                        },
                                    },
                                ],
                            );
                        } else {
                            Alert.alert(
                                'Lỗi thay ảnh',
                                result.message,
                            )
                        }
                    } else {
                        this.props.load(this.state.customerInfor),
                            this.props.navigation.dispatch(
                                CommonActions.navigate({
                                    name: 'HomeScreen',
                                    params: {
                                    },
                                })
                            )
                        this.resetScreen();
                        // this.props.loadCustomer(result)
                    }

                },
                (error) => {
                    console.log(error);
                }
            );
    }


    render() {
        debugger;
        const { handleSubmit } = this.props;

        return (
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <TopMenuFirstScreen navigation={this.props.navigation} ></TopMenuFirstScreen>
                {/* <ScreenTopMenuBack navigation={this.props.navigation} backScreen={'HomeScreen'}></ScreenTopMenuBack> */}
                <View>
                    <View style={styles.titleArea}>
                        <Text style={styles.logoText}>Cập nhật địa chỉ</Text>
                    </View>
                </View>
                <View style={styles.dropdownContainer}>
                    <ModalDropdown
                        ref={(ref) => this.districtDropdown = ref}
                        options={this.state.districtList}
                        renderSeparator={() => <View style={{ borderWidth: 0.5 }} />}
                        renderRow={_renderDistrictRow.bind(this)}
                        renderButtonText={(rowData) => this._renderDistrictButtonText(rowData)}
                        defaultValue={this.state.districtName}
                        textStyle={styles.dropdownText}
                        style={styles.dropdownButton}
                        showsVerticalScrollIndicator={false}
                        dropdownStyle={{ width: 220, borderWidth: 2, borderRadius: 5 }}
                        dropdownTextStyle={{ fontSize: 16 }}
                        onSelect={(value) => { this.selectItem(value) }}
                    />
                    <View style={{ position: "absolute", right: 30, top: 15 }}>
                        <Text style={{ fontSize: 20 }} >▼</Text>
                    </View>
                </View>
                <View style={styles.dropdownContainer}>
                    <ModalDropdown
                        ref={(ref) => this.townDropdown = ref}
                        disabled={this.state.disableDropdownTown}
                        options={this.state.selectTownList}
                        renderSeparator={() => <View style={{ borderWidth: 0.5 }} />}
                        renderRow={_renderTownRow.bind(this)}
                        renderButtonText={(listTown) => this._renderTownButtonText(listTown)}
                        defaultValue={this.state.townName}
                        textStyle={styles.dropdownText}
                        style={styles.dropdownButton}
                        showsVerticalScrollIndicator={false}
                        dropdownStyle={{ width: 220, borderWidth: 2, borderRadius: 5 }}
                        dropdownTextStyle={{ fontSize: 16 }}

                    />
                    <View style={{ position: "absolute", right: 30, top: 15 }}>
                        <Text style={{ fontSize: 20 }} >▼</Text>
                    </View>
                </View>
                <Field name="address" keyboardType="default" component={renderField} iconName="map-marker"
                    iconType="material-community" placeholder="Địa chỉ" secureText={false}
                    onChange={(text) => { this.setState({ address: text }) }}
                    validate={[required, notContainSpecialCharacters]}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.btnConfirm} onPress={this.skip}>
                        <Text style={styles.textBtn}>Bỏ qua</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnConfirm} disabled={this.state.disabledButton} onPress={handleSubmit(this.submit)}>
                        <Text style={styles.textBtn}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>

                <View>
                </View>
            </ScrollView>
        );
    }
}


const mapStateToDispatch = (dispatch) => {
    return {
        load: (data) => dispatch(loadAccount(data)),
        loadCustomerInfor: (customerInfor) => dispatch(loadCustomerInfor(customerInfor)),
        logout: () => dispatch(logout()),
    };
}
let UpdateAddressForm = reduxForm({
    form: 'UpdateAddress',
    enableReinitialize: true,
})(UpdateAddress);

UpdateAddressForm = connect(
    state => ({
        token: state.login.token,
        customerInforLoad: state.loadCustomer.customerInfor,
        customerInfor: state.login.customerInfo
    }),
    mapStateToDispatch
)(UpdateAddressForm);
export default UpdateAddressForm;


//#25345D
//#0A6ADA
//#27CDCB
const styles = StyleSheet.create({
    titleArea: {
        height: 50,
        width: Dimensions.get('window').width - 25,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 3,
        borderRadius: 10,
        marginHorizontal: 15,
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
    },
    inputIcon: {
        position: 'absolute',
        left: 7,
    },
    inputContainer: {
        width: WIDTH - 25,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        backgroundColor: 'white'
    },
    dropdownContainer: {
        width: WIDTH - 25,
        height: 60,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 1,
    },
    dropdownButton: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 15,
        fontSize: 16,
        paddingLeft: 65,
        borderWidth: 2,
        borderColor: '#0A6ADA',
        backgroundColor: 'rgba(255,255,255,0.7)',
        color: 'black',
        // borderRadius: 15,
    },
    dropdownText: {
        marginTop: 10,
        // marginHorizontal: 85,
        fontSize: 16,
    },
    btnConfirm: {
        width: 130,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#0A6ADA',
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 85
    },
    textBtn: {
        color: 'white',
        textAlign: "center",
        fontSize: 16,
    },

    DatePicker: {
        width: WIDTH - 55,
        height: 45,
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
    radioGroup: {
        width: WIDTH - 25,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        backgroundColor: 'white'
    },
    genderContainer: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "flex-start",
        borderWidth: 2,
        borderColor: '#0A6ADA',
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
    radioName: {
        marginTop: 7,
        fontSize: 16,
        color: 'gray'
    },
    genderIcon: {
        position: "relative",
        top: 5,
        left: 5,
        color: 'gray',
    },
    RadioButton: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingTop: 2,
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width - 20,
        height: 54,
        marginBottom: 10,
        marginHorizontal: 16,
    }
})