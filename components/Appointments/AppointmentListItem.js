import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import {Button} from 'react-native-elements';
import {convertDateTimeToDate, convertDateTimeToTime} from './../Common/CommonFunction';

export default class AppointmentListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusName:'',
            statusColor:'',
            createDate:'',
            appointmentDate:'',
            appointmentTime:'',
            appointmentDob:'',
        };
        this.isVisible = this.isVisible.bind(this);
    }
    componentDidMount(){
        this.setState(previousState => ({ 
            createDate:convertDateTimeToDate(this.props.appointment_createdTime),
            appointmentDate:convertDateTimeToDate(this.props.appointment_meetingTime),
            appointmentTime:convertDateTimeToTime(this.props.appointment_meetingTime),
            appointmentDob:convertDateTimeToDate(this.props.appointment_DOB),
        }));
        switch (this.props.appointment_status) {
        case 'pending':
            this.setState(previousState => ({ 
                statusName:'Đợi xác nhận',
                statusColor:'#ffd66f'
            }));
            break;
        case 'closed':
            this.setState(previousState => ({ 
                statusName:'Đã được xác nhận',
                statusColor:'#a4d57b'
            }));
            break;
        }
    }

    isVisible(){
        if (this.props.appointment_status ==='2'){
            if (this.props.viewDone() == true) return true;
            return false;
        }
        if (this.props.viewDone() == true) return false;
        return true;
    }

    render(){        
        return(
            <View>
            {this.isVisible() ?
            <TouchableOpacity 
                style={styles.requestListItem}
                onPress={() => {
                    this.props.navigation.dispatch(
                        CommonActions.navigate({
                            name: 'AppointmentDetailScreen',
                            params: {
                                appointment_userName: this.props.appointment_userName,
                                appointment_phoneNumber: this.props.appointment_phoneNumber,
                                appointment_DOB: this.state.appointmentDob,
                                appointment_date: this.state.appointmentDate,
                                appointment_time: this.state.appointmentTime,
                                appointment_status: this.state.statusName,   
                                appointment_note: this.props.appointment_note,
                                // customerInfo  = this.state.customerInfo,
                            },
                        })
                    )
                    // this.onConfirm
                    }}
            
            >
                <View style={{
                    width:185,
                    height:90,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    }}>
                    <View style={{
                        width:70,
                        height:60,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between'
                        }}>
                            <View style={{width:80,height:25}}>
                                <Text style={{fontSize:17}}>Ngày tạo:</Text>
                            </View>
                            <View style={{width:80,height:25}}>
                                <Text style={{fontSize:17}}>Ngày hẹn:</Text>
                            </View>
                    </View>
                    <View style={
                        {width:100,
                        height:60,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        }}>
                        <View style={{width:100,height:25}}>
                            <Text style={{fontSize:17}}>{this.state.createDate}</Text>
                        </View>
                        <View style={{width:100,height:25}}>
                            <Text style={{fontSize:17}}>{this.state.appointmentDate}</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    width:140,
                    height:90,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    }}>
                    <View style={{
                        width:130,
                        height:60,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between'
                        }}>
                        <View style={{width:130,height:25,backgroundColor:this.state.statusColor,alignItems: 'center',justifyContent: 'center',borderRadius:5}}>
                            <Text style={{fontSize:11}}>{this.state.statusName}</Text>
                        </View>
                        <View style={{width:100,height:25,marginLeft:5}}>
                            <Text style={{fontSize:17}}>{this.state.appointmentTime}</Text>
                        </View>
                    </View>
                </View>                
            </TouchableOpacity> 
            : null }  
            </View> 
        );
    }
}
const styles = StyleSheet.create({
    requestListItem:{
        height:90,
        width: Dimensions.get('window').width-20,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom:2,
        paddingLeft:10,        
        borderRadius:10,
        marginBottom:10, 
    },

});