import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TextInput, ScrollView, TouchableOpacity, Alert, FlatList} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import TestCategoryItem from './TestCategoryItem'
import TestViewItem from './TestViewItem'
import {getApiUrl} from './../Common/CommonFunction'


export default class RequestConfirmScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.route.params.name,
            address: this.props.route.params.address + ", "  + this.props.route.params.town + ", " +  this.props.route.params.district, 
            date: this.props.route.params.date,
            freeTime: this.props.route.params.time,
        };
        this.isSelected = this.isSelected.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    isSelected(id) {
        const found = this.props.route.params.selectedTest.findIndex(test => test == id);   
        let result = false;     
        found === -1 ? '' : result=true;     
        return result;
    }

    onConfirm  = async () => {
        fetch(getApiUrl()+'/requests/create', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userID: '2',
            meetingTime: '2021-03-02T06:27:00.000+0000',
            address: this.state.address,
            townCode: 'T1',
            districtCode: 'D1',
            selectedTest: ["1","2"],
        }),
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
            },
            (error) => {
                console.log(error)
            this.setState({
                error
            });
            }
        )
        ;
    }

    render(){
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                    <View 
                        style ={styles.background} 
                        >            
                        <View style={styles.titleArea}>     
                            <Text style={{fontSize:22,color:'#25345D'}}>Đặt xét nghiệm</Text>
                        </View>
                        <View style={styles.infoArea}>     
                            <View style={styles.textContainer}>
                                <Text style={styles.textInfor} >Tên hiển thị:  {this.state.name}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textInfor} >Địa chỉ: {this.state.address}</Text>
                            </View>
                            <View
                                style={[styles.textContainer,{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                }]}
                            >
                            <View
                                style={{
                                    width:170,
                                    height:20,
                                }}
                            >
                                <Text style={styles.textInfor} >Ngày hẹn: {this.state.date}</Text>
                            </View>
                            <View
                                style={{
                                    width:140,
                                    height:20,
                                }}
                            >
                                <Text style={styles.textInfor} >Giờ hẹn: {this.state.freeTime}</Text>
                            </View>
                            </View>
                        </View>
                        <View style = {styles.TestListAreaBackground}>
                            <View
                                style = {styles.TestListArea}
                                >
                                <FlatList 
                                    style ={styles.TestListAreaScrollView}                        
                                    showsVerticalScrollIndicator={false}
                                    //scrollEnabled={false}
                                    data={this.props.route.params.testsList}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({item}) => {
                                            return (
                                                <TestCategoryItem 
                                                    categoryName={item.testTypeName}
                                                    test = {item.listTest}
                                                    viewOnly = {true}
                                                    isSelected = {this.isSelected}
                                                    >
                                                </TestCategoryItem>                                    
                                            );
                                        }}
                                >                    
                                </FlatList>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <View style={styles.totalMoneyContainer}>
                                <Text>Tổng tiền: {this.props.route.params.totalPrice}</Text>
                            </View>
                            <TouchableOpacity style={styles.btnConfirm} 
                                onPress={() => {
                                    this.onConfirm()
                                    this.props.navigation.dispatch(
                                        CommonActions.navigate({
                                            name: 'RequestViewScreen',
                                            params: {
                                                name: this.state.name,
                                                address: this.state.address,
                                                date: this.state.date,
                                                freeTime: this.state.freeTime,
                                                selectedTest: this.props.route.params.selectedTest,   
                                                testsList: this.props.route.params.testsList,
                                                // customerInfo  = this.state.customerInfo,
                                            },
                                        })
                                    )
                                    
                                    }}                                                              
                                >
                                <Text style={styles.textBtn}>Xác nhận</Text>
                            </TouchableOpacity>
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
        alignItems: 'center',
    },
    titleArea:{
        height: 50,
        width: Dimensions.get('window').width-20,
        backgroundColor: 'white',
        marginTop:10,
        marginBottom:5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:3,
        borderRadius:10
    },
    infoArea:{
        height: 105,
        width: Dimensions.get('window').width-20,
        backgroundColor: 'white',
        marginTop:5,
        marginBottom:5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius:10,
        paddingTop:3
    },
    textContainer: {
        marginTop: 5,
        width: Dimensions.get('window').width - 55,
        height: 25,
        marginHorizontal: 15,
        justifyContent: 'center',
    },
    textInfor: {
        fontSize: 16,
    },
    TestListAreaBackground:{
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height-370,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:5,
        
    },
    TestListArea:{
        width: Dimensions.get('window').width-20,
        alignSelf: 'stretch',
        backgroundColor:'white',
        borderRadius:10,
        padding:10,
    },
    TestListAreaScrollView:{
        width: Dimensions.get('window').width-40,
        flex:1,
        backgroundColor:'white',
        borderRadius:10,
        marginTop:5
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width:Dimensions.get('window').width-20,
        height:54,
        marginBottom:10,
    },
    totalMoneyContainer:{
        width: 130,
        height: 45,
        justifyContent: 'center',
        paddingBottom:5,
        paddingLeft:2,
    },
    btnConfirm: {
        width: 130,
        height: 45,
        borderRadius: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderWidth:3,
        borderColor:'#0A6ADA',
        paddingBottom:3
    },
    textBtn: {
        color: '#0A6ADA',
        textAlign: "center",
        fontSize: 16,
    },

});