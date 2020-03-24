import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';



export default class TestSelectItem extends Component {
    
    constructor(props){
        super(props);
        this.state={
            selected:false
        }
    }

    render(){
        return(
            <TouchableOpacity style={[styles.testItem,{
                backgroundColor:this.props.backgroundColor != null ? this.props.backgroundColor : 'white',    
            }]}  
                onPress={() => {
                    this.setState(previousState => ({
                        selected: this.props.onPressItem(this.props.testID,this.props.testPrice)
                    }));
                    
                }}              
            >
                <View
                    style={styles.iconContainer}
                >
                <Icon
                    name={this.state.selected ? 'check-square' : 'square'}
                    type='feather'
                    color='#0A6ADA'
                    size= {30}            
                    iconStyle={{
                    }}
                    >
                </Icon>
                </View>
                <View
                    style={styles.testItemTextArea}
                >
                    <View
                        style={styles.testNameContainer}
                    >
                        <Text style={{
                                fontSize:13,
                                color:'#25345d'
                            }} >{this.props.testName}</Text>
                    
                    </View>
                    <View
                        style={styles.testPriceContainer}
                    >
                        <Text
                            style={{
                                fontSize:12,
                                color:'#25345d'
                            }}    
                            >{this.props.testPrice+'đ'}</Text>
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
        //borderWidth:1,
        //borderColor:'#25345d',
    },
    testItemTextArea:{
        height:45,
        width:Dimensions.get('window').width-80,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer:{
        width:40,
        height:40,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    testNameContainer:{
        width: '100%',
        height:29,
        paddingLeft:5,
        paddingRight:5,
        paddingTop:3
    },
    testPriceContainer:{
        width: '100%',
        height:15,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginBottom:2,
        paddingRight:10
    }

});