import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { getApiUrl, convertDateTimeToDate, convertDateTimeToTime } from './../Common/CommonFunction'
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

class ScreenTopMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.customerInfor ? this.props.customerInfor.id : '-1',
            notiList: [],
            dataChanged: true,
            testsList: [],
        };
    }
    callNotiApi() {
        fetch(getApiUrl() + '/users/' + this.state.customerId + '/notifications/list', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token,
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    result.message ? null :
                        this.setState(previousState => ({
                            notiList: result,
                            dataChanged: !this.state.dataChanged,
                        }));
                },
                (error) => {
                    console.log(error)
                }
            )
    }
    componentDidMount() {
        // this.callNotiApi();
        // setInterval(() => {
        //     this.callNotiApi();
        // }, 5000);
    }
    render() {
        return (
            <View style={styles.menuArea}>
                <Icon
                    name='menu'
                    type='entypo'
                    color={iconColor}
                    size={40}
                    iconStyle={[styles.button, { marginLeft: 20 }]}
                    onPress={() => {
                        this.props.navigation.openDrawer();
                    }}
                ></Icon>
                <Text style={styles.title}> MedTest</Text>
                <Icon
                    name='bell'
                    type='feather'
                    color='yellow'
                    size={30}
                    iconStyle={[styles.button, { marginRight: 20, height: 30, width: 40 }]}
                    onPress={() => this.props.navigation.navigate('NotificationListScreen')}
                    // onPress={() => this.props.navigation.dispatch(
                    //     CommonActions.navigate({
                    //         name: 'NotificationListScreen',
                    //         params: {
                    //             notiList: this.state.notiList,
                    //             dataChanged: true,
                    //             testsList: [],
                    //         },
                    //     })
                    // )}
                ></Icon>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.login.token,
        customerInfor: state.loadCustomer.customerInfor,
        isLoadSuccess: state.loadCustomer.isLoadSuccess,
        loadError: state.loadCustomer.LoadError,
    };
}
const mapStateToDispatch = (dispatch) => {
    return {
        load: (customerInfor) => dispatch(loadCustomerInfor(customerInfor)),
    };
}

export default connect(mapStateToProps, mapStateToDispatch)(ScreenTopMenu);
// const iconColor='#0A6ADA'
const iconColor = 'white'

const styles = StyleSheet.create({
    menuArea: {
        height: 50,
        width: '100%',
        backgroundColor: '#25345D',
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        height: 40,
        width: 40,
    },
    title: {
        fontSize: 26,
        color: 'white',
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});