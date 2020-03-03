import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import ScreenTopMenu from './../Common/ScreenTopMenu';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import TestCategoryItem from './TestCategoryItem'
import TestSelectItem from './TestSelectItem'

export default class HomeScreen extends Component {
    
    render(){
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenu {...this.props}></ScreenTopMenu>
                    <View 
                        style ={styles.background}>            
                        <View style={styles.titleArea}>     
                            <Text style={{fontSize:22,color:'#25345D'}}>Đặt xét nghiệm</Text>
                        </View>
                        <TextInput
                            style={styles.searchArea}
                            placeholder={'Tìm xét nghiệm'}
                            underlineColorAndroid='transparent'
                        />
                        <RequestTestListArea></RequestTestListArea>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.btnConfirm}
                                onPress={() => this.props.navigation.navigate('RequestConfirm')}
                                >
                                <Text style={styles.textBtn}>Đặt xét nghiệm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScreenBottomMenu></ScreenBottomMenu>
                </View>  
        );
    }
}



class RequestTestListArea extends Component{        
    state = {
        isDone: false
    };    
    render(){
        return(
            <View style = {styles.TestListAreaBackground}>
                <View
                    style = {styles.TestListArea}
                    >
                    <ScrollView 
                        style ={styles.TestListAreaScrollView}                        
                        showsVerticalScrollIndicator={false}
                    >
                    <TestCategoryItem
                        categoryName='Xét nghiệm hóa sinh Xét nghiệm hóa sinh '
                        totalPrice='100.000d'
                    />
                    <TestSelectItem
                        testName='Xét nghiệm hóa sinh Xét nghiệm hóa sinh '
                        testPrice='100.000d'
                        iconName='crop-square'
                        iconType='MaterialCommunityIcons'
                    />
                    <TestSelectItem
                        testName='Xét nghiệm hóa sinh Xét nghiệm hóa sinh Xét nghiệm hóa sinh'
                        testPrice='100.000d'
                        iconName='check'
                        iconType='AntDesign'
                    />
                    <TestCategoryItem
                        categoryName='Xét nghiệm hóa sinh Xét nghiệm hóa sinh Xét nghiệm hóa sinh'
                        totalPrice='100.000d'
                    />
                    <TestSelectItem
                        testName='Xét nghiệm hóa sinh Xét nghiệm hóa sinh Xét nghiệm hóa sinh'
                        testPrice='100.000d'
                        iconName='crop-square'
                        iconType='MaterialCommunityIcons'
                    />
                    <TestSelectItem
                        testName='Xét nghiệm hóa sinh Xét nghiệm hóa sinh Xét nghiệm hóa sinh'
                        testPrice='100.000d'
                        iconName='check'
                        iconType='AntDesign'
                    />
                    </ScrollView>
                </View>
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
        justifyContent: 'flex-end',
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