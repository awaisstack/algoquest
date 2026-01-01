// ===================================
// AlgoQuest - Complete 24-Week Curriculum Data
// Based on Enhanced Google-Ready DSA Plan
// ===================================

export interface Problem {
    id: string;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    leetcodeId?: number;
    leetcodeUrl?: string;
    patterns: string[];
}

export interface Resource {
    id: string;
    title: string;
    url: string;
    type: 'concept' | 'guide' | 'example';
    duration?: string;
    summary?: string;
}

export interface Topic {
    id: string;
    title: string;
    description: string;
    videoUrl?: string; // @deprecated
    videoTitle?: string; // @deprecated
    videoDuration?: string; // @deprecated
    resources?: Resource[]; // New multi-resource support
    problems: Problem[];
    prerequisites?: string[];
}

export interface Day {
    dayNumber: number;
    title: string;
    goals: string[];
    topics: Topic[];
    isRestDay?: boolean;
    isLightDay?: boolean;
}

export interface Week {
    weekNumber: number;
    title: string;
    phase: 'pre-phase' | 'phase-a' | 'phase-b' | 'phase-c';
    focus: string;
    dailyGoal: string;
    problemsPerDay: string;
    deliverables: string[];
    days: Day[];
    isBossWeek?: boolean;
}

export interface Phase {
    id: 'pre-phase' | 'phase-a' | 'phase-b' | 'phase-c';
    title: string;
    description: string;
    weeks: number[];
    color: string;
}

// YouTube video links - Curated community favorites following CTCI recommendations
// Sources: NeetCode (best problem walkthroughs), William Fiset (best algorithm theory),
// Abdul Bari (best algorithm explanations), freeCodeCamp (comprehensive tutorials)
const VIDEOS = {
    // === Big O & Fundamentals (CTCI Chapter 6) ===
    bigO: 'https://www.youtube.com/embed/BgLTDT03QtU', // NeetCode - Big-O Notation (500K+ views)
    bigOAdvanced: 'https://www.youtube.com/embed/D6xkbGLQesk', // freeCodeCamp - Big O Complete Course
    bigOTheory: 'https://www.youtube.com/embed/0IAPZzGSbME', // Abdul Bari - Introduction to Algorithms (verified working)
    mitComplexity1: 'https://www.youtube.com/embed/o9nW0uBqvEo', // MIT - Algorithmic Thinking, Peak Finding
    mitComplexity2: 'https://www.youtube.com/embed/7lQXYl_L28w', // MIT - Models of Computation, Document Distance

    // === Arrays & Strings (CTCI Chapter 1) ===
    arrayBasics: 'https://www.youtube.com/embed/KLlXCFG5TnA', // NeetCode - Two Sum (2M+ views, foundational)
    arrayTheory: 'https://www.youtube.com/embed/xT70mHdAM74', // NeetCode - Design Dynamic Array (verified working)
    twoPointers: 'https://www.youtube.com/embed/cQ1Oz4ckceM', // NeetCode - Two Pointers Pattern Explained
    slidingWindow: 'https://www.youtube.com/embed/1pkOgXD63yU', // NeetCode - Longest Substring Without Repeating (1M+)
    slidingWindowGuide: 'https://www.youtube.com/embed/MK-NZ4hN7rs', // NeetCode - Sliding Window Pattern
    hashmap: 'https://www.youtube.com/embed/KLlXCFG5TnA', // NeetCode - Two Sum (hash table approach)
    hashmapTheory: 'https://www.youtube.com/embed/HzaL6G-k_M4', // CS Dojo - Hash Tables
    stringManipulation: 'https://www.youtube.com/embed/84UYVCluClQ', // NeetCode - Valid Palindrome

    // === Linked Lists (CTCI Chapter 2) ===
    linkedListIntro: 'https://www.youtube.com/embed/G0_I-ZF0S38', // NeetCode - Reverse Linked List (1M+ views)
    linkedListTheory: 'https://www.youtube.com/embed/WwfhLC16bis', // William Fiset - Linked List Theory
    linkedListReverse: 'https://www.youtube.com/embed/G0_I-ZF0S38', // NeetCode - Reverse Linked List
    fastSlowPointers: 'https://www.youtube.com/embed/gBTe7lFR3vc', // NeetCode - Linked List Cycle (Floyd's)
    linkedListAdvanced: 'https://www.youtube.com/embed/wXmi_vBN9SM', // NeetCode - LRU Cache Design

    // === Stacks & Queues (CTCI Chapter 3) ===
    stackIntro: 'https://www.youtube.com/embed/WTzjTskDFMg', // NeetCode - Valid Parentheses
    stackTheory: 'https://www.youtube.com/embed/L3ud3rXpIxA', // William Fiset - Stack Introduction (verified working)
    queueTheory: 'https://www.youtube.com/embed/mDCi1lXd9KE', // William Fiset - Queue Data Structure
    monotonicStack: 'https://www.youtube.com/embed/cTBiBSnjO3c', // NeetCode - Daily Temperatures (monotonic stack)
    queueBasics: 'https://www.youtube.com/embed/yzj0Ch01Exo', // NeetCode - Queue concepts

    // === Trees & Graphs (CTCI Chapter 4) ===
    binaryTreeIntro: 'https://www.youtube.com/embed/PMMc4VsIacU', // NeetCode - Maximum Depth of Binary Tree (verified working)
    treeTheory: 'https://www.youtube.com/embed/JfSdGQdAzq8', // William Fiset - Binary Search Tree Introduction
    treeDFS: 'https://www.youtube.com/embed/PMMc4VsIacU', // NeetCode - Maximum Depth of Binary Tree
    treeBFS: 'https://www.youtube.com/embed/6ZnyEApgFYg', // NeetCode - Level Order Traversal
    bst: 'https://www.youtube.com/embed/s6ATEkipzow', // NeetCode - Validate BST
    bstTheory: 'https://www.youtube.com/embed/aE_kk83b8r0', // William Fiset - BST
    graphIntro: 'https://www.youtube.com/embed/eQA-m22wjTQ', // William Fiset - Graph Theory Introduction (1M+)
    graphBFS: 'https://www.youtube.com/embed/oDqjPvD54Ss', // William Fiset - BFS on Graphs
    graphDFS: 'https://www.youtube.com/embed/7fujbpJ0LB4', // William Fiset - DFS on Graphs
    dijkstra: 'https://www.youtube.com/embed/pSqmAO-m7Lk', // William Fiset - Dijkstra (best explanation on YT)
    topologicalSort: 'https://www.youtube.com/embed/eL-KzMXSXXI', // William Fiset - Topological Sort

    // === Recursion & DP ===
    recursionIntro: 'https://www.youtube.com/embed/IJDJ0kBx2LM', // Reducible - Recursion Visualized
    recursionTheory: 'https://www.youtube.com/embed/ngCos392W4w', // Computerphile - Recursion
    dpIntro: 'https://www.youtube.com/embed/oBt53YbR9Kk', // freeCodeCamp - DP for Beginners
    dp1D: 'https://www.youtube.com/embed/lDYIvtBVmgo', // NeetCode - Climbing Stairs
    dp2D: 'https://www.youtube.com/embed/Ua0GhsJSlWM', // NeetCode - Unique Paths
    memoization: 'https://www.youtube.com/embed/oBt53YbR9Kk', // freeCodeCamp - Memoization explained

    // === Binary Search (CTCI Chapter 10) ===
    binarySearch: 'https://www.youtube.com/embed/s4DPM8ct1pI', // NeetCode - Binary Search Pattern
    binarySearchTheory: 'https://www.youtube.com/embed/C2apEw9pgtw', // Abdul Bari - Binary Search (Theory)
    binarySearchAdvanced: 'https://www.youtube.com/embed/GU7DpgHINFc', // Errichto - Binary Search Tutorial

    // === Heaps (CTCI Chapter 3/4) ===
    heapIntro: 'https://www.youtube.com/embed/NEtwJASLU8Q', // NeetCode - Heap/Priority Queue Pattern
    heapTheory: 'https://www.youtube.com/embed/HqPJF2L5h9U', // Abdul Bari - Heap Data Structure

    // === Backtracking & Advanced ===
    backtrackingIntro: 'https://www.youtube.com/embed/pfiQ_PS1g8E', // NeetCode - Backtracking Pattern
    backtrackingTheory: 'https://www.youtube.com/embed/DKCbsiDBN6c', // Abdul Bari - Backtracking
    trieIntro: 'https://www.youtube.com/embed/o6563NNbDTg', // NeetCode - Trie Data Structure
    trieTheory: 'https://www.youtube.com/embed/oobqoCJlHA0', // NeetCode - Implement Trie (verified working)
    intervalsIntro: 'https://www.youtube.com/embed/2JzRBPFybBc', // NeetCode - Intervals Pattern

    // === DP & Greedy Advanced ===
    greedyTheory: 'https://www.youtube.com/embed/bC7o8P_Ste4', // NeetCode - Jump Game I (Greedy Proof - Better Intro)
    dpTheory: 'https://www.youtube.com/embed/OQ5jsbhAv_M', // Reducible - 5 Simple Steps for DP (Visual Explanation)
    matrixTheory: 'https://www.youtube.com/embed/pV2kpPD66nE', // NeetCode - Number of Islands (Grid DFS/BFS)

    // === Bit Manipulation (CTCI Chapter 5) ===
    bitManipulation: 'https://www.youtube.com/embed/5Km3utixwZs', // NeetCode - Single Number (XOR trick)
    bitManipAdvanced: 'https://www.youtube.com/embed/BUNF2YGPc5M', // NeetCode - Counting Bits

    // === Additional Patterns ===
    backtracking: 'https://www.youtube.com/embed/REOH22Xwdkk', // NeetCode - Subsets (backtracking template)
    // heapIntro: 'https://www.youtube.com/embed/t0Cq6tVNRBA', // NeetCode - Kth Largest Element (heap pattern) // This was replaced by heapIntro above
    trie: 'https://www.youtube.com/embed/oobqoCJlHA0', // NeetCode - Implement Trie (prefix tree)
    greedy: 'https://www.youtube.com/embed/bC7o8P_Ste4', // NeetCode - Jump Game (greedy proof)
    unionFind: 'https://www.youtube.com/embed/0jNmHPfA_yE', // William Fiset - Union Find (Disjoint Sets)
    unionFindAdvanced: 'https://www.youtube.com/embed/VHRhJWacxis', // Union Find with Path Compression
    stringMatching: 'https://www.youtube.com/embed/V5-7GzOfADQ', // Abdul Bari - KMP Algorithm

    // === Sorting Algorithms (CTCI Chapter 10) ===
    sortingIntro: 'https://www.youtube.com/embed/kPRA0W1kECg', // Abdul Bari - Merge Sort (2M+ views, classic)
    quickSort: 'https://www.youtube.com/embed/Hoixgm4-P4M', // Abdul Bari - Quick Sort (best explanation)
    heapSort: 'https://www.youtube.com/embed/2DmK_H7IdTo', // Abdul Bari - Heap Sort

    // === Intervals Pattern ===
    intervals: 'https://www.youtube.com/embed/44H3cEC2fFM', // NeetCode - Merge Intervals (classic pattern)

    // === System Design & Scalability (CTCI Chapter 9) ===
    systemDesign: 'https://www.youtube.com/embed/i7twT3x5yv8', // System Design - Step by Step Guide
    scalability: 'https://www.youtube.com/embed/UrYLYV7WSHM', // Gaurav Sen - Scalability Basics
};

