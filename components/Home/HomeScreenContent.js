import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import ScreenBackGround from './../Common/ScreenBackGround';
import HomeScreenArticleArea from './HomeScreenArticleArea';

export default class HomeScreenContent extends Component {
    render(){
        return(
            <View 
                style ={styles.background}>            
                <View style={styles.mainButtonArea}>     

                    <Button buttonStyle={[styles.mainButton,{
                        marginLeft: 40                        
                    }]}
                    titleStyle={{color:'#0A6ADA'}} title="Đặt khám"
                    >\</Button>  

                    <Button buttonStyle={[styles.mainButton,{
                        marginRight:40
                    }]}
                    titleStyle={{color:'#0A6ADA'}} title="Đặt xét nghiệm"
                    >\</Button>   

                </View>
                <HomeScreenArticleArea>
                </HomeScreenArticleArea>                
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
    mainButtonArea:{
        height: 140,
        width: Dimensions.get('window').width-20,
        backgroundColor: 'white',
        marginTop:15,
        marginBottom:20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom:3,
        borderRadius:10
    },
    mainButton:{
        height:100,
        width:100,                    
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor:'#0A6ADA',
        borderWidth: 3
    },    
});