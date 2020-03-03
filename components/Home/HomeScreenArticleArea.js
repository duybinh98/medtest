import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import HomeScreenArticle from './HomeScreenArticle'

export default class HomeScreen extends Component {
    render(){
        return(
                <ScrollView 
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode='on-drag'
                    style={{                    
                    flex:1,
                    paddingLeft:10,
                    paddingRight:10,
                    }}
                    maximumZoomScale={1}
                    minimumZoomScale={1}
                    >
                    <HomeScreenArticle 
                        imageUri="https://designercandy.com.au/wp-content/uploads/paw-print-rainbow-candy-500x333.jpg"
                        title="This is a title of an article"
                        shortContent="This. This is some content. This is some content of an article. This is some content of an article which i need to test."
                        >
                    </HomeScreenArticle>
                    <HomeScreenArticle 
                        imageUri="https://designercandy.com.au/wp-content/uploads/paw-print-rainbow-candy-500x333.jpg"
                        title="This is a title of an article"
                        shortContent="This. This is some content. This is some content of an article. This is some content of an article which i need to test."
                        >
                    </HomeScreenArticle>
                    <HomeScreenArticle 
                        imageUri="https://designercandy.com.au/wp-content/uploads/paw-print-rainbow-candy-500x333.jpg"
                        title="This is a title of an article"
                        shortContent="This. This is some content. This is some content of an article. This is some content of an article which i need to test."
                        >
                    </HomeScreenArticle>
                </ScrollView>  
        );
    }
}