import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { normalize } from 'react-native-elements';
import haksikCrawl from '../../../JedaeroAPI/HaksikAPI'

class Haksik extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.meal !== null ? this.props.meal : "");
    }
    render = () => {
        if(this.state.meal !== undefined) {
            return (
              <View style={{alignItems: 'center', paddingTop:20, flex:1, backgroundColor:'#f7f7f7'}}>
                <ActivityIndicator size='large' color='#344955'/>
              </View>
            )
          } else {
            return (
              <ScrollView style={styles.container}>
                <HaksikList title="정식" food={this.state.meal.combo}/>
                <HaksikList title="특식" food={this.state.meal.special}/>
                <HaksikList title="양식" food={this.state.meal.western}/>
                <HaksikList title="중식" food={this.state.meal.chinese}/>
                <HaksikList title="정식 저녁" food={this.state.meal.dinner}/>
              </ScrollView>
            )
          }
    }
}

class HaksikList extends Component {
    render() {
      return (
        <View elevation={4} style={{margin: 8, backgroundColor:'#ffffff', borderTopLeftRadius:4, borderTopRightRadius:4}}>
          <TouchableOpacity style={styles.list} activeOpacity={0.8}>
            <View elevation={4} style={styles.foodlistContainer}>
              <Text style={styles.foodlistTitle}>{this.props.title}</Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.foodlist}>{this.props.food}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
}

let HaksikTabNavigator = createMaterialTopTabNavigator({
    HaksikMon: {
        screen: props => <Haksik DoW="mon" navigation={props.navigation} meal={props.screenProps.meal}/>,
        navigationOptions: {
            title:'월'
        }
    }, 
    HaksikTue: {
        screen: props => <Haksik DoW="tue" navigation={props.navigation} meal={props.screenProps.meal}/>,
        navigationOptions: {
            title:'화'
        }
    }, 
    HaksikWed: {
        screen: props => <Haksik DoW="wed" navigation={props.navigation} meal={props.screenProps.meal}/>,
        navigationOptions: {
            title:'수'
        }
    }, 
    HaksikThu: {
        screen: props => <Haksik DoW="thu" navigation={props.navigation} meal={props.screenProps.meal}/>,
        navigationOptions: {
            title:'목'
        }
    }, 
    HaksikFri: {
        screen: props => <Haksik DoW="fri" navigation={props.navigation} meal={props.screenProps.meal}/>,
        navigationOptions: {
            title:'금'
        }
    }, 
}, {
    tabBarOptions: {
        showIcon: false,
        tabStyle:{
            justifyContent:'center',
            alignItems:'center',
        },
        labelStyle: {
            fontSize:normalize(20),
        },
        activeTintColor:'#344955',
        tabBarOptions:'bottom'
    },
    backBehavior: 'none'
});

export default class HakSikMain extends Component {
    static router = HaksikTabNavigator.router;

    constructor(props) {
        super(props);

        this.state = {
            data: {}
        }
    }

    componentDidMount = () => this.getData();

    getData = async () => {
        let data = await haksikCrawl()
        this.setState({ data });
    }

    render() {
        return <HaksikTabNavigator navigation={this.props.navigation} screenProps={{ meal: this.state.data }}/>
    }
}

let styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#f7f7f7'
    },
    title: {
      justifyContent:'center',
      alignItems:'center'
    },
    foodlist: {fontSize:normalize(16), textAlign:'center', fontFamily:'NotoSansCJKkr-Regular'},
    foodlistContainer: {
      backgroundColor:'#344955',
      borderTopLeftRadius:4,
      borderTopRightRadius:4
    },
    foodlistTitle: {
      textAlign:'center',
      fontSize: normalize(20),
      fontFamily: 'NotoSansCJKkr-Regular',
      color:'white'
    },
    subContainer: {
      borderLeftWidth:0.5,
      borderRightWidth:0.5,
      borderBottomWidth:0.5,
      borderColor:'#929292',
    }
});