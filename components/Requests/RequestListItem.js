import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';

export default class RequestListItem extends Component {
    
    render(){        
        return(
            <TouchableOpacity style={styles.requestListItem}>
                <View style={{
                    width:185,
                    height:90,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    }}>
                    <View style={{
                        width:70,
                        height:60,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between'
                        }}>
                            <View style={{width:80,height:25}}>
                                <Text style={{fontSize:17}}>Ngày tạo:</Text>
                            </View>
                            <View style={{width:80,height:25}}>
                                <Text style={{fontSize:17}}>Ngày hẹn:</Text>
                            </View>
                    </View>
                    <View style={
                        {width:100,
                        height:60,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        }}>
                        <View style={{width:100,height:25}}>
                            <Text style={{fontSize:17}}>{this.props.createDate}</Text>
                        </View>
                        <View style={{width:100,height:25}}>
                            <Text style={{fontSize:17}}>{this.props.requestDate}</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    width:140,
                    height:90,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    }}>
                    <View style={{
                        width:130,
                        height:60,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between'
                        }}>
                        <View style={{width:130,height:25,backgroundColor:this.props.statusColor,alignItems: 'center',justifyContent: 'center',borderRadius:5}}>
                            <Text style={{fontSize:11}}>{this.props.status}</Text>
                        </View>
                        <View style={{width:100,height:25,marginLeft:5}}>
                            <Text style={{fontSize:17}}>{this.props.requestTime}</Text>
                        </View>
                    </View>
                </View>
                
            </TouchableOpacity>      
        );
    }
}
const styles = StyleSheet.create({
    requestListItem:{
        height:90,
        width: Dimensions.get('window').width-20,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom:2,
        paddingLeft:10,        
        borderRadius:10,
        marginBottom:10, 
    },

});