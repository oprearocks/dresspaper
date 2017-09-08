import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  AsyncStorage,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import { startLogin, loginSuccess, loginFailed } from './actions';
import PhotoGrid from './../photos';

class LoginScreen extends Component {
  render() {
    const radarPurple = ['#A770EF', '#CF8BF3', '#FDB99B'];
    const ibizaSunset = ['#ff6a00', '#ee0979'];
    const hazel = ['#77a1d3', '#79cbca', '#e684ae'];
    const sunrise = ['#ff512f', '#f09819'];
    const peach = ['#ed4264', '#ffedbc'];

    const gradients = [radarPurple, ibizaSunset, hazel];

    function getGradient() {
        return (Math.floor(Math.random() * (100 - 1)) - 1) % gradients.length;
    }

    const currentGradient = gradients[getGradient()];

    return (
        <View style={styles.linearGradient}>
            <LinearGradient colors={currentGradient} style={{ position: 'absolute', top:0, left:0, right:0, bottom: 0}}/>
            <TouchableHighlight
                onPress={ this.login.bind(this) }
                style={[ styles.button, styles.buttonWhiteFill]}
                activeOpacity={1}
                underlayColor="rgba(255, 255, 255, .95)">
                <Text style={[ styles.login, { color: currentGradient[0]}]}>LOGIN</Text>
            </TouchableHighlight>

            <TouchableHighlight
                onPress={ this.login.bind(this) }
                style={[ styles.button ]}
                activeOpacity={1}
                underlayColor="rgba(255, 255, 255, .1)">
                <Text style={[ styles.signUp ]}>SIGN UP</Text>
            </TouchableHighlight>
        </View>
    );
  }

  login() {
    const { dispatch } = this.props;

    dispatch(startLogin());
    LoginManager
        .logInWithReadPermissions(['email', 'public_profile', 'user_birthday', 'user_photos'])
        .then((result) => {
            if (result.isCancelled) {
                dispatch(loginFailed('login cancelled'));
                alert('Login cancelled!');
            } else {
                dispatch(loginSuccess(result));

                AccessToken
                    .getCurrentAccessToken()
                    .then(result => {
                        this.props.navigator.push({
                            title: 'Photo Grid',
                            component: PhotoGrid,
                        });
                    })
                    .catch(error => {
                        alert(`Unable to retrieve access token`);
                    });
            }
        })
        .catch((error) => {
            dispatch(loginFailed(error));
            alert(`Login failed with error: ${error}`);
        });
  }
}

function mapStateToProps(state, ownProps) {
    const { login } = state || {
        login: {}
    };

    return {
        login
    };
};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    button: {
        borderColor: 'white',
        borderWidth: 1,
        padding: 16,
        borderRadius: 26,
        width: 256,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: '#777',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 4,
        shadowOpacity: .5
    },
    buttonWhiteFill: {
        backgroundColor: 'white',
    },
    login: {
        fontSize: 16,
        textAlign: 'center',
    },
    signUp: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
    }
});

export default connect(mapStateToProps)(LoginScreen);
