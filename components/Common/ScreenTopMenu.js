import React, {Component} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

export default class ScreenTopMenu extends Component {
    render(){
        return(            
            <View style ={styles.menuArea}>                           
                <Icon
                    name='menu'
                    type='entypo'
                    color={iconColor}
                    size= {40}
                    iconStyle={[styles.button,{marginLeft:20}]}
                    onPress= {() => {
                    this.props.navigation.openDrawer();
                    }}
                ></Icon>
                <Text style={styles.title}> MedTest</Text>
                <Icon
                    name='bell'
                    type='feather'
                    color='yellow'
                    size= {30}
                    iconStyle={[styles.button,{marginRight:20,height:30,width:30}]}
                    onPress={() => this.props.navigation.navigate('NotificationListScreen')}
                ></Icon> 
            </View>            
        );
    }
}

// const iconColor='#0A6ADA'
const iconColor='white'

const styles = StyleSheet.create({
    menuArea:{
        height:50, 
        width:'100%',
        backgroundColor: '#25345D',
        flexDirection: 'row',
        alignItems: 'center'
    },
    button:{
        height:40,
        width:40,                               
    },
    title:{
        fontSize: 26,
        color: 'white',
        flex: 1,
        textAlign: 'center',
        fontWeight:'bold'
    }
});