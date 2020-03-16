import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import {Button} from 'react-native-elements';

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
        if (this.props.req_status ==='closed'){
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
                            name: 'RequestViewScreen',
                            params: {
                                name: this.props.cust_name,
                                address: this.props.appoint_address,
                                date: this.props.appoint_date,
                                freeTime: this.props.appoint_time,
                                selectedTest: this.props.selectedTest,   
                                status: this.state.statusName,
                                statusColor: this.state.statusColor,
                                testList: this.props.testList,
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
                            <Text style={{fontSize:17}}>{this.props.request_createTime}</Text>
                        </View>
                        <View style={{width:100,height:25}}>
                            <Text style={{fontSize:17}}>{this.props.appoint_date}</Text>
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
                            <Text style={{fontSize:17}}>{this.props.appoint_time}</Text>
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