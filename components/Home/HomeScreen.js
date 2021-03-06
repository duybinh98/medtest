import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, FlatList, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import ScreenTopMenu from './../Common/ScreenTopMenu';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import ArticleListItem from './ArticleListItem';
import articlesList from './../../Data/Articles'

export default class HomeScreen extends Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState(previousState => ({
            isLoaded: true,
            items: result
          }));
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
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
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenu {...this.props}></ScreenTopMenu>
                    <View 
                        style ={styles.background}>            
                        <View style={styles.mainButtonArea}>     

                            <Button 
                                buttonStyle={[
                                    styles.mainButton,{
                                    marginLeft: 40                        
                                }]}
                                titleStyle={{color:'#0A6ADA'}} 
                                title="Đặt khám"
                                onPress={() => this.props.navigation.navigate('AppointmentDetailScreen')}
                            >\</Button>  

                            <Button 
                                buttonStyle={[
                                    styles.mainButton,{
                                    marginRight:40
                                }]}
                                titleStyle={{color:'#0A6ADA'}} 
                                title="Đặt xét nghiệm"
                                onPress={() => this.props.navigation.navigate('RequestTestListScreen')}
                            >\</Button>   

                        </View>
                        <FlatList
                            style={{                    
                            flex:1,
                            paddingLeft:10,
                            paddingRight:10,
                            }}
                            keyboardShouldPersistTaps="always"
                            keyboardDismissMode='on-drag'
                            data={this.state.items}
                            renderItem={({item,index}) => {
                                return (
                                    <ArticleListItem 
                                        // imageUri={item.imageUri}
                                        // title={item.title}
                                        // shortContent={item.shortContent}
                                        // content={item.content}
                                        imageUri={item.url}
                                        title={item.title}
                                        shortContent={item.title}
                                        content={item.title}
                                        navigation={this.props.navigation}
                                        >
                                    </ArticleListItem>
                                );
                            }}
                        >                
                        </FlatList>          
                    </View>
                    <ScreenBottomMenu {...this.props}></ScreenBottomMenu>
                </View>  
        );
        // }
    }
}
const styles = StyleSheet.create({
    background:{
        flex:1, 
        backgroundColor: '#f1f0f0',
        flexDirection: 'column',
        alignItems: 'center'
    },
    mainButtonArea:{
        height: 140,
        width: Dimensions.get('window').width-20,
        backgroundColor: 'white',
        marginTop:15,
        marginBottom:20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom:3,
        borderRadius:10
    },
    mainButton:{
        height:100,
        width:100,                    
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor:'#0A6ADA',
        borderWidth: 3
    },    
});