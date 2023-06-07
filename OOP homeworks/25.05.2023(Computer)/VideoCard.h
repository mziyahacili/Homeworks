#pragma once
#include <iostream>

using namespace std;
struct VideoCard
{
    string makeVideoCard;
    string modelVideoCard;
    string graphicFamily;
    uint16_t internalVideoMemory;
    string memoryType;
    uint16_t ventilatorsCount;
    uint16_t memoryBits;

    VideoCard() = default;
    VideoCard(string makeVideoCard, string modelVideoCard, string graphicFamily, uint16_t internalVideoMemory,
              string memoryType, uint16_t memoryBits,  uint16_t ventilatorsCount);

    void videoCardInfo() const;
};

