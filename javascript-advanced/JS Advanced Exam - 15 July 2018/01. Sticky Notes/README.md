# JS Advanced: Exam 15 July 2018

# Problem 1. Sticky Notes (Simple DOM Interaction)

You are given the following **HTML code**:

<table>
  <tr>
    <td>notes.html</td>
  </tr>
  <tr>
    <td><!DOCTYPE html><html lang="en"><head>    <meta charset="UTF-8">    <title>Sticky Notes</title>    <script src="https://code.jquery.com/jquery-3.1.0.min.js"            integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s="            crossorigin="anonymous"></script>    <style>        * {            margin: 0;            padding: 0;        }        body {            font-family: arial, sans-serif;            font-size: 100%;            margin: 3em;            background: #2a61f5;            color: white;            font-weight: bolder;        }        #sticker-list, #note-content {            margin: 1em;            float: left;            position: relative;        }        .btn {            padding-left: 50px;        }        /*an X button style*/        li .button {            font-size: 18px;            margin-left: 160px;            position: relative;            bottom: 10px;        }        .note-content {            list-style: none;            text-decoration: none;            color: #000;            background: #ffc;            height: 10em;            width: 10em;            padding: 1em;            box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);            display:inline-block;            margin-right: 20px;            margin-top: 10px;        }        .text div {            margin: 15px 0;        }        #add-sticker {            padding: 8px 12px;            border: none;            border-radius: 10px;            color: #2a61f5;            font-weight: bolder;            font-family: arial, sans-serif;            background-color: white;        }        hr {            margin: 0.5em 0;        }        p{            word-wrap: break-word;        }    </style></head><body><div class="text">    <div class="title-input">        <label>Title: </label>        <input class="title" maxlength="11">    </div>    <div class="text-input">        <label>Text: </label>        <input class="content" maxlength="102">    </div></div><div class="btn">    <button id="add-sticker" onclick="addSticker()"> Add new sticker</button></div><div class="stickerBoard">    <ul id="sticker-list"></ul></div><script src="solution.js"></script></body></html></td>
  </tr>
</table>


### Your Task

**Write the** **missing JavaScript code** to make the **Notes board** work as expected.

    * When **both** **Title** and **Text** are **filled** upon pressing the "**Add new sticker**" button, a new sticker should appear in the sticker board and the input fields should be **reset**. Every sticker **must** have title, text and close button. Otherwise don't create note.

    * **Between** the Title and Text content of the note you should have **separating** line.

    * When the **close** button is clicked, the sticker should **disappear** from the sticker board.

### Submission

Submit only your **addSticker** function.

### Examples

**Example of empty html:**

![image alt text](../../images/image_0.png)

**Example of visualization and html after adding stickers:**

![image alt text](../../images/image_1.png)![image alt text](../../images/image_2.png)

**Example after removing the first note:**

![image alt text](../../images/image_3.png) ![image alt text](../../images/image_4.png)

