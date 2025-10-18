import React, { useState, useEffect } from 'react';
import { Brain, Flame, BarChart3, BookOpen, Target, Menu, X, Clock, TrendingUp, ChevronRight, Play, ArrowRight, Check, AlertCircle, Zap, Loader2, Sparkles } from 'lucide-react';

// REPLACE THIS ENTIRE SECTION WITH YOUR CONVERTED DATABASE

const QUESTIONS_DB = {
  "questions": [
    {
      "id": "Q1.1",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "You are given two glass jugs. Each contains the same volume, V, of liquid. One jug contains pure alcohol, and the other jug contains pure water. A modest quantity, Q, of water is poured from the water jug into the alcohol jug, which is then thoroughly mixed. The same modest quantity, Q, of (now diluted) alcohol is then poured back into the water jug to equalize the volumes of the jugs at their initial levels. What is the relationship between the final concentrations of alcohol in the alcohol jug and water in the water jug?",
      "tags": [
        "logic",
        "concentration",
        "mixture"
      ],
      "type": "free_response",
      "correct_answer": "The final concentrations are identical",
      "explanation": "The final concentrations are identical. No calculation needed - think about volume conservation.",
      "estimated_time": 120
    },
    {
      "id": "Q1.2",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "What is the sum of the integers from 1 to 100? More generally, what is the sum of the integers from 1 to n?",
      "tags": [
        "arithmetic",
        "series",
        "summation"
      ],
      "type": "numerical",
      "correct_answer": "5,050 for the first part",
      "explanation": "5,050 for the first part. General formula: n(n+1)/2",
      "estimated_time": 120
    },
    {
      "id": "Q1.3",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "You have 12 balls that appear identical. In fact, 11 are identical, and one is slightly heavier or lighter than the others. You have a balance scale. Find the odd ball and determine whether it is heavier or lighter in exactly three weighings.",
      "tags": [
        "logic",
        "weighing",
        "problem-solving"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 180
    },
    {
      "id": "Q1.4",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "You are a bug sitting in one corner of a cubic room. You wish to walk (not fly) to the diametrically opposite corner by the shortest path. Describe this path and calculate its length in terms of the length of the side of the cube.",
      "tags": [
        "geometry",
        "optimization",
        "shortest-path"
      ],
      "type": "free_response",
      "correct_answer": "Unfold the cube and find the straight-line distance",
      "explanation": "Unfold the cube and find the straight-line distance. Answer: \u221a5 units.",
      "estimated_time": 240
    },
    {
      "id": "Q1.5",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "A 10x10x10 cube is made up of 1,000 smaller 1x1x1 cubes. If you remove the surface cubes (leaving a solid inner core), how many 1x1x1 cubes are removed?",
      "tags": [
        "geometry",
        "3D-shapes",
        "volume"
      ],
      "type": "multiple_choice",
      "correct_answer": "Calculate 10\u00b3 - 8\u00b3 = 1000 - 512 = 488",
      "explanation": "Calculate 10\u00b3 - 8\u00b3 = 1000 - 512 = 488",
      "estimated_time": 120,
      "options": [
        "It's impossible to determine",
        "Insufficient information provided",
        "Never true",
        "Calculate 10\u00b3 - 8\u00b3 = 1000 - 512 = 488"
      ]
    },
    {
      "id": "Q1.6",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "A society exists where every family continues having children until they have a boy, then they stop. Assuming equal probability of male and female births, what is the expected proportion of male children in the population over time?",
      "tags": [
        "probability",
        "expected-value",
        "population"
      ],
      "type": "multiple_choice",
      "correct_answer": "50% - the proportion remains equal despite the stopping rule",
      "explanation": "50% - the proportion remains equal despite the stopping rule.",
      "estimated_time": 90,
      "options": [
        "37",
        "62",
        "50% - the proportion remains equal despite the stopping rule",
        "75"
      ]
    },
    {
      "id": "Q1.7",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "How many degrees (if any) are there in the angle between the hour and minute hands of a clock when the time is a quarter past three?",
      "tags": [
        "geometry",
        "clock",
        "angles"
      ],
      "type": "multiple_choice",
      "correct_answer": "7",
      "explanation": "7.5 degrees",
      "estimated_time": 120,
      "options": [
        "5.6",
        "7",
        "9.1",
        "11.2"
      ]
    },
    {
      "id": "Q1.8",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "What is the first time after 3PM when the hour and minute hands of a clock are exactly on top of each other?",
      "tags": [
        "geometry",
        "clock",
        "algebra"
      ],
      "type": "multiple_choice",
      "correct_answer": "3:16:21",
      "explanation": "3:16:21.82 (approximately 3:16 and 21.82 seconds)",
      "estimated_time": 240,
      "options": [
        "3:16:21",
        "Not applicable",
        "Cannot determine",
        "Insufficient information"
      ]
    },
    {
      "id": "Q1.9",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "There are 100 light bulbs lined up in a row, each with its own switch, all initially off. 100 people walk through: person 1 flips every switch, person 2 flips every 2nd switch, person 3 flips every 3rd switch, etc. What is the final state of bulb number 64?",
      "tags": [
        "logic",
        "factors",
        "divisibility"
      ],
      "type": "free_response",
      "correct_answer": "ON",
      "explanation": "ON. Bulb 64 is touched by people whose numbers are factors of 64: 1,2,4,8,16,32,64 (odd number of factors).",
      "estimated_time": 180
    },
    {
      "id": "Q1.10",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "Same setup as Q1.9: How many of the light bulbs are illuminated after the 100th person has passed through, and which light bulbs are they?",
      "tags": [
        "logic",
        "factors",
        "perfect-squares"
      ],
      "type": "numerical",
      "correct_answer": "10 bulbs are illuminated: the perfect squares (1,4,9,16,25,36,49,64,81,100)",
      "explanation": "10 bulbs are illuminated: the perfect squares (1,4,9,16,25,36,49,64,81,100)",
      "estimated_time": 120
    },
    {
      "id": "Q1.11",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "Your sock drawer contains 8 red socks and 11 blue socks that are otherwise identical. In the dark, what is the minimum number of socks you must take to guarantee a matching pair?",
      "tags": [
        "logic",
        "pigeonhole-principle",
        "probability"
      ],
      "type": "numerical",
      "correct_answer": "3 socks",
      "explanation": "3 socks",
      "estimated_time": 60
    },
    {
      "id": "Q1.12",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "You play a game where players take turns calling out integers. First player must call 1-10, then each subsequent number must be 1-10 more than the previous. First to call 50 wins. Do you want to go first, and what is your strategy?",
      "tags": [
        "game-theory",
        "strategy",
        "backward-induction"
      ],
      "type": "free_response",
      "correct_answer": "Go first and call 6, then maintain calling numbers that keep you 11 ahead of opponent",
      "explanation": "Go first and call 6, then maintain calling numbers that keep you 11 ahead of opponent.",
      "estimated_time": 120
    },
    {
      "id": "Q1.13",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "A safe has a three-number combination with 40 numbers on the dial (0-39). Without knowing the combination, what is the maximum number of trials required to open the safe?",
      "tags": [
        "combinatorics",
        "optimization"
      ],
      "type": "free_response",
      "correct_answer": "About 200 trials if exploiting mechanical tolerances; 1,600 if only finding first two numbers exactly",
      "explanation": "About 200 trials if exploiting mechanical tolerances; 1,600 if only finding first two numbers exactly.",
      "estimated_time": 180
    },
    {
      "id": "Q1.14",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Hard",
      "question": "You have 90 coins, 89 identical and one of different weight (you don't know if heavier or lighter). Using a balance scale at $100 per use, what is your algorithm to identify the unusual coin and determine if it's heavy or light while minimizing maximum possible cost?",
      "tags": [
        "logic",
        "weighing",
        "optimization",
        "algorithm"
      ],
      "type": "free_response",
      "correct_answer": "Maximum cost $500 (5 weighings)",
      "explanation": "Maximum cost $500 (5 weighings). Divide into groups of 3^n pattern.",
      "estimated_time": 240
    },
    {
      "id": "Q1.15",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Hard",
      "question": "Suppose that function f(z) is complex valued in the complex plane, bounded and entire. Prove that f(z) must be a constant. (Liouville's Theorem)",
      "tags": [
        "complex-analysis",
        "proof",
        "mathematics"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 300
    },
    {
      "id": "Q1.16",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "A single lily pad doubles its surface area every day and takes 30 days to cover a pond. If you start with eight identical lily pads, how many days will it take to cover the pond?",
      "tags": [
        "exponential-growth",
        "logic"
      ],
      "type": "free_response",
      "correct_answer": "27 days",
      "explanation": "27 days. Eight lily pads = one lily pad that's 3 days old (2\u00b3=8).",
      "estimated_time": 90
    },
    {
      "id": "Q1.17",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "There are 27 lily pads on a 6,000 square foot pond. Each pad is one square foot and doubles daily. How long until the pond is covered?",
      "tags": [
        "exponential-growth",
        "logarithms"
      ],
      "type": "numerical",
      "correct_answer": "About 8 days",
      "explanation": "About 8 days. Solve 6000/27 = 2^N, so N \u2248 7.8",
      "estimated_time": 90
    },
    {
      "id": "Q1.18",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "Give me the decimal equivalent of 13/16.",
      "tags": [
        "fractions",
        "arithmetic"
      ],
      "type": "numerical",
      "correct_answer": "0",
      "explanation": "0.8125",
      "estimated_time": 90
    },
    {
      "id": "Q1.19",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "A snail climbs a 10-foot pole. It climbs 3 feet every day and slides down 1 foot each night while sleeping. When does it reach the top?",
      "tags": [
        "logic",
        "sequences"
      ],
      "type": "free_response",
      "correct_answer": "During the 5th day, 2/3 through the day (starts day 5 at 8 feet, reaches 10 feet at 2/3 through day 5)",
      "explanation": "During the 5th day, 2/3 through the day (starts day 5 at 8 feet, reaches 10 feet at 2/3 through day 5).",
      "estimated_time": 120
    },
    {
      "id": "Q1.20",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "A windowless room contains three identical light fixtures with identical bulbs, each connected to one of three switches outside. All bulbs are initially off. You can flip switches once, then enter the room. How can you tell which switch goes to which light?",
      "tags": [
        "logic",
        "lateral-thinking"
      ],
      "type": "free_response",
      "correct_answer": "Turn switch 1 on, wait, turn it off and simultaneously turn switch 2 on",
      "explanation": "Turn switch 1 on, wait, turn it off and simultaneously turn switch 2 on. Enter room: illuminated=switch 2, warm unlit=switch 1, cold unlit=switch 3.",
      "estimated_time": 120
    },
    {
      "id": "Q1.21",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "Inside a dark closet are 5 hats: 3 blue and 2 red. Three smart men each select a hat unseen and wear it. Outside, no man can see his own hat. First man says he can't tell his hat color. Second man says the same. Third man is blind but says he knows his color. What color and how does he know?",
      "tags": [
        "logic",
        "deduction",
        "puzzle"
      ],
      "type": "free_response",
      "correct_answer": "Blue",
      "explanation": "Blue. If first two men saw two red hats, they'd know their own. Since they didn't, blind man deduces he's wearing blue.",
      "estimated_time": 120
    },
    {
      "id": "Q1.22",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "Find the smallest positive integer that leaves remainder of 1 when divided by 2, remainder of 2 when divided by 3, remainder of 3 when divided by 4, ... and remainder of 9 when divided by 10.",
      "tags": [
        "number-theory",
        "modular-arithmetic",
        "LCM"
      ],
      "type": "numerical",
      "correct_answer": "2519",
      "explanation": "2519. This is LCM(2,3,4,5,6,7,8,9,10) - 1 = 2520 - 1.",
      "estimated_time": 180
    },
    {
      "id": "Q1.23",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "Two motorcyclists are 25 miles apart. They ride toward each other at 20 mph and 30 mph. A fly on the first rider's helmet flies at 40 mph, back and forth between them until they collide. How many miles does the fly travel?",
      "tags": [
        "kinematics",
        "distance-speed-time"
      ],
      "type": "multiple_choice",
      "correct_answer": "20 miles",
      "explanation": "20 miles. They meet after 0.5 hours (25/(20+30)). Fly travels 40\u00d70.5 = 20 miles.",
      "estimated_time": 90,
      "options": [
        "30",
        "20 miles",
        "25",
        "15"
      ]
    },
    {
      "id": "Q1.24",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "A, B, C, D, E, F, G, H, and I are the nine integers from 1 to 9 (not necessarily in order). They satisfy: A+B+C+D=20, B+C+D+E+F=20, D+E+F+G+H=20, and F+G+H+I=20. What values are taken by each of A to I?",
      "tags": [
        "algebra",
        "constraints",
        "puzzle"
      ],
      "type": "free_response",
      "correct_answer": "E=5 immediately",
      "explanation": "E=5 immediately. Multiple solutions exist (96 total). Example: 6,8,4,2,5,1,3,9,7",
      "estimated_time": 240
    },
    {
      "id": "Q1.25",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "A small boat floats in a swimming pool containing a very heavy rock. If the rock is tossed overboard into the pool, what happens to the water level?",
      "tags": [
        "physics",
        "buoyancy",
        "Archimedes-principle"
      ],
      "type": "multiple_choice",
      "correct_answer": "Water level falls",
      "explanation": "Water level falls. Rock in boat displaces its weight in water; rock underwater displaces only its volume.",
      "estimated_time": 120,
      "options": [
        "Water level falls",
        "None of the above",
        "They are equal",
        "Never true"
      ]
    },
    {
      "id": "Q1.26",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Hard",
      "question": "Prove that the area of a triangle is given by A = \u221a[s(s-a)(s-b)(s-c)], where a, b, and c are the side lengths, and s = (a+b+c)/2 is half the perimeter. (Heron's Formula)",
      "tags": [
        "geometry",
        "proof",
        "trigonometry"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 300
    },
    {
      "id": "Q1.27",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "N people arrive at a hotel with N rooms. Each gets a numbered key. Before going upstairs, they attend a party where they surrender their keys. The doorman randomly redistributes the keys at night. What is the probability that at least one guest ends up in their originally assigned room?",
      "tags": [
        "probability",
        "derangements",
        "inclusion-exclusion"
      ],
      "type": "multiple_choice",
      "correct_answer": "Approaches 1 - 1/e \u2248 0",
      "explanation": "Approaches 1 - 1/e \u2248 0.632 as N gets large.",
      "estimated_time": 180,
      "options": [
        "Never true",
        "Cannot be determined without additional information",
        "Approaches 1 - 1/e \u2248 0",
        "Insufficient information provided"
      ]
    },
    {
      "id": "Q1.28",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Hard",
      "question": "In a matriarchal town, a stranger announces there are cheating husbands. Women must kick out unfaithful husbands the morning after deducing infidelity. Each wife knows about all other husbands except her own. On the 10th morning after the announcement, some men are kicked out. How many?",
      "tags": [
        "logic",
        "common-knowledge",
        "induction"
      ],
      "type": "numerical",
      "correct_answer": "10 men",
      "explanation": "10 men. This is a classic common knowledge puzzle.",
      "estimated_time": 240
    },
    {
      "id": "Q1.29",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "Three poles stand before you. One has 64 rings stacked from 1 ounce (top) to 64 ounces (bottom). Move all rings to another pole in the same order. Rules: move one ring at a time, can only move between poles, cannot place a ring on a lighter ring. What is the minimum number of moves?",
      "tags": [
        "Tower-of-Hanoi",
        "recursion",
        "algorithm"
      ],
      "type": "numerical",
      "correct_answer": "2^64 - 1 moves (approximately 1",
      "explanation": "2^64 - 1 moves (approximately 1.8\u00d710^19)",
      "estimated_time": 180
    },
    {
      "id": "Q1.30",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "Solve the following ordinary differential equation (ODE): u'' + u' + u = 1.",
      "tags": [
        "calculus",
        "differential-equations",
        "ODE"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 120
    },
    {
      "id": "Q1.31",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "Random variables X and Y are Normally distributed: X ~ N(\u03bcx, \u03c3x\u00b2) and Y ~ N(\u03bcy, \u03c3y\u00b2). The correlation between X and Y is \u03c1. How do you choose constants a and b to minimize the variance of S = aX + bY under constraints a+b=1, 0<a<1, and 0<b<1?",
      "tags": [
        "statistics",
        "optimization",
        "portfolio-theory"
      ],
      "type": "free_response",
      "correct_answer": "This is equivalent to minimum variance portfolio problem",
      "explanation": "This is equivalent to minimum variance portfolio problem.",
      "estimated_time": 240
    },
    {
      "id": "Q1.32",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "A lighthouse is L=3 miles from a straight coastline. The light revolves at one revolution per minute. How fast is the beam traveling along the coastline? When the beam is 3L away from the closest coastal point, how fast is it traveling?",
      "tags": [
        "calculus",
        "related-rates",
        "trigonometry"
      ],
      "type": "multiple_choice",
      "correct_answer": "Speed is infinite when beam is perpendicular to closest point",
      "explanation": "Speed is infinite when beam is perpendicular to closest point. At 3L away, speed is approximately 60\u03c0L mph.",
      "estimated_time": 180,
      "options": [
        "It's impossible to determine",
        "Always true in all cases",
        "Speed is infinite when beam is perpendicular to closest point",
        "Cannot be determined without additional information"
      ]
    },
    {
      "id": "Q1.33",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Hard",
      "question": "On a 20x20 chessboard, place cubes on squares in a pattern: 1 cube at NW corner, adding one cube each time you move south or east. How many cubes total are on the chessboard?",
      "tags": [
        "combinatorics",
        "summation",
        "patterns"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 240
    },
    {
      "id": "Q1.34",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Hard",
      "question": "You stand at the center of a circular field of radius R with a fence around it. A dog attached to the fence runs at 4v, while you run at v. What is your running strategy to escape the field without being caught?",
      "tags": [
        "geometry",
        "optimization",
        "pursuit-evasion"
      ],
      "type": "free_response",
      "correct_answer": "Run in a spiral to gain angular advantage, then make a straight dash when you have sufficient lead",
      "explanation": "Run in a spiral to gain angular advantage, then make a straight dash when you have sufficient lead.",
      "estimated_time": 300
    },
    {
      "id": "Q1.36",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "What is \u222bsec(\u03b8)d\u03b8 equal to?",
      "tags": [
        "calculus",
        "integration",
        "trigonometry"
      ],
      "type": "multiple_choice",
      "correct_answer": "ln|sec(\u03b8) + tan(\u03b8)| + C",
      "explanation": "ln|sec(\u03b8) + tan(\u03b8)| + C",
      "estimated_time": 240,
      "options": [
        "ln|sec(\u03b8) + tan(\u03b8)| + C",
        "Insufficient information provided",
        "Depends on market conditions",
        "Sometimes true, sometimes false"
      ]
    },
    {
      "id": "Q1.37",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "Does the infinite sum \u03a3(n=1 to \u221e) e^(-\u221an) converge?",
      "tags": [
        "calculus",
        "series",
        "convergence"
      ],
      "type": "multiple_choice",
      "correct_answer": "Yes, it converges by comparison test",
      "explanation": "Yes, it converges by comparison test.",
      "estimated_time": 180,
      "options": [
        "No, it's impossible",
        "No direct relationship",
        "Sometimes true, sometimes false",
        "Yes, it converges by comparison test"
      ]
    },
    {
      "id": "Q1.39",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "You are given eight balls that appear identical, but one is heavier than the rest. You have a balance scale. How do you find the heavy ball?",
      "tags": [
        "logic",
        "weighing",
        "algorithm"
      ],
      "type": "free_response",
      "correct_answer": "Two weighings suffice",
      "explanation": "Two weighings suffice. Divide into groups of 3, 3, and 2.",
      "estimated_time": 60
    },
    {
      "id": "Q1.40",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "We play a game on a table taking turns placing quarters. Quarters cannot overlap. Last person to place a quarter wins. A winning strategy exists independent of table size. What is the table shape? Do you start? What is your strategy? Any exceptions?",
      "tags": [
        "game-theory",
        "strategy",
        "symmetry"
      ],
      "type": "free_response",
      "correct_answer": "Round table",
      "explanation": "Round table. Go first, place quarter in center, then use symmetry strategy. Doesn't work if table already has a quarter in center.",
      "estimated_time": 180
    },
    {
      "id": "Q1.41",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "John's sister has three children. The product of their ages is 36. You need more information. The sum of their ages equals a figure on a spreadsheet. Still not enough. The eldest is dyslexic. How old are the children?",
      "tags": [
        "logic",
        "number-theory",
        "puzzle"
      ],
      "type": "free_response",
      "correct_answer": "2, 2, and 9 years old",
      "explanation": "2, 2, and 9 years old. Only factorization with repeated sum is (2,2,9) and (1,6,6), so 'eldest' resolves ambiguity.",
      "estimated_time": 120
    },
    {
      "id": "Q1.42",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Hard",
      "question": "You have 52 playing cards (26 red, 26 black). Draw cards one by one. Red card pays $1, black fines you $1. You can stop anytime. Cards aren't returned. What is the optimal stopping rule to maximize expected payoff? What is the expected payoff?",
      "tags": [
        "probability",
        "optimal-stopping",
        "martingale"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 360
    },
    {
      "id": "Q1.43",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "You have an 8x8 chessboard and 2x1 dominoes. An X marks squares at (1,1) and (8,8) - diagonally opposite corners. Is it possible to cover the remaining 62 squares using dominoes without overlap or overhang?",
      "tags": [
        "logic",
        "tiling",
        "parity"
      ],
      "type": "free_response",
      "correct_answer": "No",
      "explanation": "No. Each domino covers one white and one black square. Opposite corners are same color, leaving unequal numbers of each color.",
      "estimated_time": 180
    },
    {
      "id": "Q1.44",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "Why is it that if p is a prime number greater than 3, then p\u00b2 - 1 is always divisible by 24 with no remainder?",
      "tags": [
        "number-theory",
        "modular-arithmetic",
        "proof"
      ],
      "type": "free_response",
      "correct_answer": "p\u00b2 - 1 = (p-1)(p+1)",
      "explanation": "p\u00b2 - 1 = (p-1)(p+1). For p>3 and prime, p\u00b11 are even consecutive numbers, so divisible by 8. One of p-1, p, p+1 is divisible by 3.",
      "estimated_time": 240
    },
    {
      "id": "Q1.45",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Hard",
      "question": "You bid for a firm whose true value is uniformly distributed between 0 and 1. You don't know value S, but once you bid, the news doubles the value to 2S. Your bid is accepted only if it's at least as large as original value. How do you bid to maximize expected payoff?",
      "tags": [
        "auction-theory",
        "expected-value",
        "winner's-curse"
      ],
      "type": "multiple_choice",
      "correct_answer": "Don't bid at all",
      "explanation": "Don't bid at all. Expected payoff is always negative due to winner's curse.",
      "estimated_time": 360,
      "options": [
        "Don't bid at all",
        "No direct relationship",
        "They are equal",
        "None of the above"
      ]
    },
    {
      "id": "Q1.46",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "You have a fuse that burns in exactly one minute. The fuse is inhomogeneous (burns unevenly). You have a match but no watch. How do you measure exactly 30 seconds?",
      "tags": [
        "logic",
        "lateral-thinking"
      ],
      "type": "free_response",
      "correct_answer": "Light both ends simultaneously",
      "explanation": "Light both ends simultaneously. Fuse will burn completely in 30 seconds.",
      "estimated_time": 60
    },
    {
      "id": "Q1.47",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "How many places are there on Earth where you can walk one mile south, one mile east, one mile north, and end up exactly where you started? Assume Earth is a perfect sphere with constant compass bearing on each leg.",
      "tags": [
        "geometry",
        "spherical-geometry",
        "puzzle"
      ],
      "type": "free_response",
      "correct_answer": "Infinitely many",
      "explanation": "Infinitely many. North Pole, plus infinite circle of points near South Pole.",
      "estimated_time": 180
    },
    {
      "id": "Q1.48",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "A king demands 1,000 gold sovereigns from each of 10 regions. One tax collector is cheating, giving coins 10% lighter. Each coin should weigh exactly one ounce. How can the king identify the cheat using a weighing device exactly once?",
      "tags": [
        "logic",
        "weighing",
        "clever-solution"
      ],
      "type": "free_response",
      "correct_answer": "Take 1 coin from collector 1, 2 from collector 2, etc",
      "explanation": "Take 1 coin from collector 1, 2 from collector 2, etc. Weigh total. Deficit in tenths of an ounce identifies the cheater.",
      "estimated_time": 90
    },
    {
      "id": "Q1.49",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "Five pirates have looted 100 gold coins and must divide them democratically. The most senior pirate proposes a distribution, and all pirates vote. If at least 50% accept, the gold is divided as proposed. If not, the most senior pirate is fed to sharks and the process repeats. Pirates are rational: they want to stay alive first, get gold second, and prefer fewer pirates on the boat if outcomes are equal. How will the 100 coins be divided?",
      "tags": [
        "game-theory",
        "backward-induction",
        "rational-agents"
      ],
      "type": "free_response",
      "correct_answer": "Work backwards from 2 pirates",
      "explanation": "Work backwards from 2 pirates. The most senior pirate (pirate 5) should offer 1 coin each to pirates 1 and 3, keeping 98 coins. This gets him 3 votes (himself, 1, and 3).",
      "estimated_time": 240
    },
    {
      "id": "Q1.50",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "100 tigers and 1 sheep are on a magic island with only grass. Tigers can eat grass but prefer sheep. Each time only one tiger can eat the sheep, and that tiger becomes a sheep. All tigers are rational and want to survive. Will the sheep be eaten?",
      "tags": [
        "logic",
        "game-theory",
        "induction"
      ],
      "type": "free_response",
      "correct_answer": "Start with small numbers",
      "explanation": "Start with small numbers. With 1 tiger, sheep is eaten. With 2 tigers, neither eats (would become sheep and be eaten). Pattern: even number of tigers = safe; odd number = eaten. With 100 tigers, sheep is safe.",
      "estimated_time": 120
    },
    {
      "id": "Q1.51",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "Four people (A, B, C, D) need to cross a bridge at night. Maximum 2 can cross at once, and they need a torch (only have 1). A takes 10 minutes, B takes 5, C takes 2, D takes 1. What's the minimum time for all to cross?",
      "tags": [
        "logic",
        "optimization",
        "puzzle"
      ],
      "type": "free_response",
      "correct_answer": "17 minutes",
      "explanation": "17 minutes. C and D cross (2 min), D returns (1 min), A and B cross (10 min), C returns (2 min), C and D cross (2 min).",
      "estimated_time": 120
    },
    {
      "id": "Q1.52",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "You have two fuses, each burns in exactly 1 hour but burns unevenly. Using only matches and the fuses, how do you measure exactly 45 minutes?",
      "tags": [
        "logic",
        "lateral-thinking",
        "time-measurement"
      ],
      "type": "free_response",
      "correct_answer": "Light both ends of fuse 1 and one end of fuse 2",
      "explanation": "Light both ends of fuse 1 and one end of fuse 2. When fuse 1 burns out (30 min), light the other end of fuse 2. When fuse 2 burns out, 45 min have elapsed.",
      "estimated_time": 90
    },
    {
      "id": "Q1.53",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Hard",
      "question": "You have 90 coins, 89 identical and one of different weight (unknown if heavier or lighter). Using a balance scale at $100 per use, design an algorithm to identify the unusual coin and determine if it's heavy or light while minimizing maximum possible cost.",
      "tags": [
        "logic",
        "weighing",
        "optimization",
        "algorithm"
      ],
      "type": "numerical",
      "correct_answer": "Maximum cost $500 (5 weighings)",
      "explanation": "Maximum cost $500 (5 weighings). Divide into groups following 3^n pattern. Use information from each weighing to narrow down possibilities.",
      "estimated_time": 240
    },
    {
      "id": "Q1.54",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "A box contains n balls of n different colors. Each time you randomly select a pair, repaint the first to match the second, and return both. What is the expected number of steps until all balls are the same color?",
      "tags": [
        "probability",
        "Markov-chain",
        "expected-value"
      ],
      "type": "free_response",
      "correct_answer": "Very difficult",
      "explanation": "Very difficult. Let F_i be event all balls become color i. By symmetry P(F_i)=1/n. Condition on F_1. Use states based on number of color-1 balls. Answer: (n-1)\u00b2",
      "estimated_time": 240
    },
    {
      "id": "Q1.59",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Easy",
      "question": "Can you pack 53 bricks of dimension 1\u00d71\u00d74 into a 6\u00d76\u00d76 box?",
      "tags": [
        "logic",
        "3D-geometry",
        "parity"
      ],
      "type": "free_response",
      "correct_answer": "No",
      "explanation": "No. Imagine box made of 2\u00d72\u00d72 cubes (27 cubes, alternating black/white). Each brick occupies half of 2 cubes, one each color. One color has only 13 cubes, limiting to 52 bricks max.",
      "estimated_time": 90
    },
    {
      "id": "Q1.60",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "You have calendar cubes showing dates 01-31. Two cubes with 6 faces each. What numbers go on each cube?",
      "tags": [
        "logic",
        "combinatorics",
        "puzzle"
      ],
      "type": "free_response",
      "correct_answer": "Both need 0,1,2",
      "explanation": "Both need 0,1,2. For 11 and 22, both need 1 and 2. Both need 0 for 01-09. Cube 1: 0,1,2,3,4,5. Cube 2: 0,1,2,6,7,8. Use 6 as 9 (rotate)!",
      "estimated_time": 240
    },
    {
      "id": "Q1.61",
      "chapter": 1,
      "category": "Purely Quantitative & Logic",
      "difficulty": "Medium",
      "question": "Two doors: one leads to job offer, one to exit. Each door has a guard. One always lies, one always tells truth. You can ask one guard one yes/no question. What do you ask?",
      "tags": [
        "logic",
        "puzzle",
        "lateral-thinking"
      ],
      "type": "free_response",
      "correct_answer": "Ask either guard: 'Would the other guard say you're guarding the offer door?' If yes, choose other door",
      "explanation": "Ask either guard: 'Would the other guard say you're guarding the offer door?' If yes, choose other door. If no, choose this door.",
      "estimated_time": 120
    },
    {
      "id": "Q2.1",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Easy",
      "question": "All Black-Scholes assumptions hold. No dividends. Stock price is $100. Riskless rate is 5% per annum. Consider a one-year European call option struck at-the-money. If volatility is zero (\u03c3=0), what is the call worth? How do you hedge it?",
      "tags": [
        "Black-Scholes",
        "option-pricing",
        "zero-volatility",
        "hedging"
      ],
      "type": "numerical",
      "correct_answer": "Call worth approximately $4",
      "explanation": "Call worth approximately $4.88 (= 100 - 100e^(-0.05)). Hedge by holding the stock.",
      "estimated_time": 60
    },
    {
      "id": "Q2.2",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Easy",
      "question": "Two standard options have exactly the same features, except one has long maturity and the other has short maturity. Which one has the higher gamma?",
      "tags": [
        "options",
        "gamma",
        "greeks",
        "maturity"
      ],
      "type": "multiple_choice",
      "correct_answer": "Short maturity option has higher gamma (more curvature near expiration)",
      "explanation": "Short maturity option has higher gamma (more curvature near expiration).",
      "estimated_time": 120,
      "options": [
        "Cannot be determined without additional information",
        "Short maturity option has lower gamma (more curvature near expiration)",
        "Always true in all cases",
        "Short maturity option has higher gamma (more curvature near expiration)"
      ]
    },
    {
      "id": "Q2.3",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "IBM is trading at $75 per share. What does it cost to construct a derivative security that pays exactly one dollar when IBM hits $100 for the first time? Explain the construction. Ignore dividends, assume zero interest rate, assets infinitely divisible, no short sale restrictions, no taxes/transaction costs.",
      "tags": [
        "barrier-options",
        "knock-out",
        "replication",
        "arbitrage"
      ],
      "type": "multiple_choice",
      "correct_answer": "$0",
      "explanation": "$0.75. Buy 75/100 of a share now. When it hits $100, you have $0.75\u00d7(100/75) = $1.",
      "estimated_time": 240,
      "options": [
        "$0",
        "0.0",
        "0.0",
        "0.0"
      ]
    },
    {
      "id": "Q2.4",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "Black-Scholes world, no dividends. European call and put on same stock with same maturity, struck ATM. Interest rate is zero. Draw payoff diagrams. Put has limited downside and no upside; call has unlimited upside and no downside. Why doesn't the call cost more? Verify put-call parity and reconcile with seemingly disparate potential payoffs.",
      "tags": [
        "put-call-parity",
        "option-pricing",
        "payoff-diagrams"
      ],
      "type": "multiple_choice",
      "correct_answer": "Put-call parity: C = P + S - X",
      "explanation": "Put-call parity: C = P + S - X. With r=0 and ATM, C=P. Asymmetry is offset by stock ownership component.",
      "estimated_time": 180,
      "options": [
        "Sometimes true, sometimes false",
        "Put-call parity: C = P + S - X",
        "Cannot be determined without additional information",
        "Depends on market conditions"
      ]
    },
    {
      "id": "Q2.5",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Easy",
      "question": "Black-Scholes world without dividends. European call struck ATM with one year to maturity. If interest rate r=0.06, is the option's delta greater or less than 0.5? What does it depend on?",
      "tags": [
        "delta",
        "greeks",
        "ATM-options",
        "interest-rates"
      ],
      "type": "multiple_choice",
      "correct_answer": "Greater than 0",
      "explanation": "Greater than 0.5. Positive interest rate makes forward price exceed spot, shifting probability distribution.",
      "estimated_time": 120,
      "options": [
        "Insufficient information provided",
        "Greater than 0",
        "Less than 0",
        "Never true"
      ]
    },
    {
      "id": "Q2.6",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "Black-Scholes world with continuous dividends. European call struck ATM with one year to maturity. If r=0.06 and dividend rate p=0.03, can you tell whether option's delta is greater or less than 0.5? What does it depend on?",
      "tags": [
        "delta",
        "dividends",
        "continuous-yield"
      ],
      "type": "multiple_choice",
      "correct_answer": "Depends on relative magnitude of r and p",
      "explanation": "Depends on relative magnitude of r and p. If r>p, delta>0.5; if r<p, delta<0.5.",
      "estimated_time": 240,
      "options": [
        "No direct relationship",
        "Depends on relative magnitude of r and p",
        "Cannot be determined without additional information",
        "Always true in all cases"
      ]
    },
    {
      "id": "Q2.7",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Easy",
      "question": "You are long a call option on MITCO stock and have delta-hedged. You hear the CEO of MITCO plunged from the building. What do you do?",
      "tags": [
        "delta-hedging",
        "volatility",
        "market-events",
        "risk-management"
      ],
      "type": "multiple_choice",
      "correct_answer": "Expect high volatility",
      "explanation": "Expect high volatility. Consider buying more calls (long vega position) or adjusting hedge as volatility spikes.",
      "estimated_time": 120,
      "options": [
        "It's impossible to determine",
        "Expect high volatility",
        "Cannot be determined without additional information",
        "None of the above"
      ]
    },
    {
      "id": "Q2.15",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "What is the 'time value' of an option? Draw a graph of time value, C(t) - max[S(t)-X, 0], versus S(t) for a European call. Explain different aspects of the plot.",
      "tags": [
        "time-value",
        "intrinsic-value",
        "option-pricing",
        "graphs"
      ],
      "type": "multiple_choice",
      "correct_answer": "Time value is value above intrinsic value",
      "explanation": "Time value is value above intrinsic value. Graph is hump-shaped, maximizing near ATM.",
      "estimated_time": 180,
      "options": [
        "Always true in all cases",
        "None of the above",
        "Time value is value above intrinsic value",
        "Never true"
      ]
    },
    {
      "id": "Q2.16",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "It's 10 months since you sold a one-year European call. You've been delta-hedging. Option is now well ITM (delta ~0.90). Stock price falls gently over last two months. As price falls, what happens to delta? Are you buying or selling stocks? Describe scenarios.",
      "tags": [
        "delta-hedging",
        "dynamic-hedging",
        "ITM-options"
      ],
      "type": "multiple_choice",
      "correct_answer": "Delta decreases as stock falls",
      "explanation": "Delta decreases as stock falls. Since you're short the call, you're long delta, so you sell stock as delta decreases.",
      "estimated_time": 180,
      "options": [
        "Sometimes true, sometimes false",
        "Delta decreases as stock falls",
        "They are equal",
        "No direct relationship"
      ]
    },
    {
      "id": "Q2.17",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Hard",
      "question": "What do you know about jump processes and jump diffusion processes? Explain when pricing formula for a call option on an asset following a jump process can and cannot be derived using Black-Scholes/Merton no-arbitrage technique.",
      "tags": [
        "jump-diffusion",
        "Merton-model",
        "stochastic-processes",
        "option-pricing"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 300
    },
    {
      "id": "Q2.18",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "For standard European call on non-dividend-paying stock: (1) Draw call price at maturity vs terminal stock price S(T); (2) Draw call price at time t vs futures price F(t,T); (3) Draw call price vs stock price at time t before maturity. Explain relationships.",
      "tags": [
        "option-pricing",
        "payoff-diagrams",
        "futures",
        "time-to-maturity"
      ],
      "type": "multiple_choice",
      "correct_answer": "Graph (1) is hockey stick",
      "explanation": "Graph (1) is hockey stick. Graph (2) is smoothed hockey stick. Graph (3) is smooth S-curve. Time decay and optionality create smoothing.",
      "estimated_time": 120,
      "options": [
        "Graph (1) is hockey stick",
        "Insufficient information provided",
        "None of the above",
        "No direct relationship"
      ]
    },
    {
      "id": "Q2.19",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "Two European calls on same stock, same strike, constant rates. One matures in 1 year, other in 4 years. You put \u03c3=15% into Black-Scholes for 1-year option. What value of \u03c3 for 4-year option? Assume T-t=1 in Black-Scholes in both cases (one unit of time equals 4 years in second case but only 1 year in first).",
      "tags": [
        "volatility",
        "time-scaling",
        "Black-Scholes"
      ],
      "type": "multiple_choice",
      "correct_answer": "Use \u03c3 = 15%/2 = 7",
      "explanation": "Use \u03c3 = 15%/2 = 7.5% because volatility scales with \u221aT.",
      "estimated_time": 120,
      "options": [
        "Use \u03c3 = 15%/2 = 7",
        "Not applicable",
        "Cannot determine",
        "Insufficient information"
      ]
    },
    {
      "id": "Q2.20",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Hard",
      "question": "Black-Scholes assumes geometric Brownian motion: dS(t) = \u03bcS(t)dt + \u03c3S(t)dw(t). Suppose instead stock follows arithmetic Brownian motion: dS(t) = \u03bcdt + \u03c3dw(t). Derive pricing formula for a call option on S(t). Assume ATM option [S(t)=X], riskless rate r=0, and no dividends.",
      "tags": [
        "stochastic-calculus",
        "arithmetic-Brownian-motion",
        "PDE",
        "option-pricing"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 240
    },
    {
      "id": "Q2.27",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "You value a call option using Monte-Carlo simulation. Is it better to simulate the GBM process for the call itself, or the GBM process for the underlying?",
      "tags": [
        "Monte-Carlo",
        "simulation",
        "numerical-methods"
      ],
      "type": "multiple_choice",
      "correct_answer": "Simulate the underlying",
      "explanation": "Simulate the underlying. The call doesn't follow GBM, but the stock does.",
      "estimated_time": 240,
      "options": [
        "Insufficient information provided",
        "None of the above",
        "No direct relationship",
        "Simulate the underlying"
      ]
    },
    {
      "id": "Q2.28",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Easy",
      "question": "You hold long position in mortgage-backed securities. If you expect a bond market rally, would you be better off with positive convexity or negative convexity?",
      "tags": [
        "convexity",
        "MBS",
        "bond-pricing",
        "interest-rate-risk"
      ],
      "type": "multiple_choice",
      "correct_answer": "Positive convexity",
      "explanation": "Positive convexity. MBS have negative convexity due to prepayment risk, which hurts when rates fall.",
      "estimated_time": 120,
      "options": [
        "None of the above",
        "Cannot be determined without additional information",
        "Insufficient information provided",
        "Positive convexity"
      ]
    },
    {
      "id": "Q2.29",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Easy",
      "question": "What is wrong with following strategy for hedging a short call: buy one share if stock price exceeds strike, sell share if stock price falls below strike?",
      "tags": [
        "hedging",
        "strategy-flaws",
        "transaction-costs"
      ],
      "type": "multiple_choice",
      "correct_answer": "Buy high, sell low repeatedly",
      "explanation": "Buy high, sell low repeatedly. Transaction costs kill you. Also, whipsaw risk.",
      "estimated_time": 90,
      "options": [
        "Sometimes true, sometimes false",
        "Buy high, sell low repeatedly",
        "Cannot be determined without additional information",
        "Depends on market conditions"
      ]
    },
    {
      "id": "Q2.30",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "What can you tell me about \u222b\u2080\u1d40 w(t)dt, where w(t) is a standard Brownian motion?",
      "tags": [
        "stochastic-calculus",
        "Brownian-motion",
        "Ito-integral"
      ],
      "type": "multiple_choice",
      "correct_answer": "It's normally distributed with mean 0 and variance T\u00b3/3",
      "explanation": "It's normally distributed with mean 0 and variance T\u00b3/3.",
      "estimated_time": 120,
      "options": [
        "They are equal",
        "It's normally distributed with mean 0 and variance T\u00b3/3",
        "Yes, always possible",
        "None of the above"
      ]
    },
    {
      "id": "Q2.31",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "What can you say about \u222b\u2080\u1d40 w(t)dw(t), where w(t) is a standard Brownian motion?",
      "tags": [
        "stochastic-calculus",
        "Ito-integral",
        "Brownian-motion"
      ],
      "type": "multiple_choice",
      "correct_answer": "By Ito's lemma: \u222b\u2080\u1d40 w(t)dw(t) = [w(T)\u00b2 - T]/2",
      "explanation": "By Ito's lemma: \u222b\u2080\u1d40 w(t)dw(t) = [w(T)\u00b2 - T]/2.",
      "estimated_time": 120,
      "options": [
        "Insufficient information provided",
        "By Ito's lemma: \u222b\u2080\u1d40 w(t)dw(t) = [w(T)\u00b2 - T]/2",
        "Depends on market conditions",
        "None of the above"
      ]
    },
    {
      "id": "Q2.32",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Hard",
      "question": "The payoff to a European 'power call' is given by max(S\u1d43-X, 0). Derive the price of a European power call option using Black-Scholes pricing.",
      "tags": [
        "exotic-options",
        "power-options",
        "Black-Scholes",
        "change-of-numeraire"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 300
    },
    {
      "id": "Q2.33",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "Why do you get a 'smile' effect when you plot implied volatilities of options against their strike prices?",
      "tags": [
        "volatility-smile",
        "implied-volatility",
        "market-imperfections"
      ],
      "type": "multiple_choice",
      "correct_answer": "Market recognizes fat tails in return distribution, crash risk, and that Black-Scholes assumptions don't perfectly hold",
      "explanation": "Market recognizes fat tails in return distribution, crash risk, and that Black-Scholes assumptions don't perfectly hold.",
      "estimated_time": 180,
      "options": [
        "Cannot be determined without additional information",
        "Never true",
        "Insufficient information provided",
        "Market recognizes fat tails in return distribution, crash risk, and that Black-Scholes assumptions don't perfectly hold"
      ]
    },
    {
      "id": "Q2.34",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "Is price of a double-barrier knock-out option (with both up-and-out and down-and-out barriers) just the price of an up-and-out plus price of a down-and-out?",
      "tags": [
        "barrier-options",
        "exotic-options",
        "option-pricing"
      ],
      "type": "multiple_choice",
      "correct_answer": "No",
      "explanation": "No. That would double-count the vanilla option. Price is less than the sum.",
      "estimated_time": 180,
      "options": [
        "Yes, always possible",
        "No",
        "Depends on market conditions",
        "Cannot be determined without additional information"
      ]
    },
    {
      "id": "Q2.35",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Hard",
      "question": "Consider American-style double-barrier 'out-in' call with up barrier above price and down barrier below. Payoff only if: (1) stock falls below down barrier (knocked in), (2) stock doesn't rise above up barrier (not knocked out), and (3) option exercised ITM. This is path-dependent and American-style. Is there an easy valuation technique?",
      "tags": [
        "barrier-options",
        "American-options",
        "path-dependent",
        "exotic-options"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 360
    },
    {
      "id": "Q2.36",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "Gold prices follow a Gaussian process. Current price is $400. Riskless rate is zero. Volatility is \u03c3=$60 per annum. What is value today of digital cash-or-nothing option paying $1 million in six months if gold price is at or above $430?",
      "tags": [
        "digital-options",
        "binary-options",
        "arithmetic-Brownian-motion"
      ],
      "type": "multiple_choice",
      "correct_answer": "Use normal distribution",
      "explanation": "Use normal distribution. P(S\u2265430) = \u03a6((400-430)/(60\u221a0.5)) \u2248 0.24. Value \u2248 $240,000.",
      "estimated_time": 240,
      "options": [
        "Use normal distribution",
        "Never true",
        "No direct relationship",
        "Yes, always possible"
      ]
    },
    {
      "id": "Q2.37",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "Describe the analytical procedure for deriving (using calculus) values of European digital asset-or-nothing and digital cash-or-nothing options.",
      "tags": [
        "digital-options",
        "derivatives",
        "calculus"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 240
    },
    {
      "id": "Q2.38",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Hard",
      "question": "What is the value of a perpetual (potentially infinitely lived) American put option?",
      "tags": [
        "American-options",
        "perpetual-options",
        "optimal-exercise"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 240
    },
    {
      "id": "Q2.39",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "Let 'L' denote three-month US dollar LIBOR rate. Consider an interest rate swap where Party A pays L to Party B, and Party B pays 24% - 2\u00d7L to Party A. Can you reverse engineer this deal and express it in simpler terms?",
      "tags": [
        "swaps",
        "interest-rate-derivatives",
        "structured-products"
      ],
      "type": "multiple_choice",
      "correct_answer": "Party A pays L and receives 24%-2L, net receives 24%-3L",
      "explanation": "Party A pays L and receives 24%-2L, net receives 24%-3L. This is like being long a bond and short 3 LIBOR notes.",
      "estimated_time": 120,
      "options": [
        "Party A pays L and receives 24%-2L, net receives 24%-3L",
        "Not applicable",
        "Cannot determine",
        "Insufficient information"
      ]
    },
    {
      "id": "Q2.40",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Easy",
      "question": "If an option is at-the-money, about how many shares of stock should you hold to hedge the option?",
      "tags": [
        "delta-hedging",
        "ATM-options",
        "risk-management"
      ],
      "type": "multiple_choice",
      "correct_answer": "Approximately 0",
      "explanation": "Approximately 0.5 shares per option (delta \u2248 0.5 for ATM options).",
      "estimated_time": 60,
      "options": [
        "Approximately 0",
        "Not applicable",
        "Cannot determine",
        "Insufficient information"
      ]
    },
    {
      "id": "Q2.41",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "Compare price of an option on a stock if stock price follows mean reversion versus if stock price does not.",
      "tags": [
        "mean-reversion",
        "option-pricing",
        "stochastic-processes"
      ],
      "type": "multiple_choice",
      "correct_answer": "Mean reversion reduces volatility over time, so option prices would be lower",
      "explanation": "Mean reversion reduces volatility over time, so option prices would be lower.",
      "estimated_time": 120,
      "options": [
        "Always true in all cases",
        "Mean reversion reduces volatility over time, so option prices would be lower",
        "Depends on market conditions",
        "Insufficient information provided"
      ]
    },
    {
      "id": "Q2.42",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "When can hedging an options position make you take on more risk?",
      "tags": [
        "hedging",
        "risk-management",
        "model-risk"
      ],
      "type": "multiple_choice",
      "correct_answer": "When model is wrong, when you hedge at wrong frequency, when transaction costs are high, or when you're hedging the wrong risk",
      "explanation": "When model is wrong, when you hedge at wrong frequency, when transaction costs are high, or when you're hedging the wrong risk.",
      "estimated_time": 120,
      "options": [
        "No direct relationship",
        "Always true in all cases",
        "It's impossible to determine",
        "When model is wrong, when you hedge at wrong frequency, when transaction costs are high, or when you're hedging the wrong risk"
      ]
    },
    {
      "id": "Q2.43",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "How do you hedge a written put on a stock if you can neither short any stock nor use options on any stock?",
      "tags": [
        "hedging",
        "constraints",
        "synthetic-positions"
      ],
      "type": "multiple_choice",
      "correct_answer": "Sell stock holdings (if you have them), or buy bonds and gradually reduce as stock price changes",
      "explanation": "Sell stock holdings (if you have them), or buy bonds and gradually reduce as stock price changes.",
      "estimated_time": 240,
      "options": [
        "Insufficient information provided",
        "No direct relationship",
        "Sell stock holdings (if you have them), or buy bonds and gradually reduce as stock price changes",
        "None of the above"
      ]
    },
    {
      "id": "Q2.44",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Easy",
      "question": "You order a pizza for six people. The diameter is 12 inches. What would the diameter have to be to feed eight people? Yes, this is a derivatives question.",
      "tags": [
        "convexity",
        "area-scaling",
        "intuition"
      ],
      "type": "numerical",
      "correct_answer": "Approximately 13",
      "explanation": "Approximately 13.86 inches. Area scales with diameter squared: d\u2082 = d\u2081\u221a(8/6) = 12\u221a(4/3).",
      "estimated_time": 120
    },
    {
      "id": "Q2.45",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Easy",
      "question": "When do you want to be short a put option on IBM stock?",
      "tags": [
        "options",
        "market-views",
        "strategy"
      ],
      "type": "free_response",
      "correct_answer": "When you're bullish on IBM or want to buy IBM stock at a lower price (and collect premium while waiting)",
      "explanation": "When you're bullish on IBM or want to buy IBM stock at a lower price (and collect premium while waiting).",
      "estimated_time": 90
    },
    {
      "id": "Q2.46",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "You own two pieces of land: a huge idle field in Arizona and a tiny popular beach in Florida (with entrance fees). Government offers $1M for Arizona field. Neighbor offers $1M for Florida beach. Other things equal, which has higher forward price?",
      "tags": [
        "forward-pricing",
        "convenience-yield",
        "cost-of-carry"
      ],
      "type": "multiple_choice",
      "correct_answer": "Arizona field has higher forward price",
      "explanation": "Arizona field has higher forward price. Florida beach has convenience yield (income stream), which reduces forward price.",
      "estimated_time": 180,
      "options": [
        "Sometimes true, sometimes false",
        "Arizona field has lower forward price",
        "They are equal",
        "Arizona field has higher forward price"
      ]
    },
    {
      "id": "Q2.47",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Easy",
      "question": "You have 30 days of 'representative' stock price data. How do you calculate historical volatility \u03c3\u00b2 to use in Black-Scholes?",
      "tags": [
        "volatility",
        "historical-data",
        "estimation"
      ],
      "type": "multiple_choice",
      "correct_answer": "Calculate daily log returns, compute sample standard deviation, annualize by multiplying by \u221a252",
      "explanation": "Calculate daily log returns, compute sample standard deviation, annualize by multiplying by \u221a252.",
      "estimated_time": 90,
      "options": [
        "Calculate daily log returns, compute sample standard deviation, annualize by multiplying by \u221a252",
        "Sometimes true, sometimes false",
        "Insufficient information provided",
        "Never true"
      ]
    },
    {
      "id": "Q2.48",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "A 'top issuer' (highest-rated financial institution, reference for swap curve) issues corporate bond for itself valued at 100. The issuer reprices bond using swap curve. What price do they get (100, above 100, or below 100)?",
      "tags": [
        "swap-curve",
        "bond-pricing",
        "credit-spreads"
      ],
      "type": "multiple_choice",
      "correct_answer": "Par (100)",
      "explanation": "Par (100). Top issuer's credit spread defines the swap curve, so repricing gives same value.",
      "estimated_time": 240,
      "options": [
        "Par (100)",
        "Insufficient information provided",
        "Always true in all cases",
        "Never true"
      ]
    },
    {
      "id": "Q2.49",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Easy",
      "question": "Suppose I don't know mathematics. How do you explain why you use riskless rate instead of required return on the stock to derive Black-Scholes formula?",
      "tags": [
        "risk-neutral-pricing",
        "Black-Scholes",
        "intuition"
      ],
      "type": "multiple_choice",
      "correct_answer": "We create a riskless portfolio by hedging",
      "explanation": "We create a riskless portfolio by hedging. Riskless portfolios must earn riskless rate, otherwise arbitrage opportunity exists.",
      "estimated_time": 60,
      "options": [
        "We create a riskless portfolio by hedging",
        "Depends on market conditions",
        "None of the above",
        "Cannot be determined without additional information"
      ]
    },
    {
      "id": "Q2.50",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Easy",
      "question": "Are you better off using implied standard deviation or historical standard deviation to forecast volatility?",
      "tags": [
        "volatility",
        "forecasting",
        "implied-vs-historical"
      ],
      "type": "multiple_choice",
      "correct_answer": "Implied volatility is generally better - it's market's forward-looking consensus and incorporates all available information",
      "explanation": "Implied volatility is generally better - it's market's forward-looking consensus and incorporates all available information.",
      "estimated_time": 90,
      "options": [
        "Never true",
        "Insufficient information provided",
        "Implied volatility is generally better - it's market's forward-looking consensus and incorporates all available information",
        "No direct relationship"
      ]
    },
    {
      "id": "Q2.51",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Easy",
      "question": "According to Black-Scholes, which is more valuable: a European call option that is 10% out-of-the-money, or a European put option that is 10% out-of-the-money?",
      "tags": [
        "Black-Scholes",
        "OTM-options",
        "put-call-parity"
      ],
      "type": "multiple_choice",
      "correct_answer": "Depends on interest rates and dividends",
      "explanation": "Depends on interest rates and dividends. With positive rates and no dividends, OTM call is more valuable.",
      "estimated_time": 60,
      "options": [
        "Always true in all cases",
        "Cannot be determined without additional information",
        "Depends on interest rates and dividends",
        "They are equal"
      ]
    },
    {
      "id": "Q2.52",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Medium",
      "question": "Why are theta and gamma of opposite signs? Are they always of opposite signs?",
      "tags": [
        "greeks",
        "theta",
        "gamma",
        "option-pricing"
      ],
      "type": "multiple_choice",
      "correct_answer": "Time decay (theta) compensates for risk from gamma",
      "explanation": "Time decay (theta) compensates for risk from gamma. For long options, usually theta<0 and gamma>0. Not always opposite signs in all cases.",
      "estimated_time": 180,
      "options": [
        "They are equal",
        "Sometimes true, sometimes false",
        "Time decay (theta) compensates for risk from gamma",
        "No direct relationship"
      ]
    },
    {
      "id": "Q2.53",
      "chapter": 2,
      "category": "Derivatives",
      "difficulty": "Easy",
      "question": "Riskless rate is zero. Stock at $100. One year from now: $130 (prob 0.80) or $70 (prob 0.20). No dividends. What is value of one-year European call with strike $110?",
      "tags": [
        "binomial-model",
        "risk-neutral-pricing",
        "option-valuation"
      ],
      "type": "multiple_choice",
      "correct_answer": "Find risk-neutral probability first",
      "explanation": "Find risk-neutral probability first. Use replication or risk-neutral valuation. Value \u2248 $8.33.",
      "estimated_time": 60,
      "options": [
        "Cannot be determined without additional information",
        "Find risk-neutral probability first",
        "It's impossible to determine",
        "Insufficient information provided"
      ]
    },
    {
      "id": "Q3.1",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Hard",
      "question": "St. Petersburg Game: Player tosses a fair coin until a head appears. If head occurs on kth toss, player gets payoff of $2^k. (1) What is fair value of the game (expected payoff)? (2) A customer wants you to quote bid-ask spread for exactly one play. You have 15 seconds.",
      "tags": [
        "expected-value",
        "utility",
        "paradox"
      ],
      "type": "multiple_choice",
      "correct_answer": "Expected value is infinite, but most people wouldn't pay much to play",
      "explanation": "Expected value is infinite, but most people wouldn't pay much to play. Quote based on risk tolerance and practical considerations.",
      "estimated_time": 360,
      "options": [
        "Never true",
        "Insufficient information provided",
        "Expected value is infinite, but most people wouldn't pay much to play",
        "Sometimes true, sometimes false"
      ]
    },
    {
      "id": "Q3.2",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Easy",
      "question": "If standard deviation of continuously compounded annual stock returns is 10%, what is standard deviation of continuously compounded four-year stock returns?",
      "tags": [
        "volatility",
        "time-scaling",
        "statistics"
      ],
      "type": "numerical",
      "correct_answer": "20%",
      "explanation": "20%. Variance scales linearly with time, so standard deviation scales with \u221atime: 10%\u00d7\u221a4 = 20%.",
      "estimated_time": 120
    },
    {
      "id": "Q3.3",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Easy",
      "question": "From term structure of interest rates: five-year spot rate is 10% per annum and 10-year spot rate is 15% per annum. What is implied forward rate from year 5 to year 10?",
      "tags": [
        "term-structure",
        "forward-rates",
        "fixed-income"
      ],
      "type": "multiple_choice",
      "correct_answer": "Approximately 20% per annum",
      "explanation": "Approximately 20% per annum.",
      "estimated_time": 90,
      "options": [
        "Approximately 20% per annum",
        "Not applicable",
        "Cannot determine",
        "Insufficient information"
      ]
    },
    {
      "id": "Q3.4",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Easy",
      "question": "Explain carefully the difference between the 'yield' on a bond and the 'rate of return' on a bond.",
      "tags": [
        "fixed-income",
        "yield",
        "return"
      ],
      "type": "multiple_choice",
      "correct_answer": "Yield is YTM based on current price",
      "explanation": "Yield is YTM based on current price. Rate of return is actual realized return over holding period, including capital gains.",
      "estimated_time": 60,
      "options": [
        "Yield is YTM based on current price",
        "Sometimes true, sometimes false",
        "Cannot be determined without additional information",
        "It's impossible to determine"
      ]
    },
    {
      "id": "Q3.5",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Medium",
      "question": "What is 'chaos theory'? Can you use it to predict stock returns? If so, how?",
      "tags": [
        "market-theory",
        "chaos-theory",
        "prediction"
      ],
      "type": "multiple_choice",
      "correct_answer": "Chaos theory studies deterministic systems with sensitive dependence on initial conditions",
      "explanation": "Chaos theory studies deterministic systems with sensitive dependence on initial conditions. Not useful for stock prediction - markets are too noisy.",
      "estimated_time": 120,
      "options": [
        "Depends on market conditions",
        "None of the above",
        "Chaos theory studies deterministic systems with sensitive dependence on initial conditions",
        "Insufficient information provided"
      ]
    },
    {
      "id": "Q3.6",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Easy",
      "question": "Draw graph of bond price versus yield-to-maturity. Why is the curve convex?",
      "tags": [
        "fixed-income",
        "convexity",
        "bond-pricing"
      ],
      "type": "multiple_choice",
      "correct_answer": "Curve is downward sloping and convex up",
      "explanation": "Curve is downward sloping and convex up. Convexity arises from nonlinear relationship between price and yield in PV formula.",
      "estimated_time": 60,
      "options": [
        "Curve is downward sloping and convex up",
        "None of the above",
        "Never true",
        "Depends on market conditions"
      ]
    },
    {
      "id": "Q3.7",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Medium",
      "question": "CAPM suggests plot of E(r) vs \u03b2 should be upward sloping line through (0,rf) and [1,E(rm)] - the SML. Suppose plotting average returns vs estimated betas gives something else. Which is most likely: (1) upward sloping curve starting at (0,rf), wholly above theoretical SML, initially steeper then parallel, or (2) upward sloping curve starting at (0,rf), wholly below theoretical SML, initially less steep then parallel? Which CAPM assumptions are violated?",
      "tags": [
        "CAPM",
        "SML",
        "empirical-finance"
      ],
      "type": "multiple_choice",
      "correct_answer": "Scenario (1) more likely",
      "explanation": "Scenario (1) more likely. Violation: discrete trading periods and leverage constraints. Low-beta stocks outperform CAPM prediction.",
      "estimated_time": 180,
      "options": [
        "Scenario (1) less likely",
        "Scenario (1) more likely",
        "Never true",
        "They are equal"
      ]
    },
    {
      "id": "Q3.8",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Easy",
      "question": "From term structure: two-year spot rate is 7.60% per annum, one-year spot rate is 7.15% per annum. What is implied forward rate for second year?",
      "tags": [
        "term-structure",
        "forward-rates",
        "fixed-income"
      ],
      "type": "numerical",
      "correct_answer": "Approximately 8",
      "explanation": "Approximately 8.05% per annum.",
      "estimated_time": 90
    },
    {
      "id": "Q3.9",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Medium",
      "question": "Consider six-month forward contract on 10-year riskless discount (zero-coupon) bond. (1) Is bond selling at forward premium or discount? (2) Does your answer change if bond is riskless coupon bond (assume coupon rate exceeds current risk-free rate)?",
      "tags": [
        "forward-pricing",
        "fixed-income",
        "zero-coupon"
      ],
      "type": "multiple_choice",
      "correct_answer": "(1) Premium (forward price < spot\u00d7(1+r)^T due to bond's positive return)",
      "explanation": "(1) Premium (forward price < spot\u00d7(1+r)^T due to bond's positive return). (2) Still premium, more pronounced with coupons.",
      "estimated_time": 180,
      "options": [
        "They are equal",
        "Sometimes true, sometimes false",
        "(1) Premium (forward price < spot\u00d7(1+r)^T due to bond's positive return)",
        "Depends on market conditions"
      ]
    },
    {
      "id": "Q3.10",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Medium",
      "question": "You believe yield curve will steepen very soon (fall in short-term rates, rise in long-term rates, or combination). What strategy in bond market to profit from your beliefs?",
      "tags": [
        "yield-curve",
        "trading-strategy",
        "fixed-income"
      ],
      "type": "multiple_choice",
      "correct_answer": "Buy short-term bonds (price rises when rates fall) and sell/short long-term bonds (price falls when rates rise)",
      "explanation": "Buy short-term bonds (price rises when rates fall) and sell/short long-term bonds (price falls when rates rise).",
      "estimated_time": 180,
      "options": [
        "Buy short-term bonds (price rises when rates fall) and sell/short long-term bonds (price falls when rates rise)",
        "They are equal",
        "Insufficient information provided",
        "Never true"
      ]
    },
    {
      "id": "Q3.11",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Medium",
      "question": "Define 'duration' and 'convexity.' Describe their properties and uses.",
      "tags": [
        "duration",
        "convexity",
        "fixed-income",
        "risk-management"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 120
    },
    {
      "id": "Q3.12",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Hard",
      "question": "Describe GARCH(1,1) model in qualitative terms. Write down formal GARCH(1,1) model and explain each term carefully.",
      "tags": [
        "volatility",
        "time-series",
        "GARCH",
        "econometrics"
      ],
      "type": "multiple_choice",
      "correct_answer": "\u03c3\u00b2\u209c = \u03c9 + \u03b1(\u03b5\u209c\u208b\u2081)\u00b2 + \u03b2(\u03c3\u00b2\u209c\u208b\u2081)",
      "explanation": "\u03c3\u00b2\u209c = \u03c9 + \u03b1(\u03b5\u209c\u208b\u2081)\u00b2 + \u03b2(\u03c3\u00b2\u209c\u208b\u2081). Volatility clustering model where today's variance depends on yesterday's shock and variance.",
      "estimated_time": 300,
      "options": [
        "Never true",
        "Always true in all cases",
        "\u03c3\u00b2\u209c = \u03c9 + \u03b1(\u03b5\u209c\u208b\u2081)\u00b2 + \u03b2(\u03c3\u00b2\u209c\u208b\u2081)",
        "None of the above"
      ]
    },
    {
      "id": "Q3.13",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Easy",
      "question": "You have long position in $100 million 30-year bond. What can you do to limit your exposure to only $50 million?",
      "tags": [
        "hedging",
        "fixed-income",
        "risk-management"
      ],
      "type": "numerical",
      "correct_answer": "Sell $50 million of the bond, or buy $50 million notional of appropriate bond futures/swaps to hedge half the exposure",
      "explanation": "Sell $50 million of the bond, or buy $50 million notional of appropriate bond futures/swaps to hedge half the exposure.",
      "estimated_time": 120
    },
    {
      "id": "Q3.14",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Hard",
      "question": "You hold 8% coupon, 30-year, $1,000 par Mexican Brady bond. Interest rates in Mexico don't change. US interest rates increase by 1%. What is change in price of your bond? Make any necessary assumptions.",
      "tags": [
        "duration",
        "Brady-bonds",
        "fixed-income",
        "emerging-markets"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 240
    },
    {
      "id": "Q3.15",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Hard",
      "question": "You construct yield curve for coupon-bearing treasuries. A five-year corporate zero has 1% default risk premium over treasuries at five-year mark. You believe yield curve will flatten (short rates rise, long rates fall, five-year yields unchanged) with default premium constant. What strategy using five-year corporate zero and treasuries to profit?",
      "tags": [
        "yield-curve",
        "trading-strategy",
        "credit-spreads",
        "fixed-income"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 360
    },
    {
      "id": "Q3.16",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Medium",
      "question": "If five-year rate is 10% and 10-year rate is 15%, forward rate from year 5 to year 10 is approximately 20%. But it's slightly higher than 20%. Explain, using plain English, why forward rate must be higher than 20% approximate value.",
      "tags": [
        "term-structure",
        "forward-rates",
        "compounding"
      ],
      "type": "multiple_choice",
      "correct_answer": "Compounding effect",
      "explanation": "Compounding effect. You're compounding at 15% for 10 years vs 10% for 5 years. The last 5 years need higher than 20% to make up for compounding.",
      "estimated_time": 180,
      "options": [
        "Compounding effect",
        "Not applicable",
        "Cannot determine",
        "Insufficient information"
      ]
    },
    {
      "id": "Q3.17",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Easy",
      "question": "Simple game: Toss fair coin now. Heads: get $7 in 18 months. Tails: lose $2 immediately. One-year rate is 12% per annum. Two-year rate is 18% per annum. How much are you prepared to pay to play this game?",
      "tags": [
        "expected-value",
        "present-value",
        "time-value"
      ],
      "type": "multiple_choice",
      "correct_answer": "Calculate expected payoff: 0",
      "explanation": "Calculate expected payoff: 0.5\u00d7(PV of $7 in 18 months) - 0.5\u00d7$2. Need to interpolate 18-month rate.",
      "estimated_time": 60,
      "options": [
        "Calculate expected payoff: 0",
        "Not applicable",
        "Cannot determine",
        "Insufficient information"
      ]
    },
    {
      "id": "Q3.18",
      "chapter": 3,
      "category": "Other Financial Economics",
      "difficulty": "Medium",
      "question": "20 traders in room trade 100 stocks for their own accounts, only amongst themselves - closed economy. Midway through morning, SEC announces one trader has inside information on one stock and has been trading on it. Trader not yet identified. SEC sits to watch. What happens to trading volume after announcement? Explain carefully.",
      "tags": [
        "market-microstructure",
        "information",
        "adverse-selection"
      ],
      "type": "multiple_choice",
      "correct_answer": "Trading volume likely decreases",
      "explanation": "Trading volume likely decreases. Adverse selection problem - everyone fears trading with the informed trader.",
      "estimated_time": 120,
      "options": [
        "Insufficient information provided",
        "Depends on market conditions",
        "Cannot be determined without additional information",
        "Trading volume likely decreases"
      ]
    },
    {
      "id": "Q4.1",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Easy",
      "question": "Consider game: Player tosses die once. Payoff is $1 for each dot on upturned face. Assuming fair die, at what level should you set ticket price for this game?",
      "tags": [
        "expected-value",
        "probability",
        "dice"
      ],
      "type": "numerical",
      "correct_answer": "$3",
      "explanation": "$3.50. Expected value = (1+2+3+4+5+6)/6 = 21/6 = 3.50.",
      "estimated_time": 60
    },
    {
      "id": "Q4.2",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Medium",
      "question": "I will roll single die no more than three times. You can stop me after first roll, after second, or wait for third. I pay you in dollars the number of dots on upturned face on my last roll (roll 3 unless you stop sooner). What is your playing strategy?",
      "tags": [
        "optimal-stopping",
        "expected-value",
        "strategy"
      ],
      "type": "free_response",
      "correct_answer": "Stop on first roll if \u22655, stop on second roll if \u22654, otherwise take third roll",
      "explanation": "Stop on first roll if \u22655, stop on second roll if \u22654, otherwise take third roll. Expected payoff \u2248 4.67.",
      "estimated_time": 180
    },
    {
      "id": "Q4.3",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Hard",
      "question": "Two sealed envelopes. One contains m dollars, other contains 2m dollars (m unstated). (1) If you peek and see $X, you don't know if opponent has $2X or $X/2. Without peeking, what is expected benefit to switching? What is opponent's expected benefit? Should you switch? If so, switch again? (2) Suppose you both peek initially. What is payoff to switching? Should you switch? If so, again?",
      "tags": [
        "probability",
        "paradox",
        "decision-theory"
      ],
      "type": "multiple_choice",
      "correct_answer": "Exchange Paradox",
      "explanation": "Exchange Paradox. Careful analysis of probabilities and priors needed. Without peek, no reason to switch.",
      "estimated_time": 240,
      "options": [
        "Sometimes true, sometimes false",
        "They are equal",
        "Always true in all cases",
        "Exchange Paradox"
      ]
    },
    {
      "id": "Q4.4",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Hard",
      "question": "World Series problem: Two football teams play until one has four wins (at most seven games). You wager on overall champion. Bet $100 on Team A (70% chance to win any game) and get back $100+$100 profit if they win. Team B has 30% chance. You may adjust wagers after each game, but winner unknown until one team has four wins. How do you bet to guarantee either win $100 or lose $100?",
      "tags": [
        "probability",
        "martingale",
        "betting-strategy"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 360
    },
    {
      "id": "Q4.5",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Medium",
      "question": "You and I play game: You roll die until number other than one appears. When such number appears first time, I pay you in dollars the number of dots on upturned face. What is expected payoff?",
      "tags": [
        "expected-value",
        "probability",
        "geometric-distribution"
      ],
      "type": "multiple_choice",
      "correct_answer": "Expected payoff = \u03a3(k=2 to 6) k\u00d7P(first non-1 is k) = \u03a3(k=2 to 6) k\u00d7(1/6)/(5/6) = 4",
      "explanation": "Expected payoff = \u03a3(k=2 to 6) k\u00d7P(first non-1 is k) = \u03a3(k=2 to 6) k\u00d7(1/6)/(5/6) = 4.",
      "estimated_time": 180,
      "options": [
        "Never true",
        "Expected payoff = \u03a3(k=2 to 6) k\u00d7P(first non-1 is k) = \u03a3(k=2 to 6) k\u00d7(1/6)/(5/6) = 4",
        "Yes, always possible",
        "They are equal"
      ]
    },
    {
      "id": "Q4.6",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Easy",
      "question": "You are dealt exactly two cards from well-shuffled standard 52-card deck (containing exactly four Kings). What is probability both cards are Kings?",
      "tags": [
        "probability",
        "combinations",
        "cards"
      ],
      "type": "multiple_choice",
      "correct_answer": "C(4,2)/C(52,2) = 6/1326 = 1/221 \u2248 0",
      "explanation": "C(4,2)/C(52,2) = 6/1326 = 1/221 \u2248 0.0045",
      "estimated_time": 90,
      "options": [
        "Never true",
        "Insufficient information provided",
        "Depends on market conditions",
        "C(4,2)/C(52,2) = 6/1326 = 1/221 \u2248 0"
      ]
    },
    {
      "id": "Q4.7",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Medium",
      "question": "Two gamblers bet on coin tosses. Gambler A has n+1 fair coins, B has n fair coins. Both flip all coins. What's the probability A has more heads than B?",
      "tags": [
        "probability",
        "symmetry",
        "combinatorics"
      ],
      "type": "multiple_choice",
      "correct_answer": "Remove one coin from A",
      "explanation": "Remove one coin from A. By symmetry P(A>B) = P(B>A) with n coins each. A's extra coin gives 50% chance of breaking ties. Answer: 1/2",
      "estimated_time": 120,
      "options": [
        "Sometimes true, sometimes false",
        "Always true in all cases",
        "Remove one coin from A",
        "Depends on market conditions"
      ]
    },
    {
      "id": "Q4.8",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Easy",
      "question": "A casino offers a card game with a 52-card deck. You draw a card, dealer draws without replacement. You win if your card is higher (suits don't matter). What's your probability of winning?",
      "tags": [
        "probability",
        "symmetry",
        "cards"
      ],
      "type": "multiple_choice",
      "correct_answer": "By symmetry, P(you win) = P(dealer wins)",
      "explanation": "By symmetry, P(you win) = P(dealer wins). With ties possible, P(you win) = (1 - P(tie))/2 = (1 - 3/51)/2 = 8/17",
      "estimated_time": 120,
      "options": [
        "Always true in all cases",
        "Sometimes true, sometimes false",
        "By symmetry, P(you win) = P(dealer wins)",
        "No direct relationship"
      ]
    },
    {
      "id": "Q4.9",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Medium",
      "question": "100 airline passengers wait to board. Each has a ticket for a specific seat. The drunk first passenger picks a random seat. Others go to their seat unless occupied, then pick randomly. You're passenger 100. What's the probability you get your seat?",
      "tags": [
        "probability",
        "logic",
        "symmetry"
      ],
      "type": "free_response",
      "correct_answer": "Only seats 1 and 100 matter",
      "explanation": "Only seats 1 and 100 matter. By symmetry, either seat 1 or 100 is taken first with equal probability. Answer: 1/2",
      "estimated_time": 240
    },
    {
      "id": "Q4.10",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Medium",
      "question": "N points are drawn randomly on a circle's circumference. What's the probability they all lie within a semicircle?",
      "tags": [
        "probability",
        "geometry",
        "mutual-exclusivity"
      ],
      "type": "multiple_choice",
      "correct_answer": "Start at any point, check if all others fit in clockwise semicircle",
      "explanation": "Start at any point, check if all others fit in clockwise semicircle. These N events are mutually exclusive. Probability = N \u00d7 (1/2)^(N-1) = N/2^(N-1)",
      "estimated_time": 120,
      "options": [
        "None of the above",
        "Start at any point, check if all others fit in clockwise semicircle",
        "Insufficient information provided",
        "Always true in all cases"
      ]
    },
    {
      "id": "Q4.11",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Medium",
      "question": "How many people needed in a room for >50% probability that two share a birthday? (Assume 365 days/year)",
      "tags": [
        "probability",
        "birthday-problem",
        "combinations"
      ],
      "type": "multiple_choice",
      "correct_answer": "Calculate P(all different) = 365\u00d7364\u00d7",
      "explanation": "Calculate P(all different) = 365\u00d7364\u00d7...\u00d7(365-n+1)/365^n. Need this < 0.5. Answer: n = 23",
      "estimated_time": 120,
      "options": [
        "Insufficient information provided",
        "Calculate P(all different) = 365\u00d7364\u00d7",
        "Depends on market conditions",
        "No direct relationship"
      ]
    },
    {
      "id": "Q4.12",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Medium",
      "question": "A company holds a dinner for mothers with at least one son. Ms. Jackson with two children is invited. What's the probability both children are boys?",
      "tags": [
        "conditional-probability",
        "Bayes-theorem"
      ],
      "type": "multiple_choice",
      "correct_answer": "Sample space with at least one boy: {(b,b), (b,g), (g,b)}",
      "explanation": "Sample space with at least one boy: {(b,b), (b,g), (g,b)}. P(both boys | at least one boy) = 1/3",
      "estimated_time": 240,
      "options": [
        "Sample space with at least one boy: {(b,b), (b,g), (g,b)}",
        "No direct relationship",
        "None of the above",
        "It's impossible to determine"
      ]
    },
    {
      "id": "Q4.13",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Easy",
      "question": "What is the standard deviation of (1, 2, 3, 4, 5)?",
      "tags": [
        "statistics",
        "standard-deviation",
        "calculation"
      ],
      "type": "multiple_choice",
      "correct_answer": "Mean = 3",
      "explanation": "Mean = 3. Variance = [(1-3)\u00b2+(2-3)\u00b2+(3-3)\u00b2+(4-3)\u00b2+(5-3)\u00b2]/5 = 10/5 = 2. StdDev = \u221a2 \u2248 1.414.",
      "estimated_time": 90,
      "options": [
        "No direct relationship",
        "None of the above",
        "Mean = 3",
        "Always true in all cases"
      ]
    },
    {
      "id": "Q4.14",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Medium",
      "question": "Russian roulette interview: Revolver with six empty chambers. I load two contiguous rounds (side-by-side bullets). Spin barrel. Put gun to your head. Click! You're alive! I'll shoot once more before discussing resume. Do you want me to spin barrel again, or just shoot?",
      "tags": [
        "probability",
        "conditional-probability",
        "game-theory"
      ],
      "type": "free_response",
      "correct_answer": "Spin again! Not spinning: 1/4 chance of death (only 4 possible positions, 1 is fatal)",
      "explanation": "Spin again! Not spinning: 1/4 chance of death (only 4 possible positions, 1 is fatal). Spinning: 2/6 = 1/3 chance.",
      "estimated_time": 240
    },
    {
      "id": "Q4.15",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Medium",
      "question": "Large jar contains 999 fair pennies and one two-headed penny. Pick one coin, flip it 10 times, get all heads. What is probability the coin you chose is the two-headed one?",
      "tags": [
        "Bayes-theorem",
        "conditional-probability"
      ],
      "type": "multiple_choice",
      "correct_answer": "Use Bayes' theorem",
      "explanation": "Use Bayes' theorem. P(2-headed|10 heads) = P(10 heads|2-headed)\u00d7P(2-headed)/P(10 heads) \u2248 0.506",
      "estimated_time": 240,
      "options": [
        "Use Bayes' theorem",
        "Depends on market conditions",
        "Always true in all cases",
        "No, it's impossible"
      ]
    },
    {
      "id": "Q4.16",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Medium",
      "question": "Four cards shuffled, face down: water, earth, wind, fire. Turn cards over one at a time until you either win or lose. Win if you turn over water and earth. Lose if you turn over fire. What is probability you win?",
      "tags": [
        "probability",
        "conditional-probability",
        "game-theory"
      ],
      "type": "free_response",
      "correct_answer": "1/2",
      "explanation": "1/2. Can enumerate all scenarios or use symmetry argument.",
      "estimated_time": 120
    },
    {
      "id": "Q4.17",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Medium",
      "question": "Two players A and B play marble game. Each has red and blue marble. They present one marble to each other simultaneously (hidden). Various payoff rules. Analyze optimal strategies.",
      "tags": [
        "game-theory",
        "Nash-equilibrium",
        "strategy"
      ],
      "type": "free_response",
      "correct_answer": "Depends on specific payoff structure",
      "explanation": "Depends on specific payoff structure. Look for dominant strategies or mixed strategy Nash equilibria.",
      "estimated_time": 240
    },
    {
      "id": "Q4.18",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Easy",
      "question": "Two bankers arrive randomly between 5:00-6:00 AM (uniform distribution). Each stays exactly 5 minutes. What's the probability they meet?",
      "tags": [
        "probability",
        "continuous-distribution",
        "geometry"
      ],
      "type": "multiple_choice",
      "correct_answer": "Let X, Y be arrival times",
      "explanation": "Let X, Y be arrival times. They meet if |X-Y| \u2264 5. Draw region on 60\u00d760 square. P = (60\u00b2 - 2\u00d7(1/2\u00d755\u00b2))/60\u00b2 = 23/144",
      "estimated_time": 120,
      "options": [
        "It's impossible to determine",
        "Let X, Y be arrival times",
        "Never true",
        "Insufficient information provided"
      ]
    },
    {
      "id": "Q4.19",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Medium",
      "question": "A stick is cut twice randomly. What's the probability the three segments can form a triangle?",
      "tags": [
        "probability",
        "geometry",
        "triangle-inequality"
      ],
      "type": "multiple_choice",
      "correct_answer": "Let cuts be at x and y on [0,1]",
      "explanation": "Let cuts be at x and y on [0,1]. Need all three pieces < 1/2. This forms two triangular regions. P = 1/4",
      "estimated_time": 240,
      "options": [
        "Let cuts be at x and y on [0,1]",
        "None of the above",
        "No direct relationship",
        "Insufficient information provided"
      ]
    },
    {
      "id": "Q4.20",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Medium",
      "question": "You have 100 noodles in soup. Blindfolded, you connect random pairs of ends until no free ends remain. What's the expected number of loops?",
      "tags": [
        "expected-value",
        "recursion",
        "probability"
      ],
      "type": "multiple_choice",
      "correct_answer": "Use recursion: E[f(n)] = 1/(2n-1) + E[f(n-1)]",
      "explanation": "Use recursion: E[f(n)] = 1/(2n-1) + E[f(n-1)]. Answer: E[f(100)] = 1 + 1/3 + 1/5 + ... + 1/199",
      "estimated_time": 240,
      "options": [
        "Use recursion: E[f(n)] = 1/(2n-1) + E[f(n-1)]",
        "No direct relationship",
        "It's impossible to determine",
        "They are equal"
      ]
    },
    {
      "id": "Q4.21",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Medium",
      "question": "Buses arrive at a station according to a Poisson process with average 10-minute intervals (\u03bb=0.1/min). You arrive at random. What's your expected waiting time?",
      "tags": [
        "Poisson-process",
        "exponential-distribution",
        "memoryless"
      ],
      "type": "multiple_choice",
      "correct_answer": "By memoryless property of exponential distribution, expected wait = 1/\u03bb = 10 minutes (same as mean inter-arrival time)",
      "explanation": "By memoryless property of exponential distribution, expected wait = 1/\u03bb = 10 minutes (same as mean inter-arrival time)",
      "estimated_time": 240,
      "options": [
        "Sometimes true, sometimes false",
        "Cannot be determined without additional information",
        "By memoryless property of exponential distribution, expected wait = 1/\u03bb = 10 minutes (same as mean inter-arrival time)",
        "No direct relationship"
      ]
    },
    {
      "id": "Q4.22",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Medium",
      "question": "If X follows standard normal distribution, what is E[X|X>0]?",
      "tags": [
        "statistics",
        "normal-distribution",
        "conditional-expectation"
      ],
      "type": "multiple_choice",
      "correct_answer": "E[X|X>0] = \u222b[0 to \u221e] x\u00b7(1/\u221a(2\u03c0))\u00b7e^(-x\u00b2/2)dx / (1/2) = \u221a(2/\u03c0)",
      "explanation": "E[X|X>0] = \u222b[0 to \u221e] x\u00b7(1/\u221a(2\u03c0))\u00b7e^(-x\u00b2/2)dx / (1/2) = \u221a(2/\u03c0)",
      "estimated_time": 240,
      "options": [
        "Never true",
        "They are equal",
        "E[X|X>0] = \u222b[0 to \u221e] x\u00b7(1/\u221a(2\u03c0))\u00b7e^(-x\u00b2/2)dx / (1/2) = \u221a(2/\u03c0)",
        "Depends on market conditions"
      ]
    },
    {
      "id": "Q4.23",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Medium",
      "question": "If you keep tossing a fair coin, what's the expected number of tosses to get HHH (three heads in a row)?",
      "tags": [
        "expected-value",
        "Markov-chain",
        "patterns"
      ],
      "type": "multiple_choice",
      "correct_answer": "Use Markov chain with states S, H, HH, HHH",
      "explanation": "Use Markov chain with states S, H, HH, HHH. Set up equations for expected time to absorption. E[S] = 14",
      "estimated_time": 180,
      "options": [
        "Always true in all cases",
        "They are equal",
        "Insufficient information provided",
        "Use Markov chain with states S, H, HH, HHH"
      ]
    },
    {
      "id": "Q4.24",
      "chapter": 4,
      "category": "Statistics",
      "difficulty": "Hard",
      "question": "Keep flipping a fair coin until either HHH or THH occurs. What's the probability you get HHH before THH?",
      "tags": [
        "probability",
        "patterns",
        "Markov-chain"
      ],
      "type": "multiple_choice",
      "correct_answer": "Use Markov chain",
      "explanation": "Use Markov chain. Key insight: once a T occurs before HHH, you'll always get THH first (since THH ends with HH). P(HHH first) = 1/8",
      "estimated_time": 240,
      "options": [
        "Use Markov chain",
        "Cannot be determined without additional information",
        "Insufficient information provided",
        "Always true in all cases"
      ]
    },
    {
      "id": "Q5.1",
      "chapter": 5,
      "category": "Stochastic Processes",
      "difficulty": "Hard",
      "question": "Gambler starts with $i. Each game wins $1 with probability p or loses $1 with probability q=1-p. Stops at $N or $0. What's the probability of reaching $N?",
      "tags": [
        "gambler's-ruin",
        "Markov-chain",
        "boundary-conditions"
      ],
      "type": "multiple_choice",
      "correct_answer": "Set up recursion: P_i = p\u00b7P_(i+1) + q\u00b7P_(i-1) with P_0=0, P_N=1",
      "explanation": "Set up recursion: P_i = p\u00b7P_(i+1) + q\u00b7P_(i-1) with P_0=0, P_N=1. If p\u22601/2: P_i = (1-(q/p)^i)/(1-(q/p)^N). If p=1/2: P_i = i/N",
      "estimated_time": 240,
      "options": [
        "No direct relationship",
        "Always true in all cases",
        "It's impossible to determine",
        "Set up recursion: P_i = p\u00b7P_(i+1) + q\u00b7P_(i-1) with P_0=0, P_N=1"
      ]
    },
    {
      "id": "Q5.2",
      "chapter": 5,
      "category": "Stochastic Processes",
      "difficulty": "Medium",
      "question": "A drunk man is at the 17th meter of a 100-meter bridge. He staggers forward or backward 1 meter with 50% probability each. What's the probability he reaches the 100th meter before the 0th?",
      "tags": [
        "random-walk",
        "martingale",
        "symmetric"
      ],
      "type": "multiple_choice",
      "correct_answer": "Set origin at 17th meter",
      "explanation": "Set origin at 17th meter. Need to reach 83 before -17. For symmetric random walk: P(reach a) = \u03b2/(\u03b1+\u03b2) = 17/100 = 0.17",
      "estimated_time": 240,
      "options": [
        "They are equal",
        "It's impossible to determine",
        "Set origin at 17th meter",
        "No direct relationship"
      ]
    },
    {
      "id": "Q5.3",
      "chapter": 5,
      "category": "Stochastic Processes",
      "difficulty": "Hard",
      "question": "If standard Brownian motion B_t starts at 0, what is P(B_1 > 0 and B_2 < 0)?",
      "tags": [
        "Brownian-motion",
        "probability",
        "independence"
      ],
      "type": "multiple_choice",
      "correct_answer": "B_1 ~ N(0,1) and (B_2-B_1) ~ N(0,1) independently",
      "explanation": "B_1 ~ N(0,1) and (B_2-B_1) ~ N(0,1) independently. P = P(B_1>0)\u00b7P(B_2-B_1<-B_1)\u00b7P(|B_2-B_1|>|B_1|) = 1/8",
      "estimated_time": 360,
      "options": [
        "Never true",
        "None of the above",
        "Always true in all cases",
        "B_1 ~ N(0,1) and (B_2-B_1) ~ N(0,1) independently"
      ]
    },
    {
      "id": "Q5.4",
      "chapter": 5,
      "category": "Stochastic Processes",
      "difficulty": "Medium",
      "question": "For Brownian motion W(t), what is E[\u222b[0 to T] W(t)dt]?",
      "tags": [
        "Brownian-motion",
        "stochastic-calculus",
        "Ito-integral"
      ],
      "type": "multiple_choice",
      "correct_answer": "This is normally distributed with mean 0 and variance T\u00b3/3",
      "explanation": "This is normally distributed with mean 0 and variance T\u00b3/3",
      "estimated_time": 120,
      "options": [
        "This is normally distributed with mean 0 and variance T\u00b3/3",
        "Never true",
        "Yes, always possible",
        "They are equal"
      ]
    },
    {
      "id": "Q5.5",
      "chapter": 5,
      "category": "Stochastic Processes",
      "difficulty": "Hard",
      "question": "For Brownian motion, what can you say about \u222b[0 to T] W(t)dW(t)?",
      "tags": [
        "stochastic-calculus",
        "Ito-lemma",
        "Brownian-motion"
      ],
      "type": "multiple_choice",
      "correct_answer": "By Ito's lemma: \u222b[0 to T] W(t)dW(t) = [W(T)\u00b2 - T]/2",
      "explanation": "By Ito's lemma: \u222b[0 to T] W(t)dW(t) = [W(T)\u00b2 - T]/2",
      "estimated_time": 240,
      "options": [
        "Sometimes true, sometimes false",
        "Cannot be determined without additional information",
        "By Ito's lemma: \u222b[0 to T] W(t)dW(t) = [W(T)\u00b2 - T]/2",
        "It's impossible to determine"
      ]
    },
    {
      "id": "Q5.6",
      "chapter": 5,
      "category": "Calculus & Linear Algebra",
      "difficulty": "Medium",
      "question": "What is the derivative of y = ln(x^(10x))?",
      "tags": [
        "calculus",
        "derivatives",
        "logarithms"
      ],
      "type": "multiple_choice",
      "correct_answer": "Use chain rule",
      "explanation": "Use chain rule. y = 10x\u00b7ln(x), so dy/dx = 10(ln(x) + 1)",
      "estimated_time": 180,
      "options": [
        "No direct relationship",
        "They are equal",
        "Use chain rule",
        "None of the above"
      ]
    },
    {
      "id": "Q5.7",
      "chapter": 5,
      "category": "Calculus & Linear Algebra",
      "difficulty": "Easy",
      "question": "Without calculating numerical results, which is larger: e^\u03c0 or \u03c0^e?",
      "tags": [
        "calculus",
        "comparison",
        "optimization"
      ],
      "type": "free_response",
      "correct_answer": "Consider f(x) = ln(x)/x",
      "explanation": "Consider f(x) = ln(x)/x. Show f'(x) < 0 for x > e, so f is decreasing. Since e < \u03c0, we have ln(e)/e > ln(\u03c0)/\u03c0, thus e^\u03c0 > \u03c0^e.",
      "estimated_time": 120
    },
    {
      "id": "Q5.8",
      "chapter": 5,
      "category": "Calculus & Linear Algebra",
      "difficulty": "Medium",
      "question": "What is the integral of ln(x)?",
      "tags": [
        "calculus",
        "integration",
        "integration-by-parts"
      ],
      "type": "multiple_choice",
      "correct_answer": "Use integration by parts with u = ln(x) and dv = dx",
      "explanation": "Use integration by parts with u = ln(x) and dv = dx. Result: \u222bln(x)dx = x\u00b7ln(x) - x + C",
      "estimated_time": 180,
      "options": [
        "None of the above",
        "Use integration by parts with u = ln(x) and dv = dx",
        "Always true in all cases",
        "It's impossible to determine"
      ]
    },
    {
      "id": "Q5.9",
      "chapter": 5,
      "category": "Calculus & Linear Algebra",
      "difficulty": "Hard",
      "question": "Two cylinders each with radius 1 intersect at right angles with their centers intersecting. What is the volume of the intersection?",
      "tags": [
        "calculus",
        "3D-geometry",
        "integration"
      ],
      "type": "multiple_choice",
      "correct_answer": "Use cross-sectional area integration",
      "explanation": "Use cross-sectional area integration. Cut perpendicular to z-axis gives a square. Volume = \u222b[-1 to 1] 4(1-z\u00b2)dz = 16/3",
      "estimated_time": 240,
      "options": [
        "Cannot be determined without additional information",
        "They are equal",
        "Depends on market conditions",
        "Use cross-sectional area integration"
      ]
    },
    {
      "id": "Q5.10",
      "chapter": 5,
      "category": "Calculus & Linear Algebra",
      "difficulty": "Medium",
      "question": "What is i^i (where i is the imaginary unit)?",
      "tags": [
        "complex-analysis",
        "Euler-formula",
        "exponentials"
      ],
      "type": "multiple_choice",
      "correct_answer": "Use Euler's formula: e^(i\u03b8) = cos(\u03b8) + i\u00b7sin(\u03b8)",
      "explanation": "Use Euler's formula: e^(i\u03b8) = cos(\u03b8) + i\u00b7sin(\u03b8). When \u03b8 = \u03c0/2, e^(i\u03c0/2) = i. Therefore ln(i) = i\u03c0/2, and i^i = e^(i\u00b7ln(i)) = e^(-\u03c0/2) \u2248 0.208",
      "estimated_time": 120,
      "options": [
        "No direct relationship",
        "Use Euler's formula: e^(i\u03b8) = cos(\u03b8) + i\u00b7sin(\u03b8)",
        "Depends on market conditions",
        "Cannot be determined without additional information"
      ]
    },
    {
      "id": "Q5.11",
      "chapter": 5,
      "category": "Calculus & Linear Algebra",
      "difficulty": "Medium",
      "question": "If matrix A = [[2,1],[1,2]], what are the eigenvalues and eigenvectors?",
      "tags": [
        "linear-algebra",
        "eigenvalues",
        "eigenvectors"
      ],
      "type": "multiple_choice",
      "correct_answer": "det(A - \u03bbI) = 0 gives (2-\u03bb)\u00b2 - 1 = 0, so \u03bb\u2081 = 3 and \u03bb\u2082 = 1",
      "explanation": "det(A - \u03bbI) = 0 gives (2-\u03bb)\u00b2 - 1 = 0, so \u03bb\u2081 = 3 and \u03bb\u2082 = 1. Eigenvectors: [1,1]\u1d40/\u221a2 for \u03bb=3 and [1,-1]\u1d40/\u221a2 for \u03bb=1",
      "estimated_time": 120,
      "options": [
        "det(A - \u03bbI) = 0 gives (2-\u03bb)\u00b2 - 1 = 0, so \u03bb\u2081 = 3 and \u03bb\u2082 = 1",
        "They are equal",
        "Never true",
        "None of the above"
      ]
    },
    {
      "id": "Q5.12",
      "chapter": 5,
      "category": "Calculus & Linear Algebra",
      "difficulty": "Medium",
      "question": "Three random variables x, y, z have correlations \u03c1(x,y) = 0.8 and \u03c1(x,z) = 0.8. What are the maximum and minimum possible correlations between y and z?",
      "tags": [
        "linear-algebra",
        "correlation",
        "positive-definite"
      ],
      "type": "multiple_choice",
      "correct_answer": "Use positive semidefiniteness of correlation matrix",
      "explanation": "Use positive semidefiniteness of correlation matrix. det(P) = 1 - 2(0.8)\u00b2 + 2(0.8)\u00b2\u03c1(y,z) - \u03c1(y,z)\u00b2 \u2265 0. Solving: 0.28 \u2264 \u03c1(y,z) \u2264 1",
      "estimated_time": 240,
      "options": [
        "Use positive semidefiniteness of correlation matrix",
        "Sometimes true, sometimes false",
        "They are equal",
        "None of the above"
      ]
    },
    {
      "id": "Q7.1",
      "chapter": 7,
      "category": "Programming & Algorithms",
      "difficulty": "Easy",
      "question": "How do you swap two integers i and j without using additional storage space?",
      "tags": [
        "algorithms",
        "bit-manipulation",
        "programming"
      ],
      "type": "multiple_choice",
      "correct_answer": "Method 1: i=i+j; j=i-j; i=i-j",
      "explanation": "Method 1: i=i+j; j=i-j; i=i-j. Method 2: Use XOR: i=i^j; j=i^j; i=i^j",
      "estimated_time": 90,
      "options": [
        "Method 1: i=i+j; j=i-j; i=i-j",
        "No direct relationship",
        "They are equal",
        "None of the above"
      ]
    },
    {
      "id": "Q7.2",
      "chapter": 7,
      "category": "Programming & Algorithms",
      "difficulty": "Easy",
      "question": "Given a sorted array, write code to extract unique elements. For example, [1,1,3,3,3,5,5,5,9,9,9,9] should return [1,3,5,9].",
      "tags": [
        "algorithms",
        "arrays",
        "iteration"
      ],
      "type": "multiple_choice",
      "correct_answer": "Iterate through array",
      "explanation": "Iterate through array. Add element to result if it differs from previous element. Complexity: O(n)",
      "estimated_time": 90,
      "options": [
        "Cannot be determined without additional information",
        "Depends on market conditions",
        "No direct relationship",
        "Iterate through array"
      ]
    },
    {
      "id": "Q7.3",
      "chapter": 7,
      "category": "Programming & Algorithms",
      "difficulty": "Medium",
      "question": "Explain three sorting algorithms (insertion sort, merge sort, quicksort) and analyze their complexity.",
      "tags": [
        "algorithms",
        "sorting",
        "complexity"
      ],
      "type": "multiple_choice",
      "correct_answer": "Insertion: O(n\u00b2) avg and worst",
      "explanation": "Insertion: O(n\u00b2) avg and worst. Merge: O(n log n) all cases. Quicksort: O(n log n) avg, O(n\u00b2) worst. Merge uses divide-and-conquer.",
      "estimated_time": 180,
      "options": [
        "Cannot be determined without additional information",
        "It's impossible to determine",
        "Never true",
        "Insertion: O(n\u00b2) avg and worst"
      ]
    },
    {
      "id": "Q7.4",
      "chapter": 7,
      "category": "Programming & Algorithms",
      "difficulty": "Medium",
      "question": "How do you shuffle a deck of 52 cards so every permutation is equally likely?",
      "tags": [
        "algorithms",
        "randomization",
        "permutation"
      ],
      "type": "multiple_choice",
      "correct_answer": "Knuth shuffle: for i=1 to n, swap card[i] with card[random(i,n)]",
      "explanation": "Knuth shuffle: for i=1 to n, swap card[i] with card[random(i,n)]. Complexity: O(n). Alternatively: assign random numbers and sort.",
      "estimated_time": 240,
      "options": [
        "Knuth shuffle: for i=1 to n, swap card[i] with card[random(i,n)]",
        "They are equal",
        "It's impossible to determine",
        "Sometimes true, sometimes false"
      ]
    },
    {
      "id": "Q7.5",
      "chapter": 7,
      "category": "Programming & Algorithms",
      "difficulty": "Hard",
      "question": "Design an algorithm to find both minimum and maximum of n numbers using no more than 3n/2 comparisons.",
      "tags": [
        "algorithms",
        "optimization",
        "comparison"
      ],
      "type": "free_response",
      "correct_answer": "Pair elements and compare within pairs (n/2)",
      "explanation": "Pair elements and compare within pairs (n/2). Put smaller in group A, larger in group B. Find min of A and max of B (each n/2-1). Total: 3n/2",
      "estimated_time": 360
    },
    {
      "id": "Q7.6",
      "chapter": 7,
      "category": "Programming & Algorithms",
      "difficulty": "Hard",
      "question": "Design an algorithm to find the maximum sum of any contiguous subarray in O(n) time.",
      "tags": [
        "algorithms",
        "dynamic-programming",
        "optimization"
      ],
      "type": "free_response",
      "correct_answer": "Track running sum T and minimum sum Tmin seen so far",
      "explanation": "Track running sum T and minimum sum Tmin seen so far. Update Vmax = max(Vmax, T-Tmin). One pass: O(n)",
      "estimated_time": 240
    },
    {
      "id": "Q7.7",
      "chapter": 7,
      "category": "Programming & Algorithms",
      "difficulty": "Medium",
      "question": "How do you determine if an integer is a power of 2?",
      "tags": [
        "algorithms",
        "bit-manipulation",
        "powers-of-2"
      ],
      "type": "multiple_choice",
      "correct_answer": "Use bitwise AND: x & (x-1) == 0 if and only if x is a power of 2 (x has single bit set)",
      "explanation": "Use bitwise AND: x & (x-1) == 0 if and only if x is a power of 2 (x has single bit set)",
      "estimated_time": 180,
      "options": [
        "Depends on market conditions",
        "Insufficient information provided",
        "Use bitwise AND: x & (x-1) == 0 if and only if x is a power of 2 (x has single bit set)",
        "No direct relationship"
      ]
    },
    {
      "id": "Q7.8",
      "chapter": 7,
      "category": "Programming & Algorithms",
      "difficulty": "Medium",
      "question": "You have 1000 bottles of wine; one is poisoned. You have 10 lab mice. Poison kills in exactly 18 hours. Can you find the poisoned bottle in 20 hours?",
      "tags": [
        "algorithms",
        "binary",
        "bit-manipulation"
      ],
      "type": "multiple_choice",
      "correct_answer": "Use binary encoding",
      "explanation": "Use binary encoding. Label bottles 0-999 in binary (10 bits). Mouse i drinks from all bottles with bit i set. Dead mice pattern identifies the bottle.",
      "estimated_time": 240,
      "options": [
        "Use binary encoding",
        "Sometimes true, sometimes false",
        "No direct relationship",
        "They are equal"
      ]
    },
    {
      "id": "Q7.9",
      "chapter": 7,
      "category": "Programming & Algorithms",
      "difficulty": "Hard",
      "question": "Explain Monte Carlo simulation for option pricing. How do you estimate delta and gamma without a closed-form formula?",
      "tags": [
        "numerical-methods",
        "Monte-Carlo",
        "derivatives"
      ],
      "type": "multiple_choice",
      "correct_answer": "Simulate many paths under risk-neutral measure",
      "explanation": "Simulate many paths under risk-neutral measure. For delta/gamma: perturb spot by \u03b4S, run simulations for S-\u03b4S, S, S+\u03b4S. Delta \u2248 (f(S+\u03b4S)-f(S-\u03b4S))/(2\u03b4S), Gamma \u2248 ((f(S+\u03b4S)-f(S))-(f(S)-f(S-\u03b4S)))/(\u03b4S)\u00b2",
      "estimated_time": 300,
      "options": [
        "Simulate many paths under risk-neutral measure",
        "Depends on market conditions",
        "It's impossible to determine",
        "Always true in all cases"
      ]
    },
    {
      "id": "Q7.10",
      "chapter": 7,
      "category": "Programming & Algorithms",
      "difficulty": "Hard",
      "question": "Explain variance reduction techniques for Monte Carlo simulation.",
      "tags": [
        "numerical-methods",
        "Monte-Carlo",
        "optimization"
      ],
      "type": "free_response",
      "correct_answer": "Antithetic variables (use -\u03b5 after \u03b5), moment matching (rescale to match moments), control variates (use known similar derivative), importance sampling (change measure)",
      "explanation": "Antithetic variables (use -\u03b5 after \u03b5), moment matching (rescale to match moments), control variates (use known similar derivative), importance sampling (change measure)",
      "estimated_time": 360
    },
    {
      "id": "Q6.1",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Easy",
      "question": "Tell me about yourself.",
      "tags": [
        "behavioral",
        "introduction",
        "self-presentation"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 120
    },
    {
      "id": "Q6.2",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Easy",
      "question": "Walk me through your resume.",
      "tags": [
        "behavioral",
        "career-history",
        "communication"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 60
    },
    {
      "id": "Q6.3",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Easy",
      "question": "What is your greatest strength?",
      "tags": [
        "behavioral",
        "strengths",
        "self-assessment"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 90
    },
    {
      "id": "Q6.4",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Easy",
      "question": "What is your greatest weakness?",
      "tags": [
        "behavioral",
        "weaknesses",
        "self-awareness"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 90
    },
    {
      "id": "Q6.5",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Easy",
      "question": "Why do you want to work for us?",
      "tags": [
        "behavioral",
        "motivation",
        "firm-specific"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 120
    },
    {
      "id": "Q6.6",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Medium",
      "question": "What do you think of our tombstone in today's Wall Street Journal?",
      "tags": [
        "market-awareness",
        "current-events",
        "firm-specific"
      ],
      "type": "multiple_choice",
      "correct_answer": "Know what a tombstone is (announcement of completed deal)",
      "explanation": "Know what a tombstone is (announcement of completed deal). Research the firm's recent deals before interview.",
      "estimated_time": 240,
      "options": [
        "It's impossible to determine",
        "Never true",
        "Know what a tombstone is (announcement of completed deal)",
        "Yes, always possible"
      ]
    },
    {
      "id": "Q6.7",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Easy",
      "question": "Why do you want to work as a trader?",
      "tags": [
        "behavioral",
        "career-goals",
        "role-specific"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 120
    },
    {
      "id": "Q6.8",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Easy",
      "question": "What do you think an investment banker does?",
      "tags": [
        "industry-knowledge",
        "role-understanding"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 60
    },
    {
      "id": "Q6.9",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Easy",
      "question": "Where is the DOW/S&P500/NIKKEI/FTSE/Hang Seng? How does it compare to last two years? Where do you see it in two weeks/six months?",
      "tags": [
        "market-awareness",
        "indices",
        "forecasting"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 120
    },
    {
      "id": "Q6.10",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Easy",
      "question": "What is LIBOR, and what is today's LIBOR rate?",
      "tags": [
        "market-awareness",
        "interest-rates",
        "definitions"
      ],
      "type": "multiple_choice",
      "correct_answer": "London InterBank Offer Rate - benchmark rate at which banks lend to each other",
      "explanation": "London InterBank Offer Rate - benchmark rate at which banks lend to each other. Know current 3-month and 6-month rates.",
      "estimated_time": 120,
      "options": [
        "Never true",
        "London InterBank Offer Rate - benchmark rate at which banks lend to each other",
        "Depends on market conditions",
        "Always true in all cases"
      ]
    },
    {
      "id": "Q6.11",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Medium",
      "question": "When inflationary fears arise, government has two forms of macroeconomic policy to slow economy. Name these and explain in a few words.",
      "tags": [
        "economics",
        "policy",
        "inflation"
      ],
      "type": "multiple_choice",
      "correct_answer": "Monetary policy (central bank raises interest rates) and Fiscal policy (government reduces spending or raises taxes)",
      "explanation": "Monetary policy (central bank raises interest rates) and Fiscal policy (government reduces spending or raises taxes).",
      "estimated_time": 240,
      "options": [
        "No direct relationship",
        "Monetary policy (central bank raises interest rates) and Fiscal policy (government reduces spending or raises taxes)",
        "They are equal",
        "Never true"
      ]
    },
    {
      "id": "Q6.12",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Medium",
      "question": "What stock do you recommend and why?",
      "tags": [
        "stock-analysis",
        "investment-thesis",
        "research"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 120
    },
    {
      "id": "Q6.13",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Easy",
      "question": "What are the 'Dow Jones Dogs'?",
      "tags": [
        "investment-strategy",
        "market-knowledge"
      ],
      "type": "multiple_choice",
      "correct_answer": "Strategy of buying 10 highest dividend-yielding stocks in Dow Jones Industrial Average, rebalancing annually",
      "explanation": "Strategy of buying 10 highest dividend-yielding stocks in Dow Jones Industrial Average, rebalancing annually.",
      "estimated_time": 120,
      "options": [
        "Insufficient information provided",
        "Never true",
        "They are equal",
        "Strategy of buying 10 highest dividend-yielding stocks in Dow Jones Industrial Average, rebalancing annually"
      ]
    },
    {
      "id": "Q6.14",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Medium",
      "question": "How would you value a company? (Very popular question)",
      "tags": [
        "valuation",
        "DCF",
        "multiples",
        "financial-analysis"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 120
    },
    {
      "id": "Q6.15",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Medium",
      "question": "Describe the CAPM.",
      "tags": [
        "asset-pricing",
        "theory",
        "risk-return"
      ],
      "type": "free_response",
      "correct_answer": "Answer not provided",
      "explanation": "Explanation to be added.",
      "estimated_time": 180
    },
    {
      "id": "Q6.16",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Medium",
      "question": "When are motor vehicles owned by company not recorded on balance sheet as PPE (physical plant and equipment)?",
      "tags": [
        "accounting",
        "balance-sheet",
        "leases"
      ],
      "type": "multiple_choice",
      "correct_answer": "When leased under operating lease (vs capital/finance lease)",
      "explanation": "When leased under operating lease (vs capital/finance lease). Under new accounting standards (IFRS 16/ASC 842), most leases now on balance sheet.",
      "estimated_time": 180,
      "options": [
        "When leased under operating lease (vs capital/finance lease)",
        "Cannot be determined without additional information",
        "Sometimes true, sometimes false",
        "They are equal"
      ]
    },
    {
      "id": "Q6.17",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Medium",
      "question": "In calculation of free cash flow (FCF), does the level of long-term debt matter?",
      "tags": [
        "valuation",
        "cash-flow",
        "financial-analysis"
      ],
      "type": "multiple_choice",
      "correct_answer": "No",
      "explanation": "No. FCF is cash available to all capital providers (debt and equity) before financing decisions. Debt level doesn't affect FCF calculation.",
      "estimated_time": 120,
      "options": [
        "No",
        "None of the above",
        "Depends on market conditions",
        "Yes, always possible"
      ]
    },
    {
      "id": "Q6.18",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Medium",
      "question": "How many McDonald's fast food outlets are there in the US?",
      "tags": [
        "estimation",
        "fermi-problem",
        "reasoning"
      ],
      "type": "free_response",
      "correct_answer": "~14,000",
      "explanation": "~14,000. Show your reasoning: US population, frequency of visits, coverage patterns, etc.",
      "estimated_time": 120
    },
    {
      "id": "Q6.19",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Medium",
      "question": "You're in jail cell alone, stripped of possessions. It's Friday afternoon, and you desperately need a cigarette. How do you force the guard to give you one?",
      "tags": [
        "creative-thinking",
        "problem-solving",
        "lateral-thinking"
      ],
      "type": "free_response",
      "correct_answer": "Hold your breath until you turn blue/pass out",
      "explanation": "Hold your breath until you turn blue/pass out. Guard legally obligated to get medical help. In hospital, can request cigarette or have opportunity to escape.",
      "estimated_time": 240
    },
    {
      "id": "Q6.20",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Easy",
      "question": "I toss a coin 100 times and get 100 heads in a row. What is probability that next outcome will be a head?",
      "tags": [
        "probability",
        "independence",
        "gambler's-fallacy"
      ],
      "type": "numerical",
      "correct_answer": "50% (assuming fair coin)",
      "explanation": "50% (assuming fair coin). Coin tosses are independent. However, you should strongly suspect the coin is biased!",
      "estimated_time": 90
    },
    {
      "id": "Q6.21",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Medium",
      "question": "Explain why aeroplanes can fly.",
      "tags": [
        "physics",
        "explanation",
        "concepts"
      ],
      "type": "multiple_choice",
      "correct_answer": "Bernoulli's principle (airfoil shape creates pressure differential) combined with Newton's third law (deflection of air creates reaction force)",
      "explanation": "Bernoulli's principle (airfoil shape creates pressure differential) combined with Newton's third law (deflection of air creates reaction force).",
      "estimated_time": 120,
      "options": [
        "Insufficient information provided",
        "Bernoulli's principle (airfoil shape creates pressure differential) combined with Newton's third law (deflection of air creates reaction force)",
        "Yes, always possible",
        "Depends on market conditions"
      ]
    },
    {
      "id": "Q6.22",
      "chapter": 6,
      "category": "Non-Quantitative",
      "difficulty": "Easy",
      "question": "Why are manhole covers round?",
      "tags": [
        "logic",
        "design",
        "lateral-thinking"
      ],
      "type": "free_response",
      "correct_answer": "Can't fall through the hole (no diagonal smaller than diameter)",
      "explanation": "Can't fall through the hole (no diagonal smaller than diameter). Also: rolls easily, no need to align when replacing, no corners to wear.",
      "estimated_time": 90
    }
  ]
};


// Utility Functions
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getDifficultyColor = (difficulty) => {
  switch(difficulty) {
    case 'Easy': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'Medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'Hard': return 'bg-red-500/10 text-red-400 border-red-500/20';
    default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
};

const getCategoryIcon = (category) => {
  const iconMap = {
    'Purely Quantitative & Logic': '⚡',
    'Derivatives': '📊',
    'Statistics': '📈',
    'Other Financial Economics': '💰',
    'Calculus & Linear Algebra': '∑',
    'Stochastic Processes': '🎲',
    'Programming & Algorithms': '⚙️',
    'Non-Quantitative': '💡'
  };
  return iconMap[category] || '🔹';
};

// OpenAI Answer Evaluator
// OpenAI Answer Evaluator - UPDATED VERSION
// OpenAI Answer Evaluator - UPDATED FOR LANGUAGE ANSWERS
const evaluateAnswer = async (userAnswer, correctAnswer, question) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { 
            role: "system",
            content: "You are an expert evaluator for quantitative finance interview questions. You must respond ONLY with valid JSON, no other text. Be VERY GENEROUS when evaluating natural language answers - focus on whether the student understands the core concept, not whether they use the exact same words as the expected answer."
          },
          { 
            role: "user", 
            content: `Evaluate if a student's answer demonstrates understanding of the concept, even if worded completely differently from the expected answer.

Question: ${question}

Expected Answer: ${correctAnswer}

Student's Answer: ${userAnswer}

CRITICAL EVALUATION CRITERIA FOR NATURAL LANGUAGE ANSWERS:

1. **Focus on CONCEPTUAL UNDERSTANDING, not exact wording**
   - Does the student demonstrate they understand the core concept?
   - Do they capture the essential idea, even in their own words?

2. **Mathematical equivalence**
   - "50%" = "0.5" = "1/2" = "half" = "one out of two" = "equal probability"
   
3. **Accept all valid phrasings**
   - "You should go first" = "I would choose to go first" = "Going first is optimal"
   - "The answer is X" = "X is the solution" = "You get X" = "The result is X"

4. **Accept partial but correct explanations**
   - If student explains the key idea but skips some details, still mark CORRECT
   - Only mark incorrect if they fundamentally misunderstand the concept

5. **Accept different valid approaches**
   - Multiple solution methods may exist
   - Different strategies can be equally valid
   - Theoretical vs practical approaches both valid

6. **Ignore minor issues**
   - Typos, grammar, spelling
   - Formatting differences
   - Extra or missing punctuation
   - Different level of detail

7. **Accept shortened or expanded answers**
   - Concise answers that capture the essence = CORRECT
   - Detailed explanations with extra context = CORRECT
   - As long as core concept is right, length doesn't matter

8. **For strategy/explanation questions**
   - Accept any logically sound strategy, even if different from expected
   - Accept high-level overview or step-by-step details equally
   - Focus on: "Would this work?" not "Is this exactly what we expected?"

9. **For "why" questions**
   - Accept any correct reasoning, even if explanation path differs
   - Multiple valid explanations often exist
   - Accept intuitive explanations vs technical explanations equally

EXAMPLES OF WHAT TO ACCEPT:

Question: "Why are manhole covers round?"
Expected: "Can't fall through the hole (no diagonal smaller than diameter)"
Student says: "Because a circle has no corners so it can't fall in" → CORRECT ✓
Student says: "Round shape prevents it from falling through" → CORRECT ✓
Student says: "The diameter is always the same" → CORRECT ✓
Student says: "They're easier to roll" → PARTIALLY CORRECT (mention as additional benefit)

Question: "What is your strategy to win?"
Expected: "Go first, place in center, use symmetry"
Student says: "I would start first and put my piece in the middle, then mirror opponent" → CORRECT ✓
Student says: "First player advantage with center control and symmetric responses" → CORRECT ✓
Student says: "Mirror strategy from center" → CORRECT ✓

BE EXTREMELY GENEROUS. If the student shows they understand the concept, mark as CORRECT even if they:
- Use different words
- Give more or less detail
- Approach from a different angle
- Use informal language
- Make minor errors in phrasing

Only mark INCORRECT if they fundamentally misunderstand the concept or give a logically wrong answer.

Respond with ONLY a JSON object in this EXACT format:
{
  "isCorrect": true or false,
  "confidence": number between 0 and 1,
  "feedback": "Brief explanation focusing on whether they understood the concept, not whether they matched the exact wording",
  "keyPointsCovered": ["list", "of", "key", "concepts", "the", "student", "understood"],
  "missingPoints": ["optional", "additional", "insights", "they", "could", "mention"]
}`
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1500,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const evaluation = JSON.parse(data.choices[0].message.content);
    return evaluation;
  } catch (error) {
    console.error("Error evaluating answer:", error);
    const isMatch = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    return {
      isCorrect: isMatch,
      confidence: isMatch ? 1.0 : 0.0,
      feedback: isMatch 
        ? "Exact match with expected answer." 
        : "Could not evaluate with AI. Please check your answer manually.",
      keyPointsCovered: [],
      missingPoints: [],
      error: true
    };
  }
};

export default function QuantPrepApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userProgress, setUserProgress] = useState({
    totalSolved: 0,
    accuracy: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalStudyTime: 0,
    categoryProgress: {}
  });

  useEffect(() => {
    const categories = [...new Set(QUESTIONS_DB.questions.map(q => q.category))];
    const initialProgress = {};
    categories.forEach(cat => {
      const categoryQuestions = QUESTIONS_DB.questions.filter(q => q.category === cat);
      initialProgress[cat] = {
        solved: 0,
        total: categoryQuestions.length,
        accuracy: 0,
        avgTime: 0
      };
    });
    setUserProgress(prev => ({ ...prev, categoryProgress: initialProgress }));
  }, []);

  const Sidebar = () => (
    <div className={`fixed left-0 top-0 h-full bg-black border-r border-white/10 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden z-50`}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white to-gray-400 flex items-center justify-center">
              <Brain className="w-6 h-6 text-black" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-black" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">QuantPrep</h1>
            <p className="text-xs text-gray-500">Master Quant Interviews</p>
          </div>
        </div>
        
        <nav className="mt-8 space-y-1">
          {[
            { id: 'dashboard', icon: Target, label: 'Dashboard' },
            { id: 'practice', icon: Play, label: 'Practice' },
            { id: 'topics', icon: BookOpen, label: 'Topics' },
            { id: 'analytics', icon: BarChart3, label: 'Analytics' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                currentPage === item.id
                  ? 'bg-white text-black shadow-lg shadow-white/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 px-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-400 flex items-center justify-center text-black font-bold">
              Q
            </div>
            <div>
              <p className="font-medium text-sm text-white">Aspiring Quant</p>
              <p className="text-xs text-gray-500">Student</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => {
    const stats = [
      { label: 'Questions Solved', value: userProgress.totalSolved, icon: Target, gradient: 'from-emerald-400 to-emerald-600' },
      { label: 'Accuracy Rate', value: `${userProgress.accuracy}%`, icon: TrendingUp, gradient: 'from-blue-400 to-blue-600' },
      { label: 'Current Streak', value: `${userProgress.currentStreak} days`, icon: Flame, gradient: 'from-orange-400 to-orange-600' },
      { label: 'Study Time', value: formatTime(userProgress.totalStudyTime), icon: Clock, gradient: 'from-purple-400 to-purple-600' }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white">Welcome back 👋</h2>
          <p className="text-gray-400 mt-1">Ready to master quant interviews?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all group">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-6 h-6 text-orange-400" />
                <h3 className="text-xl font-bold text-white">Daily Streak</h3>
              </div>
              <p className="text-gray-400">Keep the momentum going!</p>
              <div className="mt-4 flex items-center gap-4">
                <div>
                  <div className="text-3xl font-bold text-orange-400">{userProgress.currentStreak}</div>
                  <div className="text-sm text-gray-500">Current</div>
                </div>
                <div className="h-12 w-px bg-white/10" />
                <div>
                  <div className="text-3xl font-bold text-white">{userProgress.longestStreak}</div>
                  <div className="text-sm text-gray-500">Longest</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">Quick Practice</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Easy', 'Medium', 'Hard'].map(difficulty => (
              <button
                key={difficulty}
                onClick={() => setCurrentPage('practice')}
                className={`p-6 rounded-xl border-2 transition-all hover:scale-105 group ${
                  difficulty === 'Easy' ? 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40 hover:bg-emerald-500/10' :
                  difficulty === 'Medium' ? 'border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40 hover:bg-amber-500/10' :
                  'border-red-500/20 bg-red-500/5 hover:border-red-500/40 hover:bg-red-500/10'
                }`}
              >
                <div className="text-lg font-bold text-white mb-2">{difficulty} Questions</div>
                <div className="text-sm text-gray-400 mb-4">
                  {QUESTIONS_DB.questions.filter(q => q.difficulty === difficulty).length} questions available
                </div>
                <div className="flex items-center justify-center gap-2 text-white font-medium group-hover:gap-3 transition-all">
                  Start Practice <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const Practice = () => {
    const [sessionStarted, setSessionStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [timeSpent, setTimeSpent] = useState(0);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [showDifficultySelection, setShowDifficultySelection] = useState(false);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [aiEvaluation, setAiEvaluation] = useState(null);

    useEffect(() => {
      let interval;
      if (sessionStarted && !showFeedback) {
        interval = setInterval(() => {
          setTimeSpent(prev => prev + 1);
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [sessionStarted, showFeedback]);

    const selectDifficulty = (difficulty) => {
      setSelectedDifficulty(difficulty);
      setShowDifficultySelection(false);
    };

    const startSession = () => {
      let questions = [...QUESTIONS_DB.questions];
      
      if (selectedDifficulty) {
        questions = questions.filter(q => q.difficulty === selectedDifficulty);
      }
      
      if (questions.length === 0) {
        alert('No questions available for this difficulty level.');
        return;
      }
      
      const numQuestions = Math.min(10, questions.length);
      const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, numQuestions);
      
      setSessionQuestions(shuffled);
      setSessionStarted(true);
      setCurrentQuestionIndex(0);
      setScore(0);
      setTimeSpent(0);
    };

    const generateVoiceExplanation = async (explanation, isCorrect) => {
      try {
        setIsPlayingAudio(true);
        
        const voiceText = isCorrect 
          ? `Great job! That's correct. ${explanation}`
          : `Not quite right. Let me explain. ${explanation}`;
        
        const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || ''
          },
          body: JSON.stringify({
            text: voiceText,
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75
            }
          })
        });

        if (!response.ok) {
          throw new Error('Failed to generate audio');
        }

        const audioBlob = await response.blob();
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        const audio = new Audio(url);
        audio.onended = () => {
          setIsPlayingAudio(false);
        };
        audio.play();
        
      } catch (error) {
        console.error('Error generating voice explanation:', error);
        setIsPlayingAudio(false);
        alert('Voice assistant is currently unavailable. Please check your API key.');
      }
    };

    const submitAnswer = async () => {
      const currentQ = sessionQuestions[currentQuestionIndex];
      
      if (currentQ.type === 'multiple_choice') {
        const correct = selectedAnswer.toLowerCase().trim() === currentQ.correct_answer.toLowerCase().trim();
        setIsCorrect(correct);
        setShowFeedback(true);
        if (correct) setScore(score + 1);
      } else {
        // Use AI evaluation for free response questions
        setIsEvaluating(true);
        const evaluation = await evaluateAnswer(selectedAnswer, currentQ.correct_answer, currentQ.question);
        setAiEvaluation(evaluation);
        setIsCorrect(evaluation.isCorrect);
        setShowFeedback(true);
        if (evaluation.isCorrect) setScore(score + 1);
        setIsEvaluating(false);
      }
    };

    const nextQuestion = () => {
      if (currentQuestionIndex < sessionQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
        setShowFeedback(false);
        setIsCorrect(false);
        setAudioUrl(null);
        setAiEvaluation(null);
      } else {
        setSessionStarted(false);
        setShowDifficultySelection(false);
        setUserProgress(prev => ({
          ...prev,
          totalSolved: prev.totalSolved + sessionQuestions.length,
          accuracy: Math.round(((prev.totalSolved * prev.accuracy + score * 100) / (prev.totalSolved + sessionQuestions.length))),
          totalStudyTime: prev.totalStudyTime + timeSpent
        }));
      }
    };

    // Initial state - show when first arriving at Practice or after completing a session
    if (!sessionStarted && !showDifficultySelection) {
      return (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Practice Session</h2>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  <div className="font-medium text-white">AI-Powered Answer Evaluation</div>
                </div>
                <div className="text-sm text-gray-400">
                  Our intelligent system evaluates your free-text answers, understanding different phrasings and mathematical equivalents!
                </div>
              </div>
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="font-medium text-white mb-1">📝 10 Questions per Session</div>
                <div className="text-sm text-gray-400">Randomly selected from your chosen difficulty</div>
              </div>
              <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <div className="font-medium text-white mb-1">🎙️ AI Voice Assistant</div>
                <div className="text-sm text-gray-400">Get spoken explanations for each answer</div>
              </div>
              <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="font-medium text-white mb-1">⏱️ Track Your Time</div>
                <div className="text-sm text-gray-400">Build speed and confidence with timed practice</div>
              </div>
            </div>

            <button
              onClick={() => setShowDifficultySelection(true)}
              className="w-full bg-white text-black py-4 rounded-lg font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Start Practice Session
            </button>
          </div>
        </div>
      );
    }

    // Difficulty Selection Screen
    if (!sessionStarted && showDifficultySelection) {
      return (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Choose Practice Difficulty</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <button
                onClick={() => selectDifficulty(null)}
                className={`p-6 rounded-lg border-2 transition-all group ${
                  selectedDifficulty === null
                    ? 'border-white bg-white/10'
                    : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                }`}
              >
                <div className="text-lg font-bold text-white mb-2">Mixed</div>
                <div className="text-sm text-gray-400 mb-2">All difficulties</div>
                <div className="text-xs text-gray-500">
                  {Math.min(10, QUESTIONS_DB.questions.length)} questions
                </div>
              </button>
              
              {['Easy', 'Medium', 'Hard'].map(difficulty => {
                const count = QUESTIONS_DB.questions.filter(q => q.difficulty === difficulty).length;
                const sessionSize = Math.min(10, count);
                return (
                  <button
                    key={difficulty}
                    onClick={() => selectDifficulty(difficulty)}
                    className={`p-6 rounded-lg border-2 transition-all group ${
                      selectedDifficulty === difficulty
                        ? difficulty === 'Easy' ? 'border-emerald-500 bg-emerald-500/10' :
                          difficulty === 'Medium' ? 'border-amber-500 bg-amber-500/10' :
                          'border-red-500 bg-red-500/10'
                        : difficulty === 'Easy' ? 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40 hover:bg-emerald-500/10' :
                          difficulty === 'Medium' ? 'border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40 hover:bg-amber-500/10' :
                          'border-red-500/20 bg-red-500/5 hover:border-red-500/40 hover:bg-red-500/10'
                    }`}
                  >
                    <div className="text-lg font-bold text-white mb-2">{difficulty}</div>
                    <div className="text-sm text-gray-400 mb-2">
                      {difficulty} questions only
                    </div>
                    <div className="text-xs text-gray-500">
                      {sessionSize} questions from {count} available
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  <div className="font-medium text-white">AI-Powered Answer Evaluation</div>
                </div>
                <div className="text-sm text-gray-400">
                  Our intelligent system evaluates your free-text answers, understanding different phrasings and mathematical equivalents!
                </div>
              </div>
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="font-medium text-white mb-1">📝 10 Questions per Session</div>
                <div className="text-sm text-gray-400">Randomly selected from your chosen difficulty</div>
              </div>
              <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <div className="font-medium text-white mb-1">🎙️ AI Voice Assistant</div>
                <div className="text-sm text-gray-400">Get spoken explanations for each answer</div>
              </div>
              <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="font-medium text-white mb-1">⏱️ Track Your Time</div>
                <div className="text-sm text-gray-400">Build speed and confidence with timed practice</div>
              </div>
            </div>

            <button
              onClick={startSession}
              disabled={selectedDifficulty === undefined}
              className="w-full bg-white text-black py-4 rounded-lg font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 disabled:bg-white/20 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              <Play className="w-5 h-5" />
              Begin Practice Session
            </button>
          </div>
        </div>
      );
    }

    // Question Display
    if (sessionStarted) {
      const currentQuestion = sessionQuestions[currentQuestionIndex];

      return (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-400">
                  Question {currentQuestionIndex + 1} of {sessionQuestions.length}
                </div>
                {selectedDifficulty && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(selectedDifficulty)}`}>
                    {selectedDifficulty} Mode
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium text-white">
                  Score: {score}/{currentQuestionIndex + (showFeedback ? 1 : 0)}
                </div>
                <div className="flex items-center gap-2 text-white bg-white/10 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">{formatTime(timeSpent)}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(currentQuestion.difficulty)}`}>
                  {currentQuestion.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/5 text-gray-300 border border-white/10">
                  {getCategoryIcon(currentQuestion.category)} {currentQuestion.category}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {currentQuestion.type === 'numerical' || currentQuestion.type === 'free_response' ? '🤖 AI Evaluated' : '✓ Multiple Choice'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 leading-relaxed">{currentQuestion.question}</h3>
            </div>

            {!showFeedback ? (
              <div className="space-y-4">
                {currentQuestion.type === 'multiple_choice' ? (
                  <div className="space-y-2">
                    {currentQuestion.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedAnswer(option)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                          selectedAnswer === option
                            ? 'border-white bg-white/10 text-white'
                            : 'border-white/10 text-gray-300 hover:border-white/30 hover:bg-white/5'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-purple-400 mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Your answer will be evaluated by AI</span>
                    </div>
                    <textarea
                      value={selectedAnswer}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      placeholder="Enter your answer here... (e.g., '50%' or '0.5' or 'half')"
                      className="w-full p-4 bg-white/5 border-2 border-white/10 rounded-lg focus:border-white focus:outline-none text-white placeholder-gray-500 min-h-[100px] resize-y"
                      rows={3}
                    />
                  </div>
                )}
                <button
                  onClick={submitAnswer}
                  disabled={!selectedAnswer || isEvaluating}
                  className="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors disabled:bg-white/10 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="w-5h-5 animate-spin" />
                      AI Evaluating Answer...
                    </>
                  ) : (
                    <>Submit Answer</>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border-2 ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <Check className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className={`font-bold ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </span>
                    {aiEvaluation && (
                      <span className="ml-auto text-sm text-gray-400">
                        Confidence: {Math.round(aiEvaluation.confidence * 100)}%
                      </span>
                    )}
                  </div>
                  {!isCorrect && (
                    <div className="text-sm text-gray-300 mb-2">
                      <strong>Your answer:</strong> {selectedAnswer}
                      <br />
                      <strong>Correct answer:</strong> {currentQuestion.correct_answer}
                    </div>
                  )}
                </div>

                {aiEvaluation && (
                  <div className="bg-purple-500/10 rounded-lg border border-purple-500/20 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      <div className="font-bold text-white">AI Evaluation</div>
                    </div>
                    <div className="text-sm text-gray-300 mb-3">{aiEvaluation.feedback}</div>
                    
                    {aiEvaluation.keyPointsCovered && aiEvaluation.keyPointsCovered.length > 0 && (
                      <div className="mb-3">
                        <div className="text-xs font-medium text-emerald-400 mb-1">✓ Key Points You Covered:</div>
                        <ul className="text-xs text-gray-400 space-y-1">
                          {aiEvaluation.keyPointsCovered.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-400">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {aiEvaluation.missingPoints && aiEvaluation.missingPoints.length > 0 && (
                      <div>
                        <div className="text-xs font-medium text-amber-400 mb-1">⚠ Missing Points:</div>
                        <ul className="text-xs text-gray-400 space-y-1">
                          {aiEvaluation.missingPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-amber-400">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="font-bold text-white mb-2">💡 Explanation</div>
                  <div className="text-gray-300">{currentQuestion.explanation}</div>
                </div>

                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20 p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center relative">
                      <div className={`absolute inset-0 rounded-full ${isPlayingAudio ? 'animate-pulse bg-purple-500/30' : ''}`}></div>
                      <span className="text-2xl relative z-10">🎙️</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white mb-1">AI Voice Assistant</div>
                      <div className="text-sm text-gray-400">
                        {isPlayingAudio ? 'Playing explanation...' : 'Click to hear an audio explanation'}
                      </div>
                    </div>
                    <button
                      onClick={() => generateVoiceExplanation(currentQuestion.explanation, isCorrect)}
                      disabled={isPlayingAudio}
                      className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all disabled:bg-white/20 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isPlayingAudio ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          Playing
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                          </svg>
                          Explain
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={nextQuestion}
                  className="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  {currentQuestionIndex < sessionQuestions.length - 1 ? (
                    <>Next Question <ChevronRight className="w-5 h-5" /></>
                  ) : (
                    <>Finish Session <Check className="w-5 h-5" /></>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  const Topics = () => {
    const categories = [...new Set(QUESTIONS_DB.questions.map(q => q.category))];
    
    const getButtonText = (category) => {
      const buttonTextMap = {
        'Purely Quantitative & Logic': 'Practice Logical Reasoning',
        'Other Financial Economics': 'Practice Financial Economics',
        'Stochastic Processes': 'Practice Stochastic Processes',
        'Calculus & Linear Algebra': 'Practice Calculus and Linear Algebra',
        'Derivatives': 'Practice Derivatives',
        'Statistics': 'Practice Statistics',
        'Programming & Algorithms': 'Practice Programming & Algorithms',
        'Non-Quantitative': 'Practice Non-Quantitative'
      };
      
      return buttonTextMap[category] || `Practice ${category}`;
    };
    
    return (
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => {
            const categoryQuestions = QUESTIONS_DB.questions.filter(q => q.category === category);
            const progress = userProgress.categoryProgress[category] || { solved: 0, total: categoryQuestions.length, accuracy: 0 };
            const masteryPct = Math.round((progress.solved / progress.total) * 100);
            
            return (
              <div key={category} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all group">
                <div className="text-3xl mb-3">{getCategoryIcon(category)}</div>
                <h3 className="font-bold text-white mb-2">{category}</h3>
                <div className="text-sm text-gray-400 mb-4">
                  {progress.solved} / {progress.total} questions solved
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">Mastery</span>
                    <span className="font-bold text-white">{masteryPct}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-white to-gray-400 h-2 rounded-full transition-all"
                      style={{ width: `${masteryPct}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 mb-4 flex-wrap">
                  {['Easy', 'Medium', 'Hard'].map(diff => {
                    const count = categoryQuestions.filter(q => q.difficulty === diff).length;
                    return (
                      <span key={diff} className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(diff)}`}>
                        {count} {diff}
                      </span>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage('practice')}
                  className="w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-100 transition-all group-hover:scale-105"
                >
                  {getButtonText(category)}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const Analytics = () => {
    return (
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="font-bold text-white mb-4">Performance Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Overall Accuracy</span>
                  <span className="font-bold text-white">{userProgress.accuracy}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full"
                    style={{ width: `${userProgress.accuracy}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Questions Completed</span>
                  <span className="font-bold text-white">{userProgress.totalSolved} / {QUESTIONS_DB.questions.length}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                    style={{ width: `${(userProgress.totalSolved / QUESTIONS_DB.questions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="font-bold text-white mb-4">Study Streaks</h3>
            <div className="flex gap-8">
              <div>
                <div className="text-4xl font-bold text-orange-400">{userProgress.currentStreak}</div>
                <div className="text-sm text-gray-400">Current Streak</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">{userProgress.longestStreak}</div>
                <div className="text-sm text-gray-400">Longest Streak</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 md:col-span-2">
            <h3 className="font-bold text-white mb-4">Category Breakdown</h3>
            <div className="space-y-3">
              {Object.entries(userProgress.categoryProgress).map(([category, data]) => {
                const pct = Math.round((data.solved / data.total) * 100);
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">{getCategoryIcon(category)} {category}</span>
                      <span className="text-sm font-medium text-white">{data.solved}/{data.total} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-white to-gray-400 h-2 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-black/80 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                <Flame className="w-5 h-5" />
                <span className="font-bold">{userProgress.currentStreak} day streak</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'practice' && <Practice />}
          {currentPage === 'topics' && <Topics />}
          {currentPage === 'analytics' && <Analytics />}
        </main>
      </div>
    </div>
  );
}