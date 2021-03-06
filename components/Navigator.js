import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import ChangePassword from './Account/ChangePassword';
import CustomerInformation from './Account/CustomerInformation';
import UpdateInformation from './Account/UpdateInformation';

import AppointmentListScreen from './Appointments/AppointmentListScreen';
import AppointmentDetailScreen from './Appointments/AppointmentDetailScreen';

import LoginScreen from './Authentication/LoginScreen';
import RegisterScreen from './Authentication/RegisterScreen';
import ResetPasswordScreen from './Authentication/ResetPasswordScreen';

import ArticleViewScreen from './Home/ArticleViewScreen';
import HomeScreen from './Home/HomeScreen';
import NotificationListScreen from './Home/NotificationListScreen';

import RequestConfirmScreen from './Requests/RequestConfirmScreen';
import RequestListScreen from './Requests/RequestListScreen';
import RequestPersionalInformation from './Requests/RequestPersionalInformation';
import RequestTestListScreen from './Requests/RequestTestListScreen';
import RequestViewScreen from './Requests/RequestViewScreen';

export default class Navigator extends Component {    
    render(){
        return(
            <NavigationContainer>
              <Drawer.Navigator initialRouteName="HomeScreen" drawerContent={props => CustomDrawerContent(props)}>
                <Drawer.Screen name="ChangePassword" component={ChangePassword} />
                <Drawer.Screen name="CustomerInformation" component={CustomerInformation} />
                <Drawer.Screen name="UpdateInformation" component={UpdateInformation} />

                <Drawer.Screen name="AppointmentListScreen" component={AppointmentListScreen} />
                <Drawer.Screen name="AppointmentDetailScreen" component={AppointmentDetailScreen} />
                
                <Drawer.Screen name="LoginScreen" component={LoginScreen} />
                <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
                <Drawer.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />

                <Drawer.Screen name="ArticleViewScreen" component={ArticleViewScreen} />
                <Drawer.Screen name="HomeScreen" component={HomeScreen} />
                <Drawer.Screen name="NotificationListScreen" component={NotificationListScreen} />

                <Drawer.Screen name="RequestConfirmScreen" component={RequestConfirmScreen} />
                <Drawer.Screen name="RequestListScreen" component={RequestListScreen} />                
                <Drawer.Screen name="RequestPersionalInformation" component={RequestPersionalInformation} />                
                <Drawer.Screen name="RequestTestListScreen" component={RequestTestListScreen} />                
                <Drawer.Screen name="RequestViewScreen" component={RequestViewScreen} />
              </Drawer.Navigator>                                        
            </NavigationContainer>
            
        );
    }
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props){
  return(
    <View style ={{flex:1}}>
      <TouchableOpacity 
        style ={{
        height:130,        
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        borderBottomWidth:1,
        borderBottomColor:'black',
        paddingLeft:10,
        paddingBottom:15
        }}
        onPress={() => props.navigation.navigate('CustomerInformation')}
        >
          <Icon
            name='user'
            type='antdesign'
            color='#0A6ADA'
            size= {60}            
            iconStyle={{
              marginLeft:10,
              marginBottom:5
            }}
            >
          </Icon>
          <Text style={{
            fontSize: 15,
            color: 'black',
          }}>+84123456789</Text>
          <Text style={{
            fontSize: 20,
            color: 'black',
          }}>Nguyen Van An</Text>
      </TouchableOpacity>
      <View style ={{
        marginLeft:10}}>
        
        <MenuButtonContainer 
          screenName='RequestListScreen'
          iconName='linechart'
          iconType='antdesign'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Lịch sử xét nghiệm'
          navigator = {props.navigation}
        />   
        <MenuButtonContainer 
          screenName='AppointmentListScreen'
          iconName='wechat'
          iconType='antdesign'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Lịch sử đặt khám'
          navigator = {props.navigation}
        />  
        <MenuButtonContainer 
          screenName='HomeScreen'
          iconName='phone-call'
          iconType='feather'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Liên hệ'
          navigator = {props.navigation}
        />  
        <MenuButtonContainer 
          screenName='HomeScreen'
          iconName='facebook-square'
          iconType='antdesign'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='MedTest on Facebook'
          navigator = {props.navigation}
        />  
        <MenuButtonContainer 
          screenName='HomeScreen'
          iconName='tool'
          iconType='antdesign'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Mời bạn bè cài đặt'
          navigator = {props.navigation}
        />  
        <MenuButtonContainer 
          screenName='LoginScreen'
          iconName='logout'
          iconType='antdesign'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Đăng xuất'
          navigator = {props.navigation}
        />  
      </View> 
    </View>
  );
}

function MenuButtonContainer({screenName, iconName, iconType, iconColor, iconSize, screenTitle, navigator}) {
  return(
    <TouchableOpacity
       style ={styles.navigatorButton}
       onPress={() => navigator.navigate(screenName)}
      >
        <Icon
          name={iconName}
          type={iconType}
          color={iconColor}
          size= {iconSize}
          iconStyle={{}}
        ></Icon>
      <Text style={styles.navigatorButtonText}>{screenTitle}</Text>
      </TouchableOpacity>
      
  );
}

const styles = StyleSheet.create({
  navigatorButton:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop:20
  },
  navigatorButtonText:{
    fontSize:18,
    marginLeft:7
  }

});




