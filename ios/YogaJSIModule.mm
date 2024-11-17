#import "YogaJSIModule.h"

#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>
#import <ReactCommon/RCTTurboModule.h>
#import <jsi/jsi.h>
#import "../cpp/yogaJSI.h"


@implementation YogaJSIModule

@synthesize bridge=_bridge;

RCT_EXPORT_MODULE(YogaJSI)

- (void)setBridge:(RCTBridge *)bridge {
  _bridge = bridge;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install) {
  NSLog(@"Installing JSI bindings for react-native-yoga-jsi...");
  RCTCxxBridge* cxxBridge = (RCTCxxBridge*)_bridge;
  if (cxxBridge == nil) {
    return @false;
  }

  using namespace facebook;

  auto jsiRuntime = (jsi::Runtime*)cxxBridge.runtime;
  if (jsiRuntime == nil) {
    return @false;
  }

    yogaJSI::install(*(facebook::jsi::Runtime *)jsiRuntime);

  NSLog(@"Successfully installed JSI bindings for react-native-yoga-jsi!");
  return @true;
}

@end
