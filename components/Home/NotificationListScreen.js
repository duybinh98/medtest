import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, FlatList, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import NotificationItem from './NotificationItem';
// import articlesList from './../../Data/Articles'
import {getApiUrl, convertDateTimeToDate, convertDateTimeToTime} from './../Common/CommonFunction'

class NotificationListScreen extends Component {
    constructor(props) {
    super(props);
    this.state = {
        customerId: this.props.customerInfor? this.props.customerInfor.id: '-1',
        notiList: [],
        // notiList: this.props.route.params.notiList ? this.props.route.params.notiList : [],
        dataChanged: true,
        // dataChanged: this.props.route.params.dataChanged ? this.props.route.params.dataChanged : true,
        testsList: [],
    };
    }

    componentDidMount() {
        this.callApiTestList();
        this.callNotiApi();
        this.props.navigation.addListener("focus", () => {
            this.callNotiApi();
        })
    } 
    componentDidUpdate(prevProps, prevState) {
        // if (prevProps !== this.props) {
        //     this.setState({
        //         notiList: this.props.route.params.notiList ? this.props.route.params.notiList : [],
        //         customerId: this.props.customerInfor? this.props.customerInfor.id: '-1',
        //         dataChanged: this.props.route.params.dataChanged ? this.props.route.params.dataChanged : true,
        //     })
        // }
    }
    callNotiApi(){
        fetch(getApiUrl()+'/users/'+this.state.customerId+'/notifications/list', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+this.props.token,
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                result.message ? null: 
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

    
    callApiTestList = async () => {
        fetch(getApiUrl()+"/test-types/type-test")
        .then(res => res.json())
        .then(
            (result) => {
            this.setState(previousState => ({
                testsList: result,
            }));
            },            
            (error) => {
                console.log(error)
            }
        )  
    }


    render(){
        const { error, isLoaded, items } = this.state;
        // if (error) {
        // return <div>Error: {error.message}</div>;
        // } else if (!isLoaded) {
        // return <div>Loading...</div>;
        // } else {
            debugger;
            const a = this.props.customerInfor;
            const b = this.state.notiList;
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenuBack {...this.props} backScreen='HomeScreen'></ScreenTopMenuBack>
                    <View 
                        style ={styles.background}>            
                        
                        <FlatList
                            style={{                    
                            flex:1,
                            paddingLeft:10,
                            paddingRight:10,
                            paddingTop:20
                            }}
                            keyboardShouldPersistTaps="always"
                            keyboardDismissMode='on-drag'
                            data={this.state.notiList}
                            extraData={this.state.dataChanged}
                            renderItem={({item,index}) => {
                                return (
                                    <NotificationItem 
                                        // content={item.content}
                                        content={item.message}
                                        testsList={this.state.testsList}
                                        requestId={item.requestID}
                                        appointmentId={item.appointmentID}
                                        token={this.props.token}
                                        type={item.type}
                                        navigation={this.props.navigation}
                                        >
                                    </NotificationItem>
                                );
                            }}
                        >                
                        </FlatList>          
                    </View>
                    <ScreenBottomMenu {...this.props}></ScreenBottomMenu>
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

export default connect(mapStateToProps, mapStateToDispatch)(NotificationListScreen);



const styles = StyleSheet.create({
    background:{
        flex:1, 
        backgroundColor: '#f1f0f0',
        flexDirection: 'column',
        alignItems: 'center'
    }, 
});