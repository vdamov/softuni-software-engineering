# JS Advanced: Exam 15 July 2018

# Problem 2. Calculator (Unit Testing)

You are given the following **JavaScript class**:

<table>
  <tr>
    <td>Calculator.js</td>
  </tr>
  <tr>
    <td>class Calculator {


  </tr>
</table>


### Functionality

The above code defines a **class** that holds items (of **any** type). An **instance** of the class should support the following operations:

* Contains a property **expenses** that is initialized to an **empty** array. 

* Function** ****add(data)** – **adds** the passed in **item** (of **any** type) to the **expenses**.

* Function **divideNums() **– divides **only** the **numbers** from the **expenses**  and returns the result. If there are no numbers in the array, the function throws the following error: **"****There are no numbers in the array!****"** 

* Function** ****toString()**** **– **returns** a string, containing a list of all items from the expenses, joined with 

an **arrow: " -> "**. If there are **no** items stored, it should **return** the string **"empty array".**

* Function **orderBy()** – **returns a string joined with ", "** which is the **sorted expenses,** sorting them by** two criteria **- one for **numbers** and another for **mixed** data.

### Examples

This is an example how this code is **intended to be used**:

<table>
  <tr>
    <td>Sample code usage</td>
  </tr>
  <tr>
    <td>let output = new Calculator();
  </tr>
  <tr>
    <td>Corresponding output</td>
  </tr>
  <tr>
    <td>10 -> Pesho -> 5
1
1, 1
1 -> 1</td>
  </tr>
</table>


### Your Task

Using **Mocha** and **Chai** write **JS unit tests** to test the entire functionality of the **Calculator** class. You may use the following code as a template:

<table>
  <tr>
    <td>describe("TODO …", function() {
        // TODO: …
    });
});</td>
  </tr>
</table>


### Submission

Submit your tests inside a **describe()** statement, as shown above.

### Notes

The methods should function correctly for **positive**, **negative** and **floating point** numbers. In case of **floating point** numbers the result should be considered correct if it is **within 0.01** of the correct value.

**There will be no function chaining.**