export const phases: Phase[] = [
    {
        id: 'pre-phase',
        title: 'Pre-Phase',
        description: 'Absolute Reset — Rebuild CS fundamentals from zero',
        weeks: [0],
        color: '#404040'
    },
    {
        id: 'phase-a',
        title: 'Phase A',
        description: 'Foundation & De-freezing — Templates and pattern recognition',
        weeks: [1, 2, 3, 4],
        color: '#606060'
    },
    {
        id: 'phase-b',
        title: 'Phase B',
        description: 'Pattern Internalization — Medium consistency',
        weeks: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        color: '#909090'
    },
    {
        id: 'phase-c',
        title: 'Phase C',
        description: 'Hard Problems & Interview Simulation',
        weeks: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
        color: '#ffffff'
    }
];

export const curriculum: Week[] = [
    // PRE-PHASE (Week 0)
    {
        weekNumber: 0,
        title: 'Prerequisites',
        phase: 'pre-phase',
        focus: 'Rebuild core vocabulary and coding comfort',
        dailyGoal: 'Learn one fundamental concept and implement from scratch',
        problemsPerDay: '1-2 easy problems',
        deliverables: [
            'Explain arrays, linked lists, stack, queue, recursion, trees, and Big-O out loud',
            'Code these structures or a traversal/operation for each without copying',
            'Pass 60-minute exit check'
        ],
        days: [
            // DAY 0: Welcome & Setup (NEW - Gentle Introduction)
            {
                dayNumber: 0,
                title: 'Welcome to Your DSA Journey',
                goals: ['Understand what DSA is and why it matters', 'Set up your coding environment', 'Write your first loop'],
                topics: [
                    {
                        id: 'welcome-intro',
                        title: 'What is Data Structures & Algorithms?',
                        description: 'A gentle introduction to the world of DSA - no math, no jargon, just real talk.',
                        resources: [
                            { id: 'res-welcome-1', title: 'Why Learn DSA? (Motivation)', url: 'https://www.youtube.com/embed/8hly31xKli0', type: 'concept', duration: '10:00' }
                        ],
                        problems: []
                    }
                ]
            },
            // DAY 1: Arrays (The Foundation)
            {
                dayNumber: 1,
                title: 'Arrays: Your First Data Structure',
                goals: ['Understand what an array is', 'Learn how computers store data', 'Write simple loops'],
                topics: [
                    {
                        id: 'arrays-101',
                        title: 'What is an Array?',
                        description: 'Arrays are like numbered boxes. Learn how to put things in and take them out.',
                        resources: [
                            { id: 'res-arr-1', title: 'Design Dynamic Array (NeetCode)', url: VIDEOS.arrayTheory, type: 'concept', duration: '15:00' },
                            { id: 'res-arr-2', title: 'Array Basics', url: VIDEOS.arrayBasics, type: 'guide', duration: '10:00' }
                        ],
                        problems: [
                            { id: 'concat-array', title: 'Concatenation of Array', difficulty: 'easy', leetcodeId: 1929, leetcodeUrl: 'https://leetcode.com/problems/concatenation-of-array/', patterns: ['array'] }
                        ]
                    }
                ]
            },
            // DAY 2: More Arrays + Gentle Speed Intro
            {
                dayNumber: 2,
                title: 'Thinking in Steps',
                goals: ['Understand why speed matters', 'Count operations in a loop', 'Solve your first real problem'],
                topics: [
                    {
                        id: 'speed-intro',
                        title: 'Why Does Speed Matter?',
                        description: 'A gentle introduction to Big O - we count steps, not seconds.',
                        resources: [
                            { id: 'res-speed-1', title: 'Big O Notation (NeetCode)', url: VIDEOS.bigO, type: 'guide', duration: '12:00' }
                        ],
                        problems: [
                            { id: 'running-sum', title: 'Running Sum of 1d Array', difficulty: 'easy', leetcodeId: 1480, leetcodeUrl: 'https://leetcode.com/problems/running-sum-of-1d-array/', patterns: ['array'] }
                        ]
                    }
                ]
            },
            // DAY 3: Hash Maps
            {
                dayNumber: 3,
                title: 'Hash Maps: The Magic Dictionary',
                goals: ['Understand key-value storage', 'Learn O(1) lookups', 'Solve frequency problems'],
                topics: [
                    {
                        id: 'hashmap-intro',
                        title: 'The Power of Hash Maps',
                        description: 'Store and retrieve data instantly. This is your secret weapon.',
                        resources: [
                            { id: 'res-hm-1', title: 'Hash Tables Explained', url: VIDEOS.hashmapTheory, type: 'concept', duration: '12:00' },
                            { id: 'res-hm-2', title: 'Two Sum Walkthrough', url: VIDEOS.hashmap, type: 'guide', duration: '10:00' }
                        ],
                        problems: [
                            { id: 'contains-duplicate', title: 'Contains Duplicate', difficulty: 'easy', leetcodeId: 217, leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/', patterns: ['hashmap'] },
                            { id: 'is-anagram', title: 'Valid Anagram', difficulty: 'easy', leetcodeId: 242, leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/', patterns: ['hashmap'] }
                        ]
                    }
                ]
            },
            // DAY 4: Linked Lists
            {
                dayNumber: 4,
                title: 'Linked Lists: Nodes & Pointers',
                goals: ['Understand nodes and pointers', 'Visualize memory layout', 'Reverse a list'],
                topics: [
                    {
                        id: 'll-basics',
                        title: 'What is a Linked List?',
                        description: 'A chain of boxes, each pointing to the next. Learn to traverse and reverse.',
                        resources: [
                            { id: 'res-ll-1', title: 'Linked List Introduction', url: VIDEOS.linkedListIntro, type: 'concept', duration: '12:00' },
                            { id: 'res-ll-2', title: 'Linked List Theory (William Fiset)', url: VIDEOS.linkedListTheory, type: 'concept', duration: '15:00' }
                        ],
                        problems: [
                            { id: 'reverse-ll', title: 'Reverse Linked List', difficulty: 'easy', leetcodeId: 206, leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/', patterns: ['linked-list'] },
                            { id: 'merge-sorted', title: 'Merge Two Sorted Lists', difficulty: 'easy', leetcodeId: 21, leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/', patterns: ['linked-list'] }
                        ]
                    }
                ]
            },
            // DAY 5: Stacks & Queues
            {
                dayNumber: 5,
                title: 'Stacks & Queues',
                goals: ['LIFO vs FIFO', 'Real-world analogies', 'Solve bracket matching'],
                topics: [
                    {
                        id: 'stack-queue-basics',
                        title: 'Linear Structures',
                        description: 'Stack = pile of plates (last in, first out). Queue = line at a store (first in, first out).',
                        resources: [
                            { id: 'res-sq-1', title: 'Stacks & Queues (William Fiset)', url: VIDEOS.stackTheory, type: 'concept', duration: '14:00' },
                            { id: 'res-sq-2', title: 'Valid Parentheses (NeetCode)', url: VIDEOS.stackIntro, type: 'guide', duration: '10:00' }
                        ],
                        problems: [
                            { id: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'easy', leetcodeId: 20, leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/', patterns: ['stack'] },
                            { id: 'implement-queue', title: 'Implement Queue using Stacks', difficulty: 'easy', leetcodeId: 232, leetcodeUrl: 'https://leetcode.com/problems/implement-queue-using-stacks/', patterns: ['stack'] }
                        ]
                    }
                ]
            },
            // DAY 6: Recursion
            {
                dayNumber: 6,
                title: 'Recursion: Functions Calling Themselves',
                goals: ['Understand the call stack', 'Trust the process', 'Solve Fibonacci'],
                topics: [
                    {
                        id: 'recursion-intro',
                        title: 'Recursion Basics',
                        description: 'A function that calls itself. Scary at first, but powerful once you get it.',
                        resources: [
                            { id: 'res-rec-1', title: 'Recursion Visualized (Reducible)', url: VIDEOS.recursionIntro, type: 'concept', duration: '21:00' }
                        ],
                        problems: [
                            { id: 'fibonacci', title: 'Fibonacci Number', difficulty: 'easy', leetcodeId: 509, leetcodeUrl: 'https://leetcode.com/problems/fibonacci-number/', patterns: ['recursion'] }
                        ]
                    }
                ]
            },
            // DAY 7: Binary Trees
            {
                dayNumber: 7,
                title: 'Trees: Your First Non-Linear Structure',
                goals: ['Understand tree structure', 'Learn traversal basics', 'Calculate depth'],
                topics: [
                    {
                        id: 'binary-tree-intro',
                        title: 'What is a Binary Tree?',
                        description: 'A tree with branches. Each node has at most two children.',
                        resources: [
                            { id: 'res-tr-1', title: 'Binary Trees (NeetCode)', url: VIDEOS.binaryTreeIntro, type: 'guide', duration: '15:00' },
                            { id: 'res-tr-2', title: 'Tree Theory (William Fiset)', url: VIDEOS.treeTheory, type: 'concept', duration: '15:00' }
                        ],
                        problems: [
                            { id: 'max-depth', title: 'Maximum Depth of Binary Tree', difficulty: 'easy', leetcodeId: 104, leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', patterns: ['tree', 'dfs'] },
                            { id: 'preorder', title: 'Binary Tree Preorder Traversal', difficulty: 'easy', leetcodeId: 144, leetcodeUrl: 'https://leetcode.com/problems/binary-tree-preorder-traversal/', patterns: ['tree', 'dfs'] }
                        ]
                    }
                ]
            },
            // DAY 8: Big O Deep Dive (NOW they're ready!)
            {
                dayNumber: 8,
                title: 'Big O: Now You\'re Ready',
                goals: ['Formalize what you\'ve learned', 'Understand O(1), O(n), O(n^2)', 'No problems - just reflection'],
                topics: [
                    {
                        id: 'big-o-deep',
                        title: 'The Big O Tier List',
                        description: 'Now that you\'ve written loops and seen slow code, let\'s formalize it.',
                        resources: [
                            { id: 'res-bo-1', title: 'Analysis of Algorithms (Abdul Bari)', url: VIDEOS.bigOTheory, type: 'concept', duration: '18:00' },
                            { id: 'res-bo-2', title: 'Algorithmic Thinking (MIT)', url: VIDEOS.mitComplexity1, type: 'concept', duration: '53:00' }
                        ],
                        problems: []
                    }
                ]
            },
            // DAY 9: Review & Confidence Check
            {
                dayNumber: 9,
                title: 'Review & Confidence Check',
                goals: ['Re-solve 3 problems from this week', 'Build muscle memory', 'Prepare for Phase A'],
                topics: [
                    {
                        id: 'week0-review',
                        title: 'Prerequisites Review',
                        description: 'Re-solve your favorite problems. Speed matters now.',
                        resources: [],
                        problems: [
                            { id: 'middle-ll', title: 'Middle of the Linked List', difficulty: 'easy', leetcodeId: 876, leetcodeUrl: 'https://leetcode.com/problems/middle-of-the-linked-list/', patterns: ['linked-list', 'two-pointers'] },
                            { id: 'intersection', title: 'Intersection of Two Arrays II', difficulty: 'easy', leetcodeId: 350, leetcodeUrl: 'https://leetcode.com/problems/intersection-of-two-arrays-ii/', patterns: ['hashmap'] },
                            { id: 'search-insert', title: 'Search Insert Position', difficulty: 'easy', leetcodeId: 35, leetcodeUrl: 'https://leetcode.com/problems/search-insert-position/', patterns: ['binary-search'] }
                        ]
                    }
                ]
            },
            // DAY 10: Rest Day
            { dayNumber: 10, title: 'Rest Day', goals: ['Rest and recover', 'Celebrate completing Week 0!'], isRestDay: true, topics: [] }
        ]
    },

// PHASE A - Week 1
{
    weekNumber: 1,
        title: 'Arrays & Hashing & Two-Pointers',
            phase: 'phase-a',
                focus: 'Implement array traversal, frequency maps, two-pointer templates',
                    dailyGoal: 'Master foundational patterns',
                        problemsPerDay: '3-4 (mostly Easy, 1 Medium by Friday)',
                            deliverables: ['8-12 problems solved + 3 re-solves', 'Frequency-map and two-pointer templates in repo'],
                                days: [
                                    {
                                        dayNumber: 1, title: 'Array Basics & Frequency Counting', goals: ['Array traversal', 'Frequency counting', 'Analyze time/space complexity'], topics: [
                                            {
                                                id: 'freq-counting', title: 'Frequency Counting', description: 'Count occurrences using hashmaps', videoUrl: VIDEOS.hashmap, videoTitle: 'Hashmaps - NeetCode', videoDuration: '13:45', problems: [
                                                    { id: 'contains-duplicate', title: 'Contains Duplicate', difficulty: 'easy', leetcodeId: 217, leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/', patterns: ['hashmap'] },
                                                    { id: 'valid-anagram', title: 'Valid Anagram', difficulty: 'easy', leetcodeId: 242, leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/', patterns: ['hashmap'] },
                                                    { id: 'majority-element', title: 'Majority Element', difficulty: 'easy', leetcodeId: 169, leetcodeUrl: 'https://leetcode.com/problems/majority-element/', patterns: ['hashmap', 'boyer-moore'] },
                                                    { id: 'single-number', title: 'Single Number', difficulty: 'easy', leetcodeId: 136, leetcodeUrl: 'https://leetcode.com/problems/single-number/', patterns: ['hashmap', 'bit'] },
                                                    { id: 'best-time-stock', title: 'Best Time to Buy and Sell Stock', difficulty: 'easy', leetcodeId: 121, leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', patterns: ['array'] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        dayNumber: 2, title: 'Two Pointers Template', goals: ['Learn two-pointer pattern', 'Solve 3 easy'], topics: [
                                            {
                                                id: 'two-pointers-intro', title: 'Two Pointers', description: 'Optimizing O(n^2) to O(n)',
                                                resources: [
                                                    { id: 'res-tp-1', title: 'Two Pointers Pattern (NeetCode)', url: VIDEOS.twoPointers, type: 'guide', duration: '12:00' }
                                                ],
                                                problems: [
                                                    { id: 'valid-palindrome', title: 'Valid Palindrome', difficulty: 'easy', leetcodeId: 125, leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/', patterns: ['two-pointers'] },
                                                    { id: 'two-sum-ii', title: 'Two Sum II - Input Array Is Sorted', difficulty: 'medium', leetcodeId: 167, leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', patterns: ['two-pointers'] },
                                                    { id: 'move-zeroes', title: 'Move Zeroes', difficulty: 'easy', leetcodeId: 283, leetcodeUrl: 'https://leetcode.com/problems/move-zeroes/', patterns: ['two-pointers'] },
                                                    { id: 'squares-sorted', title: 'Squares of a Sorted Array', difficulty: 'easy', leetcodeId: 977, leetcodeUrl: 'https://leetcode.com/problems/squares-of-a-sorted-array/', patterns: ['two-pointers'] },
                                                    { id: 'reverse-string', title: 'Reverse String', difficulty: 'easy', leetcodeId: 344, leetcodeUrl: 'https://leetcode.com/problems/reverse-string/', patterns: ['two-pointers'] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        dayNumber: 3, title: 'Sorting + Two Pointers', goals: ['When to sort first', 'Solve 2-3 problems'], topics: [
                                            {
                                                id: 'sorting-patterns', title: 'Sorting Patterns', description: 'Sorting as preprocessing for two-pointer', videoUrl: VIDEOS.twoPointers, videoTitle: 'Two Pointers - NeetCode', videoDuration: '18:42', problems: [
                                                    { id: 'three-sum', title: '3Sum', difficulty: 'medium', leetcodeId: 15, leetcodeUrl: 'https://leetcode.com/problems/3sum/', patterns: ['two-pointers', 'sorting'] },
                                                    { id: 'container-water', title: 'Container With Most Water', difficulty: 'medium', leetcodeId: 11, leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/', patterns: ['two-pointers'] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        dayNumber: 4, title: 'Hashset & Hashmap Patterns', goals: ['Master hashmap usage', 'Solve 3 problems'], topics: [
                                            {
                                                id: 'hashset-patterns', title: 'Hashset Patterns', description: 'O(1) lookups for membership testing', videoUrl: VIDEOS.hashmap, videoTitle: 'Hashmaps - NeetCode', videoDuration: '13:45', problems: [
                                                    { id: 'longest-consecutive', title: 'Longest Consecutive Sequence', difficulty: 'medium', leetcodeId: 128, leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/', patterns: ['hashset'] },
                                                    { id: 'group-anagrams', title: 'Group Anagrams', difficulty: 'medium', leetcodeId: 49, leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/', patterns: ['hashmap', 'sorting'] },
                                                    { id: 'top-k-frequent', title: 'Top K Frequent Elements', difficulty: 'medium', leetcodeId: 347, leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/', patterns: ['hashmap', 'heap'] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        dayNumber: 5, title: 'Mixed Practice + Timed Mock', goals: ['2 Easy, 1 Medium timed', 'Full postmortem'], topics: [
                                            {
                                                id: 'mixed-practice-1', title: 'Week 1 Mixed Practice', description: 'Apply all patterns learned', videoUrl: VIDEOS.twoPointers, videoTitle: 'Two Pointers - NeetCode', videoDuration: '18:42', problems: [
                                                    { id: 'product-except', title: 'Product of Array Except Self', difficulty: 'medium', leetcodeId: 238, leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/', patterns: ['array', 'prefix-sum'] },
                                                    { id: 'encode-decode', title: 'Encode and Decode Strings', difficulty: 'medium', leetcodeId: 271, leetcodeUrl: 'https://leetcode.com/problems/encode-and-decode-strings/', patterns: ['string'] }
                                                ]
                                            }
                                        ]
                                    },
                                    { dayNumber: 6, title: 'Re-solves & Flashcards', goals: ['Re-solve 4 problems', 'Create pattern flashcards'], topics: [], isLightDay: true },
                                    { dayNumber: 7, title: 'Rest Day', goals: ['Full rest', 'Exercise', 'Sleep'], topics: [], isRestDay: true }
                                ],
                                    isBossWeek: false
},

// PHASE A - Week 2
{
    weekNumber: 2,
        title: 'Sliding Window, Strings, Stack',
            phase: 'phase-a',
                focus: 'Sliding window templates (fixed & variable), string parsing, monotonic stack',
                    dailyGoal: 'Master sliding window and stack patterns',
                        problemsPerDay: '3-4',
                            deliverables: ['8-12 problems + flashcards for sliding-window variants'],
                                days: [
                                    {
                                        dayNumber: 1, title: 'Fixed Sliding Window', goals: ['Fixed-size window template', 'Analyze time/space complexity', '3 problems'], topics: [
                                            {
                                                id: 'sliding-window-fixed', title: 'Fixed Sliding Window', description: 'Window of constant size', videoUrl: VIDEOS.slidingWindow, videoTitle: 'Sliding Window - NeetCode', videoDuration: '21:15', problems: [
                                                    { id: 'max-avg-subarray', title: 'Maximum Average Subarray I', difficulty: 'easy', leetcodeId: 643, leetcodeUrl: 'https://leetcode.com/problems/maximum-average-subarray-i/', patterns: ['sliding-window'] },
                                                    { id: 'grumpy-owner', title: 'Grumpy Bookstore Owner', difficulty: 'medium', leetcodeId: 1052, leetcodeUrl: 'https://leetcode.com/problems/grumpy-bookstore-owner/', patterns: ['sliding-window'] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        dayNumber: 2, title: 'Variable Sliding Window', goals: ['Variable-size window template', '3 problems'], topics: [
                                            {
                                                id: 'sliding-window-var', title: 'Variable Sliding Window', description: 'Window that grows/shrinks', videoUrl: VIDEOS.slidingWindow, videoTitle: 'Sliding Window - NeetCode', videoDuration: '21:15', problems: [
                                                    { id: 'longest-substring', title: 'Longest Substring Without Repeating Characters', difficulty: 'medium', leetcodeId: 3, leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', patterns: ['sliding-window', 'hashmap'] },
                                                    { id: 'min-window-substring', title: 'Minimum Window Substring', difficulty: 'hard', leetcodeId: 76, leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/', patterns: ['sliding-window', 'hashmap'] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        dayNumber: 3, title: 'String Manipulation', goals: ['String parsing techniques', '3 problems'], topics: [
                                            {
                                                id: 'string-patterns', title: 'String Patterns', description: 'Common string manipulation techniques', videoUrl: VIDEOS.slidingWindow, videoTitle: 'Sliding Window - NeetCode', videoDuration: '21:15', problems: [
                                                    { id: 'longest-repeating', title: 'Longest Repeating Character Replacement', difficulty: 'medium', leetcodeId: 424, leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/', patterns: ['sliding-window'] },
                                                    { id: 'permutation-string', title: 'Permutation in String', difficulty: 'medium', leetcodeId: 567, leetcodeUrl: 'https://leetcode.com/problems/permutation-in-string/', patterns: ['sliding-window', 'hashmap'] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        dayNumber: 4, title: 'Stack Basics', goals: ['Stack applications', '3 problems'], topics: [
                                            {
                                                id: 'stack-basics', title: 'Stack Applications', description: 'Using stacks for expression evaluation', videoUrl: VIDEOS.stackIntro, videoTitle: 'Stacks - CS Dojo', videoDuration: '12:03', problems: [
                                                    { id: 'valid-parens', title: 'Valid Parentheses', difficulty: 'easy', leetcodeId: 20, leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/', patterns: ['stack'] },
                                                    { id: 'eval-rpn', title: 'Evaluate Reverse Polish Notation', difficulty: 'medium', leetcodeId: 150, leetcodeUrl: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', patterns: ['stack'] },
                                                    { id: 'daily-temps', title: 'Daily Temperatures', difficulty: 'medium', leetcodeId: 739, leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/', patterns: ['monotonic-stack'] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        dayNumber: 5, title: 'Monotonic Stack', goals: ['Monotonic stack pattern', 'Timed practice'], topics: [
                                            {
                                                id: 'monotonic-stack', title: 'Monotonic Stack', description: 'Maintaining sorted order in a stack', videoUrl: VIDEOS.monotonicStack, videoTitle: 'Monotonic Stack - NeetCode', videoDuration: '17:32', problems: [
                                                    { id: 'next-greater', title: 'Next Greater Element I', difficulty: 'easy', leetcodeId: 496, leetcodeUrl: 'https://leetcode.com/problems/next-greater-element-i/', patterns: ['monotonic-stack'] },
                                                    { id: 'largest-rectangle', title: 'Largest Rectangle in Histogram', difficulty: 'hard', leetcodeId: 84, leetcodeUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', patterns: ['monotonic-stack'] }
                                                ]
                                            }
                                        ]
                                    },
                                    { dayNumber: 6, title: 'Re-solves & Review', goals: ['Re-solve weak problems', 'Review patterns'], topics: [], isLightDay: true },
                                    { dayNumber: 7, title: 'Rest Day', goals: ['Full rest'], topics: [], isRestDay: true }
                                ]
},

// PHASE A - Week 3
{
    weekNumber: 3,
        title: 'Linked Lists, Recursion, Fast/Slow Pointers',
            phase: 'phase-a',
                focus: 'Code linked-list operations from scratch; build recursion base-case instincts',
                    dailyGoal: 'Master linked list manipulation and recursion',
                        problemsPerDay: '3 (mix Easy→Medium)',
                            deliverables: ['Implement reverse, merge, and detect-cycle templates', '8-10 problems solved'],
                                days: [
                                    {
                                        dayNumber: 1, title: 'Linked List Manipulation', goals: ['Reverse linked list', 'Merge operations', 'Analyze time/space complexity'], topics: [
                                            {
                                                id: 'll-intro', title: 'Linked Lists 101', description: 'Nodes, pointers, and memory layout',
                                                resources: [
                                                    { id: 'res-ll-1', title: 'Linked List Theory (William Fiset)', url: VIDEOS.linkedListTheory, type: 'concept', duration: '15:00' },
                                                    { id: 'res-ll-2', title: 'Reversing a List (NeetCode)', url: VIDEOS.linkedListIntro, type: 'guide', duration: '10:00' }
                                                ],
                                                problems: [
                                                    { id: 'reverse-ll-2', title: 'Reverse Linked List', difficulty: 'easy', leetcodeId: 206, leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/', patterns: ['linked-list'] },
                                                    { id: 'merge-lists', title: 'Merge Two Sorted Lists', difficulty: 'easy', leetcodeId: 21, leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/', patterns: ['linked-list'] },
                                                    { id: 'reorder-list', title: 'Reorder List', difficulty: 'medium', leetcodeId: 143, leetcodeUrl: 'https://leetcode.com/problems/reorder-list/', patterns: ['linked-list', 'two-pointers'] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        dayNumber: 2, title: 'Fast/Slow Pointers', goals: ['Cycle detection', 'Finding middle'], topics: [
                                            {
                                                id: 'fast-slow', title: 'Fast/Slow Pointers', description: 'Two pointers at different speeds', videoUrl: VIDEOS.fastSlowPointers, videoTitle: 'Floyd\'s Cycle Detection - NeetCode', videoDuration: '11:32', problems: [
                                                    { id: 'll-cycle-2', title: 'Linked List Cycle II', difficulty: 'medium', leetcodeId: 142, leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle-ii/', patterns: ['linked-list', 'two-pointers'] },
                                                    { id: 'happy-number', title: 'Happy Number', difficulty: 'easy', leetcodeId: 202, leetcodeUrl: 'https://leetcode.com/problems/happy-number/', patterns: ['fast-slow', 'hashset'] },
                                                    { id: 'find-duplicate', title: 'Find the Duplicate Number', difficulty: 'medium', leetcodeId: 287, leetcodeUrl: 'https://leetcode.com/problems/find-the-duplicate-number/', patterns: ['fast-slow'] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        dayNumber: 3, title: 'Recursion Deep Dive', goals: ['Build base-case instincts', 'Recursive thinking'], topics: [
                                            {
                                                id: 'recursion-deep', title: 'Recursion Patterns', description: 'Building intuition for recursive solutions', videoUrl: VIDEOS.recursionIntro, videoTitle: 'Recursion - Reducible', videoDuration: '21:03', problems: [
                                                    { id: 'reverse-ll-recursive', title: 'Reverse Linked List (Recursive)', difficulty: 'easy', leetcodeId: 206, leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/', patterns: ['recursion', 'linked-list'] },
                                                    { id: 'merge-k-lists', title: 'Merge k Sorted Lists', difficulty: 'hard', leetcodeId: 23, leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/', patterns: ['linked-list', 'divide-conquer'] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        dayNumber: 4, title: 'Advanced Linked List', goals: ['Complex linked list problems'], topics: [
                                            {
                                                id: 'll-advanced', title: 'Advanced Linked List', description: 'Complex operations on linked lists', videoUrl: VIDEOS.linkedListIntro, videoTitle: 'Linked Lists - CS Dojo', videoDuration: '14:27', problems: [
                                                    { id: 'remove-nth', title: 'Remove Nth Node From End of List', difficulty: 'medium', leetcodeId: 19, leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', patterns: ['linked-list', 'two-pointers'] },
                                                    { id: 'copy-random', title: 'Copy List with Random Pointer', difficulty: 'medium', leetcodeId: 138, leetcodeUrl: 'https://leetcode.com/problems/copy-list-with-random-pointer/', patterns: ['linked-list', 'hashmap'] },
                                                    { id: 'add-two-numbers', title: 'Add Two Numbers', difficulty: 'medium', leetcodeId: 2, leetcodeUrl: 'https://leetcode.com/problems/add-two-numbers/', patterns: ['linked-list'] }
                                                ]
                                            }
                                        ]
                                    },
                                    { dayNumber: 5, title: 'Mixed Practice + First Mock', goals: ['First mock interview', 'Timed practice'], topics: [], isLightDay: true },
                                    { dayNumber: 6, title: 'Re-solves', goals: ['Re-solve weak problems'], topics: [], isLightDay: true },
                                    { dayNumber: 7, title: 'Rest Day', goals: ['Full rest'], topics: [], isRestDay: true }
                                ]
},

// PHASE A - Week 4
{
    weekNumber: 4,
        title: 'Trees (DFS/BFS), First Month Checkpoint',
            phase: 'phase-a',
                focus: 'DFS and BFS templates on binary trees (recursive & iterative)',
                    dailyGoal: 'Master tree traversals and simple tree DP',
                        problemsPerDay: '3',
                            deliverables: ['90-minute checkpoint simulation', 'Full KPI review'],
                                days: [
                                    {
                                        dayNumber: 1, title: 'Tree DFS', goals: ['DFS recursive and iterative', 'Analyze time/space complexity', '3 problems'], topics: [
                                            {
                                                id: 'tree-intro', title: 'Binary Trees', description: 'Recursive structure & traversals',
                                                resources: [
                                                    { id: 'res-tr-1', title: 'Tree Data Structure (William Fiset)', url: VIDEOS.treeTheory, type: 'concept', duration: '15:00' },
                                                    { id: 'res-tr-2', title: 'Invert Binary Tree (NeetCode)', url: VIDEOS.binaryTreeIntro, type: 'guide', duration: '12:00' }
                                                ],
                                                problems: [
                                                    { id: 'invert-tree', title: 'Invert Binary Tree', difficulty: 'easy', leetcodeId: 226, leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/', patterns: ['tree', 'recursion'] },
                                                    { id: 'same-tree', title: 'Same Tree', difficulty: 'easy', leetcodeId: 100, leetcodeUrl: 'https://leetcode.com/problems/same-tree/', patterns: ['tree', 'dfs'] },
                                                    { id: 'subtree', title: 'Subtree of Another Tree', difficulty: 'easy', leetcodeId: 572, leetcodeUrl: 'https://leetcode.com/problems/subtree-of-another-tree/', patterns: ['tree', 'dfs'] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        dayNumber: 2, title: 'Tree BFS', goals: ['BFS level-order traversal', '3 problems'], topics: [
                                            {
                                                id: 'tree-bfs', title: 'Tree BFS', description: 'Breadth-first search, level-order traversal', videoUrl: VIDEOS.treeBFS, videoTitle: 'Tree BFS - NeetCode', videoDuration: '12:15', problems: [
                                                    { id: 'level-order', title: 'Binary Tree Level Order Traversal', difficulty: 'medium', leetcodeId: 102, leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', patterns: ['tree', 'bfs'] },
                                                    { id: 'right-side', title: 'Binary Tree Right Side View', difficulty: 'medium', leetcodeId: 199, leetcodeUrl: 'https://leetcode.com/problems/binary-tree-right-side-view/', patterns: ['tree', 'bfs'] },
                                                    { id: 'zigzag', title: 'Binary Tree Zigzag Level Order Traversal', difficulty: 'medium', leetcodeId: 103, leetcodeUrl: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/', patterns: ['tree', 'bfs'] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        dayNumber: 3, title: 'Tree Properties', goals: ['Tree diameter, balance, paths'], topics: [
                                            {
                                                id: 'tree-props', title: 'Tree Properties', description: 'Computing tree metrics', videoUrl: VIDEOS.binaryTreeIntro, videoTitle: 'Binary Trees - NeetCode', videoDuration: '15:21', problems: [
                                                    { id: 'diameter', title: 'Diameter of Binary Tree', difficulty: 'easy', leetcodeId: 543, leetcodeUrl: 'https://leetcode.com/problems/diameter-of-binary-tree/', patterns: ['tree', 'dfs'] },
                                                    { id: 'balanced', title: 'Balanced Binary Tree', difficulty: 'easy', leetcodeId: 110, leetcodeUrl: 'https://leetcode.com/problems/balanced-binary-tree/', patterns: ['tree', 'dfs'] },
                                                    { id: 'max-path-sum', title: 'Binary Tree Maximum Path Sum', difficulty: 'hard', leetcodeId: 124, leetcodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', patterns: ['tree', 'dfs'] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        dayNumber: 4, title: 'Tree Construction', goals: ['Build trees from traversals'], topics: [
                                            {
                                                id: 'tree-construct', title: 'Tree Construction', description: 'Building trees from traversal sequences', videoUrl: VIDEOS.binaryTreeIntro, videoTitle: 'Binary Trees - NeetCode', videoDuration: '15:21', problems: [
                                                    { id: 'construct-preorder', title: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'medium', leetcodeId: 105, leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', patterns: ['tree', 'recursion'] },
                                                    { id: 'serialize', title: 'Serialize and Deserialize Binary Tree', difficulty: 'hard', leetcodeId: 297, leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', patterns: ['tree', 'bfs', 'dfs'] }
                                                ]
                                            }
                                        ]
                                    },
                                    { dayNumber: 5, title: '🏆 First Month Checkpoint', goals: ['90-min simulation: 1 medium tree + 1 mixed', 'Full KPI review'], topics: [] },
                                    { dayNumber: 6, title: 'Review & Postmortem', goals: ['Analyze checkpoint', 'Plan next phase'], topics: [], isLightDay: true },
                                    { dayNumber: 7, title: 'Rest Day', goals: ['Celebrate completing Phase A!'], topics: [], isRestDay: true }
                                ],
                                    isBossWeek: true
},

    // Generate remaining weeks (5-24) with structure
    ...generateRemainingWeeks()
];

function generateRemainingWeeks(): Week[] {
    const weeks: Week[] = [];

    // Week 5: Binary Search Basics
    weeks.push({
        weekNumber: 5, title: 'Binary Search Basics', phase: 'phase-b',
        focus: 'Classic binary search on index/answer space',
        dailyGoal: 'Master binary search template', problemsPerDay: '3-4 Medium',
        deliverables: ['Binary search template mastery', '15+ problems'],
        days: [
            {
                dayNumber: 1, title: 'Binary Search Intro', goals: ['Learn basic binary search', 'Analyze time/space complexity'], topics: [
                    {
                        id: 'bs-intro', title: 'Binary Search Fundamentals', description: 'Classic binary search template',
                        resources: [
                            { id: 'res-bs-1', title: 'Binary Search Theory (Abdul Bari)', url: VIDEOS.binarySearchTheory, type: 'concept', duration: '14:00' },
                            { id: 'res-bs-2', title: 'BS Template (NeetCode)', url: VIDEOS.binarySearch, type: 'guide', duration: '12:00' }
                        ],
                        problems: [
                            { id: 'bs-1', title: 'Binary Search', difficulty: 'easy', leetcodeId: 704, leetcodeUrl: 'https://leetcode.com/problems/binary-search/', patterns: ['binary-search'] },
                            { id: 'bs-2', title: 'Search Insert Position', difficulty: 'easy', leetcodeId: 35, leetcodeUrl: 'https://leetcode.com/problems/search-insert-position/', patterns: ['binary-search'] }
                        ]
                    }
                ]
            },
            {
                dayNumber: 2, title: 'BS on Rotated Arrays', goals: ['Handle rotated arrays'], topics: [
                    {
                        id: 'bs-rotated', title: 'Rotated Array Search', description: 'Binary search on rotated sorted arrays',
                        resources: [
                            { id: 'res-bs-3', title: 'Rotated BS Tutorial', url: VIDEOS.binarySearchAdvanced, type: 'guide', duration: '15:00' }
                        ],
                        problems: [
                            { id: 'bs-3', title: 'Search in Rotated Sorted Array', difficulty: 'medium', leetcodeId: 33, leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', patterns: ['binary-search'] },
                            { id: 'bs-4', title: 'Find Minimum in Rotated Sorted Array', difficulty: 'medium', leetcodeId: 153, leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', patterns: ['binary-search'] }
                        ]
                    }
                ]
            },
            {
                dayNumber: 3, title: 'BS on Answer Space', goals: ['Binary search on answer'], topics: [
                    {
                        id: 'bs-answer', title: 'Binary Search on Answer', description: 'Searching on possible answers', videoUrl: VIDEOS.binarySearchAdvanced, videoTitle: 'Advanced Binary Search', videoDuration: '18:00', problems: [
                            { id: 'bs-5', title: 'Koko Eating Bananas', difficulty: 'medium', leetcodeId: 875, leetcodeUrl: 'https://leetcode.com/problems/koko-eating-bananas/', patterns: ['binary-search'] },
                            { id: 'bs-6', title: 'Capacity To Ship Packages', difficulty: 'medium', leetcodeId: 1011, leetcodeUrl: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', patterns: ['binary-search'] }
                        ]
                    }
                ]
            },
            {
                dayNumber: 4, title: 'More BS Practice', goals: ['Solidify patterns'], topics: [
                    {
                        id: 'bs-more', title: 'More Binary Search', description: 'Additional practice', videoUrl: VIDEOS.binarySearch, videoTitle: 'Binary Search Practice', videoDuration: '12:00', problems: [
                            { id: 'bs-7', title: 'Find Peak Element', difficulty: 'medium', leetcodeId: 162, leetcodeUrl: 'https://leetcode.com/problems/find-peak-element/', patterns: ['binary-search'] },
                            { id: 'bs-8', title: 'Search a 2D Matrix', difficulty: 'medium', leetcodeId: 74, leetcodeUrl: 'https://leetcode.com/problems/search-a-2d-matrix/', patterns: ['binary-search'] }
                        ]
                    }
                ]
            },
            { dayNumber: 5, title: 'Timed Practice', goals: ['Timed problems'], topics: [] },
            { dayNumber: 6, title: 'Review', goals: ['Re-solve weak problems'], topics: [], isLightDay: true },
            { dayNumber: 7, title: 'Rest', goals: ['Rest'], topics: [], isRestDay: true }
        ]
    });

    // Week 6: Heaps
    weeks.push({
        weekNumber: 6, title: 'Heaps & Priority Queues', phase: 'phase-b',
        focus: 'Heap patterns and kth element problems',
        dailyGoal: 'Master heap operations', problemsPerDay: '3-4 Medium',
        deliverables: ['Heap mastery', '12+ problems'],
        days: [
            {
                dayNumber: 1, title: 'Heap Basics', goals: ['Learn heap operations', 'Analyze time/space complexity'], topics: [
                    {
                        id: 'heap-1', title: 'Heap Fundamentals', description: 'Min/max heap operations',
                        resources: [
                            { id: 'res-hp-1', title: 'Heap Data Structure (Abdul Bari)', url: VIDEOS.heapTheory, type: 'concept', duration: '20:00' },
                            { id: 'res-hp-2', title: 'Heap Pattern (NeetCode)', url: VIDEOS.heapIntro, type: 'guide', duration: '15:00' }
                        ],
                        problems: [
                            { id: 'hp-1', title: 'Kth Largest Element in Array', difficulty: 'medium', leetcodeId: 215, leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', patterns: ['heap'] },
                            { id: 'hp-2', title: 'Last Stone Weight', difficulty: 'easy', leetcodeId: 1046, leetcodeUrl: 'https://leetcode.com/problems/last-stone-weight/', patterns: ['heap'] }
                        ]
                    }
                ]
            },
            {
                dayNumber: 2, title: 'Top K Problems', goals: ['Top K pattern'], topics: [
                    {
                        id: 'heap-2', title: 'Top K Pattern', description: 'Finding top K elements', videoUrl: VIDEOS.heapIntro, videoTitle: 'Top K Pattern', videoDuration: '12:00', problems: [
                            { id: 'hp-3', title: 'Top K Frequent Elements', difficulty: 'medium', leetcodeId: 347, leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/', patterns: ['heap', 'hashmap'] },
                            { id: 'hp-4', title: 'K Closest Points to Origin', difficulty: 'medium', leetcodeId: 973, leetcodeUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/', patterns: ['heap'] }
                        ]
                    }
                ]
            },
            {
                dayNumber: 3, title: 'More Heap Problems', goals: ['Advanced heap'], topics: [
                    {
                        id: 'heap-3', title: 'Advanced Heap', description: 'Complex heap patterns', videoUrl: VIDEOS.heapIntro, videoTitle: 'Advanced Heaps', videoDuration: '15:00', problems: [
                            { id: 'hp-5', title: 'Task Scheduler', difficulty: 'medium', leetcodeId: 621, leetcodeUrl: 'https://leetcode.com/problems/task-scheduler/', patterns: ['heap', 'greedy'] },
                            { id: 'hp-6', title: 'Find Median from Data Stream', difficulty: 'hard', leetcodeId: 295, leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/', patterns: ['heap'] }
                        ]
                    }
                ]
            },
            {
                dayNumber: 4, title: 'Heap Practice', goals: ['More practice'], topics: [
                    {
                        id: 'heap-4', title: 'Heap Practice', description: 'Additional problems', videoUrl: VIDEOS.heapIntro, videoTitle: 'Heap Practice', videoDuration: '10:00', problems: [
                            { id: 'hp-7', title: 'Merge K Sorted Lists', difficulty: 'hard', leetcodeId: 23, leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/', patterns: ['heap', 'linked-list'] }
                        ]
                    }
                ]
            },
            { dayNumber: 5, title: 'Timed Practice', goals: ['Timed problems'], topics: [] },
            { dayNumber: 6, title: 'Review', goals: ['Re-solve'], topics: [], isLightDay: true },
            { dayNumber: 7, title: 'Rest', goals: ['Rest'], topics: [], isRestDay: true }
        ]
    });

    // Week 7: Graph Fundamentals
    weeks.push({
        weekNumber: 7, title: 'Graph Fundamentals', phase: 'phase-b',
        focus: 'Graph representations, BFS, DFS',
        dailyGoal: 'Master graph traversals', problemsPerDay: '3-4 Medium',
        deliverables: ['Graph traversal mastery'],
        days: [
            {
                dayNumber: 1, title: 'Graph Intro', goals: ['Learn representations', 'Analyze time/space complexity'], topics: [
                    {
                        id: 'g-1', title: 'Graph Basics', description: 'Adjacency list/matrix',
                        resources: [
                            { id: 'res-gr-1', title: 'Graph Theory Intro (William Fiset)', url: VIDEOS.graphIntro, type: 'concept', duration: '18:00' },
                            { id: 'res-gr-2', title: 'DFS/BFS Guide', url: VIDEOS.graphBFS, type: 'guide', duration: '15:00' }
                        ],
                        problems: [
                            { id: 'gr-1', title: 'Number of Islands', difficulty: 'medium', leetcodeId: 200, leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/', patterns: ['graph', 'dfs'] },
                            { id: 'gr-2', title: 'Clone Graph', difficulty: 'medium', leetcodeId: 133, leetcodeUrl: 'https://leetcode.com/problems/clone-graph/', patterns: ['graph', 'dfs'] }
                        ]
                    }
                ]
            },
            {
                dayNumber: 2, title: 'BFS on Graphs', goals: ['Graph BFS'], topics: [
                    {
                        id: 'g-2', title: 'Graph BFS', description: 'Breadth-first traversal', videoUrl: VIDEOS.graphBFS, videoTitle: 'Graph BFS', videoDuration: '12:00', problems: [
                            { id: 'gr-3', title: 'Rotting Oranges', difficulty: 'medium', leetcodeId: 994, leetcodeUrl: 'https://leetcode.com/problems/rotting-oranges/', patterns: ['graph', 'bfs'] },
                            { id: 'gr-4', title: 'Walls and Gates', difficulty: 'medium', leetcodeId: 286, leetcodeUrl: 'https://leetcode.com/problems/walls-and-gates/', patterns: ['graph', 'bfs'] }
                        ]
                    }
                ]
            },
            {
                dayNumber: 3, title: 'DFS on Graphs', goals: ['Graph DFS'], topics: [
                    {
                        id: 'g-3', title: 'Graph DFS', description: 'Depth-first traversal', videoUrl: VIDEOS.graphDFS, videoTitle: 'Graph DFS', videoDuration: '12:00', problems: [
                            { id: 'gr-5', title: 'Pacific Atlantic Water Flow', difficulty: 'medium', leetcodeId: 417, leetcodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', patterns: ['graph', 'dfs'] },
                            { id: 'gr-6', title: 'Max Area of Island', difficulty: 'medium', leetcodeId: 695, leetcodeUrl: 'https://leetcode.com/problems/max-area-of-island/', patterns: ['graph', 'dfs'] }
                        ]
                    }
                ]
            },
            {
                dayNumber: 4, title: 'Connected Components', goals: ['Find components'], topics: [
                    {
                        id: 'g-4', title: 'Connected Components', description: 'Finding connected parts', videoUrl: VIDEOS.graphIntro, videoTitle: 'Connected Components', videoDuration: '10:00', problems: [
                            { id: 'gr-7', title: 'Number of Connected Components', difficulty: 'medium', leetcodeId: 323, leetcodeUrl: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', patterns: ['graph', 'union-find'] },
                            { id: 'gr-8', title: 'Graph Valid Tree', difficulty: 'medium', leetcodeId: 261, leetcodeUrl: 'https://leetcode.com/problems/graph-valid-tree/', patterns: ['graph'] }
                        ]
                    }
                ]
            },
            { dayNumber: 5, title: 'Practice', goals: ['Timed practice'], topics: [] },
            { dayNumber: 6, title: 'Review', goals: ['Re-solve'], topics: [], isLightDay: true },
            { dayNumber: 7, title: 'Rest', goals: ['Rest'], topics: [], isRestDay: true }
        ]
    });

    // Weeks 8-24: Similar structure with appropriate content
    const remainingWeekData = [
        {
            num: 8, title: 'Intervals & Sorting', video: VIDEOS.intervalsIntro,
            resources: [
                { id: 'res-w8-1', title: 'Intervals Pattern (NeetCode)', url: VIDEOS.intervalsIntro, type: 'guide', duration: '12:00' },
                { id: 'res-w8-2', title: 'Jump Game II (NeetCode)', url: VIDEOS.greedyTheory, type: 'concept', duration: '20:00' }
            ],
            problems: [
                { id: 'int-1', title: 'Merge Intervals', difficulty: 'medium' as const, leetcodeId: 56, leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/', patterns: ['intervals', 'sorting'] },
                { id: 'int-2', title: 'Insert Interval', difficulty: 'medium' as const, leetcodeId: 57, leetcodeUrl: 'https://leetcode.com/problems/insert-interval/', patterns: ['intervals'] },
                { id: 'int-3', title: 'Non-overlapping Intervals', difficulty: 'medium' as const, leetcodeId: 435, leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/', patterns: ['intervals', 'greedy'] },
                { id: 'int-4', title: 'Meeting Rooms', difficulty: 'easy' as const, leetcodeId: 252, leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms/', patterns: ['intervals', 'sorting'] },
                { id: 'int-5', title: 'Meeting Rooms II', difficulty: 'medium' as const, leetcodeId: 253, leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii/', patterns: ['intervals', 'heap'] },
                { id: 'srt-1', title: 'Sort Colors', difficulty: 'medium' as const, leetcodeId: 75, leetcodeUrl: 'https://leetcode.com/problems/sort-colors/', patterns: ['sorting', 'two-pointers'] },
                { id: 'int-6', title: 'Minimum Number of Arrows to Burst Balloons', difficulty: 'medium' as const, leetcodeId: 452, leetcodeUrl: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/', patterns: ['intervals', 'greedy'] }
            ]
        },
        {
            num: 9, title: 'Backtracking & Recursion', video: VIDEOS.backtrackingIntro,
            resources: [
                { id: 'res-w9-1', title: 'Backtracking Theory (Abdul Bari)', url: VIDEOS.backtrackingTheory, type: 'concept', duration: '20:00' },
                { id: 'res-w9-2', title: 'Backtracking Pattern (NeetCode)', url: VIDEOS.backtrackingIntro, type: 'guide', duration: '15:00' }
            ],
            problems: [
                { id: 'bt-1', title: 'Subsets', difficulty: 'medium' as const, leetcodeId: 78, leetcodeUrl: 'https://leetcode.com/problems/subsets/', patterns: ['backtracking'] },
                { id: 'bt-2', title: 'Permutations', difficulty: 'medium' as const, leetcodeId: 46, leetcodeUrl: 'https://leetcode.com/problems/permutations/', patterns: ['backtracking'] },
                { id: 'bt-3', title: 'Combination Sum', difficulty: 'medium' as const, leetcodeId: 39, leetcodeUrl: 'https://leetcode.com/problems/combination-sum/', patterns: ['backtracking'] },
                { id: 'bt-4', title: 'Word Search', difficulty: 'medium' as const, leetcodeId: 79, leetcodeUrl: 'https://leetcode.com/problems/word-search/', patterns: ['backtracking'] },
                { id: 'bt-5', title: 'Letter Combinations of a Phone Number', difficulty: 'medium' as const, leetcodeId: 17, leetcodeUrl: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', patterns: ['backtracking'] },
                { id: 'bt-6', title: 'N-Queens', difficulty: 'hard' as const, leetcodeId: 51, leetcodeUrl: 'https://leetcode.com/problems/n-queens/', patterns: ['backtracking'] },
                { id: 'bt-7', title: 'Palindrome Partitioning', difficulty: 'medium' as const, leetcodeId: 131, leetcodeUrl: 'https://leetcode.com/problems/palindrome-partitioning/', patterns: ['backtracking'] }
            ]
        },
        {
            num: 10, title: 'DP Intro', video: VIDEOS.dpIntro,
            resources: [
                { id: 'res-w10-1', title: 'DP Intro (MIT OCW)', url: VIDEOS.dpTheory, type: 'concept', duration: '50:00' },
                { id: 'res-w10-2', title: 'DP for Beginners (freeCodeCamp)', url: VIDEOS.dpIntro, type: 'guide', duration: '20:00' }
            ],
            problems: [
                { id: 'dp-1', title: 'Climbing Stairs', difficulty: 'easy' as const, leetcodeId: 70, leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/', patterns: ['dp'] },
                { id: 'dp-2', title: 'House Robber', difficulty: 'medium' as const, leetcodeId: 198, leetcodeUrl: 'https://leetcode.com/problems/house-robber/', patterns: ['dp'] },
                { id: 'dp-3', title: 'Coin Change', difficulty: 'medium' as const, leetcodeId: 322, leetcodeUrl: 'https://leetcode.com/problems/coin-change/', patterns: ['dp'] },
                { id: 'dp-4', title: 'Min Cost Climbing Stairs', difficulty: 'easy' as const, leetcodeId: 746, leetcodeUrl: 'https://leetcode.com/problems/min-cost-climbing-stairs/', patterns: ['dp'] },
                { id: 'dp-5', title: 'House Robber II', difficulty: 'medium' as const, leetcodeId: 213, leetcodeUrl: 'https://leetcode.com/problems/house-robber-ii/', patterns: ['dp'] },
                { id: 'dp-6', title: 'Maximum Product Subarray', difficulty: 'medium' as const, leetcodeId: 152, leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray/', patterns: ['dp'] }
            ]
        },
        {
            num: 11, title: 'BST & Trie', video: VIDEOS.trieIntro,
            resources: [
                { id: 'res-w11-1', title: 'Implement Trie (NeetCode)', url: VIDEOS.trieTheory, type: 'concept', duration: '18:00' },
                { id: 'res-w11-2', title: 'Trie Implementation (NeetCode)', url: VIDEOS.trieIntro, type: 'guide', duration: '12:00' }
            ],
            problems: [
                { id: 'tr-1', title: 'Implement Trie', difficulty: 'medium' as const, leetcodeId: 208, leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/', patterns: ['trie'] },
                { id: 'tr-2', title: 'Validate BST', difficulty: 'medium' as const, leetcodeId: 98, leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/', patterns: ['bst'] },
                { id: 'tr-3', title: 'Kth Smallest in BST', difficulty: 'medium' as const, leetcodeId: 230, leetcodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', patterns: ['bst'] },
                { id: 'tr-4', title: 'Lowest Common Ancestor of BST', difficulty: 'medium' as const, leetcodeId: 235, leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', patterns: ['bst'] },
                { id: 'tr-5', title: 'Word Search II', difficulty: 'hard' as const, leetcodeId: 212, leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/', patterns: ['trie', 'backtracking'] },
                { id: 'tr-6', title: 'Design Add and Search Words', difficulty: 'medium' as const, leetcodeId: 211, leetcodeUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', patterns: ['trie'] }
            ]
        },
        {
            num: 12, title: 'Union-Find & Phase B Checkpoint', video: VIDEOS.unionFind,
            resources: [
                { id: 'res-w12-1', title: 'Union Find / Disjoint Set (William Fiset)', url: VIDEOS.unionFind, type: 'concept', duration: '20:00' },
                { id: 'res-w12-2', title: 'Union Find Application (NeetCode)', url: VIDEOS.unionFind, type: 'guide', duration: '15:00' }
            ],
            problems: [
                { id: 'uf-1', title: 'Number of Provinces', difficulty: 'medium' as const, leetcodeId: 547, leetcodeUrl: 'https://leetcode.com/problems/number-of-provinces/', patterns: ['union-find', 'graph'] },
                { id: 'uf-2', title: 'Redundant Connection', difficulty: 'medium' as const, leetcodeId: 684, leetcodeUrl: 'https://leetcode.com/problems/redundant-connection/', patterns: ['union-find'] },
                { id: 'uf-3', title: 'Accounts Merge', difficulty: 'medium' as const, leetcodeId: 721, leetcodeUrl: 'https://leetcode.com/problems/accounts-merge/', patterns: ['union-find'] },
                { id: 'uf-4', title: 'Longest Consecutive Sequence', difficulty: 'medium' as const, leetcodeId: 128, leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/', patterns: ['union-find', 'hashset'] },
                { id: 'ck-1', title: 'LRU Cache', difficulty: 'medium' as const, leetcodeId: 146, leetcodeUrl: 'https://leetcode.com/problems/lru-cache/', patterns: ['design'] }
            ]
        },
        {
            num: 13, title: 'DP 1D Deep Dive', video: VIDEOS.dp1D,
            resources: [
                { id: 'res-w13-1', title: 'LIS Pattern (NeetCode)', url: VIDEOS.dp1D, type: 'guide', duration: '20:00' }
            ],
            problems: [
                { id: 'dp1-1', title: 'Longest Increasing Subsequence', difficulty: 'medium' as const, leetcodeId: 300, leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/', patterns: ['dp'] },
                { id: 'dp1-2', title: 'Word Break', difficulty: 'medium' as const, leetcodeId: 139, leetcodeUrl: 'https://leetcode.com/problems/word-break/', patterns: ['dp'] },
                { id: 'dp1-3', title: 'Decode Ways', difficulty: 'medium' as const, leetcodeId: 91, leetcodeUrl: 'https://leetcode.com/problems/decode-ways/', patterns: ['dp'] },
                { id: 'dp1-4', title: 'Partition Equal Subset Sum', difficulty: 'medium' as const, leetcodeId: 416, leetcodeUrl: 'https://leetcode.com/problems/partition-equal-subset-sum/', patterns: ['dp', 'knapsack'] },
                { id: 'dp1-5', title: 'Perfect Squares', difficulty: 'medium' as const, leetcodeId: 279, leetcodeUrl: 'https://leetcode.com/problems/perfect-squares/', patterns: ['dp'] }
            ]
        },
        {
            num: 14, title: 'DP 2D', video: VIDEOS.dp2D,
            resources: [
                { id: 'res-w14-1', title: 'Number of Islands (NeetCode)', url: VIDEOS.matrixTheory, type: 'concept', duration: '20:00' },
                { id: 'res-w14-2', title: 'Unique Paths Pattern (NeetCode)', url: VIDEOS.dp2D, type: 'guide', duration: '15:00' }
            ],
            problems: [
                { id: 'dp2-1', title: 'Unique Paths', difficulty: 'medium' as const, leetcodeId: 62, leetcodeUrl: 'https://leetcode.com/problems/unique-paths/', patterns: ['dp'] },
                { id: 'dp2-2', title: 'Longest Common Subsequence', difficulty: 'medium' as const, leetcodeId: 1143, leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/', patterns: ['dp'] },
                { id: 'dp2-3', title: 'Edit Distance', difficulty: 'hard' as const, leetcodeId: 72, leetcodeUrl: 'https://leetcode.com/problems/edit-distance/', patterns: ['dp'] },
                { id: 'dp2-4', title: 'Unique Paths II', difficulty: 'medium' as const, leetcodeId: 63, leetcodeUrl: 'https://leetcode.com/problems/unique-paths-ii/', patterns: ['dp'] },
                { id: 'dp2-5', title: 'Minimum Path Sum', difficulty: 'medium' as const, leetcodeId: 64, leetcodeUrl: 'https://leetcode.com/problems/minimum-path-sum/', patterns: ['dp'] },
                { id: 'dp2-6', title: 'Target Sum', difficulty: 'medium' as const, leetcodeId: 494, leetcodeUrl: 'https://leetcode.com/problems/target-sum/', patterns: ['dp', 'backtracking'] }
            ]
        },
        {
            num: 15, title: 'Topological Sort', video: VIDEOS.topologicalSort, problems: [
                { id: 'ts-1', title: 'Course Schedule', difficulty: 'medium' as const, leetcodeId: 207, leetcodeUrl: 'https://leetcode.com/problems/course-schedule/', patterns: ['graph', 'topological-sort'] },
                { id: 'ts-2', title: 'Course Schedule II', difficulty: 'medium' as const, leetcodeId: 210, leetcodeUrl: 'https://leetcode.com/problems/course-schedule-ii/', patterns: ['graph', 'topological-sort'] },
                { id: 'ts-3', title: 'Alien Dictionary', difficulty: 'hard' as const, leetcodeId: 269, leetcodeUrl: 'https://leetcode.com/problems/alien-dictionary/', patterns: ['graph', 'topological-sort'] },
                { id: 'ts-4', title: 'Minimum Height Trees', difficulty: 'medium' as const, leetcodeId: 310, leetcodeUrl: 'https://leetcode.com/problems/minimum-height-trees/', patterns: ['graph', 'topological-sort'] }
            ]
        },
        {
            num: 16, title: 'Shortest Path', video: VIDEOS.dijkstra, problems: [
                { id: 'shp-1', title: 'Swim in Rising Water', difficulty: 'hard' as const, leetcodeId: 778, leetcodeUrl: 'https://leetcode.com/problems/swim-in-rising-water/', patterns: ['graph', 'binary-search'] },
                { id: 'shp-2', title: 'Path with Minimum Effort', difficulty: 'medium' as const, leetcodeId: 1631, leetcodeUrl: 'https://leetcode.com/problems/path-with-minimum-effort/', patterns: ['graph', 'dijkstra'] },
                { id: 'shp-3', title: 'Network Delay Time', difficulty: 'medium' as const, leetcodeId: 743, leetcodeUrl: 'https://leetcode.com/problems/network-delay-time/', patterns: ['graph', 'dijkstra'] },
                { id: 'shp-4', title: 'Cheapest Flights Within K Stops', difficulty: 'medium' as const, leetcodeId: 787, leetcodeUrl: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', patterns: ['graph', 'dijkstra'] }
            ]
        },
        {
            num: 17, title: 'Greedy Algorithms', video: VIDEOS.greedy, problems: [
                { id: 'gd-1', title: 'Jump Game', difficulty: 'medium' as const, leetcodeId: 55, leetcodeUrl: 'https://leetcode.com/problems/jump-game/', patterns: ['greedy'] },
                { id: 'gd-2', title: 'Jump Game II', difficulty: 'medium' as const, leetcodeId: 45, leetcodeUrl: 'https://leetcode.com/problems/jump-game-ii/', patterns: ['greedy'] },
                { id: 'gd-3', title: 'Gas Station', difficulty: 'medium' as const, leetcodeId: 134, leetcodeUrl: 'https://leetcode.com/problems/gas-station/', patterns: ['greedy'] },
                { id: 'gd-4', title: 'Partition Labels', difficulty: 'medium' as const, leetcodeId: 763, leetcodeUrl: 'https://leetcode.com/problems/partition-labels/', patterns: ['greedy', 'two-pointers'] },
                { id: 'gd-5', title: 'Hand of Straights', difficulty: 'medium' as const, leetcodeId: 846, leetcodeUrl: 'https://leetcode.com/problems/hand-of-straights/', patterns: ['greedy', 'hashmap'] },
                { id: 'gd-6', title: 'Valid Parenthesis String', difficulty: 'medium' as const, leetcodeId: 678, leetcodeUrl: 'https://leetcode.com/problems/valid-parenthesis-string/', patterns: ['greedy'] }
            ]
        },
        {
            num: 18, title: 'Bit Manipulation & Math', video: VIDEOS.bitManipulation, problems: [
                { id: 'bit-1', title: 'Single Number', difficulty: 'easy' as const, leetcodeId: 136, leetcodeUrl: 'https://leetcode.com/problems/single-number/', patterns: ['bit'] },
                { id: 'bit-2', title: 'Number of 1 Bits', difficulty: 'easy' as const, leetcodeId: 191, leetcodeUrl: 'https://leetcode.com/problems/number-of-1-bits/', patterns: ['bit'] },
                { id: 'bit-3', title: 'Counting Bits', difficulty: 'easy' as const, leetcodeId: 338, leetcodeUrl: 'https://leetcode.com/problems/counting-bits/', patterns: ['bit', 'dp'] },
                { id: 'bit-4', title: 'Missing Number', difficulty: 'easy' as const, leetcodeId: 268, leetcodeUrl: 'https://leetcode.com/problems/missing-number/', patterns: ['bit', 'math'] },
                { id: 'bit-5', title: 'Reverse Bits', difficulty: 'easy' as const, leetcodeId: 190, leetcodeUrl: 'https://leetcode.com/problems/reverse-bits/', patterns: ['bit'] },
                { id: 'bit-6', title: 'Sum of Two Integers', difficulty: 'medium' as const, leetcodeId: 371, leetcodeUrl: 'https://leetcode.com/problems/sum-of-two-integers/', patterns: ['bit'] }
            ]
        },
        {
            num: 19, title: 'String Matching & Monotonic Stack', video: VIDEOS.stringMatching, problems: [
                { id: 'sm-1', title: 'Implement strStr()', difficulty: 'easy' as const, leetcodeId: 28, leetcodeUrl: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/', patterns: ['string-matching'] },
                { id: 'sm-2', title: 'Repeated Substring Pattern', difficulty: 'easy' as const, leetcodeId: 459, leetcodeUrl: 'https://leetcode.com/problems/repeated-substring-pattern/', patterns: ['string-matching'] },
                { id: 'ms-1', title: 'Daily Temperatures', difficulty: 'medium' as const, leetcodeId: 739, leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/', patterns: ['monotonic-stack'] },
                { id: 'ms-2', title: 'Next Greater Element II', difficulty: 'medium' as const, leetcodeId: 503, leetcodeUrl: 'https://leetcode.com/problems/next-greater-element-ii/', patterns: ['monotonic-stack'] },
                { id: 'ms-3', title: 'Largest Rectangle in Histogram', difficulty: 'hard' as const, leetcodeId: 84, leetcodeUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', patterns: ['monotonic-stack'] }
            ]
        },
        {
            num: 20, title: 'Advanced Patterns & Matrix', video: VIDEOS.binarySearchAdvanced, problems: [
                { id: 'adv-1', title: 'Trapping Rain Water', difficulty: 'hard' as const, leetcodeId: 42, leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/', patterns: ['two-pointers', 'monotonic-stack'] },
                { id: 'adv-2', title: 'Median of Two Sorted Arrays', difficulty: 'hard' as const, leetcodeId: 4, leetcodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', patterns: ['binary-search'] },
                { id: 'adv-3', title: 'Sliding Window Maximum', difficulty: 'hard' as const, leetcodeId: 239, leetcodeUrl: 'https://leetcode.com/problems/sliding-window-maximum/', patterns: ['monotonic-deque', 'sliding-window'] },
                { id: 'adv-4', title: 'Rotate Image', difficulty: 'medium' as const, leetcodeId: 48, leetcodeUrl: 'https://leetcode.com/problems/rotate-image/', patterns: ['matrix'] },
                { id: 'adv-5', title: 'Spiral Matrix', difficulty: 'medium' as const, leetcodeId: 54, leetcodeUrl: 'https://leetcode.com/problems/spiral-matrix/', patterns: ['matrix'] },
                { id: 'adv-6', title: 'Set Matrix Zeroes', difficulty: 'medium' as const, leetcodeId: 73, leetcodeUrl: 'https://leetcode.com/problems/set-matrix-zeroes/', patterns: ['matrix'] }
            ]
        },
        {
            num: 21, title: 'Mock Week 1 - Mixed Review', video: VIDEOS.systemDesign, problems: [
                { id: 'mock1-1', title: 'LRU Cache', difficulty: 'medium' as const, leetcodeId: 146, leetcodeUrl: 'https://leetcode.com/problems/lru-cache/', patterns: ['design', 'hashmap'] },
                { id: 'mock1-2', title: 'Min Stack', difficulty: 'medium' as const, leetcodeId: 155, leetcodeUrl: 'https://leetcode.com/problems/min-stack/', patterns: ['stack', 'design'] },
                { id: 'mock1-3', title: 'Insert Delete GetRandom O(1)', difficulty: 'medium' as const, leetcodeId: 380, leetcodeUrl: 'https://leetcode.com/problems/insert-delete-getrandom-o1/', patterns: ['design', 'hashmap'] },
                { id: 'mock1-4', title: 'Time Based Key-Value Store', difficulty: 'medium' as const, leetcodeId: 981, leetcodeUrl: 'https://leetcode.com/problems/time-based-key-value-store/', patterns: ['design', 'binary-search'] },
                { id: 'mock1-5', title: 'LFU Cache', difficulty: 'hard' as const, leetcodeId: 460, leetcodeUrl: 'https://leetcode.com/problems/lfu-cache/', patterns: ['design'] }
            ]
        },
        {
            num: 22, title: 'Mock Week 2 - Graph & Trees', video: VIDEOS.graphBFS, problems: [
                { id: 'mock2-1', title: 'Word Ladder', difficulty: 'hard' as const, leetcodeId: 127, leetcodeUrl: 'https://leetcode.com/problems/word-ladder/', patterns: ['bfs'] },
                { id: 'mock2-2', title: 'Shortest Path in Binary Matrix', difficulty: 'medium' as const, leetcodeId: 1091, leetcodeUrl: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/', patterns: ['bfs'] },
                { id: 'mock2-3', title: 'Binary Tree Maximum Path Sum', difficulty: 'hard' as const, leetcodeId: 124, leetcodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', patterns: ['tree', 'dfs'] },
                { id: 'mock2-4', title: 'Lowest Common Ancestor', difficulty: 'medium' as const, leetcodeId: 236, leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', patterns: ['tree', 'dfs'] },
                { id: 'mock2-5', title: 'Surrounded Regions', difficulty: 'medium' as const, leetcodeId: 130, leetcodeUrl: 'https://leetcode.com/problems/surrounded-regions/', patterns: ['graph', 'dfs'] }
            ]
        },
        {
            num: 23, title: 'Final Polish - DP Mastery', video: VIDEOS.dp2D, problems: [
                { id: 'fp-1', title: 'Regular Expression Matching', difficulty: 'hard' as const, leetcodeId: 10, leetcodeUrl: 'https://leetcode.com/problems/regular-expression-matching/', patterns: ['dp'] },
                { id: 'fp-2', title: 'Burst Balloons', difficulty: 'hard' as const, leetcodeId: 312, leetcodeUrl: 'https://leetcode.com/problems/burst-balloons/', patterns: ['dp'] },
                { id: 'fp-3', title: 'Wildcard Matching', difficulty: 'hard' as const, leetcodeId: 44, leetcodeUrl: 'https://leetcode.com/problems/wildcard-matching/', patterns: ['dp'] },
                { id: 'fp-4', title: 'Interleaving String', difficulty: 'medium' as const, leetcodeId: 97, leetcodeUrl: 'https://leetcode.com/problems/interleaving-string/', patterns: ['dp'] },
                { id: 'fp-5', title: 'Distinct Subsequences', difficulty: 'hard' as const, leetcodeId: 115, leetcodeUrl: 'https://leetcode.com/problems/distinct-subsequences/', patterns: ['dp'] }
            ]
        },
        {
            num: 24, title: 'Interview Ready - Final Boss', video: VIDEOS.systemDesign, problems: [
                { id: 'ir-1', title: 'Design Twitter', difficulty: 'medium' as const, leetcodeId: 355, leetcodeUrl: 'https://leetcode.com/problems/design-twitter/', patterns: ['design', 'heap'] },
                { id: 'ir-2', title: 'Serialize and Deserialize Binary Tree', difficulty: 'hard' as const, leetcodeId: 297, leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', patterns: ['tree', 'design'] },
                { id: 'ir-3', title: 'First Missing Positive', difficulty: 'hard' as const, leetcodeId: 41, leetcodeUrl: 'https://leetcode.com/problems/first-missing-positive/', patterns: ['array'] },
                { id: 'ir-4', title: 'Best Time to Buy and Sell Stock III', difficulty: 'hard' as const, leetcodeId: 123, leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/', patterns: ['dp'] },
                { id: 'ir-5', title: 'Merge k Sorted Lists', difficulty: 'hard' as const, leetcodeId: 23, leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/', patterns: ['heap', 'linked-list'] }
            ]
        },
        // Extended weeks 25-28 for buffer and comprehensive review
        {
            num: 25, title: 'Mock Week 3 - DP & Graphs', video: VIDEOS.dp2D, problems: [
                { id: 'mock3-1', title: 'Longest Palindromic Substring', difficulty: 'medium' as const, leetcodeId: 5, leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/', patterns: ['dp'] },
                { id: 'mock3-2', title: 'Coin Change 2', difficulty: 'medium' as const, leetcodeId: 518, leetcodeUrl: 'https://leetcode.com/problems/coin-change-ii/', patterns: ['dp'] },
                { id: 'mock3-3', title: 'Reconstruct Itinerary', difficulty: 'hard' as const, leetcodeId: 332, leetcodeUrl: 'https://leetcode.com/problems/reconstruct-itinerary/', patterns: ['graph', 'dfs'] },
                { id: 'mock3-4', title: 'Critical Connections', difficulty: 'hard' as const, leetcodeId: 1192, leetcodeUrl: 'https://leetcode.com/problems/critical-connections-in-a-network/', patterns: ['graph'] }
            ]
        },
        {
            num: 26, title: 'Mock Week 4 - Arrays & Strings', video: VIDEOS.slidingWindow, problems: [
                { id: 'mock4-1', title: 'Longest Substring with At Most K Distinct', difficulty: 'medium' as const, leetcodeId: 340, leetcodeUrl: 'https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/', patterns: ['sliding-window'] },
                { id: 'mock4-2', title: 'Minimum Window Substring', difficulty: 'hard' as const, leetcodeId: 76, leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/', patterns: ['sliding-window'] },
                { id: 'mock4-3', title: 'Subarray Sum Equals K', difficulty: 'medium' as const, leetcodeId: 560, leetcodeUrl: 'https://leetcode.com/problems/subarray-sum-equals-k/', patterns: ['prefix-sum', 'hashmap'] },
                { id: 'mock4-4', title: 'Longest Increasing Path in Matrix', difficulty: 'hard' as const, leetcodeId: 329, leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/', patterns: ['dfs', 'dp'] }
            ]
        },
        {
            num: 27, title: 'Final Review - Weak Spots', video: VIDEOS.dpIntro, problems: [
                { id: 'rev-1', title: 'Maximum Subarray', difficulty: 'medium' as const, leetcodeId: 53, leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/', patterns: ['dp', 'kadane'] },
                { id: 'rev-2', title: 'Maximal Square', difficulty: 'medium' as const, leetcodeId: 221, leetcodeUrl: 'https://leetcode.com/problems/maximal-square/', patterns: ['dp'] },
                { id: 'rev-3', title: 'Palindrome Pairs', difficulty: 'hard' as const, leetcodeId: 336, leetcodeUrl: 'https://leetcode.com/problems/palindrome-pairs/', patterns: ['trie', 'string'] },
                { id: 'rev-4', title: 'Basic Calculator', difficulty: 'hard' as const, leetcodeId: 224, leetcodeUrl: 'https://leetcode.com/problems/basic-calculator/', patterns: ['stack'] }
            ]
        },
        {
            num: 28, title: 'Graduation - Full Mock Day', video: VIDEOS.systemDesign, problems: [
                { id: 'grad-1', title: 'Text Justification', difficulty: 'hard' as const, leetcodeId: 68, leetcodeUrl: 'https://leetcode.com/problems/text-justification/', patterns: ['string'] },
                { id: 'grad-2', title: 'Find Median from Data Stream', difficulty: 'hard' as const, leetcodeId: 295, leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/', patterns: ['heap', 'design'] },
                { id: 'grad-3', title: 'Word Break II', difficulty: 'hard' as const, leetcodeId: 140, leetcodeUrl: 'https://leetcode.com/problems/word-break-ii/', patterns: ['dp', 'backtracking'] },
                { id: 'grad-4', title: 'Skyline Problem', difficulty: 'hard' as const, leetcodeId: 218, leetcodeUrl: 'https://leetcode.com/problems/the-skyline-problem/', patterns: ['heap', 'divide-conquer'] }
            ]
        }
    ];

    remainingWeekData.forEach(w => {
        const phase = w.num <= 14 ? 'phase-b' : 'phase-c';
        weeks.push({
            weekNumber: w.num,
            title: w.title,
            phase: phase as 'phase-b' | 'phase-c',
            focus: w.title,
            dailyGoal: phase === 'phase-b' ? 'Master pattern' : 'Hard problem mastery',
            problemsPerDay: phase === 'phase-b' ? '3-4 Medium' : '3-4 Medium/Hard',
            deliverables: ['Pattern mastery', 'Mock interviews'],
            days: [
                {
                    dayNumber: 1, title: 'Pattern Study', goals: ['Learn pattern', 'Analyze time/space complexity'], topics: [
                        { id: `w${w.num}-t1`, title: w.title, description: `Study ${w.title} patterns`, resources: (w as any).resources, videoUrl: w.video, videoTitle: `${w.title} - NeetCode`, videoDuration: '15:00', problems: w.problems.slice(0, 2) }
                    ]
                },
                {
                    dayNumber: 2, title: 'Practice', goals: ['Solve problems', 'Optimize complexity'], topics: [
                        { id: `w${w.num}-t2`, title: `${w.title} Practice`, description: 'Problem practice', videoUrl: w.video, videoTitle: `${w.title} Practice`, videoDuration: '12:00', problems: w.problems.slice(2, 4).length > 0 ? w.problems.slice(2, 4) : w.problems.slice(0, 2) }
                    ]
                },
                {
                    dayNumber: 3, title: 'More Practice', goals: ['More problems', 'Discuss trade-offs'], topics: [
                        { id: `w${w.num}-t3`, title: 'Continued Practice', description: 'Additional problems', videoUrl: w.video, videoTitle: 'More Practice', videoDuration: '10:00', problems: w.problems }
                    ]
                },
                {
                    dayNumber: 4, title: 'Deep Practice', goals: ['Hard problems', 'Review weak areas'], topics: [
                        { id: `w${w.num}-t4`, title: 'Re-solve & Deep Dive', description: 'Focus on challenging variations', videoUrl: w.video, videoTitle: 'Deep Practice', videoDuration: '15:00', problems: w.problems.filter(p => p.difficulty === 'hard' || p.difficulty === 'medium').slice(0, 2) }
                    ]
                },
                {
                    dayNumber: 5, title: w.num === 12 || w.num === 24 ? '🏆 Boss Battle' : 'Timed Mock', goals: ['Timed practice', 'Interview simulation'], topics: [
                        { id: `w${w.num}-t5`, title: 'Timed Challenge', description: 'Complete problems under time pressure', videoUrl: w.video, videoTitle: 'Mock Practice', videoDuration: '10:00', problems: w.problems }
                    ]
                },
                { dayNumber: 6, title: 'Review', goals: ['Re-solve weak problems'], topics: [], isLightDay: true },
                { dayNumber: 7, title: 'Rest', goals: ['Rest'], topics: [], isRestDay: true }
            ],
            isBossWeek: w.num === 12 || w.num === 24
        });
    });

    return weeks;
}

// XP System
export const XP_VALUES = {
    easy: 5,        // Reduced from 10
    medium: 12,     // Reduced from 25
    hard: 25,       // Reduced from 50
    resolve: 8,     // Reduced from 15
    streak: 5,      // bonus per day of streak (unchanged)
    mock: 20,       // Reduced from 30
    postmortem: 5,  // Reduced from 10
    dailyGoal: 10   // Reduced from 20
};

// Level thresholds - More challenging progression
export const LEVELS = Array.from({ length: 50 }, (_, i) => ({
    level: i + 1,
    xpRequired: Math.floor(200 * Math.pow(1.25, i)),  // Increased base from 100 to 200, growth from 1.15 to 1.25
    title: getLevelTitle(i + 1)
}));

function getLevelTitle(level: number): string {
    if (level <= 5) return 'Novice';
    if (level <= 10) return 'Apprentice';
    if (level <= 15) return 'Practitioner';
    if (level <= 20) return 'Adept';
    if (level <= 25) return 'Expert';
    if (level <= 30) return 'Master';
    if (level <= 35) return 'Grandmaster';
    if (level <= 40) return 'Legend';
    if (level <= 45) return 'Mythic';
    return 'Transcendent';
}

// Achievements
export const ACHIEVEMENTS = [
    { id: 'first-blood', title: 'First Blood', description: 'Solve your first problem', icon: '🩸', xpBonus: 50 },
    { id: 'streak-7', title: 'Week Warrior', description: '7-day streak', icon: '🔥', xpBonus: 100 },
    { id: 'streak-30', title: 'Monthly Master', description: '30-day streak', icon: '🌟', xpBonus: 500 },
    { id: 'problems-10', title: 'Double Digits', description: 'Solve 10 problems', icon: '✨', xpBonus: 75 },
    { id: 'problems-50', title: 'Half Century', description: 'Solve 50 problems', icon: '🎯', xpBonus: 200 },
    { id: 'problems-100', title: 'Century Club', description: 'Solve 100 problems', icon: '💯', xpBonus: 500 },
    { id: 'phase-a', title: 'Foundation Built', description: 'Complete Phase A', icon: '🏗️', xpBonus: 300 },
    { id: 'phase-b', title: 'Pattern Master', description: 'Complete Phase B', icon: '🧩', xpBonus: 500 },
    { id: 'phase-c', title: 'Interview Ready', description: 'Complete Phase C', icon: '🎓', xpBonus: 1000 },
    { id: 'first-mock', title: 'Mock Initiate', description: 'Complete first mock interview', icon: '🎤', xpBonus: 50 },
    { id: 'mock-10', title: 'Mock Veteran', description: 'Complete 10 mock interviews', icon: '🏆', xpBonus: 300 },
    { id: 'first-hard', title: 'Hard Mode', description: 'Solve your first Hard problem', icon: '💪', xpBonus: 100 },
    { id: 'platinum', title: 'Platinum Status', description: 'Reach Platinum mastery in any topic', icon: '💎', xpBonus: 250 }
];

// Daily Quests (rotating)
export const DAILY_QUESTS = [
    { id: 'solve-3', title: 'Solve 3 problems today', xpReward: 50, target: 3 },
    { id: 'resolve-1', title: 'Complete a re-solve', xpReward: 25, target: 1 },
    { id: 'watch-video', title: 'Watch a concept video', xpReward: 20, target: 1 },
    { id: 'postmortem', title: 'Write a postmortem', xpReward: 30, target: 1 },
    { id: 'easy-3', title: 'Solve 3 easy problems', xpReward: 30, target: 3 },
    { id: 'medium-2', title: 'Solve 2 medium problems', xpReward: 50, target: 2 },
    { id: 'hard-1', title: 'Solve 1 hard problem', xpReward: 75, target: 1 },
    { id: 'streak-maintain', title: 'Maintain your streak', xpReward: 25, target: 1 }
];
