package com.relibuild

import android.os.Bundle  // Import Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

    // Override onCreate with the correct signature
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null)  // Required for react-native-reanimated
    }

    override fun getMainComponentName(): String = "relibuild"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
