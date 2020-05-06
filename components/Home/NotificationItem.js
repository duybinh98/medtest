import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import ScreenBackGround from './../Common/ScreenBackGround';
import { getApiUrl, convertDateTimeToDate, convertDateTimeToTime } from './../Common/CommonFunction'

export default class NotificationItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestId: this.props.requestId ? this.props.requestId : '-1',
            appointmentId: this.props.appointmentId ? this.props.appointmentId : '-1',
            type: this.props.type ? this.props.type : '',
            testsList: [],
            token: this.props.token,
            content: this.props.content,
        };
        this.onItemPress = this.onItemPress.bind(this)
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.route.params !== this.props.route.params) {
    //         this.setState(previousState => ({
    //             requestId: this.props.requestId? this.props.requestId: '-1',     
    //             token: this.props.token,
    //             content: this.props.content,
    //         }));
    //     }
    // }



    callApiRequestDetail() {
        fetch(getApiUrl() + '/requests/detail/' + this.state.requestId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.state.token,
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    result.message ? null :
                        this.props.navigation.dispatch(
                            CommonActions.navigate({
                                name: 'RequestViewScreen',
                                params: {
                                    id: result.requestID,
                                    name: result.customerName,
                                    address: result.requestAddress,
                                    townName: result.requestTownName,
                                    districtName: result.requestDistrictName,
                                    phone: result.customerPhoneNumber,
                                    dob: convertDateTimeToDate(result.customerDOB),
                                    date: convertDateTimeToDate(result.requestMeetingTime),
                                    time: convertDateTimeToTime(result.requestMeetingTime),
                                    nurseName: result.nurseName,
                                    nurseId: result.nurseID,
                                    selectedTest: result.lsSelectedTest,
                                    status: result.requestStatus,
                                    testsList: this.props.testsList,
                                    totalAmount: result.requestAmount,
                                    createdTime: convertDateTimeToDate(result.requestCreatedTime),
                                    updatedTime: result.requestUpdatedTime,
                                    backScreen: 'NotificationListScreen'
                                },
                            }))
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    callApiAppointmentDetail() {
        fetch(getApiUrl() + '/appointments/detail/' + this.state.appointmentId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.state.token,
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    result.message ? null :
                        this.props.navigation.dispatch(
                            CommonActions.navigate({
                                name: 'AppointmentDetailScreen',
                                params: {
                                    appointment_id: result.appointment_id,
                                    appointment_userName: result.appointment_customerName,
                                    appointment_phoneNumber: result.appointment_phoneNumber,
                                    // appointment_DOB: convertDateTimeToDate(result.appointment_DOB),
                                    appointment_date: convertDateTimeToDate(result.appointment_meetingTime),
                                    appointment_time: convertDateTimeToTime(result.appointment_meetingTime),
                                    appointment_statusName: result.appointment_status,
                                    appointment_status: result.appointment_status,
                                    appointment_createdTime : result.appointment_createdTime,
                                    appointment_createdDate : result.appointment_createdTime,
                                    appointment_note: result.appointment_note,
                                    backScreen: 'NotificationListScreen'
                                },
                            }))
                },
                (error) => {
                    console.log(error)
                }
            )
    }


    onItemPress() {
        if (this.state.type == 'REQUEST') this.callApiRequestDetail();
        if (this.state.type == 'APPOINTMENT') this.callApiAppointmentDetail();

    }


    render() {
        return (
            <TouchableOpacity
                style={styles.notificationItem}
                onPress={() => this.onItemPress()}
            >
                <Text style={styles.articleShortContent}>{this.state.content}</Text>
            </TouchableOpacity>
        );
    }


}
const styles = StyleSheet.create({
    notificationItem: {
        alignSelf: 'stretch',
        width: Dimensions.get('window').width - 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 1,
        paddingBottom: 5,
        paddingLeft: 10,
        borderRadius: 10,
        marginBottom: 10,

    },
    articleShortContent: {
        fontSize: 13
    }
});