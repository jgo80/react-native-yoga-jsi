#ifndef YOGA_JSI_H
#define YOGA_JSI_H

#include <jsi/jsi.h>

#include "nodeCreation.h"
#include "configCreation.h"

namespace yogaJSI
{
    void install(facebook::jsi::Runtime &rt)
    {
        auto yogaJSi = facebook::jsi::Object(rt);

        nodeCreation::setNodeCreationObj(yogaJSi, rt);
        configCreation::setConfigCreationObj(yogaJSi, rt);

        rt.global()
            .setProperty(rt, "Yoga", std::move(yogaJSi));
    }
}

#endif
