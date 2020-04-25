import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import TestCategoryItem from './TestCategoryItem';
import TestViewItem from './TestViewItem';
import testList from './../../Data/Test';
import {
  getApiUrl,
  getStateName,
  getStateColor,
  convertMoney,
} from './../Common/CommonFunction';

class RequestViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestId: this.props.route.params.id ? this.props.route.params.id : '',
      name: this.props.route.params.name ? this.props.route.params.name : '',
      dob: this.props.route.params.dob ? this.props.route.params.dob : '',
      phone: this.props.route.params.phone ? this.props.route.params.phone : '',
      address: this.props.route.params.address
        ? this.props.route.params.address
        : '',
      date: this.props.route.params.date ? this.props.route.params.date : '',
      time: this.props.route.params.time ? this.props.route.params.time : '',
      selectedTest: this.props.route.params.selectedTest
        ? this.props.route.params.selectedTest
        : [],
      status: this.props.route.params.status
        ? this.props.route.params.status
        : 'pending',
      statusName: this.props.route.params.status
        ? getStateName(this.props.route.params.status)
        : '',
      statusColor: this.props.route.params.status
        ? getStateColor(this.props.route.params.status)
        : '#000',
      nurseId: this.props.route.params.nurseId
        ? this.props.route.params.nurseId
        : '',
      nurseName: this.props.route.params.nurseName
        ? this.props.route.params.nurseName
        : '',
      totalAmount: this.props.route.params.totalAmount
        ? this.props.route.params.totalAmount
        : '0',
      createdTime: this.props.route.params.createdTime
        ? this.props.route.params.createdTime
        : '',
      testsList: this.props.route.params.testsList
        ? this.props.route.params.testsList
        : testList,
      backScreen: this.props.route.params.backScreen
        ? this.props.route.params.backScreen
        : 'RequestListScreen',
      currentVersion: this.props.route.params.currentVersion
        ? this.props.route.params.currentVersion
        : 1,
      requestVersion: this.props.route.params.requestVersion
        ? this.props.route.params.requestVersion
        : 1,

      disabledButton: false,
    };
    this.isSelected = this.isSelected.bind(this);
    this.viewResult = this.viewResult.bind(this);
    this.cancelRequest = this.cancelRequest.bind(this);
    this.viewNurse = this.viewNurse.bind(this);
  }
  componentDidMount() {
    if (
      this.props.route.params.currentVersion !=
      this.props.route.params.requestVersion
    ) {
      this.callApiTestList(this.props.route.params.requestVersion);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.route.params !== this.props.route.params) {
      this.setState(previousState => ({
        requestId: this.props.route.params.id ? this.props.route.params.id : '',
        name: this.props.route.params.name ? this.props.route.params.name : '',
        dob: this.props.route.params.dob ? this.props.route.params.dob : '',
        phone: this.props.route.params.phone
          ? this.props.route.params.phone
          : '',
        address: this.props.route.params.address
          ? this.props.route.params.address
          : '',
        date: this.props.route.params.date ? this.props.route.params.date : '',
        time: this.props.route.params.time ? this.props.route.params.time : '',
        selectedTest: this.props.route.params.selectedTest
          ? this.props.route.params.selectedTest
          : [],
        status: this.props.route.params.status
          ? this.props.route.params.status
          : 'pending',
        statusName: this.props.route.params.status
          ? getStateName(this.props.route.params.status)
          : '',
        statusColor: this.props.route.params.status
          ? getStateColor(this.props.route.params.status)
          : '#000',
        nurseName: this.props.route.params.nurseName
          ? this.props.route.params.nurseName
          : '',
        nurseId: this.props.route.params.nurseId
          ? this.props.route.params.nurseId
          : '',
        totalAmount: this.props.route.params.totalAmount
          ? this.props.route.params.totalAmount
          : '0',
        createdTime: this.props.route.params.createdTime
          ? this.props.route.params.createdTime
          : '',
        testsList: this.props.route.params.testsList
          ? this.props.route.params.testsList
          : testList,
        backScreen: this.props.route.params.backScreen
          ? this.props.route.params.backScreen
          : 'RequestListScreen',
        currentVersion: this.props.route.params.currentVersion
          ? this.props.route.params.currentVersion
          : 1,
        requestVersion: this.props.route.params.requestVersion
          ? this.props.route.params.requestVersion
          : 1,
      }));
      if (
        this.props.route.params.currentVersion !=
        this.props.route.params.requestVersion
      ) {
        this.callApiTestList(this.props.route.params.requestVersion);
      }
    }
    // if(prevProps != this.props) {

    // }
  }

  callApiTestList = async version => {
    // fetch(getApiUrl() + "/tests/versions/list-all-test/" + this.state.requestVersion)
    fetch(getApiUrl() + '/tests/versions/list-all-test/' + version, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token,
      },
    })
      .then(res => res.json())
      .then(
        result => {
          // console.log('123  + ' + JSON.stringify(result))
          this.setState(previousState => ({
            testsList: result.lsTests,
            // testListVersion: result.versionID,
          }));
        },
        error => {
          console.log(error);
        },
      );
  };
  isSelected(id) {
    const found = this.state.selectedTest.findIndex(test => test == id);
    let result = false;
    found === -1 ? '' : (result = true);
    return result;
  }

  cancelRequest() {
    this.setState({
      disabledButton: true,
    });
    fetch(getApiUrl() + '/requests/update/' + this.state.requestId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token,
      },
      body: JSON.stringify({
        status: 'canceled',
        // userID: '1',
        userID: this.props.customerInfor.id,
        note: 'I want to cancel this request',
      }),
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            disabledButton: false,
          });
          // console.log(result)
          this.props.navigation.dispatch(
            CommonActions.navigate({
              name: 'RequestListScreen',
              params: {},
            }),
          );
        },
        error => {
          console.log(error);
        },
      );
  }

  viewNurse() {
    fetch(getApiUrl() + '/users/nurses/detail/' + this.state.nurseId, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token,
      },
    })
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          this.props.navigation.dispatch(
            CommonActions.navigate({
              name: 'ViewNurseScreen',
              params: {
                id: result.id,
                phoneNumber: result.phoneNumber,
                name: result.name,
                dob: result.dob,
                address: result.address,
                email: result.email,
                gender: result.gender,
                image: result.image,
              },
            }),
          );
        },
        error => {
          console.log(error);
        },
      );
  }

  viewResult() {
    this.props.navigation.dispatch(
      CommonActions.navigate({
        name: 'RequestResultScreen',
        params: {
          id: this.state.requestId,
        },
      }),
    );
  }

  render() {
    debugger;
    const a = this.state.testsList;
    const b = this.props.customerInfor;
    return (
      <View style={{ flex: 1 }}>
        <ScreenTopMenuBack
          navigation={this.props.navigation}
          backScreen={this.state.backScreen}
        />
        <ScrollView
          style={styles.background}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <View style={styles.titleArea}>
            <Text style={{ fontSize: 22, color: '#25345D' }}>Đơn xét nghiệm</Text>
          </View>
          <View style={styles.infoArea}>
            {/* <View style={styles.textContainerId}>
              <Text style={styles.textInfor}>
                Mã đơn xét nghiệm: {this.state.requestId}
              </Text>
            </View> */}
            <View style={[styles.textContainerId]}>
              <Text style={[styles.textInfor]} >Mã đơn xét nghiệm: </Text>
              <Text style={[styles.textInforId]} > {this.state.requestId}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textInfor}>
                Tên hiển thị: {this.state.name}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textInfor}>
                Số điện thoại: {this.state.phone}
              </Text>
            </View>
            {/* <View style={styles.textContainer}>
              <Text style={styles.textInfor}>Ngày sinh: {this.state.dob}</Text>
            </View> */}
            <View style={styles.textContainer}>
              <Text style={styles.textInfor}>
                Địa chỉ: {this.state.address}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textInfor}>
                Ngày tạo đơn: {this.state.createdTime}
              </Text>
            </View>
            <View style={styles.doubleContainer}>
              <View
                style={{
                  width: 180,
                }}>
                <Text style={styles.textInfor}>
                  Ngày hẹn: {this.state.date}
                </Text>
              </View>
              <View
                style={{
                  width: 120,
                }}>
                <Text style={styles.textInfor}>Giờ hẹn: {this.state.time}</Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textInfor}>
                Tổng tiền: {convertMoney(this.state.totalAmount) + 'đ'}
              </Text>
            </View>
            <View style={styles.doubleContainer}>
              <View
                style={{
                  width: 82,
                }}>
                <Text style={styles.textInfor}>Trạng thái:</Text>
              </View>
              <View
                style={{
                  width: 180,
                }}>
                <Text
                  style={[styles.textInfor, { color: this.state.statusColor }]}>
                  {this.state.statusName}
                </Text>
              </View>
            </View>
            {this.state.status !== 'pending' ? (
              this.state.status !== 'canceled' ? (
                this.state.status !== 'coordinatorlostsample' ? (
                  this.state.nurseName !== 'Chưa có y tá nhận!' ? (
                    <View style={styles.doubleContainer}>
                      <View
                        style={{
                          width: 205,
                          flexDirection: 'row'
                        }}>
                        <Text style={styles.textInfor}>
                          {/* Y tá: {this.state.nurseName} */}
                          Y tá:
                        </Text>
                        <TouchableOpacity
                          style={[styles.btnViewNurse]}
                          onPress={() => this.viewNurse()}>
                          <Text style={[styles.textNurse]}>
                            {this.state.nurseName}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          width: 110,
                        }}>
                      </View>
                    </View>
                  ) : null
                ) : null
              ) : null
            ) : null}
          </View>
          <View style={styles.TestListAreaBackground}>
            <View style={styles.TestListArea}>
              <FlatList
                style={styles.TestListAreaScrollView}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                data={this.state.testsList}
                extraData={this.state.selectedTest}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  return (
                    <TestCategoryItem
                      categoryName={item.testTypeName}
                      test={item.listTest}
                      // test={item.lsTests}
                      viewOnly={true}
                      isSelected={this.isSelected}
                    />
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {this.state.status == 'pending' ? (
              <TouchableOpacity
                style={styles.btnConfirm}
                disabled={this.state.disabledButton}
                onPress={() => {
                  Alert.alert(
                    'Hủy xét nghiệm',
                    'Bạn có chắc chắn muốn hủy đơn xét nghiệm mã ' +
                    this.state.requestId +
                    ' không?',
                    [
                      {
                        text: 'Hủy',
                        onPress: () => {
                          return null;
                        },
                      },
                      {
                        text: 'Xác nhận',
                        onPress: () => {
                          this.cancelRequest();
                        },
                      },
                    ],
                  );
                }}>
                <Text style={styles.textBtn}>{'Hủy đơn xét nghiệm'}</Text>
              </TouchableOpacity>
            ) : this.state.status == 'accepted' ? (
              <TouchableOpacity
                style={styles.btnConfirm}
                disabled={this.state.disabledButton}
                onPress={() => {
                  Alert.alert(
                    'Hủy xét nghiệm',
                    'Bạn có chắc chắn muốn hủy đơn xét nghiệm mã ' +
                    this.state.requestId +
                    ' không?',
                    [
                      {
                        text: 'Hủy',
                        onPress: () => {
                          return null;
                        },
                      },
                      {
                        text: 'Xác nhận',
                        onPress: () => {
                          this.cancelRequest();
                        },
                      },
                    ],
                  );
                }}>
                <Text style={styles.textBtn}>{'Hủy đơn xét nghiệm'}</Text>
              </TouchableOpacity>
            ) : this.state.status == 'closed' ? (
              <TouchableOpacity
                style={styles.btnConfirm}
                onPress={() => this.viewResult()}>
                <Text style={styles.textBtn}>{'Xem kết quả'}</Text>
              </TouchableOpacity>
            ) : (
                    <View />
                  )}
            <TouchableOpacity
              style={styles.btnConfirm}
              onPress={() =>
                this.state.backScreen
                  ? this.props.navigation.navigate(this.state.backScreen)
                  : this.props.navigation.goBack()
              }>
              <Text style={styles.textBtn}>OK</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ScreenBottomMenu {...this.props} />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.login.token,
    customerInfor: state.loadCustomer.customerInfor,
    isLoadSuccess: state.loadCustomer.isLoadSuccess,
    loadError: state.loadCustomer.LoadError,
  };
};
const mapStateToDispatch = dispatch => {
  return {
    load: customerInfor => dispatch(loadCustomerInfor(customerInfor)),
  };
};

