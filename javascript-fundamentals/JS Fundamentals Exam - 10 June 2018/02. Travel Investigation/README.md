# Problem 2 – Travel Investigation

*Mariyka has gathered some money already and now it’s time for our next step. We need to make some investigation about the travel companies and pick some.*

Write a JavaScript program that finds **specific unique companies **in a text. We need to **filter** our text so that we **separate** the **valid** and **invalid** sentences. Our **companies** will be separated by **exact delimiter**. The **rest of the input** will be **strings** which will be the text we will have to filter.

As **input** we will receive **array of strings**. On the **first** index of our array we always will be given the **companies** which will be a string ** separated by** the given on the **second** index **delimiter,** **followed by the sentences** we need to process.

The companies will always be given **to lower.**

Each string will consist of the following information with format:

**[ "company1@, company2@, company3",**

**"@,  “,**

**"some text company1 more text company2 some more text company3"]**

As **output** you need  to print the **valid sentences in format – "ValidSentences" **followed by the numbered sentences each on a new line, a separator between the valid and invalid sentences in this case **30x”=“, **followed by the **“InvalidSentences” **each on a new line and numbered.

**Have in mind **that there might be case of **all** **Valid or all Invalid sentences.**

**We consider Valid, a sentence which has all of the companies.**

### Input

You will receive **one argument – **an **array strings **as shown above.

### Output

Print on the **console** the **Valid **sentences if you found any, the delimiter shown above and the **Invalid **sentences if you found any.

### Constraints

* The **number** of **sentences** in the** input argument** will be in range **[1..15] inclusive**

* There **will** be **no invalid** **input**

* There **will **be **no repeated companies**

### Examples

<table>
  <tr>
    <td>Input</td>
  </tr>
  <tr>
    <td>["bulgariatour@, minkatrans@, koftipochivkaltd",
"@,",
"Mincho e KoftiPochivkaLTD Tip 123  ve MinkaTrans BulgariaTour",
"dqdo mraz some text but is KoftiPochivkaLTD MinkaTrans",
"someone continues as no "]</td>
  </tr>
  <tr>
    <td>Output</td>
  </tr>
  <tr>
    <td>ValidSentences
1.mincho  e koftipochivkaltd tip 123  ve minkatrans bulgariaatour
==============================
InvalidSentences
1. dqdo mraz  some text but is koftipochivkaltd minkatrans
2. someone continues as no</td>
  </tr>
</table>


<table>
  <tr>
    <td>Input</td>
  </tr>
  <tr>
    <td>["bulgariatour@, minkatrans@, koftipochivkaltd",
"@,",
"Mincho  e KoftiPockivkaLTD Tip 123  ve MinkaTrans BulgariaTour",
"We will koftipochivkaLTD travel e expenses no MinkaTrans mu e BulgariaTour",
"dqdo BuLGariaTOUR mraz some text but is KoftiPochivkaLTD minkaTRANS"]</td>
  </tr>
  <tr>
    <td>Output</td>
  </tr>
  <tr>
    <td>ValidSentences
1. mincho  e koftipochivkaltd tip 123  ve minkatrans bulgariatour
2. we will koftipochivkaltd traavel e expenses no minkatrans mu e bulgariatour
3. dqdo bulgariatour mraz  some text but is koftipochivkaltd minkatrans</td>
  </tr>
</table>


