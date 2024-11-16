
#ifndef NODE_CREATION_H
#define NODE_CREATION_H

#include <jsi/jsi.h>
#include <yoga/Yoga.h>
#include "macros.h"
#include "nodeProperties.h"

#define INSTALL_HOST_FUN(funcName, argCount, body)                                                                                                       \
    auto funcName = Function::createFromHostFunction(rt,                                                                                                 \
                                                     PropNameID::forAscii(rt, #funcName),                                                                \
                                                     argCount,                                                                                           \
                                                     [](Runtime & runtime, const Value &thisValue, const Value *arguments, size_t count) -> Value body); \
    nodeCreationObject.setProperty(rt, #funcName, std::move(funcName));

using namespace facebook::jsi;

namespace nodeCreation
{
    void setNodeCreationObj(facebook::jsi::Object &yogaJsi, facebook::jsi::Runtime &rt)
    {
        auto nodeCreationObject = facebook::jsi::Object(rt);

        INSTALL_HOST_FUN(createDefault, 0, {
            auto nodeObject = Object(runtime);
            YGNodeRef node = YGNodeNew();
            nodeProperties::set(nodeObject, runtime, node);
            return nodeObject;
        });

        INSTALL_HOST_FUN(createWithConfig, 1, {
            READ_CONFIG(arguments[0])
            auto nodeObject = Object(runtime);
            YGNodeRef node = YGNodeNewWithConfig(config);
            nodeProperties::set(nodeObject, runtime, node);
            return nodeObject;
        });

        INSTALL_HOST_FUN(create, 1, {
            auto nodeObject = Object(runtime);
            if (count > 0 && arguments[0].isObject())
            {
                READ_CONFIG(arguments[0])
                YGNodeRef node = YGNodeNewWithConfig(config);
                nodeProperties::set(nodeObject, runtime, node);
            }
            else
            {
                YGNodeRef node = YGNodeNew();
                nodeProperties::set(nodeObject, runtime, node);
            }

            return nodeObject;
        });

        INSTALL_HOST_FUN(destroy, 1, {
            return Value::undefined();
        })

        yogaJsi.setProperty(rt, "Node", std::move(nodeCreationObject));
    }
}

#endif
