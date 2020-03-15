import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import ScreenBottomMenu from '../Common/ScreenBottomMenu';
import ScreenTopMenuBack from '../Common/ScreenTopMenuBack';


const required = values => values ? undefined : 'Bắt buộc';
const isNumber = values => values && isNaN(Number(values)) ? 'Phải nhập số' : undefined;
const isPhonenumber = values => values && values.length == 10 ? undefined : 'Phải có 10 số';
const isEmail = values =>
    values && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values) ? 'Email không hợp lệ' : undefined;
const isWeakPassword = values => values && values.length == 6 ? undefined : 'Mật khẩu phải có 6 kí tự';


const renderField = ({
    iconName, iconType, keyboardType, meta: { touched, error, warning }, secureText,
    input: { onChange, ...restInput }, placeholder
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
                    keyboardType={keyboardType} onChangeText={onChange} {...restInput} autoCapitalize='none'
                ></TextInput>
            </View>
            {touched && ((error && <Text style={{ color: 'red', paddingLeft: 35 }}>{error}</Text>) ||
                (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))}
        </View>
    );
}


const submit = values => {
    alert(`Validation success. Values = ~${JSON.stringify(values)}`);
}

const { width: WIDTH } = Dimensions.get('window')

class RequestPersonalInformation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'Nguyễn Văn A',
            address: 'Số 123 đường abc, xyz',
            date: '01/01/2020',
            freeTime: '7h30-8h30'
        };
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <ScrollView style={{ flex: 1 }}>
                <ScreenTopMenuBack ></ScreenTopMenuBack>
                <View>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>Thông tin lấy mẫu</Text>
                    </View>
                </View>
                <Field name="username" keyboardType="default" component={renderField} iconName="rename-box"
                    iconType="material-community" placeholder="Tên hiển thị" secureText={false}
                    // onChange ={(text) => {this.setState({username : text})}}
                    validate={[required]}
                />
                <View style={styles.inputContainer}>
                    <Icon
                        name='map-marker'
                        type='material-community'
                        color='black'
                        size={32}
                        iconStyle={styles.inputIcon}
                    ></Icon>
                    <TextInput
                        style={styles.input}
                        placeholder={'Địa chỉ'}
                        underlineColorAndroid='transparent'
                        defaultValue={this.state.address}
                        onChangeText={
                            (text) => {
                                this.setState(
                                    (previousState) => {
                                        return {
                                            address: text
                                        };
                                    }
                                )
                            }
                        }
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
                <TouchableOpacity style={styles.btnConfirm}
                    // onPress={() => this.props.navigation.navigate('RequestConfirmScreen')}
                    onPress={handleSubmit(submit)}>
                    <Text style={styles.textBtn}>Tiếp</Text>
                </TouchableOpacity>
                <View>
                </View>
                {/* <ScreenBottomMenu></ScreenBottomMenu> */}
            </ScrollView>
        );
    }
}
const RequestPersonalInformationForm = reduxForm({
    form: 'register',
})(RequestPersonalInformation);
export default RequestPersonalInformationForm;


//#25345D
//#0A6ADA
//#27CDCB
const styles = StyleSheet.create({
    errorMessage: {
        color: 'red',
        textAlign: "center",
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
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 7,
        left: 37,
    },
    inputContainer: {
        marginTop: 10
    },
    btnConfirm: {
        width: WIDTH - 200,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#0A6ADA',
        justifyContent: 'center',
        marginTop: 80,
        marginLeft: 155
    },
    textBtn: {
        color: 'white',
        textAlign: "center",
        fontSize: 16,
    },
    radioGroup: {
        width: WIDTH - 55,
        height: 45,
        marginTop: 10,
        flexDirection: 'row',
        marginHorizontal: 25,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#0A6ADA',
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingLeft: 10,
    },
    radioName: {
        marginTop: 7,
        fontSize: 16,
        color: 'gray'
    },
    genderIcon: {
        position: "absolute",
        top: 5,
        left: 0,
        color: 'gray',
    },
    RadioButton: {
        flexDirection: 'row',
        paddingLeft: 45,
        paddingTop: 2,
    }
})