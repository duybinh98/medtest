import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, TextInput, ScrollView, TouchableOpacity, Keyboard, FlatList, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import TestCategoryItem from './TestCategoryItem'
import TestSelectItem from './TestSelectItem'
import testList from './../../Data/Test'
import { convertMoney } from './../Common/CommonFunction';
import { connect } from 'react-redux';

class RequestTestListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.customerInforLoad.id ? this.props.customerInforLoad.id : '-1',
            // customerId: this.props.route.params.customerId ? this.props.route.params.customerId : '-1',
            showFooter: true,
            selectedTest: [],
            testsList: this.props.route.params.testsList ? this.props.route.params.testsList : testList,
            totalPrice: '0',
            customerInfo: this.props.route.params.customerInfo ? this.props.route.params.customerInfo : null,
            resetList: true,
            current_version: this.props.route.params.current_version ? this.props.route.params.current_version : 1,
        }
        this.selectItem = this.selectItem.bind(this)
        this.resetSelectedTestOnConfirm = this.resetSelectedTestOnConfirm.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.resetSelectedTestOnConfirm();
        }
    }
    selectItem(id, price) {
        let _selectedTest = this.state.selectedTest;
        let _totalPrice = parseInt(this.state.totalPrice);
        let _price = parseInt(price);
        const found = _selectedTest.findIndex(test => test == id);
        found === -1 ? _selectedTest.push(id) : _selectedTest.splice(found, 1);
        found === -1 ? _totalPrice += _price : _totalPrice -= _price;
        this.setState({
            selectedTest: _selectedTest,
            totalPrice: _totalPrice
        })
        if (found === -1) return true; else return false;
    }

    resetSelectedTestOnConfirm() {
        this.setState({
            selectedTest: [],
            totalPrice: '0',
            resetList: !this.state.resetList,
        });
        this.forceUpdate();
    }

    RenderFooter() {
        if (this.state.showFooter) {
            return (
                <ScreenBottomMenu {...this.props}></ScreenBottomMenu>
            )
        } else {
            return null
        }
    }

    componentDidMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }
    
    keyboardDidShow = (event) => {
        this.setState({
            showFooter: false
        })
    };

    keyboardDidHide = (event) => {
        this.setState({
            showFooter: true
        })
    };

    render() {
        debugger;
        const a = this.state.customerId;
        const ab = this.props.customerInforLoad;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                <View style={styles.background}>
                    <View style={styles.titleArea}>
                        <Text style={{ fontSize: 30, color: '#25345D' }}>Đặt xét nghiệm</Text>
                    </View>
                    {/* <TextInput
                        style={styles.searchArea}
                        placeholder={'Tìm xét nghiệm'}
                        underlineColorAndroid='transparent'
                    /> */}
                    <View style={styles.TestListAreaBackground}>
                        <View style={styles.TestListArea}>
                            <FlatList
                                style={styles.TestListAreaScrollView}
                                showsVerticalScrollIndicator={false}
                                data={this.state.testsList}
                                extraData={this.state.resetList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => {
                                    return (
                                        <TestCategoryItem
                                            categoryName={item.testTypeName}
                                            test={item.listTest}
                                            viewOnly={false}
                                            selectItem={this.selectItem}
                                            resetFlag={this.state.resetList}
                                        >
                                        </TestCategoryItem>
                                    );
                                }}
                            >
                            </FlatList>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={[styles.btnConfirm, { borderWidth: 0, width: 180 }]}>
                            <Text style={{ fontSize: 15, paddingLeft: 10 }}>{'Tổng tiền: ' + convertMoney(this.state.totalPrice) + ' đ'}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.btnConfirmTest}
                            onPress={() => this.state.customerId != '-1' ? this.state.selectedTest.length > 0 ? this.props.navigation.dispatch(
                                CommonActions.navigate({
                                    name: 'RequestPersonalInformation',
                                    params: {
                                        selectedTest: this.state.selectedTest,
                                        totalPrice: this.state.totalPrice,
                                        testsList: this.state.testsList,
                                        customerInfo: this.state.customerInfo,
                                        current_version: this.props.route.params.current_version,
                                        resetSelectedTestOnConfirm: this.resetSelectedTestOnConfirm
                                    },
                                })
                            )
                                : Alert.alert(
                                    'Lỗi đặt xét nghiệm',
                                    'Bạn phải chọn ít nhất 1 loại xét nghiệm để có thể đặt xét nghiệm',
                                )
                                : Alert.alert(
                                    'Lỗi đặt xét nghiệm',
                                    'Bạn cần đăng nhập để có thể sử dụng chức năng đặt xét nghiệm',
                                )

                            }
                        >
                            <Text style={styles.textBtnTest}>Đặt xét nghiệm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.RenderFooter()}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoginSuccess: state.login.isLoginSuccess,
        token: state.login.token,
        customerInforLoad: state.loadCustomer.customerInfor,
    };
}
const mapStateToDispatch = (dispatch) => {
    return {
        load: (customerInfor) => dispatch(loadCustomerInfor(customerInfor)),
    };
}

export default connect(mapStateToProps, mapStateToDispatch)(RequestTestListScreen);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f1f0f0',
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleArea: {
        height: 50,
        width: Dimensions.get('window').width - 20,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 3,
        borderRadius: 10
    },
    searchArea: {
        height: 40,
        width: Dimensions.get('window').width - 20,
        backgroundColor: 'white',
        marginTop: 5,

        paddingLeft: 10,
        paddingRight: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#25345D',
        color: '#25345D'
    },
    TestListAreaBackground: {
        // height: 270,
        flex: 50,
        marginTop: 10,
    },
    TestListArea: {
        width: Dimensions.get('window').width - 20,
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    TestListAreaScrollView: {
        width: Dimensions.get('window').width - 40,
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width - 20,
        height: 54,
        marginBottom: 10,
        flex: 10,
    },
    btnConfirm: {
        width: 130,
        height: 45,
        borderRadius: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#0A6ADA',
        paddingBottom: 3
    },
    textBtn: {
        color: '#0A6ADA',
        textAlign: "center",
        fontSize: 16,
    },
    btnConfirmTest: {
        width: 130,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#0A6ADA',
        justifyContent: 'center',
        // borderWidth: 3,
        // borderColor: '#0A6ADA',
        paddingBottom: 3
    },
    textBtnTest: {
        color: 'white',
        textAlign: "center",
        fontSize: 16,
    },

});