export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(RequestViewScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f1f0f0',
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
    borderRadius: 10,
  },
  infoArea: {
    alignSelf: 'stretch',
    width: Dimensions.get('window').width - 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 3,
    marginLeft: 10,
    paddingBottom: 10,
  },
  textContainer: {
    marginTop: 5,
    width: Dimensions.get('window').width - 55,
    alignSelf: 'stretch',
    paddingLeft: 3,
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  textContainerId: {
    marginTop: 5,
    width: Dimensions.get('window').width - 55,
    alignSelf: 'stretch',
    marginHorizontal: 15,
    alignItems: 'center',
    paddingLeft: 3,
    flexDirection: 'row'
},
textInfor: {
    fontSize: 16,
},
textInforId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A6ADA'
},
  doubleContainer: {
    marginTop: 5,
    width: Dimensions.get('window').width - 55,
    alignSelf: 'stretch',
    paddingLeft: 3,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchArea: {
    height: 40,
    width: Dimensions.get('window').width - 40,
    backgroundColor: 'white',
    marginTop: 5,

    paddingLeft: 10,
    paddingRight: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#25345D',
    color: '#25345D',
  },
  TestListAreaBackground: {
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  TestListArea: {
    width: Dimensions.get('window').width - 20,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  TestListAreaScrollView: {
    width: Dimensions.get('window').width - 40,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 20,
    height: 54,
    marginBottom: 10,
  },
  btnConfirm: {
    width: 130,
    height: 45,
    borderRadius: 5,
    backgroundColor: '#0A6ADA',
    justifyContent: 'center',
    paddingBottom: 3,
  },
  textBtn: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  btnViewNurse: {
    width: 160,
    height: 26,
    paddingBottom: 3,
  },
  textNurse: {
    color: 'black',
    textDecorationLine: 'underline',
    paddingLeft: 10,
    fontSize: 16,
  },
});
