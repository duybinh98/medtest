import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert, BackHandler, ImageBackground } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { login, logout } from './Reducers/LoginReducer';
import { loadCustomerInfor } from './Reducers/LoadInforReducer';
import { CommonActions } from '@react-navigation/native';

import ChangePassword from './Account/ChangePassword';
import CustomerInformation from './Account/CustomerInformation';
import UpdateInformation from './Account/UpdateInformation';
import UpdateAddress from './Account/UpdateAddress';

import AppointmentListScreen from './Appointments/AppointmentListScreen';
import AppointmentDetailScreen from './Appointments/AppointmentDetailScreen';
import CreateAppointmentScreen from './Appointments/CreateAppointmentScreen';

import ConfirmOTPScreen from './Authentication/ConfirmOTPScreen';
import LoginScreen from './Authentication/LoginScreen';
import RegisterScreen from './Authentication/RegisterScreen';
import ResetPasswordScreen from './Authentication/ResetPasswordScreen';

import ArticleViewScreen from './Home/ArticleViewScreen';
import HomeScreen from './Home/HomeScreen';
import NotificationListScreen from './Home/NotificationListScreen';

import RequestConfirmScreen from './Requests/RequestConfirmScreen';
import RequestListScreen from './Requests/RequestListScreen';
import RequestPersonalInformation from './Requests/RequestPersonalInformation';
import RequestResultScreen from './Requests/RequestResultScreen';
import RequestTestListScreen from './Requests/RequestTestListScreen';
import RequestViewScreen from './Requests/RequestViewScreen';
import ViewNurseScreen from './Requests/ViewNurseScreen';
// import UpdateAddressForm from './Account/UpdateAddress';

