import React, {Component} from 'react';
import {View} from 'react-native';
import HomeScreenContent from './HomeScreenContent';
import ScreenTopMenu from './ScreenTopMenu';
import ScreenBottomMenu from './ScreenBottomMenu';

export default class HomeScreen extends Component {
    
    render(){
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenu {...this.props}></ScreenTopMenu>
                    <HomeScreenContent></HomeScreenContent>
                    <ScreenBottomMenu></ScreenBottomMenu>
                </View>  
        );
    }
}