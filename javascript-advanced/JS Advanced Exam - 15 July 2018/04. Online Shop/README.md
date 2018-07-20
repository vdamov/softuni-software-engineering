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
    <td><!DOCTYPE html><html lang="en"><head>    <meta charset="UTF-8">    <title>Online Shop</title>    <style>        .wrapper {            margin: auto;            width: 53%;            border: 3px solid rgb(26, 26, 26);            background-color: rgb(250, 250, 250);            padding: 10px;        }        #header {            font-family: "Trebuchet MS", Helvetica, sans-serif;            font-size: 300%;            font-weight: bold;            color: rgb(26, 26, 26);            text-align: center;            padding: 10px;        }        li {            list-style-type: none;        }        .block {            display: inline-block;            margin-left: 165px;        }        .field {            font-family: "Trebuchet MS", Helvetica, sans-serif;            font-size: 25px;            color: rgb(26, 26, 26);        }        .custom-select {            font-family: "Trebuchet MS", Helvetica, sans-serif;            font-size: 20px;            background-color: rgb(255, 255, 255);            color: rgb(26, 26, 26);            border: 1px solid rgb(26, 26, 26);            padding: 2px;            margin-top: 10px;            width: 200px;        }        .input1 {            width: 40px;            font-family: "Trebuchet MS", Helvetica, sans-serif;            font-size: 20px;            border: 1px solid rgb(26, 26, 26);            background-color: #ffffff;            color: rgb(26, 26, 26);            padding: 2px;        }        #capacity {            width: 40px;            font-size: 20px;            padding: 2px;            font-family: "Trebuchet MS", Helvetica, sans-serif;        }        #sum {            width: 80px;            font-size: 20px;            padding: 2px;            font-family: "Trebuchet MS", Helvetica, sans-serif;            margin: 10px 10px;        }        .fullCapacity {            width: 40px;            font-size: 20px;            padding: 2px;            font-family: "Trebuchet MS", Helvetica, sans-serif;            color: rgb(250, 0, 0);            border: 1px solid #f07777b2;            background-color: #f78989bb;        }        .display {            font-family: "Trebuchet MS", Helvetica, sans-serif;            font-size: 15px;            border: 1px solid rgb(26, 26, 26);            padding: 2px;            background-color: #ffffff;            color: rgb(26, 26, 26);            margin-top: 5px;            width: 100%;            height: 300px;        }        .text {            font-family: "Trebuchet MS", Helvetica, sans-serif;            font-size: 20px;            color: rgb(26, 26, 26);            margin-right: 10px;        }        .button:enabled {            font-family: "Trebuchet MS", Helvetica, sans-serif;            font-size: 20px;            cursor: pointer;            border: 1px solid rgb(26, 26, 26);            padding: 5px 15px;            margin: 3px;            border-radius: 8px;        }        .button:disabled {            background: rgb(248, 248, 248);            cursor: pointer;            color: rgb(216, 216, 216);            font-size: 20px;            padding: 5px 15px;            font-family: "Trebuchet MS", Helvetica, sans-serif;            margin: 3px;            border: 1px solid rgb(26, 26, 26);            border-radius: 8px;        }    </style>    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script></head><body><div class="wrapper"></div><script src="solution.js"></script><script>onlineShop('.wrapper')</script></body>
</td>
  </tr>
</table>


<table>
  <tr>
    <td>solution.js</td>
  </tr>
  <tr>
    <td>function onlineShop(selector) {    let form = `<div id="header">Online Shop Inventory</div>    <div class="block">        <label class="field">Product details:</label>        <br>        <input placeholder="Enter product" class="custom-select">        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>        <button id="submit" class="button" disabled>Submit</button>        <br><br>        <label class="field">Inventory:</label>        <br>        <ul class="display">        </ul>        <br>        <label class="field">Capacity:</label><input id="capacity" readonly>        <label class="field">(maximum capacity is 150 items.)</label>        <br>        <label class="field">Price:</label><input id="sum" readonly>        <label class="field">BGN</label>    </div>`;    $(selector).html(form);    // Write your code here}</td>
  </tr>
</table>


