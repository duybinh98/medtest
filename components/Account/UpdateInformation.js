import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
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
import {  load as loadAccount } from '../Store/Reducers/InitialValue';
import { loadCustomerInfor } from '../Store/Reducers/LoadInforReducer'
import renderField from '../../Validate/RenderField'


//validate conditions
const required = values => values ? undefined : 'Bắt buộc';
const isNumber = values => values && isNaN(Number(values)) ? 'Phải nhập số' : undefined;
const isPhonenumber = values => values && values.length == 10 ? undefined : 'Phải có 10 số';
const isEmail = values =>
    values && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values) ? 'Email không hợp lệ' : undefined;
const isWeakPassword = value => value && value.length >= 6 ? undefined : 'Mật khẩu phải có ít nhất 6 kí tự';

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

            selectTownList: [],
            townName1: '',
            districtName1: '',
            districtList: [],
            townList: [],
            disableDropdownTown: true,
        };
        this.submit = this.submit.bind(this)
    }
    componentWillMount = value => {
        const customerInfor = {
            email: this.state.email,
            address: this.state.address,
            name: this.state.name,
        }
        this.props.load(customerInfor)
    }
    componentDidUpdate = value => {
        setTimeout(() => {
            this.state.districtList.forEach(district => {
                if (district.districtCode === this.props.customerInfor.districtCode) {
                    this.setState({
                        districtName1: district.districtName
                    })
                } else {
                    console.log("Error")
                }
            });
            this.state.townList.forEach(town => {
                if (town.townCode === this.props.customerInfor.townCode) {
                    this.setState({
                        townName1: town.townName
                    })
                } else {
                    console.log("Error")
                }
            });
        }, 4000);
    }
    componentDidMount = value => {
        const customerInfor = {
            email: this.state.email,
            address: this.state.address,
            name: this.state.name,
        }
        this.props.load(customerInfor);
        this.callApiGetDistrictCode();
        this.callApiGetTownCode();

        setTimeout(() => {
            this.state.districtList.forEach(district => {
                if (district.districtCode === this.props.customerInfor.districtCode) {
                    this.setState({
                        districtName1: district.districtName
                    })
                } else {
                    console.log("Error")
                }
            });
            this.state.townList.forEach(town => {
                if (town.townCode === this.props.customerInfor.townCode) {
                    this.setState({
                        townName1: town.townName
                    })
                } else {
                    console.log("Error")
                }
            });
        }, 4000);
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
    callApiGetTownCode() {
        fetch(getApiUrl() + "/management/districts/towns/list")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(previousState => ({
                        townList: result,
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
        this.setState({
            district: districtName,
            districtCode: districtCode
        })
        return `${districtName}`;
    }
    _renderTownButtonText = listTown => {
        const { townCode, townName } = listTown;
        this.setState({
            town: townName,
            townCode : townCode
        })
        return `${townName}`;
    }
    submit = values => {
        const customerInforReducer = {
            name: this.state.name,
            email: this.state.email,
            gender: this.state.gender,
            districtCode: this.state.districtCode,
            townCode: this.state.townCode,
            address: this.state.address,
            dob: convertDateToDateTime(this.state.dob),
            phoneNumber: this.state.phoneNumber,
            image: this.state.image,
        }

        this.callApi()
        this.props.loadCustomerInfor(customerInforReducer),
            this.props.navigation.dispatch(
                CommonActions.navigate({
                    name: 'CustomerInformation',
                    params: {
                        customerInfor: customerInforReducer
                    },
                })
            )
    }
    selectItem(id) {
        this.setState({
            disableDropdownTown: false,
            selectTownList: this.state.districtList[id].listTown
        })
    }
    callApi = async () => {
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
                    if (result.message) {
                        alert(result.message)
                    } else {
                        // this.props.load(result)
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
                <Field name="name" keyboardType="default" component={renderField} iconName="rename-box"
                    iconType="material-community" placeholder="Tên hiển thị" secureText={false}
                    onChange={(text) => { this.setState({ name: text }) }}
                    validate={[required]}
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
                    <ModalDropdown
                        options={this.state.districtList}
                        renderSeparator={() => <View style={{ borderWidth: 0.5 }} />}
                        renderRow={_renderDistrictRow.bind(this)}
                        renderButtonText={(rowData) => this._renderDistrictButtonText(rowData)}
                        defaultValue={this.state.districtName1}
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
                        disabled={this.state.disableDropdownTown}
                        options={this.state.selectTownList}
                        renderSeparator={() => <View style={{ borderWidth: 0.5 }} />}
                        renderRow={_renderTownRow.bind(this)}
                        renderButtonText={(listTown) => this._renderTownButtonText(listTown)}
                        defaultValue={this.state.townName1}
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
                    validate={[required]}
                />
                <Field name="email" keyboardType="email-address" component={renderField} iconName="email-outline"
                    defaultText={this.state.email}
                    onChange={(text) => { this.setState({ email: text }) }}
                    iconType="material-community" placeholder="Email" secureText={false}
                    validate={[required, isEmail]}
                />
                <TouchableOpacity style={styles.btnConfirm} onPress={handleSubmit(this.submit)}>
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
        load:(data) => dispatch(loadAccount(data)),
        loadCustomerInfor: (customerInfor) => dispatch(loadCustomerInfor(customerInfor)),
    };
}
let UpdateInformationForm = reduxForm({
    form: 'UpdateInformation',
    enableReinitialize: true,
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