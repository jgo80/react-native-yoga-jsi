project(ReactNativeYogaJSI)
cmake_minimum_required(VERSION 3.10.2)

set(PACKAGE_NAME "reactnativeyogajsi")
set(BUILD_DIR ${CMAKE_SOURCE_DIR}/build)
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 20)

# set (CMAKE_C_FLAGS_DEBUG "${CMAKE_C_FLAGS_DEBUG} -g")
# set (CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -g")

# Third party libraries (Prefabs)
find_package(fbjni REQUIRED CONFIG)
find_package(ReactAndroid REQUIRED CONFIG)
find_package(openssl REQUIRED CONFIG)
find_library(LOG_LIB log)

# Set the Yoga path and include all files recursively
set(YOGA_PATH "${NODE_MODULES_DIR}/react-native/ReactCommon/yoga")
file(GLOB_RECURSE YOGA_SOURCES "${YOGA_PATH}/*.cpp" "${YOGA_PATH}/*.h")

# Add main library sources
add_library(
  ${PACKAGE_NAME}
  SHARED
  "../cpp/yogaJSI.h"
  "../cpp/nodeCreation.h"
  "../cpp/configCreation.h"
  "../cpp/macros.h"
  "src/main/cpp/cpp-adapter.cpp"
  ${YOGA_SOURCES} # Add Yoga sources
)

# Include directories for Yoga and other dependencies
target_include_directories(
  ${PACKAGE_NAME}
  PRIVATE
  "../cpp"
  "src/main/cpp"
  "${NODE_MODULES_DIR}/react-native/ReactCommon"
  "${NODE_MODULES_DIR}/react-native/ReactCommon/callinvoker"
  "${NODE_MODULES_DIR}/react-native/ReactAndroid/src/main/jni/react/turbomodule"
  "${NODE_MODULES_DIR}/react-native/ReactCommon/jsi"
  "${NODE_MODULES_DIR}/react-native/ReactCommon/turbomodule/core"
  "${NODE_MODULES_DIR}/react-native/ReactCommon/react/nativemodule/core"
  ${YOGA_PATH} # Add Yoga path to include directories
)

# Linking libraries
target_link_libraries(
  ${PACKAGE_NAME}
  fbjni::fbjni                           # <-- fbjni
  ${LOG_LIB}                             # <-- Logcat logger
  ReactAndroid::jsi                      # <-- RN: JSI
  android                                # <-- Android JNI core
)

# Conditionally link libraries based on ReactAndroid version
if(ReactAndroid_VERSION_MINOR GREATER_EQUAL 76)
  target_link_libraries(
    ${PACKAGE_NAME}
    ReactAndroid::reactnative             # <-- RN: Native Modules umbrella prefab
  )
else()
  target_link_libraries(
    ${PACKAGE_NAME}
    ReactAndroid::turbomodulejsijni
    ReactAndroid::reactnativejni           # <-- RN: React Native JNI bindings
    ReactAndroid::react_nativemodule_core  # <-- RN: React Native native module core
  )
endif()
