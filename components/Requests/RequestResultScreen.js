import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import { getApiUrl } from './../Common/CommonFunction';
import { connect } from 'react-redux';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

class RequestResultScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestId: this.props.route.params.id ? this.props.route.params.id : '',
            resultList: [],
            resetList: true,
        };

    }


    componentDidMount() {
        this.callApiResultList(this.props.route.params.id ? this.props.route.params.id : '')
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState(previousState => ({
                requestId: this.props.route.params.id ? this.props.route.params.id : '',
                resetList: !this.state.resetList
            }));
            this.callApiResultList(this.props.route.params.id ? this.props.route.params.id : '');
        }
    }


    callApiResultList = async (id) => {
        fetch(getApiUrl() + "/requests/detail/" + id + "/result", {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token,
            },
        })

            .then(res => res.json())
            .then(
                (result) => {
                    result ? result.message ? null :
                        this.setState(previousState => ({
                            resultList: result,
                        })) : null
                },
                (error) => {
                    console.log(error)
                }
            )
    }


    render() {
        debugger;
        const a = this.props.token;
        const b = this.state.requestId;
        return (
            <View style={{ flex: 1 }}>
                <ScreenTopMenuBack navigation={this.props.navigation} ></ScreenTopMenuBack>
                <View style={styles.ResultListAreaBackground}>
                    <View style={styles.ResultListArea}>
                        <FlatList
                            style={styles.ResultListFlatList}
                            showsVerticalScrollIndicator={false}
                            data={this.state.resultList}
                            extraData={this.state.resetList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <ReactNativeZoomableView
                                        maxZoom = {1.5}
                                        minZom = {1}
                                        zoomStep= {0.5}
                                        initialZoom = {1}
                                        bindToBorders = {true}
                                        captureEvent = {true}
                                    >
                                        <Image style={styles.imageItem} source={{ uri: item.image }} resizeMode='contain' />
                                    </ReactNativeZoomableView>

                                );
                            }}
                        >
                        </FlatList>
                    </View>
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
        token: state.login.token
    };
}
const mapStateToDispatch = (dispatch) => {
    return {
        load: (customerInfor) => dispatch(loadCustomerInfor(customerInfor)),
    };
}

export default connect(mapStateToProps, mapStateToDispatch)(RequestResultScreen);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f1f0f0',
    },
    ResultListAreaBackground: {
        flex: 1,
    },
    ResultListArea: {
        width: Dimensions.get('window').width - 20,
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    ResultListFlatList: {
        width: Dimensions.get('window').width - 30,
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 5
    },
    imageItem: {
        height: undefined,
        width: Dimensions.get('window').width - 30,
        aspectRatio: 10 / 15,
        borderWidth : 4,
        borderColor : 'blue'
        // alignSelf: 'stretch',
    }
});