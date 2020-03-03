import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Button, Icon} from 'react-native-elements'

export default class ScreenBottomMenu extends Component {
    render(){
        return(
            <View style ={styles.menuArea}>
                <Icon
                    name='user'
                    type='antdesign'
                    color='#0A6ADA'
                    size= {40}
                    iconStyle={[styles.button,{marginLeft:20}]}
                ></Icon>
                
                <Icon
                    name='home'
                    type='entypo'
                    color='#0A6ADA'
                    size= {40}
                    iconStyle={[styles.button,{marginLeft:20}]}
                ></Icon>
                <Icon
                    name='phone-call'
                    type='feather'
                    color='#0A6ADA'
                    size= {40}
                    iconStyle={[styles.button,{marginRight:20}]}
                ></Icon>                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menuArea:{
        height:60, 
        backgroundColor: '#25345D',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button:{
        height:40,
        width:40,                           
    }
});