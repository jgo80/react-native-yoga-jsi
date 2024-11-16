#ifndef RN_YOGA_MACROS_H
#define RN_YOGA_MACROS_H

// #define CREATE_INSTALL_HOST_FUN(funcName, argCount, scopeVar, rt, where, body) \
    //     auto funcName = Function::createFromHostFunction(rt,                                                                                                         \
//                                                      PropNameID::forAscii(rt, #funcName),                                                                        \
//                                                      argCount,                                                                                                   \
//                                                      [scopeVar](Runtime & runtime, const Value &thisValue, const Value *arguments, size_t count) -> Value body); \
//     where.setProperty(rt, #funcName, move(funcName));

// #define INSTALL_HOST_FUN_TO_CONFIG(funcName, argCount, body) \
//     CREATE_INSTALL_HOST_FUN(funcName, argCount, body, config, jsiRuntime, configObject)

// // #define INSTALL_HOST_FUN(funcName, argCount, body) \
// //     CREATE_INSTALL_HOST_FUN(funcName, argCount, body, node, runtime, nodeObject)

#define SET_AUTO_PERCENT_NUMBER(autoSetter, percentSetter, numberSetter)                 \
    if (arguments[0].isString())                                                         \
    {                                                                                    \
        std::string stringValue = arguments[0].getString(runtime).utf8(runtime);         \
        if (stringValue == "auto")                                                       \
        {                                                                                \
            autoSetter(node);                                                            \
        }                                                                                \
        else                                                                             \
        {                                                                                \
            float percentage = std::stof(stringValue.substr(0, stringValue.size() - 1)); \
            percentSetter(node, percentage);                                             \
        }                                                                                \
    }                                                                                    \
    else if (arguments[0].isUndefined())                                                 \
    {                                                                                    \
        numberSetter(node, YGUndefined);                                                 \
    }                                                                                    \
    else                                                                                 \
    {                                                                                    \
        numberSetter(node, arguments[0].getNumber());                                    \
    }                                                                                    \
    return Value::undefined();

#define ON_VALUE_PERCENT_UND_NUM(arg, onPercentage, onUndefined, onNumber)           \
    if (arg.isString())                                                              \
    {                                                                                \
        std::string stringValue = arguments[0].getString(runtime).utf8(runtime);     \
        float percentage = std::stof(stringValue.substr(0, stringValue.size() - 1)); \
        onPercentage;                                                                \
    }                                                                                \
    else if (arg.isUndefined())                                                      \
    {                                                                                \
        onUndefined;                                                                 \
    }                                                                                \
    else                                                                             \
    {                                                                                \
        onNumber;                                                                    \
    }                                                                                \
    return Value::undefined();

#define ON_VALUE_AUTO_PERCENT_UND_NUM(arg, onAuto, onPercentage, onUndefined, onNumber)  \
    if (arg.isString())                                                                  \
    {                                                                                    \
        std::string stringValue = arguments[0].getString(runtime).utf8(runtime);         \
        if (stringValue == "auto")                                                       \
            onAuto;                                                                      \
        else                                                                             \
        {                                                                                \
            float percentage = std::stof(stringValue.substr(0, stringValue.size() - 1)); \
            onPercentage;                                                                \
        }                                                                                \
    }                                                                                    \
    else if (arg.isUndefined())                                                          \
    {                                                                                    \
        onUndefined;                                                                     \
    }                                                                                    \
    else                                                                                 \
    {                                                                                    \
        onNumber;                                                                        \
    }                                                                                    \
    return Value::undefined();

#define ON_NUM_UNDEFINED(arg, onNumber, onUndefined) \
    if (arg.isUndefined())                           \
    {                                                \
        onUndefined;                                 \
    }                                                \
    else                                             \
    {                                                \
        onNumber;                                    \
    }                                                \
    return Value::undefined();

#define RETURN_AS_DOUBLE(value) \
    return Value(static_cast<double>(value))

#define SET_YGVALUE(ygValueGetter)                                                                       \
    auto ygValue = ygValueGetter;                                                                        \
    auto valueObject = Object(runtime);                                                                  \
    valueObject.setProperty(runtime, "value", facebook::jsi::Value(static_cast<double>(ygValue.value))); \
    valueObject.setProperty(runtime, "unit", facebook::jsi::Value(static_cast<int>(ygValue.unit)));      \
    return valueObject;

#define READ_CONFIG(arg)                                                                                              \
    std::string configStr = arg.asObject(runtime).getProperty(runtime, "__config__").asString(runtime).utf8(runtime); \
    std::uintptr_t configPtr = std::strtoul(configStr.c_str(), nullptr, 16);                                          \
    auto config = reinterpret_cast<YGConfigRef>(configPtr);

#define READ_NODE(arg)                                                                          \
    std::string nodeStr = arg.getProperty(runtime, "__node__").asString(runtime).utf8(runtime); \
    std::uintptr_t nodePtr = std::strtoul(nodeStr.c_str(), nullptr, 16);                        \
    auto nodeFromRt = reinterpret_cast<YGNodeRef>(nodePtr);

#endif
