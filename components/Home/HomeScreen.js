import React, {Component} from 'react';
import {View} from 'react-native';
import HomeScreenContent from './HomeScreenContent';
import ScreenTopMenu from './../Common/ScreenTopMenu';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';

export default class HomeScreen extends Component {
    
    render(){
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenu {...this.props}></ScreenTopMenu>
                    <HomeScreenContent {...this.props}></HomeScreenContent>
                    <ScreenBottomMenu {...this.props}></ScreenBottomMenu>
                </View>  
        );
    }
}