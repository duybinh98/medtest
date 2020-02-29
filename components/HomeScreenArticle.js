import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import ScreenBackGround from './ScreenBackGround';

export default class HomeScreenArticle extends Component {
    render(){
        return(
            <TouchableOpacity 
                style={styles.articleArea}>
                
                    <Image 
                        source={{uri:this.props.imageUri}}
                        style={styles.articleImage}
                        ></Image>
                    <View style={styles.articleTextArea}>
                        <Text style={styles.articleTitle}>{this.props.title}</Text>
                        <Text style={styles.articleShortContent}>{this.props.shortContent}</Text>
                </View>                    
            </TouchableOpacity>        
        );
    }
}
const styles = StyleSheet.create({
    articleArea:{
        height:150,
        width: Dimensions.get('window').width-20,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom:2,        
        borderRadius:10,
        marginBottom:10
    },
    articleImage:{
        width:120,
        height:120,
        marginLeft:20
    },
    articleTextArea:{
        height:120,
        flex:1,
        marginLeft:10,
        marginRight:20,
        flexDirection: 'column'
    },
    articleTitle:{
        height:50,
        fontSize:20
    },
    articleShortContent:{
        height:70,
        fontSize:13
    }
});