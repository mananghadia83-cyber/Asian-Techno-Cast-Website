#ifndef DATA_STRUCTURES_H
#define DATA_STRUCTURES_H

#include <cstddef>

enum COLOR { WHITE = 0, GRAY = 1, BLACK = 2 };

struct TAG_VERTEX {
    int index;
    COLOR color;
    double key;
    int pi;
    int position;
};
using VERTEX = TAG_VERTEX;
using pVERTEX = VERTEX*;

struct TAG_NODE {
    int index;
    int u;
    int v;
    double w;
    TAG_NODE* next;
};
using NODE = TAG_NODE;
using pNODE = NODE*;

using ELEMENT = VERTEX;
using pELEMENT = ELEMENT*;

struct TAG_HEAP {
    int capacity;
    int size;
    pELEMENT* H;
};
using HEAP = TAG_HEAP;
using pHEAP = HEAP*;

struct TAG_STACK_NODE {
    pVERTEX v;
    TAG_STACK_NODE* next;
};
using STACK_NODE = TAG_STACK_NODE;
using pSTACK_NODE = STACK_NODE*;

struct TAG_STACK {
    int capacity;
    int size;
    pSTACK_NODE top;
};
using STACK = TAG_STACK;
using pSTACK = STACK*;

struct TAG_GRAPH {
    int n;
    int m;
    bool directed;
    int flag;
    pVERTEX* V;
    pNODE* ADJ;
    pNODE* tail;
    pHEAP heap;
    pSTACK stack;
    int lastSource;
    int lastDestination;
    int lastType; // 0 none, 1 single-pair, 2 single-source
    bool pathComputed;
    bool pathReachable;
};
using GRAPH = TAG_GRAPH;
using pGRAPH = GRAPH*;

#endif