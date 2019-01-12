import React, {Component} from 'react'
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    AsyncStorage,
    StyleSheet,
    TouchableHighlight,
    Text,
    Alert,
    TouchableWithoutFeedback
} from 'react-native'
import reexService from '../../services/reexService'
import ResetNavigation from './../../util/resetNavigation'
import TextInput from './../../components/textInput'
import Colors from './../../config/colors'
import Header from './../../components/header'
import Big from 'big.js'

export default class AmountEntry extends Component {
    static navigationOptions = {
        title: 'Send Reex',
    }


    constructor(props) {
        super(props)
        const params = this.props.navigation.state.params
        this.state = {
            reference: params.reference,
            amount: 0,
            balance: 0,
            disabled: false
        }
    }

    transferConfirmed = async (amount) => {
        let wallet = JSON.parse(await AsyncStorage.getItem('wallet'))
        let user = JSON.parse(await AsyncStorage.getItem('user'))
        let responseJson = await reexService.sendMoney(wallet.walletId, user.email, user.id, this.state.reference, amount)

        if (responseJson.status === 200) {
            Alert.alert('Success',
                "Transaction successful",
                [{ text: 'OK', onPress: () => ResetNavigation.dispatchToSingleRoute(this.props.navigation, "Home") }])
        }
        else {
            Alert.alert('Error',
                "Transaction failed. Please verify your address and amount.",
                [{ text: 'OK' }])
        }
    }

    async componentWillMount(){
        await this.getBalanceInfo()
    }

    send = async () => {
        if (this.state.amount <= 0) {
            Alert.alert(
                'Invalid',
                'Enter valid amount',
                [[{text: 'OK'}]]
            )
        }
        else {
            const data = await AsyncStorage.getItem('currency')
            const currency = JSON.parse(data)
            let amount = new Big(this.state.amount)
            Alert.alert(
                'Are you sure?',
                'Send ' + this.state.amount + ' - ' + currency.symbol + ' to ' + this.state.reference,
                [
                    {text: 'Yes', onPress: () => this.transferConfirmed(amount)},
                    {
                        text: 'No',
                        onPress: () => ResetNavigation.dispatchToSingleRoute(this.props.navigation, "Home"),
                        style: 'cancel'
                    },
                ]
            )
        }
    }
    setBalance = (balance, divisibility) => {
        return balance
    }
    getBalanceInfo = async () => {
        const wallet = JSON.parse(await AsyncStorage.getItem('wallet'))
        let responseJson = await reexService.getBalance(wallet.walletId, wallet.email)
        if (responseJson.status === "success") {
            this.setState({ balance: responseJson.available_balance})
        }
    }

    amountChanged = (text) => {
        let amount = parseFloat(text)
        if (isNaN(amount)) {
            this.setState({amount: 0})
        }
        else {
            this.setState({amount})
            if (amount > this.state.balance) {
                this.setState({
                    disabled: true
                })
            } else {
                this.setState({
                    disabled: false
                })
            }
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    navigation={this.props.navigation}
                    back
                    title="Send Reex"
                />
                <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
                    <ScrollView keyboardDismissMode={'interactive'}>
                        <TextInput
                            title="Amount"
                            placeholder="Enter amount here"
                            autoCapitalize="none"
                            keyboardType="numeric"
                            underlineColorAndroid="white"
                            onChangeText={this.amountChanged}
                        />
                    </ScrollView>
                    {   this.state.disabled ?
                        <TouchableWithoutFeedback>
                            <View style={[styles.submit, {backgroundColor: Colors.lightgray}]}>
                                <Text style={{color: 'white', fontSize: 20}}>
                                    Amount exceeds balance
                                </Text>
                            </View>
                        </TouchableWithoutFeedback > :
                        <TouchableHighlight
                            style={styles.submit}
                            onPress={this.send}>

                            <Text style={{color: 'white', fontSize: 20}}>
                                Send
                            </Text>
                        </TouchableHighlight>

                    }
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingTop: 10
    },
    submit: {
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 25,
        height: 50,
        backgroundColor: Colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
