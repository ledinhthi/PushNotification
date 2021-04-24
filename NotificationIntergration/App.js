/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Button,
  Text,
  PixelRatio,Dimensions
} from 'react-native';
import { fcmService } from './src/FCMService'
import { localNotificationService } from "./src/LocalNotificationServer"
import calculateScreen from './util/Util'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenFontSize,
  useResponsiveFontSize
} from "react-native-responsive-dimensions";

const App = () => {
  React.useEffect(() => {

    const screenWith = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
    console.log("Screenwith", screenWith, "ScreenHeight", screenHeight)
    fcmService.register(onRegister, onNotification, onOpenNotification);
    fcmService.registerAppWithFCM();
    localNotificationService.configure(onOpenNotification)
    function onRegister(token) {
      console.log("[App] onRegister:", token)
    }

    function onNotification(notify) {
      console.log("[App] onNotification:", notify)
      const options = {
        soundName: 'default',
        playSound: true,
      }
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      )
    }

    function onOpenNotification(notify) {
      console.log("[APP] onNOtification", notify)
      alert("Open Notification" + notify.body)
    }
    return () => {
  
      fcmService.unRegister()
      localNotificationService.unRegister()
    }
  }, [])
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style = {{justifyContent: 'center',backgroundColor: 'red', width: PixelRatio.roundToNearestPixel('40%'), height: 14, overflow: 'hidden'}}>
          <Text style = {{fontSize: PixelRatio.roundToNearestPixel(14)}}>
            adadad
          </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
