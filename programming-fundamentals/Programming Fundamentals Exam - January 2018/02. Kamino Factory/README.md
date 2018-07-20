# Problem 2. Kamino Factory

The clone factory in Kamino got another order to clone troops. But this time you are tasked to find **the best DNA** sequence to use in the production. 

You will receive the **DNA length** and until you receive the command **"Clone them!"** you will be receiving a **DNA sequences of ones and zeroes, split by "!"** **(one or several).**

You should select the sequence with the **longest subsequence of ones**. If there are several sequences with **same length of** **subsequence of ones**, print the one with the **leftmost** **starting index**, if there are several sequences with same **length and starting index**, select the sequence with the **greater sum** of its elements.

After you receive the last command **"Clone them!"** you should print the collected information in the following format:

**"Best DNA sample {bestSequenceIndex} with sum: {bestSequenceSum}."**

**"{DNA sequence, joined by space}"**

## Input / Constraints

* The **first line** holds the **length** of the **sequences** – **integer in range [1…100];**

* On the next lines until you receive **"Clone them!"** you will be receiving sequences (at least one) of ones and zeroes, **split by "!"** (one or several).

##  Output

The output should be printed on the console and consists of two lines in the following format:

**"Best DNA sample {bestSequenceIndex} with sum: {bestSequenceSum}."**

**"{DNA sequence, joined by space}"**

##  Examples

<table>
  <tr>
    <td>Input</td>
    <td>Output</td>
    <td>Comments</td>
  </tr>
  <tr>
    <td>5
1!0!1!1!0
0!1!1!0!0
Clone them!</td>
    <td>Best DNA sample 2 with sum: 2.
0 1 1 0 0</td>
    <td>We receive 2 sequences with same length of subsequence of ones, but the second is printed, because its subsequence starts at index[1].</td>
  </tr>
  <tr>
    <td>Input</td>
    <td>Output</td>
    <td>Comments</td>
  </tr>
  <tr>
    <td>4
1!1!0!1
1!0!0!1
1!1!0!0
Clone them!</td>
    <td>Best DNA sample 1 with sum: 3.
1 1 0 1</td>
    <td>We receive 3 sequences. Both 1 and 3 have same length of subsequence of ones -> 2, and both start from index[0], but the first is printed, because its sum is greater.</td>
  </tr>
</table>


"FEAR IS THE PATH TO THE DARK SIDE...

FEAR LEADS TO ANGER...

ANGER LEADS TO HATE...

HATE LEADS TO SUFFERING...."

