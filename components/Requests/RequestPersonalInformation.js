import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
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
import {load as loadAccount} from '../Store/Reducers/InitialValue'
import renderField from '../../Validate/RenderField'
import {getApiUrl, convertDateTimeToTime, convertDateTimeToDate} from './../Common/CommonFunction'


//validate conditions
const required = values => values ? undefined : 'Bắt buộc';
const isNumber = values => values && isNaN(Number(values)) ? 'Phải nhập số' : undefined;
const isPhonenumber = values => values && values.length == 10 ? undefined : 'Phải có 10 số';
const isEmail = values =>
    values && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values) ? 'Email không hợp lệ' : undefined;
const isWeakPassword = values => values && values.length == 6 ? undefined : 'Mật khẩu phải có 6 kí tự';


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
            name: this.props.customerInfor ? this.props.customerInfor.name : '',
            dob: this.props.customerInfor ? this.props.customerInfor.dob : '',
            apointmentDate: '01/01/2020',
            apointmentTime: '07:30',
            selectTownList: [],
            address: this.props.customerInfor ? this.props.customerInfor.address : '',
            district: this.props.customerInfor ? this.props.customerInfor.districtCode : '0',
            town: this.props.customerInfor ? this.props.customerInfor.townCode : '1',
            customerInfor: this.props.customerInfor,
            townName1: '',
            districtName1: '',
            selectedTest: this.props.route.params.selectedTest ? this.props.route.params.selectedTest : [], 
            totalPrice: this.props.route.params.totalPrice ? this.props.route.params.totalPrice : '0', 
            testsList: this.props.route.params.testsList ? this.props.route.params.testsList : [],
            districtList : [],
        };
        this.selectItem = this.selectItem.bind(this)
        this.submit = this.submit.bind(this)
    }
    componentWillMount = value => {
        const customerInfor =  {
            username : this.state.name,
            email: this.state.email,
            address: this.state.address,
        }
        this.props.load(customerInfor)
    }
    componentDidMount = value => {
        this.callApiGetDistrictCode();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                customerId: this.props.customerInfor ? this.props.customerInfor.id : '-1',
                name: this.props.customerInfor ? this.props.customerInfor.name : '',
                dob: this.props.customerInfor ? this.props.customerInfor.dob : '',
                apointmentDate: '01/01/2020',
                apointmentTime: '07:30',
                selectTownList: [],
                address: this.props.customerInfor ? this.props.customerInfor.address : '',
                district: this.props.customerInfor ? this.props.customerInfor.districtCode : '0',
                town: this.props.customerInfor ? this.props.customerInfor.townCode : '1',
                customerInfor: this.props.customerInfor,
                
            })
        }
    }

    _renderDistrictButtonText = rowData => {
        const { districtCode,districtName } = rowData;
        this.setState({ 
            district: districtCode,
            districtName1 : districtName
        })
        return ` ${districtName}`;
    }
    _renderTownButtonText = listTown => {
        const { townCode, townName } = listTown;
        this.setState({ 
            town: townCode,
            townName1 : townName
        })
        return ` ${townName}`;
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
    submit = values => {
        this.props.navigation.dispatch(
            CommonActions.navigate({
                name: 'RequestConfirmScreen',
                params: {
                    customerId: this.state.customerId,
                    name: this.state.name,       
                    address: this.state.address,
                    dob: this.state.dob,
                    town: this.state.town,
                    district : this.state.district,
                    date:this.state.apointmentDate,
                    time:this.state.apointmentTime,
                    selectedTest: this.props.route.params.selectedTest,   
                    testsList: this.props.route.params.testsList,
                    totalPrice: this.props.route.params.totalPrice,
                    resetSelectedTestOnConfirm: this.props.route.params.resetSelectedTestOnConfirm,
                },
            })
        )
    }
    selectItem(id) {
        // this.state.districtList.forEach(district => {            
        //     if (district.districtCode == id) {
        //         this.setState({
        //             selectTownList: district.listTown
        //         })
        //     }
        // });
        this.setState({
            selectTownList: this.state.districtList[id].listTown
        })

    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <ScrollView style={{ flex: 1 }}>
                <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                <View>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>Thông tin lấy mẫu</Text>
                    </View>
                </View>
                <Field name="username" keyboardType="default" component={renderField} iconName="rename-box"
                    iconType="material-community" placeholder="Tên hiển thị" secureText={false}
                    onChange={(text) => { this.setState({ name: text }) }} editable={false}
                    validate={[required]}
                />
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
                        defaultIndex='3'
                        defaultValue={this.state.townName1}
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
                        defaultIndex='3'
                        defaultValue={this.state.districtName1}
                        textStyle={styles.dropdownText}
                        style={styles.dropdownButton}
                        dropdownStyle={{ width: 200, borderWidth: 2 }}
                        dropdownTextStyle={{ fontSize: 16 }}
                        onSelect={(value) => {this.selectItem(value)}}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <DatePicker
                        style={styles.DatePicker}
                        date={this.state.apointmentDate}
                        mode="date"
                        placeholder="Ngày hẹn"
                        format="DD-MM-YYYY"
                        minDate={new Date()}
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
                    <DatePicker
                        style={styles.DatePicker}
                        date={this.state.apointmentTime}
                        mode="time"
                        placeholder="Giờ hẹn"
                        format="HH:mm"
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
                <TouchableOpacity style={styles.btnNext}
                    onPress={handleSubmit(this.submit)}
                >
                    <Text style={styles.textBtn}>Tiếp</Text>
                </TouchableOpacity>
                <View>
                </View>
                {/* <ScreenBottomMenu></ScreenBottomMenu> */}
            </ScrollView>
        );
    }
}
let RequestPersonalInformationForm = reduxForm({
    form: 'RequestPersonalInformation',
    enableReinitialize: true,
})(RequestPersonalInformation);
RequestPersonalInformationForm = connect(
    state => ({
      initialValues: state.initialValue.data, // pull initial values from account reducer
      customerInfor: state.loadCustomer.customerInfor,
    }),
    { load: loadAccount } // bind account loading action creator
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
    nameHeader: {
        alignItems: "center",
        backgroundColor: '#25345D',
    },
    nameText: {
        margin: 10,
        fontSize: 25,
        color: 'white',
    },
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
    btnNext: {
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
    }
})