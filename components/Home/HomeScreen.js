import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, FlatList, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import ScreenTopMenu from './../Common/ScreenTopMenu';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import ArticleListItem from './ArticleListItem';
import { getApiUrl } from './../Common/CommonFunction';
// import articlesList from './../../Data/Articles'
import { login, logout } from '../Store/Reducers/LoginReducer';
import { loadCustomerInfor } from '../Store/Reducers/LoadInforReducer';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.customerInforLoad ? this.props.customerInforLoad.id : '-1',
            customerInfo: null,
            articlesList: [],
            testsList: [],
            token: null,
        };
        this.onPressCreateRequest = this.onPressCreateRequest.bind(this);
        this.onPressCreateAppointment = this.onPressCreateAppointment.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                customerId: this.props.customerInforLoad ? this.props.customerInforLoad.id : '-1',
            })
        }
    }
    componentDidMount() {
        this.callApiArticlesList();
        this.callApiTestList();
        this.callApiCustomerInfo();
        this.props.navigation.addListener("focus", () => {

        })
    }
    callApiGetDistrictCode() {
        fetch(getApiUrl() + "/management/districts/district-town-list")
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result)
                    this.setState(previousState => ({
                        districtList: result,
                    }));
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    callApiGetTownCode() {
        fetch(getApiUrl() + "/management/districts/towns/list")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(previousState => ({
                        townList: result,
                    }));
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    callApiArticlesList = async () => {
        fetch(getApiUrl() + "/articles/list")
            .then(res => res.json())
            .then(
                (result) => {
                    let success = false
                    result ? result.message ? result.message == 'Access Denied' ? null : null : success = true : null;
                    if (success)
                        this.setState(previousState => ({
                            articlesList: result,
                        }));
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    callApiTestList = async () => {
        fetch(getApiUrl() + "/test-types/type-test")
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

    callApiCustomerInfo = async () => {
        fetch(getApiUrl() + "/users/customers/detail/" + this.state.customerId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(previousState => ({
                        customerInfo: result,
                    }));
                },
                (error) => {
                    console.log(error)
                }
            )
    }



    onPressCreateAppointment() {
        this.props.navigation.dispatch(
            CommonActions.navigate({
                name: 'CreateAppointmentScreen',
                params: {
                    customerId: this.state.customerId,
                    // customerInfo: this.state.customerInfo,
                },
            }))
    }

    onPressCreateRequest() {
        this.props.navigation.dispatch(
            CommonActions.navigate({
                name: 'RequestTestListScreen',
                params: {
                    customerId: this.state.customerId,
                    testsList: this.state.testsList,
                    // customerInfo: this.state.customerInfo,
                },
            }))

    }

    render() {
        const { error, isLoaded, articlesList } = this.state;
        // debugger;
        // const abc = this.props.customerInfor;
        // const a = this.state.customerId;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <ScreenTopMenu {...this.props}></ScreenTopMenu>
                <View
                    style={styles.background}>
                    <View style={styles.mainButtonArea}>

                        <Button
                            buttonStyle={[
                                styles.mainButton, {
                                    marginLeft: 40
                                }]}
                            titleStyle={{ color: '#0A6ADA' }}
                            title="Đặt khám"
                            onPress={() => this.onPressCreateAppointment()}
                        >\</Button>

                        <Button
                            buttonStyle={[
                                styles.mainButton, {
                                    marginRight: 40
                                }]}
                            titleStyle={{ color: '#0A6ADA' }}
                            title="Đặt xét nghiệm"
                            onPress={() => {
                                this.onPressCreateRequest();
                            }}
                        >\</Button>

                    </View>
                    <FlatList
                        style={{
                            flex: 1,
                            paddingLeft: 10,
                            paddingRight: 10,
                        }}
                        keyboardShouldPersistTaps="always"
                        keyboardDismissMode='on-drag'
                        data={articlesList}
                        renderItem={({ item }) => {
                            return (
                                <ArticleListItem
                                    image={item.image}
                                    title={item.tittle}
                                    shortContent={item.shortContent}
                                    content={item.content}
                                    navigation={this.props.navigation}
                                >
                                </ArticleListItem>
                            );
                        }}
                        keyExtractor={(article, index) => index.toString()}
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
        isLoginSuccess: state.login.isLoginSuccess,
        token: state.login.token,
        customerInforLoad: state.loadCustomer.customerInfor,
        // customerInfor: state.login.customerInfor,
        isLoadSuccess: state.loadCustomer.isLoadSuccess,
        loadError: state.loadCustomer.LoadError
    };
}
const mapStateToDispatch = (dispatch) => {
    return {
        load: (customerInfor) => dispatch(loadCustomerInfor(customerInfor)),
        // login: (phoneNumber, password) => dispatch(login(phoneNumber, password)),
        // logout: () => dispatch(logout()),
    };
}

export default connect(mapStateToProps, mapStateToDispatch)(HomeScreen);
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f1f0f0',
        flexDirection: 'column',
        alignItems: 'center'
    },
    mainButtonArea: {
        height: 140,
        width: Dimensions.get('window').width - 20,
        backgroundColor: 'white',
        marginTop: 15,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 3,
        borderRadius: 10
    },
    mainButton: {
        height: 100,
        width: 100,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#0A6ADA',
        borderWidth: 3
    },
});