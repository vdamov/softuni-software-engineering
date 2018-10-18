# JS Advanced: Exam 15 July 2018

# Problem 4. Online Shop (DOM)

Write a JavaScript program that provides the logic for the given user interface of an online shop’s inventory:

![image alt text](../../images/image_5.png)

Each order you create should consist of product's **name**, **price** and **quantity**. When the **submit** button is **clicked** the current **product** must be **added** to the inventory and the visualization (**product field, price field, quantity field and submit button**) should be **reset** to the **initial values**. The **submit button** should be **disabled** if the **product field** **is empty**. 

Also there is a small **capacity** **field**, which shows how many items are there currently in the inventory. The inventory can store **up to 150 items**. Therefore, you should keep track of its capacity and when **150** items are **reached**, the capacity field should **become red** and it should display **"full"**, also the **submit button, the product field, price field and quantity field** should be **disabled **by adding to them the property “disabled”. In order to change the colour of the capacity field, you should simply **change** its **CSS class** to **“fullCapacity”**. See the picture below:

![image alt text](../../images/image_6.png)

### Output

* You should **only** **submit **the** solution.js file**

Use the following **index.html** and the **solution.js** for the user interface implementation: 

<table>
  <tr>
    <td>index.html</td>
  </tr>
  <tr>
    <td><!DOCTYPE html>
</td>
  </tr>
</table>


<table>
  <tr>
    <td>solution.js</td>
  </tr>
  <tr>
    <td>function onlineShop(selector) {
  </tr>
</table>

