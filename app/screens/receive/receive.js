import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, Clipboard, TouchableHighlight, Alert, AsyncStorage} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import reexService from '../../services/reexService'
import Colors from './../../config/colors'
import Header from './../../components/header'

export default class Receive extends Component {
    static navigationOptions = {
        title: 'Receive',
    }

    constructor() {
        super()

        this.state = {
            cryptoAddress: {
                qrCode: '',
                address: '',
                reference: '',
                modalVisible: false,
            },
        }
    }

    async componentWillMount() {
        await this.getCryptoAddress()
    }

    getCryptoAddress = async () => {
        const wallet = JSON.parse(await AsyncStorage.getItem('wallet'))

        const {cryptoAddress} = this.state
        cryptoAddress.qrCode = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' + wallet.addresses[0].myAddress + '&choe=UTF-8'
        cryptoAddress.address = wallet.addresses[0].myAddress

        this.setState({cryptoAddress})
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    drawer
                    title="Receive"
                />
                <Text style={styles.text}>
                    The QR code is your public address for accepting payments.
                </Text>
                <Image
                    style={{width: 300, height: 300}}
                    source={{uri: this.state.cryptoAddress.qrCode}}
                />
                <View style={styles.boxed}>
                    <View style={styles.memoIcon}>
                        <Text style={[styles.memoText, {fontSize: 10}]}>
                            {this.state.cryptoAddress.address}
                        </Text>
                        <TouchableHighlight
                            underlayColor={'white'}
                            onPress={() => {
                                Clipboard.setString(this.state.cryptoAddress.address)
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
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        color: Colors.black,
        padding: 20,
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
    bottomModal: {
        width: '80%',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderColor: Colors.black,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 60,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.lightgray
    },
    buttonText: {
        fontSize: 18,
    },
})
