import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import { Field, reduxForm } from 'redux-form';
import { CommonActions } from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import { getApiUrl, convertDateTimeToDate, convertDateToDateTime } from './../Common/CommonFunction';
import { connect } from 'react-redux';
import { load as loadAccount } from '../Store/Reducers/InitialValue';
import { login } from '../Store/Reducers/LoginReducer';
import { loadCustomerInfor } from '../Store/Reducers/LoadInforReducer';

import renderField from '../../Validate/RenderField';


//validate conditions
const required = values => values ? undefined : 'Bắt buộc';


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
            customerId: this.props.customerInfor? this.props.customerInfor.id : '1',
            selectTownList: [],
            address:  '',
            districtCode: '',
            townCode: '',
         
            selectTownList: [],
            townName1: '',
            districtName1: '',
            districtList: [],
            townList: [],
            disableDropdownTown: true,
        };
        this.submit = this.submit.bind(this)
    }
  
    componentDidMount = value => {
        this.callApiGetDistrictCode();
        this.callApiGetTownCode();

    //     setTimeout(() => {
    //         console.log("name" + this.state.districtList + "  2")
    //         this.state.districtList.forEach(district => {
    //             if (district.districtCode === this.props.customerInfor.districtCode) {
    //                 this.setState({
    //                     districtName1: district.districtName
    //                 })
    //             } else {
    //                 console.log("Error")
    //             }
    //         });
    //         this.state.townList.forEach(town => {
    //             if (town.townCode === this.props.customerInfor.townCode) {
    //                 this.setState({
    //                     townName1: town.townName
    //                 })
    //             } else {
    //                 console.log("Error")
    //             }
    //         });
    //     }, 4000);
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps !== this.props) {
    //         this.setState({
    //             customerId: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.id : '-1',
    //             name: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.name : '',
    //             dob: this.props.route.params.customerInfo ? convertDateTimeToDate(this.props.route.params.customerInfo.dob) : '01/01/1970',
    //             gender: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.gender == '1' ? 'Nữ' : 'Nam' : 'Nam',
    //             selectTownList: [],
    //             address: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.address : '',
    //             district: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.districtCode : '',
    //             town: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.townCode : '',
    //             email: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.email : '123@1234.com',
    //         })
    //         const customerInfor = {
    //             username: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.name : '',
    //             email: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.email : '123@1234.com',
    //             address: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.address : '',
    //         }
    //         this.props.load(customerInfor)
    //     }
    // }

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
    callApiGetTownCode() {
        fetch(getApiUrl() + "/management/districts/towns/list")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
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
        const { districtName, districtCode } = rowData;
        this.setState({ 
            district: districtName,
            districtCode : districtCode
         })
        return ` ${districtName}`;
    }
    _renderTownButtonText = listTown => {
        const { townCode, townName } = listTown;
        this.setState({ 
            town: townName,
            townCode: townCode
        })
        return ` ${townName}`;
    }
    submit = values => {
        console.log("Test : " + this.state.townCode);
        console.log("Test : " + this.state.districtCode);
        console.log("Test : " + this.state.customerId);
        console.log("Test : " + this.props.token);
        this.callApi().then(
            this.props.navigation.dispatch(
                CommonActions.navigate({
                    name: 'HomeScreen',
                    params: {
                        // name: this.state.name,
                        // phonenumber: this.state.phonenumber,
                        // email: this.state.email,
                        // dob: this.state.dob,
                        // password: this.state.password,
                        // gender: this.state.gender,
                    },
                })
            ))
        // this.callApi().then(
        //     this.props.navigation.dispatch(
        //         CommonActions.navigate({
        //             name: 'HomeScreen',
        //             params: {
        //                 name: this.state.name,
        //                 address: this.state.address,
        //                 town: this.state.town,
        //                 district: this.state.district,
        //             },
        //         })
        //     )
        // )
    }
    // selectTown(id) {
    //     this.setState({
    //         townCode : this.state.selectTownList[id],
    //     })
    // }
    selectItem(id) {
        this.setState({
            disableDropdownTown: false,
            selectTownList: this.state.districtList[id].listTown,
            // districtCode : this.state.districtList[id].districtCode,
        })
    }
    callApi = async () => {
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
                    console.log(result)
                    this.props.loadCustomer(result)
                },
                (error) => {
                    console.log(error);
                }
            );
    }


    render() {
        const { handleSubmit } = this.props;
        return (
            <ScrollView style={{ flex: 1 }}>
                <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                <View>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>Cập nhật địa chỉ</Text>
                    </View>
                </View>
                <Field name="address" keyboardType="default" component={renderField} iconName="map-marker"
                    iconType="material-community" placeholder="Địa chỉ" secureText={false}
                    onChange={(text) => { this.setState({ address: text }) }}
                    validate={[required]}
                />
                <View style={styles.dropdownContainer}>
                    <ModalDropdown
                        // disabled={this.state.disableDropdownTown}
                        options={this.state.selectTownList}
                        renderSeparator={() => <View style={{ borderWidth: 0.5 }} />}
                        renderRow={_renderTownRow.bind(this)}
                        renderButtonText={(listTown) => this._renderTownButtonText(listTown)}
                        // defaultValue={this.state.townName1}
                        textStyle={styles.dropdownText}
                        style={styles.dropdownButton}
                        showsVerticalScrollIndicator={false}
                        dropdownStyle={{ width: 220, borderWidth: 2, borderRadius: 5 }}
                        dropdownTextStyle={{ fontSize: 16 }}
                        // onSelect={(value) => { this.selectTown(value) }}
                    />
                    <View style={{ position: "absolute", right: 30, top: 15 }}>
                        <Text style={{ fontSize: 20 }} >▼</Text>
                    </View>
                </View>
                <View style={styles.dropdownContainer}>
                    <ModalDropdown
                        options={this.state.districtList}
                        renderSeparator={() => <View style={{ borderWidth: 0.5 }} />}
                        renderRow={_renderDistrictRow.bind(this)}
                        renderButtonText={(rowData) => this._renderDistrictButtonText(rowData)}
                        // defaultValue={this.state.districtName1}
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
                <View style ={styles.buttonContainer}>
                <TouchableOpacity style={styles.btnConfirm} onPress={handleSubmit(this.submit)}>
                    <Text style={styles.textBtn}>Bỏ qua</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnConfirm} onPress={handleSubmit(this.submit)}>
                    <Text style={styles.textBtn}>Xác nhận</Text>
                </TouchableOpacity>
                </View>
                
                <View>
                </View>
            </ScrollView>
        );
    }
}

let UpdateAddressForm = reduxForm({
    form: 'UpdateAddress',
    enableReinitialize: true,
})(UpdateAddress);

UpdateAddressForm = connect(
    state => ({
        token: state.login.token,
        // customerInfor: state.loadCustomer.customerInfor,
        customerInfor: state.login.customerInfo
    }),
    {
        load: loadAccount,
        loadCustomer: (customerInfor) => dispatch(loadCustomerInfor(customerInfor)),
    } // bind account loading action creator
)(UpdateAddressForm);
export default UpdateAddressForm;


//#25345D
//#0A6ADA
//#27CDCB
const styles = StyleSheet.create({
    logoContainer: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 10
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
        backgroundColor: 'white'
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