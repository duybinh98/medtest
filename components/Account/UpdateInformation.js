import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import { Field, reduxForm } from 'redux-form';
import { CommonActions } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import { getApiUrl, convertDateTimeToDate, convertDateToDateTime } from './../Common/CommonFunction';
import { connect } from 'react-redux';
import { load as loadAccount } from '../Reducers/InitialValue';
import { login, logout } from '../Reducers/LoginReducer';
import { loadCustomerInfor } from '../Reducers/LoadInforReducer'
import renderField, { required, isEmail, isWeakPassword, notContainSpecialCharacters, notContainNumeric } from '../../Validate/RenderField'


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

class UpdateInformationScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerId: this.props.customerInfor ? this.props.customerInfor.id : '-1',
            name: this.props.customerInfor ? this.props.customerInfor.name : '',
            dob: this.props.customerInfor ? convertDateTimeToDate(this.props.customerInfor.dob) : '01-01-1970',
            gender: this.props.customerInfor ? this.props.customerInfor.gender === 0 ? 'Nữ' : 'Nam' : 'Nam',
            selectTownList: [],
            address: this.props.customerInfor ? this.props.customerInfor.address : '',
            districtCode: this.props.customerInfor.districtCode ? this.props.customerInfor.districtCode : '',
            townCode: this.props.customerInfor.townCode ? this.props.customerInfor.townCode : '',
            email: this.props.customerInfor ? this.props.customerInfor.email : '123@1234.com',
            phoneNumber: this.props.customerInfor ? this.props.customerInfor.phoneNumber : '0000000000',
            image: this.props.customerInfor ? this.props.customerInfor.image : '',
            customerInfor: this.props.customerInfor ? this.props.customerInfor : null,
            townName: this.props.customerInfor ? this.props.customerInfor.townName : "Chọn phường/xã",
            districtName: this.props.customerInfor ? this.props.customerInfor.districtName : 'Chọn quận huyện',
            districtList: [],
            disableDropdownTown: true,
            disabledButton: false,
        };
        this.submit = this.submit.bind(this)
        this.checkInformationChanged = this.checkInformationChanged.bind(this)
    }
    componentDidUpdate(prevProps) {
        if (prevProps.customerInfor !== this.props.customerInfor) {
            // this.districtDropdown.select(-1);
            // this.townDropdown.select(-1);
            this.setState({
                customerId: this.props.customerInfor ? this.props.customerInfor.id : '-1',
                name: this.props.customerInfor ? this.props.customerInfor.name : '',
                dob: this.props.customerInfor ? convertDateTimeToDate(this.props.customerInfor.dob) : '01-01-1970',
                gender: this.props.customerInfor ? this.props.customerInfor.gender === 0 ? 'Nữ' : 'Nam' : 'Nam',
                address: this.props.customerInfor ? this.props.customerInfor.address : '',
                districtCode: this.props.customerInfor.districtCode ? this.props.customerInfor.districtCode : '',
                townCode: this.props.customerInfor.townCode ? this.props.customerInfor.townCode : '',
                email: this.props.customerInfor ? this.props.customerInfor.email : '123@1234.com',
                phoneNumber: this.props.customerInfor ? this.props.customerInfor.phoneNumber : '0000000000',
                image: this.props.customerInfor ? this.props.customerInfor.image : '',
                customerInfor: this.props.customerInfor ? this.props.customerInfor : null,
                townName: this.props.customerInfor ? this.props.customerInfor.townName : "Chọn phường/xã",
                districtName: this.props.customerInfor ? this.props.customerInfor.districtName : 'Chọn quận huyện',
            })
            const customerInfor = {
                username: this.props.customerInfor ? this.props.customerInfor.name : '',
                phonenumber: this.props.customerInfor ? this.props.customerInfor.phoneNumber : '0000000000',
                address: this.props.customerInfor ? this.props.customerInfor.address : '',
                email: this.props.customerInfor ? this.props.customerInfor.email : '',
            }
            this.props.load(customerInfor);
        }
    }
    componentDidMount() {
        const customerInfor = {
            username: this.props.customerInfor ? this.props.customerInfor.name : '',
            phonenumber: this.props.customerInfor ? this.props.customerInfor.phoneNumber : '0000000000',
            address: this.props.customerInfor ? this.props.customerInfor.address : '',
            email: this.props.customerInfor ? this.props.customerInfor.email : '',
        }
        this.props.load(customerInfor);
        this.callApiGetDistrictCode();
    }

    callApiGetDistrictCode() {
        fetch(getApiUrl() + "/management/districts/district-town-list")
            .then(res => res.json())
            .then(
                (result) => {
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
        this.districtDropdown.select(-1);
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
        if (this.state.districtName == 'Quận/Huyện...' || this.state.townName == 'Phường/Xã...') {
            Alert.alert(
                'Thay đổi thông tin',
                'Bạn phải chọn quận và phường!',
            )
        } else {
            if (this.checkInformationChanged()) {
                Alert.alert(
                    'Thay đổi thông tin',
                    'Bạn có muốn cập nhật các thông tin trên?',
                    [
                        { text: 'Hủy', onPress: () => { return null } },
                        {
                            text: 'Xác nhận', onPress: () => {
                                this.callApi()
                            }
                        },
                    ]
                )
            } else {
                Alert.alert(
                    'Thay đổi thông tin',
                    'Thông tin không thay đổi?',
                    [
                        { text: 'Hủy', onPress: () => { return null } },
                        {
                            text: 'Xác nhận', onPress: () => {
                                this.callApi()
                            }
                        },
                    ]
                )
            }

        }
    }
    selectItem(id) {
        this.setState({
            disableDropdownTown: false,
            selectTownList: this.state.districtList[id].listTown,
        })
    }
    checkInformationChanged() {
        if (this.props.customerInfor.name !== this.state.name) {
            return true
        }
        if (this.props.customerInfor.dob !== this.state.dob) {
            return true
        }
        if (this.props.customerInfor.gender !== this.state.gender) {
            return true
        }
        if (this.props.customerInfor.townCode !== this.state.townCode) {
            return true
        }
        if (this.props.customerInfor.districtCode !== this.state.districtCode) {
            return true
        }
        if (this.props.customerInfor.address !== this.state.address) {
            return true
        }
        if (this.props.customerInfor.email !== this.state.email) {
            return true
        }
        return false;
    }
    callApi = async () => {
        this.setState({
            disabledButton: true,
        })
        fetch(getApiUrl() + '/users/customers/detail/update/' + this.state.customerId, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token,
            },
            body: JSON.stringify({
                name: this.state.name,
                address: this.state.address,
                email: this.state.email,
                dob: convertDateToDateTime(this.state.dob),
                gender: this.state.gender === "Nữ" ? '0' : '1',
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
                                            this.props.reset();
                                            this.props.logout();
                                            this.props.navigation.navigate('LoginScreen');
                                        },
                                    },
                                ],
                            );
                        } else {
                            Alert.alert(
                                'Lỗi cập nhật thông tin',
                                result.message,
                            )
                            this.props.reset();
                        }
                    } else {
                        const customerInforReducer = {
                            id: this.state.customerId,
                            phoneNumber: this.state.phoneNumber,
                            name: this.state.name,
                            email: this.state.email,
                            gender: this.state.gender == 'Nữ' ? 0 : 1,
                            districtCode: this.state.districtCode,
                            townCode: this.state.townCode,
                            address: this.state.address,
                            dob: convertDateToDateTime(this.state.dob),
                            phoneNumber: this.state.phoneNumber,
                            image: this.state.image,
                            townName: this.state.townName,
                            districtName: this.state.districtName
                        }
                        this.props.loadCustomerInfor(customerInforReducer),
                            this.props.navigation.dispatch(
                                CommonActions.navigate({
                                    name: 'CustomerInformation',
                                    params: {
                                        customerInfor: customerInforReducer
                                    },
                                })
                            )
                        this.props.reset();
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }


    render() {
        const { gender } = this.state;
        const { handleSubmit, load } = this.props;
        debugger;
        const a = this.props.customerInfor;

        return (
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                <View>
                    <View style={styles.titleArea}>
                        <Text style={styles.logoText}>Chỉnh sửa thông tin</Text>
                    </View>
                </View>
                <Field name="username" keyboardType="default" component={renderField} iconName="rename-box"
                    iconType="material-community" placeholder="Tên hiển thị" secureText={false}
                    onChange={(text) => { this.setState({ name: text }) }}
                    validate={[required, notContainNumeric, notContainSpecialCharacters]}
                />
                <View style={styles.inputContainer}>
                    <DatePicker
                        style={styles.DatePicker}
                        date={this.state.dob}
                        mode="date"
                        placeholder="Ngày sinh"
                        format="DD-MM-YYYY"
                        minDate="01-01-1900"
                        maxDate={new Date()}
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 7,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                borderRadius: 15,
                                height: 45,
                                borderRadius: 15,
                                borderWidth: 2,
                                borderColor: '#0A6ADA',
                                backgroundColor: 'rgba(255,255,255,0.7)',
                                width: 250,
                            }
                        }}
                        onDateChange={(date) => { this.setState({ dob: date }) }}
                    />
                </View>
                <View style={styles.radioGroup} >
                    <View style={styles.genderContainer}>
                        <Icon
                            name='human-male-female'
                            type='material-community'
                            color='black'
                            size={32}
                            iconStyle={styles.genderIcon}
                        ></Icon>
                        <View style={styles.RadioButton}>
                            <RadioButton
                                value="Nam"
                                status={gender === 'Nam' ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ gender: 'Nam' }); }}
                            />
                            <Text style={styles.radioName}>Nam</Text>
                            <RadioButton
                                value="Nữ"
                                status={gender === 'Nữ' ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ gender: 'Nữ' }); }}
                            />
                            <Text style={styles.radioName}>Nữ</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.dropdownContainer}>
                    <Icon
                        name={"map-marker"}
                        type={'material-community'}
                        color='black'
                        size={32}
                        iconStyle={styles.inputIcon}
                    ></Icon>
                    <ModalDropdown
                        ref={(ref) => this.districtDropdown = ref}
                        options={this.state.districtList}
                        renderSeparator={() => <View style={{ borderWidth: 0.5, borderColor: '#00bfff' }} />}
                        renderRow={_renderDistrictRow.bind(this)}
                        renderButtonText={(rowData) => this._renderDistrictButtonText(rowData)}
                        defaultValue={this.state.districtName}
                        textStyle={styles.dropdownText}
                        style={styles.dropdownButton}
                        showsVerticalScrollIndicator={true}
                        dropdownStyle={styles.dropdownStyle}
                        dropdownTextStyle={{ fontSize: 16 }}
                        onSelect={(value) => { this.selectItem(value) }}
                    />
                    <View style={{ position: "absolute", right: 30, top: 15 }}>
                        <Text style={{ fontSize: 20 }} >▼</Text>
                    </View>
                </View>
                <View style={styles.dropdownContainer}>
                    <Icon
                        name={"map-marker"}
                        type={'material-community'}
                        color='black'
                        size={32}
                        iconStyle={styles.inputIcon}
                    ></Icon>
                    <ModalDropdown
                        ref={(ref) => this.townDropdown = ref}
                        disabled={this.state.disableDropdownTown}
                        options={this.state.selectTownList}
                        renderSeparator={() => <View style={{ borderWidth: 0.5, borderColor: '#00bfff' }} />}
                        renderRow={_renderTownRow.bind(this)}
                        renderButtonText={(listTown) => this._renderTownButtonText(listTown)}
                        defaultValue={this.state.townName}
                        textStyle={styles.dropdownText}
                        style={styles.dropdownButton}
                        showsVerticalScrollIndicator={false}
                        dropdownStyle={styles.dropdownStyle}
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
                <Field name="email" keyboardType="email-address" component={renderField} iconName="email-outline"
                    defaultText={this.state.email}
                    onChange={(text) => { this.setState({ email: text }) }}
                    iconType="material-community" placeholder="Email" secureText={false}
                    validate={[required, isEmail]}
                />
                <TouchableOpacity style={styles.btnConfirm} disabled={this.state.disabledButton} onPress={handleSubmit(this.submit)}>
                    <Text style={styles.textBtn}>Xác nhận</Text>
                </TouchableOpacity>
                <View>
                </View>
            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        initialValues: state.initialValue.data, // pull initial values from account reducer
        token: state.login.token,
        customerInfor: state.loadCustomer.customerInfor,
    };
}
const mapStateToDispatch = (dispatch) => {
    return {
        load: (data) => dispatch(loadAccount(data)),
        loadCustomerInfor: (customerInfor) => dispatch(loadCustomerInfor(customerInfor)),
        logout: () => dispatch(logout()),
    };
}
let UpdateInformationForm = reduxForm({
    form: 'UpdateInformation',
    enableReinitialize: true,
    destroyOnUnmount: false,
})(UpdateInformationScreen);
UpdateInformationForm = connect(
    state => ({
        initialValues: state.initialValue.data, // pull initial values from account reducer
        token: state.login.token,
        customerInfor: state.loadCustomer.customerInfor,
    }), mapStateToDispatch
)(UpdateInformationForm);
export default UpdateInformationForm;

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
        backgroundColor: 'white',
        marginBottom: 1,
        borderRadius: 15,
    },
    dropdownContainer: {
        width: WIDTH - 25,
        height: 60,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        backgroundColor: 'white',
        marginBottom: 1,
    },
    dropdownStyle: {
        width: 200,
        height: 185,
        borderColor: '#0A6ADA',
        borderWidth: 1.5,
        borderRadius: 5
    },
    dropdownButton: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 15,
        fontSize: 16,
        paddingLeft: 60,
        borderWidth: 2,
        borderColor: '#0A6ADA',
        backgroundColor: 'rgba(255,255,255,0.7)',
        color: 'black',
    },
    dropdownText: {
        marginTop: 10,
        fontSize: 16,
    },
    btnConfirm: {
        width: WIDTH - 170,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#0A6ADA',
        justifyContent: 'center',
        // borderWidth: 3,
        // borderColor: '#0A6ADA',
        paddingBottom: 3,
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
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 1,
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
})