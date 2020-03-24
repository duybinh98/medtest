import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TextInput, ScrollView, TouchableOpacity, Keyboard, FlatList, Alert} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import TestCategoryItem from './TestCategoryItem'
import TestSelectItem from './TestSelectItem'
import testList from './../../Data/Test'

export default class HomeScreen extends Component {
    
    constructor(props){
        super(props);
        this.state={
            customerId: this.props.route.params.customerId ? this.props.route.params.customerId : '-1',
            showFooter: true,
            selectedTest: [],
            testsList: this.props.route.params.testsList ? this.props.route.params.testsList : testList,
            totalPrice: '0',
            customerInfo: this.props.route.params.customerInfo ? this.props.route.params.customerInfo : null,
        }
        this.selectItem = this.selectItem.bind(this)
        this.resetSelectedTestOnConfirm = this.resetSelectedTestOnConfirm.bind(this)   
    }
    

    selectItem(id,price) {
        let _selectedTest = this.state.selectedTest;
        let _totalPrice = parseInt(this.state.totalPrice);
        let _price = parseInt(price);
        const found = _selectedTest.findIndex(test => test == id);
        found === -1 ? _selectedTest.push(id) : _selectedTest.splice(found, 1);
        found === -1 ? _totalPrice+=_price : _totalPrice-=_price;
        this.setState({            
            selectedTest: _selectedTest,
            totalPrice:_totalPrice
        })        
    }

    resetSelectedTestOnConfirm(){
        this.setState({            
            selectedTest: [],
            totalPrice: '0'
        }) 
    }

    RenderFooter(){
        if(this.state.showFooter){
            return(
                <ScreenBottomMenu {...this.props}></ScreenBottomMenu>
            )
        } else {
            return null
        }
    }

    componentDidMount(){
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    // componentWillUnmount() {
    //     this.keyboardDidShowSub.remove();
    //     this.keyboardDidHideSub.remove();
    // }



    keyboardDidShow = (event) => {
        this.setState({
            showFooter: false
        })
    };

    keyboardDidHide = (event) => {
        this.setState({
            showFooter: true
        })
    };

    render(){
        return(
                <View style={{
                    flex:1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    }}>
                    <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                    <View style ={styles.background}>            
                        <View style={styles.titleArea}>     
                            <Text style={{fontSize:22,color:'#25345D'}}>Đặt xét nghiệm</Text>
                        </View>
                        <TextInput
                            style={styles.searchArea}
                            placeholder={'Tìm xét nghiệm'}
                            underlineColorAndroid='transparent'
                        />                        
                        <View style = {styles.TestListAreaBackground}>
                            <View style = {styles.TestListArea}>
                                <FlatList 
                                    style ={styles.TestListAreaScrollView}                        
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.testsList}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({item}) => {
                                        return (
                                            <TestCategoryItem 
                                                categoryName={item.testTypeName}
                                                test = {item.listTest}
                                                viewOnly = {false}
                                                selectItem = {this.selectItem}
                                            >
                                            </TestCategoryItem>                                    
                                        );
                                    }}
                                >                    
                                </FlatList>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <View style={[styles.btnConfirm,{borderWidth:0, width:150}]}>
                            <Text style={{fontSize:15}}>{'Tổng tiền: '+this.state.totalPrice+' đ'}</Text>
                            </View>
                            <TouchableOpacity 
                                style={styles.btnConfirm}
                                onPress={() => this.state.customerId !='-1' ? this.props.navigation.dispatch(
                                    CommonActions.navigate({
                                        name: 'RequestPersonalInformation',
                                        params: {
                                            selectedTest: this.state.selectedTest, 
                                            totalPrice: this.state.totalPrice, 
                                            testsList: this.state.testsList,
                                            customerInfo: this.state.customerInfo,
                                            resetSelectedTestOnConfirm: this.resetSelectedTestOnConfirm
                                        },
                                    })
                                ) : 
                                    Alert.alert('Bạn cần đăng nhập để có thể sử dụng chức năng đặt xét nghiệm')
                                }
                                >
                                <Text style={styles.textBtn}>Đặt xét nghiệm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.RenderFooter()}
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
        marginTop:10,
        marginBottom:5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:3,
        borderRadius:10
    },
    searchArea:{
        height: 40,
        width: Dimensions.get('window').width-20,
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
        height:270,
        marginTop:5,
    },
    TestListArea:{
        width: Dimensions.get('window').width-20,
        flex:1,
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