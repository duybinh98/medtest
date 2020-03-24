import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import RequestListItem from './RequestListItem';
import requestsList from './../../Data/RequestsList'
import testList from './../../Data/Test'
import {getApiUrl} from './../Common/CommonFunction'


export default class RequestListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerId: '2',
            isDone: false,
            requestsList: requestsList,
            testsList: testList,
        };
        this.viewDone = this.viewDone.bind(this);
    }
    
    viewDone(){
        return this.state.isDone;
    }

    componentDidMount(){
        this.callApiRequestList();
        this.callApiTestList();
    }

    
    callApiTestList = async () => {
        fetch(getApiUrl()+"/test-types/type-test")
        .then(res => res.json())
        .then(
            (result) => {
            this.setState(previousState => ({
                testsList: result,
            }));
            },            
            (error) => {
                console.log(error)
            }
        )  
    }


    callApiRequestList(){
        fetch(getApiUrl()+'/users/customers/'+this.state.customerId+'/requests/list')
        .then(res => res.json())
        .then(
            (result) => {
            console.log(result)
            this.setState(previousState => ({
                requestsList: result,
            }));
            },            
            (error) => {
                console.log(error)
            }
        )  

    }


    render(){
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenuBack navigation={this.props.navigation} backScreen="HomeScreen"></ScreenTopMenuBack>
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
                                data={this.state.requestsList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => {
                                        return (
                                            <View>                                
                                            <RequestListItem
                                                request_createTime={item.requestCreatedTime}
                                                cust_name={item.customerName}
                                                cust_phone={item.customerPhoneNumber}
                                                cust_DOB={item.customerDOB}
                                                appoint_address={item.customerAddress}
                                                appoint_date={item.requestMeetingTime}
                                                appoint_time={item.requestMeetingTime}
                                                nurse_name={item.nurseName}
                                                nurse_id={item.nurseID}
                                                selectedTest={item.lsSelectedTest}
                                                req_amount={item.requestAmount}
                                                req_status={item.requestStatus}
                                                viewDone={this.viewDone}
                                                testList={this.state.testsList}
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