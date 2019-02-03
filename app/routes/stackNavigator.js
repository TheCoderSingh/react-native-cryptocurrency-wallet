import { StackNavigator } from 'react-navigation'

import Home from './drawerNavigator'
import Login from './../screens/auth/login'
import InitialScreen from './../screens/home/initialScreen'
import TransactionDetails from './../screens/home/transactionDetails'
import Signup from './../screens/auth/signup'
import ForgetPassword from './../screens/auth/forgetPassword'
import SendMoney from './../screens/transfer/amountEntry'
import SendTo from './../screens/transfer/sendTo'
import QRcodeScanner from './../screens/transfer/qrcodeScanner'
import SettingsEmailAddresses from './../screens/settings/emailAddresses/emailAddresses'
import AddEmailAddress from './../screens/settings/emailAddresses/addEmailAddress'
import SettingsSecurity from './../screens/settings/security/security'
import ChangePassword from './../screens/settings/security/changePassword'
import TwoFactor from '../screens/settings/security/twoFactor/twoFactor'
import TwoFactorToken from '../screens/settings/security/twoFactor/twoFactorToken' 
import AuthVerifySms from '../screens/settings/security/twoFactor/authoVerifySms'
import ExportPrivateKey from './../screens/settings/security/exportPrivateKey'

const Stack = {
    Home: {
        screen: Home,
    },
    InitialScreen: {
        screen: InitialScreen
    },
    Login: {
        screen: Login,
    },
    Signup: {
        screen: Signup,
    },
    ForgetPassword: {
        screen: ForgetPassword,
    },
    SendMoney: {
        screen: SendMoney,
    },
    SendTo: {
        screen: SendTo,
    },
    QRcodeScanner: {
        screen: QRcodeScanner,
    },
    SettingsEmailAddresses: {
        screen: SettingsEmailAddresses,
    },
    AddEmailAddress: {
        screen: AddEmailAddress,
    },
    SettingsSecurity: {
        screen: SettingsSecurity,
    },
    ChangePassword: {
        screen: ChangePassword,
    },
    TwoFactor: {
        screen: TwoFactor,
    },
    TwoFactorToken: {
        screen: TwoFactorToken,
    },
    TransactionDetails: {
        screen: TransactionDetails
    },
    AuthVerifySms: {
        screen: AuthVerifySms
    },
    ExportPrivateKey: {
        screen: ExportPrivateKey
    }
}


export default StackNavigator(Stack, {
    headerMode: 'none',
})
