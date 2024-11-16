#include <fbjni/fbjni.h>
#include <jni.h>
#include <jsi/jsi.h>
#include "yogaJSI.h"
#include <ReactCommon/CallInvokerHolder.h>

using namespace facebook;

extern "C" JNIEXPORT void JNICALL
Java_com_yogajsi_YogaJSIModule_nativeInstall(JNIEnv *env, jobject thiz, jlong jsiPtr)
{
  auto runtime = reinterpret_cast<jsi::Runtime *>(jsiPtr);
  if (runtime)
  {
    yogaJSI::install(*runtime);
  }
}