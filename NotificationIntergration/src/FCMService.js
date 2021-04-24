import messaging from '@react-native-firebase/messaging'
import { Platform } from 'react-native'
import inAppMessaging from '@react-native-firebase/in-app-messaging';

class FCMService {
    innitInAppMessage = async () => {
        console.log("innitInAppMessage")
        await inAppMessaging().setMessagesDisplaySuppressed(true);
    }
    // Register
    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister);
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
    }
    // RegisterAppWithFCM
    registerAppWithFCM = async () => {
        if (Platform.OS == 'ios') {
            // await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
            await messaging().registerDeviceForRemoteMessages();

            messaging()
                .subscribeToTopic('weather')
                .then(() => console.log('Subscribed to topic!'))
        }
    }
    // CheckPermission
    checkPermission = (onRegister) => {
        messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    this.getToken(onRegister)
                }
                else {
                    this.requestPermission(onRegister)
                }
            })
            .catch(error => {
                console.log("[FCMService] Permission rejected", error)
            })
    }
    // get Token
    getToken = (onRegister) => {
        messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    onRegister(fcmToken)
                }
                else {
                    console.log("[FCMService] User does not have a device token")
                }
            })
            .catch(error => {
                console.log("[FCMService] getToken rejected", error)
            })
    }
    // requestPermisstion
    requestPermission = (onRegister) => {
        messaging().requestPermission()
            .then(() => {
                this.getToken(onRegister)

            })
            .catch(error => {
                console.log("[FCMService] Request Permisstion rejected", error)
            })
    }
    // DeleteToken 
    deleteToken = () => {
        console.log("[FCMService] deleteToeken")
        messaging().deleteToken()
            .catch(error => {
                console.log("[FCMService] delete token error", error)
            })
    }
    // createNotificationListener
    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
        // When the application is running, but in the background
        messaging()
            .onNotificationOpenedApp(remoteMessage => {
                console.log("[FMCmessage] onNotificationOpenedApp Nofication caused App to open")
                if (remoteMessage) {
                    const notification = remoteMessage.notification
                    onOpenNotification(notification);
                }
            });
        // Wehn the application is opened from a quit state
        messaging().getInitialNotification()
            .then(remoteMessage => {
                console.log("[FCMService] get InitialNotification casued to open")
                if (remoteMessage) {
                    const notification = remoteMessage.notification
                    onOpenNotification(notification);
                }
            });
        // Foreground State message
        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.log("[FCMservice] Anew FCM message arrived", remoteMessage);
            if (remoteMessage) {
                let notification = null
                if (Platform.OS == "ios") {
                    notification = remoteMessage.data.notification;
                }
                else {
                    notification = remoteMessage.notification;
                }
                onNotification(notification)
            }
        })
        // Trigger when have new token
        messaging().onTokenRefresh(fcmToken => {
            console.log("[FCMSerivce] New token refresh", fcmToken)
            onRegister(fcmToken)
        })
    }
    // unRegister = () 
    unRegister = () => {
        this.messageListener()
    }
    // async requestUserPermission() {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //     if (enabled) {
    //         console.log('Authorization status:', authStatus);
    //     }
    // }


}
export const fcmService = new FCMService();