// https://reactnative.dev/docs/native-modules-ios

#import "RNModuleTemplate.h"

@implementation RNModuleTemplate {
  bool hasListeners;
}

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

RCT_EXPORT_METHOD(getTimeZone:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  @try {
    resolve([[NSTimeZone localTimeZone] name]);
  } @catch (NSException *exception) {
    reject(@"error_code", exception.reason, nil);
  }
}

- (NSDictionary *)constantsToExport {
  return @{
    @"initialTimeZone": [[NSTimeZone localTimeZone] name],
  };
}

- (void)startObserving {
  hasListeners = true;

  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(onTimeZoneChange)
                                               name:NSSystemTimeZoneDidChangeNotification
                                             object:nil];
}

- (void)stopObserving {
  hasListeners = false;

  [[NSNotificationCenter defaultCenter] removeObserver:self
                                                  name:NSSystemTimeZoneDidChangeNotification
                                                object:nil];
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"timeZoneChange"];
}

- (void)onTimeZoneChange {
  if (hasListeners) {
    NSISO8601DateFormatter *formatter = [NSISO8601DateFormatter new];

    [self sendEventWithName:@"timeZoneChange" body:@{
      @"date": [formatter stringFromDate:[NSDate date]],
      @"value": [[NSTimeZone localTimeZone] name],
    }];
  }
}

@end
