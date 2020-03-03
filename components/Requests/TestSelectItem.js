import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';



export default class TestSelectItem extends Component {
    
    render(){
        return(
            <TouchableOpacity style={styles.testItem}>
                <View
                    style={{
                        width:40,
                        height:40,
                    }}
                >
                <Icon
                    name={this.props.iconName}
                    type={this.props.iconType}
                    color='#0A6ADA'
                    size= {35}            
                    iconStyle={{
                    }}
                    >
                </Icon>
                </View>
                <View
                    style={styles.testItemTextArea}
                >
                    <View
                        style={{
                            width:styles.testItemTextArea.width,
                            height:29,
                            paddingLeft:5,
                            paddingRight:5,
                            paddingTop:3
                        }}
                    >
                        <Text style={{
                                fontSize:13,
                                color:'#25345d'
                            }} >{this.props.testName}</Text>
                    
                    </View>
                    <View
                        style={{
                            width:styles.testItemTextArea.width,
                            height:15,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            marginBottom:2,
                            paddingRight:10
                        }}
                    >
                        <Text
                            style={{
                                fontSize:12,
                                color:'#25345d'
                            }}    
                            >{this.props.testPrice}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        );
    }
}



const styles = StyleSheet.create({
    testItem:{
        height:45,
        width: Dimensions.get('window').width-40,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth:1,
        borderColor:'#25345d',
    },
    testItemTextArea:{
        height:45,
        width:Dimensions.get('window').width-80,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    }

});