import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { Field, reduxForm } from 'redux-form';
import ScreenBottomMenu from '../Common/ScreenBottomMenu';
import ScreenTopMenuBack from '../Common/ScreenTopMenuBack';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
// import districtList from '../../Data/District';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { load as loadAccount } from '../Reducers/InitialValue';
import renderField from '../../Validate/RenderField'
import { getApiUrl, convertDateTimeToTime, convertDateTimeToDate, formatMonth, getTomorrowDate } from './../Common/CommonFunction'


//validate conditions
const required = values => values ? undefined : 'Bắt buộc';
const isNumber = values => values && isNaN(Number(values)) ? 'Phải nhập số' : undefined;
const isPhonenumber = values => values && values.length == 10 ? undefined : 'Phải có 10 số';
const isEmail = values =>
    values && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values) ? 'Email không hợp lệ' : undefined;
const isWeakPassword = value => value && value.length >= 6 ? undefined : 'Mật khẩu phải có ít nhất 6 kí tự';


const { width: WIDTH } = Dimensions.get('window');

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


class RequestPersonalInformation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerId: this.props.customerInfor ? this.props.customerInfor.id : '-1',
            name: this.props.customerInfor.name,
            dob: this.props.customerInfor ? this.props.customerInfor.dob : '',
            apointmentDate: getTomorrowDate(),
            apointmentTime: '07:30',
            address: this.props.customerInfor.address,
            districtCode: this.props.customerInfor ? this.props.customerInfor.districtCode : '0',
            townCode: this.props.customerInfor ? this.props.customerInfor.townCode : '1',
            customerInfor: this.props.customerInfor,
            selectedTest: this.props.route.params.selectedTest ? this.props.route.params.selectedTest : [],
            totalPrice: this.props.route.params.totalPrice ? this.props.route.params.totalPrice : '0',
            testsList: this.props.route.params.testsList ? this.props.route.params.testsList : [],
            districtList: [],
            selectTownList: [],
            townList: [],
            townName: 'Phường/Xã...',
            districtName: 'Quận/Huyện...',
            disableDropdownTown: true,
        };
        this.selectItem = this.selectItem.bind(this)
        this.submit = this.submit.bind(this)
    }
    componentDidMount = value => {
        this.callApiGetDistrictCode();
        this.callApiGetTownCode();
        const customerInforReducer = {
            username: this.props.customerInfor ? this.props.customerInfor.name : '',
            phonenumber: this.props.customerInfor ? this.props.customerInfor.phoneNumber : '0000000000',
            address: this.props.customerInfor ? this.props.customerInfor.address : '',
            email: this.props.customerInfor ? this.props.customerInfor.email : '',
        }
        this.props.load(customerInforReducer)
        setTimeout(() => {
            this.state.districtList.forEach(district => {
                if (district.districtCode === this.props.customerInfor.districtCode) {
                    this.setState({
                        districtName: district.districtName
                    })
                } else {
                    console.log("Error")
                }
            });
            this.state.townList.forEach(town => {
                if (town.townCode === this.props.customerInfor.townCode) {
                    this.setState({
                        townName: town.townName
                    })
                } else {
                    console.log("Error")
                }
            });
        }, 14000);

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            const customerInforReducer = {
                username: this.props.customerInfor ? this.props.customerInfor.name : '',
                phonenumber: this.props.customerInfor ? this.props.customerInfor.phoneNumber : '0000000000',
                address: this.props.customerInfor ? this.props.customerInfor.address : '',
                email: this.props.customerInfor ? this.props.customerInfor.email : '',
            }
            this.props.load(customerInforReducer)
            setTimeout(() => {
                this.state.districtList.forEach(district => {
                    if (district.districtCode === this.props.customerInfor.districtCode) {
                        this.setState({
                            districtName: district.districtName
                        })
                    } else {
                        console.log("Error")
                    }
                });
                this.state.townList.forEach(town => {
                    if (town.townCode === this.props.customerInfor.townCode) {
                        this.setState({
                            townName: town.townName
                        })
                    } else {
                        console.log("Error")
                    }
                });
            }, 12000);
        }
    }
    resetRequestPersonalInfor = value => {
        this.setState({
            customerId: this.props.customerInfor ? this.props.customerInfor.id : '-1',
            name: this.props.customerInfor ? this.props.customerInfor.name : '',
            dob: this.props.customerInfor ? this.props.customerInfor.dob : '',
            apointmentDate: getTomorrowDate(),
            apointmentTime: '07:30',
            address: this.props.customerInfor ? this.props.customerInfor.address : '',
            districtCode: this.props.customerInfor ? this.props.customerInfor.districtCode : '0',
            townCode: this.props.customerInfor ? this.props.customerInfor.townCode : '1',
        })
        setTimeout(() => {
            this.state.districtList.forEach(district => {
                if (district.districtCode === this.props.customerInfor.districtCode) {
                    this.setState({
                        districtName: district.districtName
                    })
                } else {
                    console.log("Error")
                }
            });
            this.state.townList.forEach(town => {
                if (town.townCode === this.props.customerInfor.townCode) {
                    this.setState({
                        townName: town.townName
                    })
                } else {
                    console.log("Error")
                }
            });
        }, 2000);
        this.districtDropdown.select(-1);
        this.townDropdown.select(-1);
        this.props.reset();
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
    callApiGetDistrictCode() {
        fetch(getApiUrl() + "/management/districts/district-town-list")
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result)
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
    submit = values => {
        if (this.state.districtName == 'Quận/Huyện...' || this.state.townName == 'Phường/Xã...') {
            Alert.alert(
                'Thay đổi thông tin',
                'Bạn phải chọn quận và phường!',
            )
        } else {
            this.props.navigation.dispatch(
                CommonActions.navigate({
                    name: 'RequestConfirmScreen',
                    params: {
                        customerId: this.state.customerId,
                        name: this.state.name,
                        address: this.state.address,
                        dob: this.state.dob,
                        town: this.state.townCode,
                        district: this.state.districtCode,
                        townName: this.state.townName,
                        districtName: this.state.districtName,
                        date: this.state.apointmentDate,
                        time: this.state.apointmentTime,
                        selectedTest: this.props.route.params.selectedTest,
                        testsList: this.props.route.params.testsList,
                        totalPrice: this.props.route.params.totalPrice,
                        currentVersion: this.props.route.params.current_version,
                        resetSelectedTestOnConfirm: this.props.route.params.resetSelectedTestOnConfirm,
                        resetRequestPersonalInformation: this.resetRequestPersonalInfor,
                    },
                })
            )
        }
    }
    selectItem(id) {
        this.setState({
            disableDropdownTown: false,
            selectTownList: this.state.districtList[id].listTown,
        })

    }
    render() {
        debugger;
        const abc = this.props.customerInfor;
        const { handleSubmit } = this.props;
        return (
            <ScrollView style={{ flex: 1 }}>
                <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                <View>
                    <View style={styles.titleArea}>
                        <Text style={styles.logoText}>Thông tin lấy mẫu</Text>
                    </View>
                </View>
                <Field name="username" keyboardType="default" component={renderField} iconName="rename-box"
                    iconType="material-community" placeholder="Tên hiển thị" secureText={false} editable={false}
                    onChange={(text) => { this.setState({ name: text }) }}
                    // editable={false}
                    validate={[required]}
                />
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
                    validate={[required]}
                />
                <View style={styles.inputContainer}>
                    <DatePicker
                        style={styles.DatePicker}
                        date={this.state.apointmentDate}
                        mode="date"
                        placeholder="Ngày hẹn"
                        format="DD-MM-YYYY"
                        minDate={ new Date(Date.now() + 24 * 60 * 60 * 1000)}
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
                        onDateChange={(date) => { this.setState({ apointmentDate: date }) }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon
                        name="alarm"
                        type="material-community"
                        color='black'
                        size={32}
                        iconStyle={styles.inputIcon}
                    ></Icon>
                    <DatePicker
                        style={styles.DatePicker}
                        date={this.state.apointmentTime}
                        mode="time"
                        placeholder="Giờ hẹn"
                        format="HH:mm"
                        showIcon={false}
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
                        onDateChange={(time) => { this.setState({ apointmentTime: time }) }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.btnNext}
                        onPress={handleSubmit(this.submit)}
                    >
                        <Text style={styles.textBtn}>Tiếp</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
let RequestPersonalInformationForm = reduxForm({
    form: 'RequestPersonalInformation',
    enableReinitialize: true,
    destroyOnUnmount: false,
})(RequestPersonalInformation);
RequestPersonalInformationForm = connect(
    state => ({
        initialValues: state.initialValue.data, // pull initial values from account reducer
        customerInfor: state.loadCustomer.customerInfor,
    }),
    {

        load: loadAccount
    }
)(RequestPersonalInformationForm);
export default RequestPersonalInformationForm;
//#25345D
//#0A6ADA
//#27CDCB
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f1f0f0',
    },
    backIcon: {
        position: "absolute",
        top: 10,
        left: 20,
    },
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
        flexDirection: 'column',
        position: 'absolute',
        left: 7,
        paddingBottom: 5,
    },
    inputContainer: {
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
        marginBottom: 1
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
        // marginHorizontal: 85,
        fontSize: 16,
    },
    btnNext: {
        width: WIDTH - 190,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#0A6ADA',
        justifyContent: 'center',
        marginTop: 10,
        // marginHorizontal: 85
    },
    textBtn: {
        color: 'white',
        textAlign: "center",
        fontSize: 16,
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
    DatePicker: {
        width: WIDTH - 55,
        height: 45,
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
    buttonContainer: {
        flexDirection: "column",
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width - 30,
        height: 84,
        marginBottom: 10,
        marginHorizontal: 6,
    }
})