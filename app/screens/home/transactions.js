import React, {Component} from 'react';
import moment from 'moment'
import {
    View,
    Text,
    FlatList,
    ScrollView,
    RefreshControl,
    AsyncStorage,
} from 'react-native'
import {ListItem} from "react-native-elements"
import TransactionService from './../../services/transactionService'
import UserInfoService from './../../services/userInfoService'
import SettingsService from './../../services/settingsService'
import Colors from './../../config/colors'
import Big from 'big.js'
import ReexService from '../../services/reexService'

export default class Transactions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            noTransaction: false,
            verified: true,
            loading: false,
            data: [],
            nextUrl: null,
            error: null,
            refreshing: false,
            company: {},
        };
    }

    async componentDidMount() {
        await this.getData()
    }

    setData = async (responseJson) => {
        if (responseJson.status === "success") {
            const data = this.state.data.concat(responseJson.data)
            this.setState({
                data,
                noTransaction: false,
                nextUrl: 1,
            })
        }

        if (this.state.data.length === 0) {
            let responseJson = await UserInfoService.getCompany()
            let responseEmails = await SettingsService.getAllEmails()
            if (responseJson.status === "success" && responseEmails.status === "success") {
                let emails = responseEmails.data
                let verified = emails.filter(function (node) {
                    return node.verified === true
                })
                if (verified.length !== 0) {
                    this.setState({
                        company: responseJson.data,
                        noTransaction: true,
                        verified: true,
                    })
                }
                else {
                    this.setState({
                        company: responseJson.data,
                        noTransaction: true,
                        verified: false,
                    })
                }
            }
            else {
                this.props.logout()
            }
        }
    }

    getData = async () => {
        this.setState({
            data: [],
        })
        let wallet = JSON.parse(await AsyncStorage.getItem('wallet'))
        let user = JSON.parse(await AsyncStorage.getItem('user'))
        if (wallet === null) {
            wallet = await ReexService.getWallet(user.id, user.email)
            await AsyncStorage.removeItem('wallet')
            await AsyncStorage.setItem('wallet', JSON.stringify(wallet))
        }
        let responseJson = await ReexService.getTransactions(wallet.walletId, user.email, 0, 20)
        this.setData(responseJson)
    }

    handleRefresh() {
        this.props.updateBalance()
        if (this.state.loading !== true) {
            this.setState({refreshing: true});
            this.getData().then(() => {
                this.setState({refreshing: false});
            })
        }
    }


    handleLoadMore = async () => {
        if (this.state.refreshing !== true && this.state.loading !== true && this.state.nextUrl) {
            this.setState({'loading': true})
            let responseJson = await TransactionService.getNextTransactions(this.state.nextUrl)
            this.setData(responseJson)
            this.setState({'loading': false})
        }
    }

    getAmount = (amount, divisibility) => {
      amount = new Big(amount)
      return amount.toFixed(8).replace(/\.?0+$/, "")
    }

    render() {
        if (this.state.noTransaction) {
            return (
                <View style={{flex: 1, backgroundColor: Colors.lightgray,paddingHorizontal:10}}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.handleRefresh.bind(this)}
                            />
                        }>
                        <View style={{
                            marginTop: 10, flexDirection: 'column', backgroundColor: 'white', padding: 20
                        }}>
                            <Text style={{fontSize: 24, fontWeight: 'normal', color: Colors.black}}>
                                Welcome to {this.state.company.name}
                            </Text>
                            <Text style={{paddingTop: 15, fontSize: 18, fontWeight: 'normal', color: Colors.black}}>
                                {this.state.verified ? null : "Please verify your email address to redeem any unclaimed transactions. "}
                                Pull to refresh your balance.
                            </Text>
                        </View>
                    </ScrollView>
                    
                </View>
            )
        }
        else {
            return (
                <View style={{flex: 1, backgroundColor: Colors.lightgray}}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) => (
                            <ListItem
                                avatar={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgmT5tM-IGcFDpqZ87p9zKGaWQuzpvAcDKfOTPYfx5A9zOmbTh8RMMFg'}
                                title={item.category === 'receive' ? "Received" : "Sent"}
                                subtitle={moment((new Date(item.timereceived*1000))).format('lll')}
                                rightTitle={`${this.getAmount(item.amount, false)}`}
                                rightTitleStyle={{'color': '#000000'}}
                                containerStyle={{paddingRight: 20}}
                                hideChevron
                                roundAvatar
                                onPress={() => {
                                    this.props.showDialog(item)
                                }}
                                //containerStyle={{'backgroundColor':'#FAFBFC'}}
                            />
                        )}
                        keyExtractor={tx => tx.key}
                        onRefresh={this.handleRefresh.bind(this)}
                        refreshing={this.state.refreshing}
                        //onEndReached={this.handleLoadMore.bind(this)}
                        //onEndReachedThreshold={50}
                    />
                </View>
            )
        }
    }
}