// const navigation = useNavigation();
class Navigator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      customerInfor: null,
      isLoadSuccess: null,
      loadError: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState(previousState => ({
        token: this.props.token,
        customerInfor: this.props.customerInfor,
        isLoadSuccess: this.props.isLoadSuccess,
        loadError: this.props.loadError,
      }));
    }
  }
  render() {
    return (
      <NavigationContainer>

        <Drawer.Navigator initialRouteName="LoginScreen"
        //  {/* <Drawer.Navigator initialRouteName="ConfirmOTPScreen" */}
          drawerContent={props => CustomDrawerContent(props, this.state ? this.state : null, this.props)}
        >
          {/* <Drawer.Navigator initialRouteName="ConfirmOTPScreen"
          drawerContent={props => CustomDrawerContent(props, this.state ? this.state : null, this.props)}
        > */}
          <Drawer.Screen name="ChangePassword" component={ChangePassword} />
          <Drawer.Screen name="CustomerInformation" component={CustomerInformation} />
          <Drawer.Screen name="UpdateInformation" component={UpdateInformation} />
          <Drawer.Screen name="UpdateAddress" component={UpdateAddress} />

          <Drawer.Screen name="AppointmentListScreen" component={AppointmentListScreen} />
          <Drawer.Screen name="AppointmentDetailScreen" component={AppointmentDetailScreen} />
          <Drawer.Screen name="CreateAppointmentScreen" component={CreateAppointmentScreen} />

          <Drawer.Screen name="ConfirmOTPScreen" component={ConfirmOTPScreen} />
          <Drawer.Screen name="LoginScreen" component={LoginScreen} />
          <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
          <Drawer.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />

          <Drawer.Screen name="ArticleViewScreen" component={ArticleViewScreen} />
          <Drawer.Screen name="HomeScreen" component={HomeScreen} />
          <Drawer.Screen name="NotificationListScreen" component={NotificationListScreen} />

          <Drawer.Screen name="RequestConfirmScreen" component={RequestConfirmScreen} />
          <Drawer.Screen name="RequestListScreen" component={RequestListScreen} />
          <Drawer.Screen name="RequestPersonalInformation" component={RequestPersonalInformation} />
          <Drawer.Screen name="RequestResultScreen" component={RequestResultScreen} />
          <Drawer.Screen name="RequestTestListScreen" component={RequestTestListScreen} />
          <Drawer.Screen name="RequestViewScreen" component={RequestViewScreen} />
          <Drawer.Screen name="ViewNurseScreen" component={ViewNurseScreen} />
        </Drawer.Navigator>
      </NavigationContainer>

    );
  }
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props, state, navigatorProps) {

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          height: 200,
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          borderBottomWidth: 1,
          borderBottomColor: 'black',
          paddingLeft: 10,
          paddingBottom: 15
        }}
        onPress={() => props.navigation.navigate('CustomerInformation')}
      >
        {navigatorProps.customerInfor == null ?
          <Icon
            name='user'
            type='antdesign'
            color='#0A6ADA'
            size={60}
            iconStyle={{
              marginLeft: 10,
              marginBottom: 15
            }}
          >
          </Icon>
          : <ImageBackground
            source={{ uri: navigatorProps.customerInfor.image ? navigatorProps.customerInfor.image : '' }}
            // source={{ uri: '' }}
            style={styles.logo} >
          </ImageBackground>
        }

        <Text style={{
          fontSize: 15,
          color: 'black',
        }}>{state ? state.customerInfor ? state.customerInfor.phoneNumber : '0000000000' : '0000000000'}</Text>
        <Text style={{
          fontSize: 20,
          color: 'black',
        }}>{state ? state.customerInfor ? state.customerInfor.name : 'A guest' : 'A guest'}</Text>
      </TouchableOpacity>
      <View style={{
        marginLeft: 10
      }}>

        <MenuButtonScreenContainer
          screenName='RequestListScreen'
          iconName='linechart'
          iconType='antdesign'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Lịch sử xét nghiệm'
          navigator={props.navigation}
        />
        <MenuButtonScreenContainer
          screenName='AppointmentListScreen'
          iconName='wechat'
          iconType='antdesign'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Lịch sử đặt khám'
          navigator={props.navigation}
        />
        <MenuButtonLinkingContainer
          iconName='phone-call'
          iconType='feather'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Liên hệ'
          link='tel:1900561252'
        />
        <MenuButtonLinkingContainer
          iconName='facebook-square'
          iconType='antdesign'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='MedTest on Facebook'
          // link='fb://profile/?canh.cam.31'
          link='fb://page/1739029202909840'
        />
        {/* <MenuButtonScreenContainer
          screenName='UpdateAddress'
          iconName='tool'
          iconType='antdesign'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Mời bạn bè cài đặt'
          navigator={props.navigation}
        /> */}
        <TouchableOpacity
          style={styles.navigatorButton}
          onPress={() => {
            Alert.alert(
              'Đăng xuất',
              'Bạn có muốn đăng xuất không?',
              [
                { text: 'Hủy', onPress: () => { return null } },
                {
                  text: 'Xác nhận', onPress: () => {
                    // logout
                    setTimeout(() => {
                      navigatorProps.logout();
                    }, 5000);
                    props.navigation.dispatch(
                      CommonActions.navigate({
                        name: 'LoginScreen',
                        params: {
                          logout: "true"
                        },
                      })
                    )
                  }
                },
              ]
            )
          }}
        >
          <Icon
            name='logout'
            type='antdesign'
            color='#0A6ADA'
            size={20}
          ></Icon>
          <Text style={styles.navigatorButtonText}>{'Đăng xuất'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MenuButtonScreenContainer({ screenName, iconName, iconType, iconColor, iconSize, screenTitle, navigator }) {
  return (
    <TouchableOpacity
      style={styles.navigatorButton}
      onPress={() => navigator.navigate(screenName)}
    >
      <Icon
        name={iconName}
        type={iconType}
        color={iconColor}
        size={iconSize}
      ></Icon>
      <Text style={styles.navigatorButtonText}>{screenTitle}</Text>
    </TouchableOpacity>

  );
}
function MenuButtonLinkingContainer({ iconName, iconType, iconColor, iconSize, screenTitle, link }) {
  return (
    <TouchableOpacity
      style={styles.navigatorButton}
      onPress={() => Linking.openURL(link)}
    >
      <Icon
        name={iconName}
        type={iconType}
        color={iconColor}
        size={iconSize}
      ></Icon>
      <Text style={styles.navigatorButtonText}>{screenTitle}</Text>
    </TouchableOpacity>

  );
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    customerInfor: state.loadCustomer.customerInfor,
    isLoadSuccess: state.loadCustomer.isLoadSuccess,
    loadError: state.loadCustomer.LoadError,
    isLoginSuccess: state.login.isLoginSuccess,
  };
}
const mapStateToDispatch = (dispatch) => {
  return {
    load: (customerInfor) => dispatch(loadCustomerInfor(customerInfor)),
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(Navigator);


const styles = StyleSheet.create({
  navigatorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20
  },
  navigatorButtonText: {
    fontSize: 18,
    marginLeft: 7
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom : 10
  },
});




