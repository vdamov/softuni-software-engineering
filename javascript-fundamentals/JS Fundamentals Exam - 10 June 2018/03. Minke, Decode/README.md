# Problem 3 – Minke, decode

*Minka was kidnapped by some crazy coders just before her travel. They tasked her to decode her travel destination or she can’t go. She is in dire straits and you have to help her:*

You will recieve a **string** with the еncrypted message which contains **the encrypted country** and the code that need to be decrypted . The **country** will always **starts** with capital letter and **end** with capital letter. You’ll recieve char **starting point** and char **end points** with which you will decode the country.

Example for country is MolgarA which needs to become MoldovA

For **example** in the input we will recieve **char start point** **-3**  which is the letter **g** and **char end point** **- 5** which is **r**. We need to **replace** everything from g to r with "dov" which will be given in the input aswell. 

The final result must be **Moldova** (the last char needs to be lowered).

The second part is to **decode** **the numbers** from the **input string**. To extract the numbers from the input string you need to **match every three-digit number** (**whole** or **fractional**).

 If the number is **fractional** you have to  round it up. When you receive all maches they need to be decoded from **ascii to text** and print it next to the country **capitalized** and **separated by " =>** “.

## Input

* The input will consist of** array of strings, containing **4 strings:

* First is char **start point** for the country decoding:

* Second is char **end point** for the country decoding:

* Third is the **right word**:

* Fourth is the **encrypted text**:

## Constraints

* There will be always only one country in the input.

* The separator for the fractional num will always be dot

* All inputs in the array will be string

## Examples

<table>
  <tr>
    <td>Input</td>
    <td>Output</td>
  </tr>
  <tr>
    <td>["3", "5", "gar","114 sDfia 1, riDl10 confin$4%#ed117 likewise it humanity aTe114.223432 BultoriA - Varnd railLery101 an unpacked as he"]</td>
    <td>Bulgaria => Ruse</td>
  </tr>
  <tr>
    <td>["1", "4","loveni", "SerbiA 67 – sDf1d17ia aTe 1, 108 confin$4%#ed likewise it humanity  Bulg35aria - VarnA railLery1a0s1 111 an unpacked as 109 he"]</td>
    <td>Slovenia => Lom</td>
  </tr>
</table>


