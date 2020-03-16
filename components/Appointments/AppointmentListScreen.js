import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, FlatList} from 'react-native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import AppointmentListItem from './AppointmentListItem';
import appointmentsList from './../../Data/AppointmentList'

export default class Request extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDone: false
        };
        this.viewDone = this.viewDone.bind(this);
    }
    
    viewDone(){
        return this.state.isDone;
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
                        data={appointmentsList}
                        keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => {
                                        return (
                                            <View>                                
                                            <AppointmentListItem
                                                appointment_userName={item.appointment_userName}
                                                appointment_phoneNumber={item.appointment_phoneNumber}
                                                appointment_DOB={item.appointment_DOB}
                                                appointment_meetingTime={item.appointment_meetingTime}
                                                appointment_status={item.appointment_status}
                                                appointment_note={item.appointment_note}
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