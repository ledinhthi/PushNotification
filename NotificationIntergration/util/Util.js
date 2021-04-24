
import react from 'react-native'
import { Platform, Dimensions, PixelRatio } from 'react-native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
// IOS: Ios pixel = (points * DPI) / 163
// Android Device: Android pixel = (DP * DPI) / 160
const screenWith = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
class CalculateScreen {
    getWidth(width) {
        let widthPercent = parseFloat((width / screenWith) * 100);
        let tempWidth = responsiveWidth(widthPercent);

        // let tempWidth = responsiveWidth(width);
        console.log("tempWidth", tempWidth, "widthPercent", widthPercent, "screenWith", screenWith)
        return tempWidth;
    }
    getHeigth(height) {
        let heightPercent = parseFloat(height / screenHeight) * 100;
         let tempHeight = responsiveHeight(heightPercent);

        // let tempHeight = responsiveHeight(height);
        console.log("tempHeight", tempHeight, "heightPercent", heightPercent, "screenHeight", screenHeight)
        return tempHeight;
    }
}
let calculateScreen = new CalculateScreen();
export default calculateScreen;