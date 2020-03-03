import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './Home/HomeScreen';
import LoginScreen from './Authentication/LoginScreen';
import RequestListScreen from './Requests/RequestListScreen';
import AppointmentListScreen from './Appointments/AppointmentListScreen';
import RequestTestListScreen from './Requests/RequestTestListScreen';
import RequestConfirmScreen from './Requests/RequestConfirmScreen';
import RequestViewScreen from './Requests/RequestViewScreen';

export default class Navigator extends Component {    
    render(){
        return(
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home" drawerContent={props => CustomDrawerContent(props)}>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="RequestList" component={RequestListScreen} />
                <Drawer.Screen name="AppointmentList" component={AppointmentListScreen} />
                <Drawer.Screen name="Login" component={LoginScreen} />
                <Drawer.Screen name="RequestTestList" component={RequestTestListScreen} />
                <Drawer.Screen name="RequestConfirm" component={RequestConfirmScreen} />
                <Drawer.Screen name="RequestView" component={RequestViewScreen} />
                </Drawer.Navigator>                                        
            </NavigationContainer>
            
        );
    }
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props){
  return(
    <View style ={{flex:1}}>
      <View style ={{
        height:130,        
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        borderBottomWidth:1,
        borderBottomColor:'black',
        paddingLeft:10,
        paddingBottom:15
        }}>
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
      </View>
      <View style ={{
        marginLeft:10}}>
        <MenuButtonContainer 
          screenName='Home'
          iconName='home'
          iconType='entypo'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Trang chủ'
          navigator = {props.navigation}
        />   
        <MenuButtonContainer 
          screenName='Login'
          iconName='user'
          iconType='antdesign'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Đăng nhập'
          navigator = {props.navigation}
        />
        <MenuButtonContainer 
          screenName='RequestList'
          iconName='list'
          iconType='Feather'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Lịch sử xét nghiệm'
          navigator = {props.navigation}
        />   
        <MenuButtonContainer 
          screenName='AppointmentList'
          iconName='list'
          iconType='Feather'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Lịch sử đặt khám'
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




