#ifndef CONFIG_CREATION_H
#define CONFIG_CREATION_H

#include <jsi/jsi.h>
#include <yoga/Yoga.h>
#include "macros.h"

#define INSTALL_HOST_FUN_TO_CONFIG_CREATION(funcName, argCount, body)                                                                                    \
    auto funcName = Function::createFromHostFunction(rt,                                                                                                 \
                                                     PropNameID::forAscii(rt, #funcName),                                                                \
                                                     argCount,                                                                                           \
                                                     [](Runtime & runtime, const Value &thisValue, const Value *arguments, size_t count) -> Value body); \
    configCreationObject.setProperty(rt, #funcName, std::move(funcName));

#define INSTALL_HOST_FUN_TO_CONFIG(funcName, argCount, body)                                                                                                   \
    auto funcName = Function::createFromHostFunction(runtime,                                                                                                  \
                                                     PropNameID::forAscii(runtime, #funcName),                                                                 \
                                                     argCount,                                                                                                 \
                                                     [config](Runtime & runtime, const Value &thisValue, const Value *arguments, size_t count) -> Value body); \
    configObject.setProperty(runtime, #funcName, std::move(funcName));

using namespace facebook::jsi;

namespace configCreation
{

    void setUpConfigObject()
    {
    }

    void setConfigCreationObj(Object &yogaJsi, Runtime &rt)
    {
        auto configCreationObject = Object(rt);

        INSTALL_HOST_FUN_TO_CONFIG_CREATION(create, 0, {
            YGConfigRef config = YGConfigNew();

            auto configObject = Object(runtime);

            std::uintptr_t configPtr = reinterpret_cast<std::uintptr_t>(config);

            char buffer[20];
            std::snprintf(buffer, sizeof(buffer), "%lx", configPtr);
            std::string configStr(buffer);

            configObject.setProperty(runtime, "__config__", configStr);

            INSTALL_HOST_FUN_TO_CONFIG(setPointScaleFactor, 1, {
                YGConfigSetPointScaleFactor(config, arguments[0].getNumber());
                return Value::undefined();
            })

            INSTALL_HOST_FUN_TO_CONFIG(setUseWebDefaults, 1, {
                YGConfigSetUseWebDefaults(config, arguments[0].getBool());
                return Value::undefined();
            });

            INSTALL_HOST_FUN_TO_CONFIG(useWebDefaults, 0, {
                return Value(YGConfigGetUseWebDefaults(config));
            });

            INSTALL_HOST_FUN_TO_CONFIG(free, 0, {
                YGConfigFree(config);
                return Value::undefined();
            });

            INSTALL_HOST_FUN_TO_CONFIG(setExperimentalFeatureEnabled, 2, {
                YGConfigSetExperimentalFeatureEnabled(
                    config, static_cast<YGExperimentalFeature>(arguments[0].getNumber()), arguments[1].getBool());
                return Value::undefined();
            });

            INSTALL_HOST_FUN_TO_CONFIG(isExperimentalFeatureEnabled, 1, {
                return Value(YGConfigIsExperimentalFeatureEnabled(
                    config, static_cast<YGExperimentalFeature>(arguments[0].getNumber())));
            });

            return configObject;
        })

        INSTALL_HOST_FUN_TO_CONFIG_CREATION(destroy, 1, {
            READ_CONFIG(arguments[0])
            YGConfigFree(config);
            return Value::undefined();
        })

        yogaJsi.setProperty(rt, "Config", std::move(configCreationObject));
    }
}

#endif // CONFIG_CREATION_H
