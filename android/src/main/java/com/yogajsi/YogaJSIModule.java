package com.yogajsi;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = YogaJSIModule.NAME)
public class YogaJSIModule extends ReactContextBaseJavaModule {
  public static final String NAME = "YogaJSI";

  public YogaJSIModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @NonNull
  @Override
  public String getName() {
    return NAME;
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean install() {
    try {
      Log.i(NAME, "Loading C++ library...");
      System.loadLibrary("reactnativeyogajsi");

      JavaScriptContextHolder jsContext = getReactApplicationContext().getJavaScriptContextHolder();
      if (jsContext.get() == 0) {
        Log.e(NAME, "JSI Runtime is not available in JavaScriptContextHolder.");
        return false;
      }

      Log.i(NAME, "Installing JSI Bindings for react-native-yoga-jsi...");
      nativeInstall(jsContext.get());
      Log.i(NAME, "Successfully installed JSI Bindings for react-native-yoga-jsi!");

      return true;
    } catch (Exception exception) {
      Log.e(NAME, "Failed to install JSI Bindings for react-native-yoga-jsi!", exception);
      return false;
    }
  }

  private native void nativeInstall(long jsiPtr);
}
