import React, {Component} from 'react';
import moment from 'moment'
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Clipboard,
    Alert,
} from 'react-native'
import Colors from './../../config/colors'
import Header from './../../components/header'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class TransactionDetails extends Component {
    static navigationOptions = {
        label: 'Transaction Details',
    }

    constructor(props) {
        super(props);

        let data = props.navigation.state.params.item

        this.state = {
            txId: data.txid,
            txType: data.category,
            amount: data.amount,
            date: data.timereceived,
            confirmations: data.confirmations,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    back
                    title="Transaction Details"
                />
                <View style={styles.containerTransaction}>
                    <Text style={{paddingTop: 15, fontSize: 16, fontWeight: 'normal', color: Colors.white}}>
                        {this.state.txType}
                    </Text>
                    <Text style={{paddingTop: 15, fontSize: 16, fontWeight: 'normal', color: Colors.white}}>
                        {this.state.amount} REEX
                    </Text>
                    <Text style={{paddingTop: 15, fontSize: 16, fontWeight: 'normal', color: Colors.white}}>
                        {moment((new Date(this.state.date*1000))).format('lll')}
                    </Text>
                    <Text style={{paddingTop: 15, fontSize: 16, fontWeight: 'normal', color: Colors.white}}>
                        Confirmations: {this.state.confirmations}
                    </Text>
                    <Text style={{paddingTop: 15, paddingBottom: 15, fontSize: 16, fontWeight: 'normal', color: Colors.white}}>
                        Transaction Id
                    </Text>
                    <View style={styles.boxed}>
                        <View style={styles.memoIcon}>
                            <Text style={[styles.memoText, {fontSize: 10}]}>
                                {this.state.txId}
                            </Text>
                            <TouchableHighlight
                                underlayColor={'white'}
                                onPress={() => {
                                    Clipboard.setString(this.state.txId)
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    containerTransaction: {
        backgroundColor: 'white',
        alignItems: 'center',
        backgroundColor: Colors.blue,
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