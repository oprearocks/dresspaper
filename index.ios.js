import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  NavigatorIOS
} from 'react-native';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import LoginScreen from './login';

export default class dresspaper extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Provider store={ store }>
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            component: LoginScreen,
            title: 'LoginScreen',
            navigationBarHidden: true,
          }}/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});


AppRegistry.registerComponent('dresspaper', () => dresspaper);
