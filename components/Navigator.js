import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import CustomIcon from './CustomIcon'
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';

export default class Navigator extends Component {    
    render(){
        return(
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="home" drawerContent={props => CustomDrawerContent(props)}>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Login" component={LoginScreen} />
                </Drawer.Navigator>                                        
            </NavigationContainer>
            
        );
    }
}

const Drawer = createDrawerNavigator();

function MyHomeScreen ({navigation}) {
  return(
     <HomeScreen navigation={navigation}>
    </HomeScreen>
    );
}

function CustomDrawerContent(props){
  return(
    <View style ={{flex:1}}>
      <View style ={{
        height:150,        
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
      <TouchableOpacity
       style ={styles.navigatorButton}
       onPress={() => props.navigation.navigate('Home')}
      >
        <Icon
          name='home'
          type='entypo'
          color='#0A6ADA'
          size= {20}
          iconStyle={{}}
        ></Icon>
      <Text style={styles.navigatorButtonText}>Trang chủ</Text>
      </TouchableOpacity>
      <TouchableOpacity
       style ={styles.navigatorButton}
       onPress={() => props.navigation.navigate('Login')}
      >
      <Icon
          name='user'
          type='antdesign'
          color='#0A6ADA'
          size= {20}
          iconStyle={{}}
        ></Icon>
      <Text style={styles.navigatorButtonText}>Đăng nhập</Text>
      </TouchableOpacity> 
       <TouchableOpacity
       style ={styles.navigatorButton }
       onPress={() => props.navigation.navigate('Home')}
      >
      <Icon
          name='home'
          type='entypo'
          color='#0A6ADA'
          size= {20}
          iconStyle={{}}
        ></Icon>
      <Text style={styles.navigatorButtonText}>Trang chủ</Text>
      </TouchableOpacity>
      </View> 
    </View>
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




