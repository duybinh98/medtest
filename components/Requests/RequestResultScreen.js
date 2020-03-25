import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView, FlatList, Image} from 'react-native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import {getApiUrl} from './../Common/CommonFunction';


export default class RequestResultScreen extends Component {
constructor(props) {
        super(props)
        this.state = {
            requestId: this.props.route.params.id? this.props.route.params.id : '',
            resultList: [],
            resetList: true,
        };        
        
    }


    componentDidMount(){
        this.callApiResultList(this.props.route.params.id? this.props.route.params.id : '')
    }

    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                requestId: this.props.route.params.id? this.props.route.params.id : '',
                resetList: !this.state.resetList
            }));
            this.callApiResultList(this.props.route.params.id? this.props.route.params.id : '');
        }
    }


    callApiResultList = async (id) =>{
        fetch(getApiUrl()+"/requests/detail/"+id+"/result")
        .then(res => res.json())
        .then(
            (result) => {
            this.setState(previousState => ({
                resultList: result,
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
                    <ScreenTopMenuBack navigation={this.props.navigation} ></ScreenTopMenuBack>
                    <View style = {styles.ResultListAreaBackground}>
                            <View style = {styles.ResultListArea}>
                                <FlatList 
                                    style ={styles.ResultListFlatList}                        
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.resultList}
                                    extraData={this.state.resetList}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({item}) => {
                                        return (
                                            <Image style={styles.imageItem}source={{ uri: item.image }} resizeMode='contain'/>                                    
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
    },    
    ResultListAreaBackground:{
        flex:1,
    },
    ResultListArea:{
        width: Dimensions.get('window').width-20,
        flex:1,
        backgroundColor:'white',
        borderRadius:10,
        padding:10,
        margin:10,
    },
    ResultListFlatList:{
        width: Dimensions.get('window').width-30,
        flex:1,
        backgroundColor:'white',
        borderRadius:10,
        marginTop:5
    },
    imageItem:{
        height:undefined,
        width: Dimensions.get('window').width-30,
        aspectRatio: 10/10,
        
        // alignSelf: 'stretch',
    }
});