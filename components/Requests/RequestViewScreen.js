import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TextInput, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import TestCategoryItem from './TestCategoryItem'
import TestViewItem from './TestViewItem'
import testList from './../../Data/Test'
import {getStateName, getStateColor} from './../Common/CommonFunction'

export default class RequestViewScreen extends Component {
constructor(props) {
        super(props)
        this.state = {
            requestId: this.props.route.params.id? this.props.route.params.id : '',
            name: this.props.route.params.name? this.props.route.params.name : '',
            dob: this.props.route.params.dob? this.props.route.params.dob : '',
            phone: this.props.route.params.phone? this.props.route.params.phone : '',
            address: this.props.route.params.address ? this.props.route.params.address :'',
            date: this.props.route.params.date ? this.props.route.params.date: '',
            time: this.props.route.params.time? this.props.route.params.time: '',
            selectedTest: this.props.route.params.selectedTest ? this.props.route.params.selectedTest: [],
            status: this.props.route.params.status? this.props.route.params.status:'pending',
            statusName: this.props.route.params.status? getStateName(this.props.route.params.status):'',
            statusColor: this.props.route.params.status? getStateColor(this.props.route.params.status):'#000',
            nurseName: this.props.route.params.nurseName ? this.props.route.params.nurseName:  '',
            totalAmount: this.props.route.params.totalAmount? this.props.route.params.totalAmount:'free',
            testsList: this.props.route.params.testsList? this.props.route.params.testsList: testList,
        };        
        this.isSelected = this.isSelected.bind(this);
        this.viewResult = this.viewResult.bind(this);
    }


    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps.route.params !== this.props.route.params) {
            this.setState(previousState => ({ 
                requestId: this.props.route.params.id? this.props.route.params.id : '',
                name: this.props.route.params.name? this.props.route.params.name : '',
                dob: this.props.route.params.dob? this.props.route.params.dob : '',
                phone: this.props.route.params.phone? this.props.route.params.phone : '',
                address: this.props.route.params.address ? this.props.route.params.address :'',
                date: this.props.route.params.date ? this.props.route.params.date: '',
                time: this.props.route.params.time? this.props.route.params.time: '',
                selectedTest: this.props.route.params.selectedTest ? this.props.route.params.selectedTest: [],
                status: this.props.route.params.status? this.props.route.params.status:'pending',
                statusName: this.props.route.params.status? getStateName(this.props.route.params.status):'',
                statusColor: this.props.route.params.status? getStateColor(this.props.route.params.status):'#000',
                nurseName: this.props.route.params.nurseName ? this.props.route.params.nurseName:  '',
                totalAmount: this.props.route.params.totalAmount? this.props.route.params.totalAmount:'free',
            }));
        }
    }


    isSelected(id) {
        const found = this.state.selectedTest.findIndex(test => test == id);   
        let result = false;     
        found === -1 ? '' : result=true;     
        return result;
    }

    viewResult(){
        this.props.navigation.dispatch(
            CommonActions.navigate({
                name: 'RequestResultScreen',
                params: {
                    id: this.state.requestId,
                },
            })
        )
    }



    render(){
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenuBack navigation={this.props.navigation} backScreen="RequestListScreen"></ScreenTopMenuBack>
                    <ScrollView 
                        style ={styles.background}                                            
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        >            
                        <View style={styles.titleArea}>     
                            <Text style={{fontSize:22,color:'#25345D'}}>Đặt xét nghiệm</Text>
                        </View>
                        <View style={styles.infoArea}>     
                            <View style={styles.textContainer}>
                                <Text style={styles.textInfor} >Tên hiển thị:  {this.state.name}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textInfor} >Số điện thoại: {this.state.phone}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textInfor} >Ngày sinh: {this.state.dob}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textInfor} >Địa chỉ: {this.state.address}</Text>
                            </View>
                            <View style={styles.doubleContainer}>
                                <View style={{
                                    width:180
                                    }}>
                                    <Text style={styles.textInfor} >Ngày hẹn: {this.state.date}</Text>
                                </View>
                                <View style={{
                                    width:120
                                    }}>
                                    <Text style={styles.textInfor} >Giờ hẹn: {this.state.time}</Text>
                                </View>
                            </View>
                            <View style={styles.doubleContainer}>
                                <View style={{
                                    width:82
                                    }}>
                                    <Text style={styles.textInfor} >Trạng thái:</Text>
                                </View>
                                <View style={{
                                    width:180
                                    }}>
                                    <Text style={[styles.textInfor,{color:this.state.statusColor}]} >{this.state.statusName}</Text>
                                </View>                                                             
                            </View> 
                            {this.state.status !== 'pending' ? this.state.status !== 'coordinatorlostsample'?
                            <View style={styles.doubleContainer}>
                                <View style={{
                                    width:205
                                    }}>
                                    <Text style={styles.textInfor} >Y tá: {this.state.nurseName}</Text>
                                </View>
                                <View style={{
                                    width:110
                                    }}>
                                    <TouchableOpacity style={[styles.btnConfirm,{height:26,width:100}]} onPress={() => this.props.navigation.navigate('CustomerInformation')}>
                                        <Text style={[styles.textBtn,{fontSize:12}]}>Xem thông tin</Text>
                                    </TouchableOpacity>
                                </View>                                                       
                            </View>  
                            : null : null
                            }                          
                        </View>
                        <View style = {styles.TestListAreaBackground}>
                            <View
                                style = {styles.TestListArea}
                                >
                                <FlatList 
                                    style ={styles.TestListAreaScrollView}                        
                                    showsVerticalScrollIndicator={false}
                                    scrollEnabled={false}
                                    data={this.state.testsList}
                                    extraData={this.state.selectedTest}
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
                            {this.state.status=='pending' ? 
                            <TouchableOpacity style={styles.btnConfirm}>
                                <Text style={styles.textBtn}>{'Hủy đơn xét nghiệm'}</Text>
                            </TouchableOpacity>
                            : this.state.status=='closed' ? 
                            <TouchableOpacity style={styles.btnConfirm} onPress={() => this.viewResult()}>
                                <Text style={styles.textBtn}>{'Xem kết quả'}</Text>
                            </TouchableOpacity>
                            : <View/>}
                            <TouchableOpacity style={styles.btnConfirm} onPress={() => this.props.navigation.navigate('HomeScreen')}>
                                <Text style={styles.textBtn} >Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <ScreenBottomMenu {...this.props}></ScreenBottomMenu>
                </View>  
        );
    }
}



const styles = StyleSheet.create({
    background:{
        flex:1, 
        backgroundColor: '#f1f0f0',

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
        alignSelf: 'stretch',
        width: Dimensions.get('window').width-20,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius:10,
        marginTop:5,
        marginBottom:5,
        paddingTop:3,
        marginLeft:10,
        paddingBottom:10,
    },
    textContainer: {
        marginTop: 5,
        width: Dimensions.get('window').width - 55,
        alignSelf: 'stretch',
        paddingLeft:3,
        marginHorizontal: 15,
        justifyContent: 'center',
    },
    textInfor: {
        fontSize: 16,
    },
    doubleContainer:{
        marginTop: 5,
        width: Dimensions.get('window').width - 55,
        alignSelf: 'stretch',
        paddingLeft:3,
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    searchArea:{
        height: 40,
        width: Dimensions.get('window').width-40,
        backgroundColor: 'white',
        marginTop:5,
        
        paddingLeft:10,
        paddingRight:5,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#25345D',
        color:'#25345D'
    },
    TestListAreaBackground:{
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
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
        marginBottom:10
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