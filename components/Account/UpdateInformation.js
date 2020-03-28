import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import { Field, reduxForm } from 'redux-form';
import { CommonActions } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import districtList from '../../Data/District';
import ModalDropdown from 'react-native-modal-dropdown';
import {getApiUrl, convertDateTimeToDate, convertDateToDateTime} from './../Common/CommonFunction';
import { connect } from 'react-redux';
import {load as loadAccount} from '../Store/Reducers/InitialValue'
import renderField from '../../Validate/RenderField'


//validate conditions
const required = values => values ? undefined : 'Bắt buộc';
const isNumber = values => values && isNaN(Number(values)) ? 'Phải nhập số' : undefined;
const isPhonenumber = values => values && values.length == 10 ? undefined : 'Phải có 10 số';
const isEmail = values =>
    values && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values) ? 'Email không hợp lệ' : undefined;
const isWeakPassword = values => values && values.length == 6 ? undefined : 'Mật khẩu phải có 6 kí tự';

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
            customerId: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.id : '-1',
            name: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.name : '',
            dob: this.props.route.params.customerInfo? convertDateTimeToDate(this.props.route.params.customerInfo.dob): '01/01/1970',
            gender: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.gender=='1' ? 'Nữ':  'Nam'  : 'Nam',
            selectTownList: [],
            address: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.address : '',
            district: '',
            town: '',
            email: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.email :'123@1234.com',

            selectTownList: [],
            townName1: '',
            districtName1: '',
            districtList : [],
        };
        this.submit = this.submit.bind(this)
    }
    componentWillMount = value => {
        const customerInfor =  {
            username : this.state.name,
            email: this.state.email,
            address: this.state.address
        }
        this.props.load(customerInfor)
    }

    componentDidMount = value => {
        this.callApiGetDistrictCode();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                customerId: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.id : '-1',
                name: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.name : '',
                dob: this.props.route.params.customerInfo? convertDateTimeToDate(this.props.route.params.customerInfo.dob): '01/01/1970',
                gender: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.gender=='1' ? 'Nữ':  'Nam'  : 'Nam',
                selectTownList: [],
                address: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.address : '',
                district: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.districtCode : '',
                town: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.townCode : '',
                email: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.email :'123@1234.com',
            })
            const customerInfor =  {
                username : this.props.route.params.customerInfo ? this.props.route.params.customerInfo.name : '',
                email: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.email :'123@1234.com',
                address: this.props.route.params.customerInfo ? this.props.route.params.customerInfo.address : '',
            }
            this.props.load(customerInfor)
        }
    }

    callApiGetDistrictCode(){
        fetch(getApiUrl()+"/management/districts/district-town-list")
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
        const { districtName } = rowData;
        this.setState({ district: districtName })
        return ` ${districtName}`;
    }
    _renderTownButtonText = listTown => {
        const { townCode, townName } = listTown;
        this.setState({ town: townName })
        return ` ${townName}`;
    }
    submit = values => {
        this.callApi().then(
            this.props.navigation.dispatch(
                CommonActions.navigate({
                    name: 'CustomerInformation',
                    params: {
                        name: this.state.name,
                        address: this.state.address,
                        town: this.state.town,
                        district: this.state.district,
                    },
                })
            )
        )
    }
    selectItem(id) {
        // districtList.forEach(district => {
        //     if (district.districtCode === id) {
        //         this.setState({
        //             selectTownList: district.listTown
        //         })
        //     }
        // });
        this.setState({
            selectTownList: this.state.districtList[id].listTown
        })
    }
    callApi  = async () => {
        fetch(getApiUrl()+'/users/customers/detail/update/'+this.state.customerId, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+this.props.token,
        },
        body: JSON.stringify({
            name: this.state.name,
            address: this.state.address,
            email: this.state.email,
            dob : convertDateToDateTime(this.state.dob),
            gender: this.state.gender?'0':'1',
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
        const { gender } = this.state;
        const { handleSubmit, load } = this.props;
        return (
            <ScrollView style={{ flex: 1 }}>
                <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                <View>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>Chỉnh sửa thông tin</Text>
                    </View>
                </View>
                <Field name="username" keyboardType="default" component={renderField} iconName="rename-box"
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
                                value="Male"
                                gender={true}
                                status={gender === 'Nam' ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ gender: 'Nam' }); }}
                            />
                            <Text style={styles.radioName}>Nam</Text>
                            <RadioButton
                                value="Female"
                                status={gender === 'Nữ' ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ gender: 'Nữ' }); }}
                            />
                            <Text style={styles.radioName}>Nữ</Text>
                        </View>
                    </View>
                </View>
                <Field name="address" keyboardType="default" component={renderField} iconName="map-marker"
                    iconType="material-community" placeholder="Địa chỉ" secureText={false}
                    onChange={(text) => { this.setState({ address: text }) }}
                    validate={[required]}
                />
                <View style={styles.dropdownContainer}>
                    <ModalDropdown
                        options={this.state.selectTownList}
                        renderSeparator={() => <View />}
                        renderRow={_renderTownRow.bind(this)}
                        renderButtonText={(listTown) => this._renderTownButtonText(listTown)}
                        defaultIndex='1'
                        defaultValue='Phường:'
                        textStyle={styles.dropdownText}
                        style={styles.dropdownButton}
                        dropdownStyle={{ width: 200, borderWidth: 2 }}
                        dropdownTextStyle={{ fontSize: 16 }}
                    />
                </View>
                <View style={styles.dropdownContainer}>
                    <ModalDropdown
                        options={this.state.districtList}
                        renderSeparator={() => <View />}
                        renderRow={_renderDistrictRow.bind(this)}
                        renderButtonText={(rowData) => this._renderDistrictButtonText(rowData)}
                        defaultIndex='1'
                        defaultValue='Quận:'
                        textStyle={styles.dropdownText}
                        style={styles.dropdownButton}
                        dropdownStyle={{ width: 200, borderWidth: 2 }}
                        dropdownTextStyle={{ fontSize: 16 }}
                        onSelect={(value) => this.selectItem(value)}
                    />
                </View>
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

let UpdateInformationForm = reduxForm({
        form: 'UpdateInformation',
        enableReinitialize: true,
    })(UpdateInformationScreen);

UpdateInformationForm = connect(
    state => ({
      initialValues: state.initialValue.data, // pull initial values from account reducer
      token: state.login.token
    }),
    { load: loadAccount,
        loadCustomer: (customerInfor) => dispatch(loadCustomerInfor(customerInfor)),
     } // bind account loading action creator
  )(UpdateInformationForm);
export default UpdateInformationForm;


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
})