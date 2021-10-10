// https://reactnative.dev/docs/native-modules-android

package com.zoontek.rnmoduletemplate;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;

@ReactModule(name = RNModuleTemplateModule.MODULE_NAME)
public class RNModuleTemplateModule extends ReactContextBaseJavaModule {

  public static final String MODULE_NAME = "RNModuleTemplate";

  public RNModuleTemplateModule(ReactApplicationContext reactContext) {
    super(reactContext);

    IntentFilter filter = new IntentFilter();
    filter.addAction(Intent.ACTION_TIMEZONE_CHANGED);

    BroadcastReceiver mBroadcastReceiver = new BroadcastReceiver() {
      @Override
      public void onReceive(Context context, Intent intent) {
        ReactApplicationContext reactContext = getReactApplicationContext();

        if (intent.getAction().equals(Intent.ACTION_TIMEZONE_CHANGED)) {
          WritableMap body = Arguments.createMap();

          DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ", Locale.getDefault());
          dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));

          body.putString("date", dateFormat.format(new Date()));
          body.putString("value", TimeZone.getDefault().getID());

          reactContext
            .getJSModule(RCTDeviceEventEmitter.class)
            .emit("timeZoneChange", body);
        }
      }
    };

    reactContext
      .registerReceiver(mBroadcastReceiver, filter);
  }

  @Override
  public String getName() {
    return MODULE_NAME;
  }

  @Override
  public @Nullable Map<String, Object> getConstants() {
    HashMap<String, Object> constants = new HashMap<>();
    constants.put("initialTimeZone", TimeZone.getDefault().getID());
    return constants;
  }

  @ReactMethod
  public void addListener(String eventName) {
    // Set up any upstream listeners or background tasks as necessary
  }

  @ReactMethod
  public void removeListeners(Integer count) {
    // Remove upstream listeners, stop unnecessary background tasks
  }

  @ReactMethod
  public void getTimeZone(Promise promise) {
    try {
      promise.resolve(TimeZone.getDefault().getID());
    } catch (Exception exception) {
      promise.reject("error_code", exception.getMessage());
    }
  }
}
