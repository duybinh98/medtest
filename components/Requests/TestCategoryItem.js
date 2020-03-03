import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native';



export default class TestCategoryItem extends Component {
    
    render(){
        return(
            <TouchableOpacity style={styles.testItem}>
                <View
                    style={{
                        width:styles.testItem.width,
                        height:35,
                        paddingLeft:5,
                        paddingRight:5,                        
                    }}
                >
                    <Text style={{
                            fontSize:17,
                            color:'#25345d'
                        }} >{this.props.categoryName}</Text>
                
                </View>
                <View
                    style={{
                        width:styles.testItem.width,
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
                        >{this.props.totalPrice}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}



const styles = StyleSheet.create({
    testItem:{
        height:55,
        width: Dimensions.get('window').width-40,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth:2,
        borderColor:'#25345d'
        
    }

});