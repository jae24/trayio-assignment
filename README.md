# TrayIO Assignment

CLI program written in NodeJS that processes text files containing 
room dimensions, starting location of a robot vacuum, locations of dirt inside the room and driving directions for the robot.

Outputs:  
The final hoover position (X, Y)  
The number of patches of dirt the robot cleaned up  
Graphical representation of room before and after cleaning  

## Instructions

Download source code from this repository.

Open a terminal in the root directory of the project and run

```
$ node index
```

## Examples

```
Input:
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
```

```
Run:
$ node index

-------------- RESULTS --------------
Final Robot Position: 1, 3
Number of Dirt Mounds Cleaned:  1
-------------------------------------

Before Cleaning
[ (D) - dirt mound | (R) - robot location | (.) - empty space ]

 5  .  .  .  .  .
 4  .  .  .  .  .
 3  . (D) .  .  .
 2 (R)(D) .  .  .
 1  .  .  .  .  .
 0 (D) 2  3  4  5

After Cleaning
[ (D) - dirt mound | (R) - robot location | (.) - empty space ]

 5  .  .  .  .  .
 4  .  .  .  .  .
 3 (R) .  .  .  .
 2  . (D) .  .  .
 1  .  .  .  .  .
 0 (D) 2  3  4  5

```
## Additional Test Cases
Additional test cases are provided in the test_cases directory. Default test file is same as given in assignment prompt.  
Copy the test case text file contents into test.txt in the root directory to test. 

## Notes
Graphs for rooms may become distorted if room size is exceedingly large.

