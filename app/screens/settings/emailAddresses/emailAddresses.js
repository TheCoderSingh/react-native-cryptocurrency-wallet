import React, {Component} from 'react'
import {View, StyleSheet, ListView, Alert, AsyncStorage, TouchableHighlight, Text, RefreshControl} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import EmailAddress from './../../../components/emailAddress'
import ResetNavigation from './../../../util/resetNavigation'
import Colors from './../../../config/colors'
import Header from './../../../components/header'
import AuthService from './../../../services/authService'
import UserInfoService from './../../../services/userInfoService'

export default class Settings extends Component {
    static navigationOptions = {
        title: 'Email addresses',
    }

    constructor(props) {
        super(props);
        this.state = {
            routeName: this.props.navigation.state.params?this.props.navigation.state.params.name:null,
            refreshing: false,
            loading: false,
            loadingMessage: '',
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
            }),
        }
    }

    componentWillMount() {
        this.getData()
    }

    getData = async () => {
        let responseJson = await UserInfoService.getUserDetails()
        if (responseJson.status === 'success') {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)});
            const data = [
                {
                    id: responseJson.data.id,
                    email: responseJson.data.email,
                    isVerified: responseJson.data.isVerified
                }
            ]
            let ids = data.map((obj, index) => index);
            this.setState({
                dataSource: ds.cloneWithRows(data, ids),
            })
        }
        else {
            Alert.alert('Error',
                responseJson.message,
                [{text: 'OK'}])
        }
    }

    reload = () => {
        ResetNavigation.dispatchUnderDrawer(this.props.navigation, this.state.routeName != null ? 'GetVerified' : 'Settings', 'SettingsEmailAddresses')
    }

    verify = async (number) => {
        this.setState({
            loading: true,
            loadingMessage: 'Sending verification code...',
        })

        let responseJson = await AuthService.sendEmailVerification()

        if (responseJson.status === "success") {
            Alert.alert(
                "Email Sent",
                "A verification email has been sent, please check your email box.",
                [{text: 'OK', onPress: () => this.setState({loading: false})}],
            )
        }
        else {
            Alert.alert('Error',
                responseJson.message,
                [{text: 'OK', onPress: () => this.setState({loading: false})}])
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    back
                    title="Email addresses"
                />
                <Spinner
                    visible={this.state.loading}
                    textContent={this.state.loadingMessage}
                    textStyle={{color: '#FFF'}}
                />
                <ListView
                    refreshControl={<RefreshControl refreshing={this.state.refreshing}
                                                    onRefresh={this.getData.bind(this)}/>}
                    dataSource={this.state.dataSource}
                    enableEmptySections
                    renderRow={(rowData) => <EmailAddress email={rowData}
                                                          verify={this.verify}
                                                          reload={this.reload}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    submit: {
        marginBottom: 10,
        marginHorizontal: 20,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
