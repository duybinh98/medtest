import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, FlatList} from 'react-native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import AppointmentListItem from './AppointmentListItem';
import {getApiUrl} from './../Common/CommonFunction'
import { connect } from 'react-redux';

// import appointmentsList from './../../Data/AppointmentList'
class AppointmentListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDone: false,
            customerId: this.props.customerInfor? this.props.customerInfor.id: '-1',
            // customerId: '1',
            appointmentsList : null,
        };
        this.viewDone = this.viewDone.bind(this);
    }
    
    viewDone(){
        return this.state.isDone;
    }

    componentDidMount(){
        this.callApiAppointmentList();
        this.props.navigation.addListener("focus", () => {
            this.callApiAppointmentList();
        })
    }

    callApiAppointmentList = async () =>  {
        fetch(getApiUrl()+"/users/customers/"+this.state.customerId+"/appointments/list", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+this.props.token,
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
            this.setState(previousState => ({
                appointmentsList: result,
            }));
            },            
            (error) => {
            this.setState({
                error
            });
            }
        )
    }
    render(){
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                    <View 
                        style ={styles.background}>            
                        <View style={styles.titleArea}>     
                            <Text style={{fontSize:22,color:'#25345D'}}>Lịch sử đặt khám</Text>
                        </View>
                        <View style = {{flex:1}}>
                <View style={[styles.titleArea,{
                    height:60,
                    marginBottom:10
                    }]}>     
                    <TouchableOpacity
                        onPress={() => this.setState(previousState => (
                            { isDone: false }
                        ))}
                        style ={[styles.mainButton,{
                            backgroundColor:this.state.isDone?'#b1de8c':'#6fc02d',
                            borderWidth:this.state.isDone? 0:3,
                            borderBottomLeftRadius:10,
                            borderTopLeftRadius:10
                        }]}                                
                        >
                        <Text style={{fontSize:18}}>Đơn chưa xong</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState(previousState => (
                            { isDone: true }
                        ))}
                        style ={[styles.mainButton,{
                            backgroundColor:this.state.isDone?'#fba739':'#fccd90',
                            borderWidth:this.state.isDone? 3:0,
                            borderBottomRightRadius:10,
                            borderTopRightRadius:10                           
                        }]}                                
                        >
                        <Text style={{fontSize:18}}>Đơn đã xong</Text>
                    </TouchableOpacity>                    
                    </View>
                    <FlatList style={{                    
                        flex:1
                        }}
                        showsVerticalScrollIndicator={false}
                        data={this.state.appointmentsList}
                        keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => {
                                        return (
                                            <View>                                
                                            <AppointmentListItem
                                                appointment_id = {item.appointment_id}
                                                appointment_userName={item.appointment_customerName}
                                                appointment_phoneNumber={item.appointment_phoneNumber}
                                                appointment_DOB={item.appointment_DOB}
                                                appointment_meetingTime={item.appointment_meetingTime}
                                                appointment_status={item.appointment_status}
                                                appointment_note={item.appointment_note}
                                                appointment_createdTime={item.appointment_createdTime}
                                                viewDone={this.viewDone}
                                                navigation={this.props.navigation}
                                            />   
                                            </View>                             
                                        );
                                    }}
                        >                           
                    </FlatList>
                </View>
                    </View>
                    
                    <ScreenBottomMenu></ScreenBottomMenu>
                </View>  
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.login.token,
        customerInfor: state.loadCustomer.customerInfor,
        isLoadSuccess: state.loadCustomer.isLoadSuccess,
        loadError: state.loadCustomer.LoadError
    };
}
const mapStateToDispatch = (dispatch) => {
    return {
        load: (customerInfor) => dispatch(loadCustomerInfor(customerInfor)),
    };
}

export default connect(mapStateToProps, mapStateToDispatch)(AppointmentListScreen);



const styles = StyleSheet.create({
    background:{
        flex:1, 
        backgroundColor: '#f1f0f0',
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleArea:{
        height: 50,
        width: Dimensions.get('window').width-20,
        backgroundColor: 'white',
        marginTop:15,
        marginBottom:5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:3,
        borderRadius:10
    },
    mainButton:{
        width:150,
        height:33,        
        justifyContent:'center',
        alignItems:'center',  
        borderColor:'black'
    },    
});