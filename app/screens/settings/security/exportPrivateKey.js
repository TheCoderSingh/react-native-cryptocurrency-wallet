import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Clipboard,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native'
import Colors from './../../../config/colors'
import Header from './../../../components/header'
import TextInput from './../../../components/textInput'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ReexService from '../../../services/reexService'
import Spinner from 'react-native-loading-spinner-overlay'

export default class ExportPrivateKey extends Component {
    static navigationOptions = {
        label: 'Export Private Key',
    }

    constructor(props) {
        super(props);
        
        this.state = {
            privateKey: '',
            mainAddress: '',
            code: '',
            canViewKeys: false,
            loading: false
        };
    }

    exportKeys = async () => {
        try
        {
            let code = this.state.code
            if (code === '')
            {
                Alert.alert('Error',
                    'Please provide your Mfa token.',
                    [{text: 'OK'}])
            }
            else {
                this.setState({ loading: true})
                let response = await ReexService.exportPrivateKey(code)
                let result = await response.json()
                if (result.status === 'success') {
                    let data = result.data
                    this.setState({ privateKey: data.privateKey, mainAddress: data.mainAddress, canViewKeys: true })
                }
                else {
                    Alert.alert('Error',
                    result.message,
                    [{text: 'OK'}])
                }
            }
            this.setState({ loading: false})
        }
        catch (error)
        {
            this.setState({ loading: false})
        }
    }

    render() {
        if (!this.state.canViewKeys)
        {
            return (
                <View style={styles.container}>
                    <Spinner
                        visible={this.state.loading}
                        textContent=""
                        textStyle={{color: '#FFF'}}
                    />
                    <Header
                        navigation={this.props.navigation}
                        back
                        title="Export Private Key"
                    />
                    <KeyboardAvoidingView style={styles.mainContainer} behavior={'padding'} keyboardVerticalOffset={85}>
                        <ScrollView style={{flex: 1,paddingBottom:10}}>
                            <TextInput
                                title="Enter your token"
                                placeholder="e.g. 123456"
                                value={this.state.token}
                                underlineColorAndroid="white"
                                keyboardType="numeric"
                                returnKeyType='next'
                                onChangeText={(code) => this.setState({code: code})}
                            />
                        </ScrollView>
                        <TouchableHighlight
                            style={styles.submit}
                            onPress={() => this.exportKeys()}>
                            <Text style={{color: 'white', fontSize: 20}}>
                                Submit
                            </Text>
                        </TouchableHighlight>
                    </KeyboardAvoidingView>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <Header
                        navigation={this.props.navigation}
                        back
                        title="Export Private Key"
                    />
                    <View style={styles.containerExportPrivateKey}>
                        <Text style={{paddingTop: 15, fontSize: 20, fontWeight: 'normal', color: Colors.white}}>
                            REEX
                        </Text>
                        <Text style={{paddingTop: 15, fontSize: 16, fontWeight: 'normal', color: Colors.white}}>
                            Your Private Key
                        </Text>
                        <View style={styles.boxed}>
                            <View style={styles.memoIcon}>
                                <Text style={[styles.memoText, {fontSize: 10}]}>
                                    {this.state.privateKey}
                                </Text>
                                <TouchableHighlight
                                    underlayColor={'white'}
                                    onPress={() => {
                                        Clipboard.setString(this.state.privateKey)
                                        Alert.alert(
                                            null,
                                            'Copied',
                                        )
                                    }}>
                                    <Icon
                                        name="content-copy"
                                        size={30}
                                        color={Colors.black}
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                        <Text style={{paddingTop: 15, fontSize: 16, fontWeight: 'normal', color: Colors.white}}>
                            Your Address
                        </Text>
                        <View style={styles.boxed}>
                            <View style={styles.memoIcon}>
                                <Text style={[styles.memoText, {fontSize: 10}]}>
                                    {this.state.mainAddress}
                                </Text>
                                <TouchableHighlight
                                    underlayColor={'white'}
                                    onPress={() => {
                                        Clipboard.setString(this.state.mainAddress)
                                        Alert.alert(
                                            null,
                                            'Copied',
                                        )
                                    }}>
                                    <Icon
                                        name="content-copy"
                                        size={30}
                                        color={Colors.black}
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 16,
        color: Colors.black,
        padding: 20,
    },
    containerExportPrivateKey: {
        backgroundColor: 'white',
        alignItems: 'center',
        backgroundColor: Colors.blue,
    },
    boxed: {
        flexDirection: 'column',
        padding: 5,
        backgroundColor: Colors.lightgray,
    },
    memoText: {
        flex: 1,
        padding: 2,
        fontSize: 14,
        fontWeight: "bold",
        color: Colors.black,
    },
    memoIcon: {
        padding: 5,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        backgroundColor: Colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 4,
        marginHorizontal: 15,
        marginVertical: 8
    },
    buttonTextColor: {
        color: 'white'
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