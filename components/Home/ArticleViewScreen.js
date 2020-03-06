import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import {DrawerActions } from '@react-navigation/native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';

export default class ArticleViewScreen extends Component {
    
    render(){
        const imageUri = this.props.imageUri;
        const title = this.props.title;
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                    <View 
                        style={styles.articleArea}
                        >
                        <Image 
                            source={{uri:imageUri}}
                            style={styles.articleImage}
                            ></Image>
                        <View style={styles.articleTextArea}>
                            <Text style={styles.articleTitle}>{this.props.title}</Text>
                            <Text style={styles.articleShortContent}>{this.props.shortContent}</Text>
                        </View>                    
                    </View>   
                    <ScreenBottomMenu {...this.props}></ScreenBottomMenu>
                </View>  
        );
    }
}



const styles = StyleSheet.create({
    articleArea:{
        flex:1,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom:2,        
        borderRadius:10,
        marginBottom:10,
    },
    articleImage:{
        width:120,
        height:120,
        marginLeft:20
    },
    articleTextArea:{
        height:130,
        flex:1,
        marginLeft:10,
        marginRight:20,
        flexDirection: 'column'
    },
    articleTitle:{
        height:48,
        fontSize:19
    },
    articleShortContent:{
        height:80,
        fontSize:13
    }
});