import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView} from 'react-native';
import ScreenTopMenu from './../Common/ScreenTopMenu';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import RequestListItem from './RequestListItem';

export default class RequestListScreen extends Component {
    let 
    render(){
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenu {...this.props}></ScreenTopMenu>
                    <View 
                        style ={styles.background}>            
                        <View style={styles.titleArea}>     
                            <Text style={{fontSize:22,color:'#25345D'}}>Lịch sử xét nghiệm</Text>
                        </View>
                        <RequestListArea></RequestListArea>
                    </View>
                    
                    <ScreenBottomMenu></ScreenBottomMenu>
                </View>  
        );
    }
}

class RequestListArea extends Component{        
    state = {
        isDone: false
    };    
    render(){
        return(
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
                <ScrollView style={{                    
                    flex:1
                    }}
                    maximumZoomScale={1}
                    minimumZoomScale={1}
                    showsVerticalScrollIndicator={false}
                    >

                        {!this.state.isDone ? <RequestListItem
                            createDate='20/12/2020'
                            requestDate='20/12/2020'
                            requestTime='19h30'
                            status='Đang đợi y tá nhận đơn'
                            statusColor='#ffd66f'
                        />
                        :<View/>}
                        
                        {!this.state.isDone ? <RequestListItem
                            createDate='20/12/2020'
                            requestDate='20/12/2020'
                            requestTime='19h30'
                            status='Đang đợi lấy mẫu'
                            statusColor='#a4d57b'
                        />
                        :<View/>}

                        {!this.state.isDone ? <RequestListItem
                            createDate='20/12/2020'
                            requestDate='20/12/2020'
                            requestTime='19h30'
                            status='Đang đợi kết quả'
                            statusColor='#6398d6'
                        />
                        :<View/>}
                        
                        {this.state.isDone ? <RequestListItem
                            createDate='20/12/2020'
                            requestDate='20/12/2020'
                            requestTime='19h30'
                        />
                        :<View/>}
                        
                </ScrollView>
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