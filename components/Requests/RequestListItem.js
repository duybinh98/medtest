import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import {Button} from 'react-native-elements';
import {getStateName, getStateColor, convertDateTimeToDate, convertDateTimeToTime} from './../Common/CommonFunction'

export default class RequestListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusName:'',
            statusColor:''
        };
        this.isVisible = this.isVisible.bind(this);
    }
    componentDidMount(){
        switch (this.props.req_status) {
        case 'pending':
            this.setState(previousState => ({ 
                statusName:'Đang đợi y tá nhận đơn',
                statusColor:'#ffd66f'
            }));
            break;
        case 'accepted':
            this.setState(previousState => ({ 
                statusName:'Đang đợi lấy mẫu',
                statusColor:'#a4d57b'
            }));
            break;
        case 'transporting':
            this.setState(previousState => ({ 
                statusName:'Đang vận chuyển mẫu',
                statusColor:'#a4d57b'
            }));
            break;
        case 'waitingforresult':
            this.setState(previousState => ({ 
                statusName:'Đang đợi kết quả',
                statusColor:'#6398d6'
            }));
            break;
        case 'closed':
            this.setState(previousState => ({ 
                statusName:'',
                statusColor:''
            }));
            break;
        case 'lostsample':
            this.setState(previousState => ({ 
                statusName:'Đang đợi lấy lại mẫu',
                statusColor:'#a4d57b'
            }));
            break;
        case 'coordinatorlostsample':
            this.setState(previousState => ({ 
                statusName:'Đang đợi y tá nhận đơn',
                statusColor:'#ffd66f'
            }));
            break;
        }        
    }

    isVisible(){
        if (this.props.req_status ==='closed' || this.props.req_status ==='canceled' ){
            if (this.props.viewDone() == true) return true;
            return false;
        }
        if (this.props.viewDone() == true) return false;
        return true;
    }

    render(){       
        debugger;
        const a = this.state.testListVersion;
        const b = this.props.customerInfor; 
        return(
            <View>
            {this.isVisible() ?
            <TouchableOpacity 
                style={styles.requestListItem}
                onPress={() => {
                    this.props.navigation.dispatch(
                        CommonActions.navigate({
                            name: 'RequestViewScreen',
                            params: {
                                id: this.props.requestId,
                                name: this.props.cust_name,
                                dob: convertDateTimeToDate(this.props.cust_DOB),
                                phone: this.props.cust_phone,
                                address: this.props.appoint_address,
                                date: convertDateTimeToDate(this.props.appoint_date),
                                time: convertDateTimeToTime(this.props.appoint_date),
                                selectedTest: this.props.selectedTest,   
                                status: this.props.req_status,   
                                nurseId: this.props.nurse_id,                              
                                nurseName: this.props.nurse_name,
                                totalAmount: this.props.req_amount,
                                testsList: this.props.testList,
                                currentVersion: this.props.current_version,
                                requestVersion: this.props.req_version,
                                createdTime:  convertDateTimeToDate(this.props.request_createTime),
                                backScreen:'RequestListScreen'
                            },
                        })
                    )
                    }}
            
            >                
                <View style={[styles.requestListTextContainer,{
                    paddingTop:10,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                }]}>
                    <View>
                    <Text style={{fontSize:17}}>{"Ngày tạo:  "+convertDateTimeToDate(this.props.request_createTime)}</Text>
                    </View>
                    <View style={{backgroundColor:getStateColor(this.props.req_status), padding:4, width:130,alignItems: 'center',}}>
                    <Text style={{fontSize:11}}>{getStateName(this.props.req_status)}</Text>
                    </View> 
                </View>   
                <View style={[styles.requestListTextContainer,{
                    paddingBottom:10,
                }]}>
                    <Text style={{fontSize:17}}>{"Ngày hẹn: "+convertDateTimeToDate(this.props.appoint_date)+'  '+convertDateTimeToTime(this.props.appoint_date)}</Text>
                </View>     


            </TouchableOpacity> 
            : null }  
            </View> 
        );
    }
}
const styles = StyleSheet.create({
    requestListItem:{
        alignSelf: 'stretch',
        width: Dimensions.get('window').width-20,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingBottom:2,       
        borderRadius:10,
        marginBottom:10, 
    },
    requestListTextContainer:{
        alignSelf: 'stretch',
        width:Dimensions.get('window').width-20,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:3,
        paddingTop:3,
    }
});