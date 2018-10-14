# Data Transfer

You will be given several lines of **messages containing data**. You have to **check for the validity of the lines**. A **valid** line should be in the format: **"s:{sender};r:{receiver};m--"{message} ""**

* **sender – **could contain **any ascii character except for ";"**

* **receiver –** could contain **any ascii character except for ";"**

* **message –** should contain **only letters and spaces**

In each valid message there is a **hidden size of data transfer.** The size of the data transfer is **calculated by the sum of all digits in the names of the sender and receiver**. After each valid message print a line in the format: "**{senderName} says "{currentMessage}" to {recieverName}". **The **printed names should contain only letters and spaces**. Example: sender “P@e$5sh#o Go^4sh5ov” is **valid **and **matches**, but when printing his name, **we only print** “Pesho Goshov”. 

At the end print a line in the format **"Total data transferred: {totalData}MB"**.

## Input / Constraints

* First line will be a number **n** in range [1, 100].

* The next **n** lines will be **strings**.

## Output

* Print each valid message in the format described above.

* Print the total amount of data transfer.

## Examples

<table>
  <tr>
    <td>Input</td>
    <td>Output</td>
  </tr>
  <tr>
    <td>3
s:P5%es4#h@o;r:G3#o!!s2h#2o;m--"Attack"
s:G3er%6g43i;r:Kak€$in2% re3p5ab3lic%an;m--"I can sing"
s:BABAr:Ali;m-No cave for you</td>
    <td>Pesho says "Attack" to Gosho
Gergi says "I can sing" to Kakin repablican
Total data transferred: 45MB</td>
  </tr>
  <tr>
    <td>5
s:B^%4i35454l#$l;r:Mo5l#$34l%y;m--"Run"
s:Ray;r:To^^5m;m--"Hidden Message"
bla;r:1234a;m--Hello
s:M#$%$#^6767687654545e;r:Yo54$#@#u5;m--"$$$"
s:M#$@545e;r:You241$@#23;m"Hello"</td>
    <td>Bill says "Run" to Molly
Ray says "Hidden Message" to Tom
Total data transferred: 42MB</td>
  </tr>
</table>


