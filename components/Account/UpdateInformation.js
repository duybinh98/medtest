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
import {getApiUrl} from './../Common/CommonFunction';

//validate conditions
const required = values => values ? undefined : 'Bắt buộc';
const isNumber = values => values && isNaN(Number(values)) ? 'Phải nhập số' : undefined;
const isPhonenumber = values => values && values.length == 10 ? undefined : 'Phải có 10 số';
const isEmail = values =>
    values && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values) ? 'Email không hợp lệ' : undefined;
const isWeakPassword = values => values && values.length == 6 ? undefined : 'Mật khẩu phải có 6 kí tự';

//Field input for redux-form
const renderField = ({
    iconName, iconType, keyboardType, meta: { touched, error, warning }, secureText,
    input: { onChange, ...restInput }, placeholder, defaultText
}) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.inputContainer}>
                <Icon
                    name={iconName}
                    type={iconType}
                    color='black'
                    size={32}
                    iconStyle={styles.inputIcon}
                ></Icon>
                <TextInput style={styles.input} placeholder={placeholder} secureTextEntry={secureText} 
                    keyboardType={keyboardType} defaultValue={defaultText}
                    onChangeText={onChange} {...restInput} autoCapitalize='none'       
                ></TextInput>
            </View>
            {touched && ((error && <Text style={{ color: 'red', paddingLeft: 35 }}>{error}</Text>) ||
                (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))}
        </View>
    );
}

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
            name: 'Nguyễn Văn A',
            dob: '01/01/1970',
            gender: 'Nữ',
            selectTownList: [],
            address: '',
            district: '',
            town: '',
            email: '123@123.com'
        };
        this.submit = this.submit.bind(this)
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
                        address: this.state.address,
                        town: this.state.town,
                        district: this.state.district
                    },
                })
            )
        )
    }
    selectItem(id) {
        districtList.forEach(district => {
            if (district.districtCode === id) {
                this.setState({
                    selectTownList: district.listTown
                })
            }
        });
    }
    callApi  = async () => {
        fetch(getApiUrl()+'/users/customers/detail/update/2', {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: this.state.name,
            address: this.state.address,
            email: this.state.email,
            dob : "1998-12-12T17:00:00.000+0000",
            gender: '0',
            townCode:null,
            districtCode:null
        }),
        })
        .then(res => res.json())
        .then(
            (result) => {
                Alert.alert("hi"+result);
            },
            (error) => {
            this.setState({                
                error
            });
            Alert.alert("hi"+error);
            }
        );
    }


    render() {
        const { gender } = this.state;
        const { handleSubmit } = this.props;
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
                    defaultText = {this.state.name}
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
                        defaultIndex='3'
                        defaultValue='Phường:'
                        textStyle={styles.dropdownText}
                        style={styles.dropdownButton}
                        dropdownStyle={{ width: 200, borderWidth: 2 }}
                        dropdownTextStyle={{ fontSize: 16 }}
                    />
                </View>
                <View style={styles.dropdownContainer}>
                    <ModalDropdown
                        options={districtList}
                        renderSeparator={() => <View />}
                        renderRow={_renderDistrictRow.bind(this)}
                        renderButtonText={(rowData) => this._renderDistrictButtonText(rowData)}
                        defaultIndex='3'
                        defaultValue='Quận:'
                        textStyle={styles.dropdownText}
                        style={styles.dropdownButton}
                        dropdownStyle={{ width: 200, borderWidth: 2 }}
                        dropdownTextStyle={{ fontSize: 16 }}
                        onSelect={(value) => this.selectItem(value)}
                    />
                </View>
                <Field name="email" keyboardType="email-address" component={renderField} iconName="email-outline"
                        defaultText = {this.state.email}
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

const UpdateInformationForm = reduxForm({
    form: 'UpdateInformation',
})(UpdateInformationScreen);
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