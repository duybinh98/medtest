import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import RequestListItem from './RequestListItem';
import requestsList from './../../Data/RequestsList'
import testList from './../../Data/Test'


export default class RequestListScreen extends Component {
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
                            <Text style={{fontSize:22,color:'#25345D'}}>Lịch sử xét nghiệm</Text>
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
                                data={requestsList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => {
                                        return (
                                            <View>                                
                                            <RequestListItem
                                                request_createTime={item.request_createTime}
                                                cust_name={item.cust_name}
                                                cust_phone={item.cust_phone}
                                                cust_DOB={item.cust_DOB}
                                                appoint_address={item.appoint_address}
                                                appoint_date={item.appoint_date}
                                                appoint_time={item.appoint_time}
                                                nurse_name={item.nurse_name}
                                                nurse_id={item.nurse_id}
                                                selectedTest={item.selectedTest}
                                                req_amount={item.req_amount}
                                                req_status={item.req_status}
                                                viewDone={this.viewDone}
                                                testList={testList}
                                                navigation={this.props.navigation}
                                            />   
                                            </View>                             
                                        );
                                    }}
                                >                   
                            </FlatList>
                        </View>
                    </View>
                    
                    <ScreenBottomMenu {...this.props}></ScreenBottomMenu>
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