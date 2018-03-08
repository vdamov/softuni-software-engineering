# Упражнения: Първи стъпки в коденето

Задачи за упражнение в клас и за домашно към курса [„Основи на програмирането" @ СофтУни](https://softuni.bg/courses/programming-basics).

1. Конзолна програмка "Hello SoftUni"

Напишете **конзолна Java програма**, която отпечатва текста "**Hello SoftUni**".

1. Стартирайте IntelliJ IDEA.

2. Създайте нов конзолен проект: [Create New Project].

![image alt text](images\images\image_0.png)

3. Изберете от диалоговия прозорец [Java] → [Windows] → [Console Application] и дайте подходящо име на проекта, например "**HelloSoftuni**":

![image alt text](images\images\image_1.png)

![image alt text](images\image_2.png)

4. Намерете секцията **main(String[] args)**. В нея се пише програмен код (команди) на езика Java.

5. Придвижете курсора между отварящата и затварящата скоба **{ }**.

6. Натиснете **[Enter]** след отварящата скоба **{**.

![image alt text](images\image_3.png)

7. Напишете следния програмен код (команда за печатане на текста **"Hello SoftUni"**):

<table>
  <tr>
    <td>System.out.println("Hello SoftUni");</td>
  </tr>
</table>


Кодът на програмата се пише отместен навътре с една табулация спрямо отварящата скоба **{**.

![image alt text](images\image_4.png)

8. **Стартирайте** програмата с натискане на **[Ctrl+Shift+F10]**. Трябва да получите следния резултат:

![image alt text](images\image_5.png)

9. **Тествайте** решението на тази задача в онлайн judge системата на СофтУни. За целта първо отворете [https://judge.softuni.bg/Contests/Practice/Index/150#0](https://judge.softuni.bg/Contests/Practice/Index/150#0). Влезте с вашето потребителско име в СофтУни. Ще се появи прозорец за изпращане на решения за задача "**Hello SoftUni**". Копирайте сорс кода от IntelliJ и го поставете в полето за изпращане на решения:

![image alt text](images\image_6.png)

10. **Изпратете решението** за оценяване с бутона [Submit]. Ще получите резултата след няколко секунди в таблицата с изпратени решения в judge системата:

![image alt text](images\image_7.png)

2. Конзолна програма "Expression"

Напишете **конзолна Java програма**, която пресмята и отпечатва стойността на следния **числен израз**:

<table>
  <tr>
    <td>(3522 + 52353) * 23 - (2336 * 501 + 23432 - 6743) * 3</td>
  </tr>
</table>


Забележка: не е разрешено да се пресметне стойността предварително (например с Windows Calculator).

1. Направете нов Java клас с име "**Expression**" (**десен бутон** върху папката „**src**”):

![image alt text](images\image_8.png)

![image alt text](images\image_9.png)

2. Направете си **main метод** в класа, за да има от къде да тръгне вашата програма  и влезте в неговото тяло между **{** и **}**:

![image alt text](images\image_10.png)

<table>
  <tr>
    <td>static void main(String[] args) {

}</td>
  </tr>
</table>


3. Сега трябва да напишете кода, който да изчисли горния числен израз и да отпечата на конзолата стойността му. Подайте горния числен израз в скобите на командата **System.out.println()**:

![image alt text](images\image_11.png)

4. Стартирайте програмата с [Ctrl+Shift+F10] и проверете дали вашият резултат прилича на нашия:

![image alt text](images\image_12.png)

5. Тествайте вашата програма в judge системата: [https://judge.softuni.bg/Contests/Practice/Index/150#1](https://judge.softuni.bg/Contests/Practice/Index/150#1).

![image alt text](images\image_13.png)

3. Числата от 1 до 20

Напишете Java конзолна програма, която отпечатва числата от 1 до 20 на отделни редове на конзолата.

1. Създайте нов Java клас със име "**Nums1To20**“ (десен бутон върху “**src**"папката ➔ New ➔ Java Class):

![image alt text](images\image_14.png)

2. Направете си **main** метод 

3. Напишете 20 команди **System.out.println(); **една след друга, за да отпечатате числата от 1 до 20:

![image alt text](images\image_15.png)

4. **Тествайте** вашето решение на задачата в judge системата: [https://judge.softuni.bg/Contests/Practice/Index/150#2](https://judge.softuni.bg/Contests/Practice/Index/150#2)

5. Можете ли да напишете програмата по **по-умен начин**, така че да не повтаряте 20 пъти една и съща команда? Потърсете в Интернет информация за „**[for loop Jav**a](https://www.google.com/search?q=for+loop+java)".

4. Триъгълник от 55 звездички

Напишете Java конзолна програма, която отпечатва **триъгълник от 55 звездички**, разположени на 10 реда:

<table>
  <tr>
    <td>*
**
***
****
*****
******
*******
********
*********
**********</td>
  </tr>
</table>


1. Създайте ново конзолно Java приложение с име "**TriangleOf55Stars**".

2. Напишете код, който печата триъгълника от звездички, например чрез 10 команди, подобни на **System.out.println("*")**.

3. **Тествайте** кода си в judge системата: [https://judge.softuni.bg/Contests/Practice/Index/150#3](https://judge.softuni.bg/Contests/Practice/Index/150#3).

4. Опитайте да подобрите решението си, така че да няма много повтарящи се команди. Може ли това да стане с **for цикъл**?

5. Лице на правоъгълник

Напишете Java програма, която прочита от конзолата две числа **a** и **b**, въведени от потребителя, пресмята и отпечатва **лицето на правоъгълник **със страни **a** и **b**. Примерен вход и изход:

<table>
  <tr>
    <td>a</td>
    <td>b</td>
    <td>area</td>
  </tr>
  <tr>
    <td>2</td>
    <td>7</td>
    <td>14</td>
  </tr>
  <tr>
    <td>7</td>
    <td>8</td>
    <td>56</td>
  </tr>
  <tr>
    <td>12</td>
    <td>5</td>
    <td>60</td>
  </tr>
</table>


1. Направете конзолна Java програма. За да прочетете двете числа, използвайте следния код:

2. Допишете програмата по-горе, за да пресмята лицето на правоъгълника и да го проверява.

<table>
  <tr>
    <td>static void main(String[] args)
{
    Scanner console = new Scanner(System.in);
    int a = Integer.parseInt(console.nextLine());
    int b = Integer.parseInt(console.nextLine());
            
    // TODO: calculate the area and print it
}</td>
  </tr>
</table>


3. Тествайте решението си в judge системата: [https://judge.softuni.bg/Contests/Practice/Index/150#4](https://judge.softuni.bg/Contests/Practice/Index/150#4).

6. * Квадрат от звездички

Напишете Java конзолна програма, която прочита от конзолата цяло положително число **N,** въведено от потребителя, и отпечатва на конзолата **квадрат от N звездички**, като в примерите по-долу:

<table>
  <tr>
    <td>вход</td>
    <td>изход</td>
  </tr>
  <tr>
    <td>3</td>
    <td>***
* *
***</td>
  </tr>
  <tr>
    <td>4</td>
    <td>****
*  *
*  *
****</td>
  </tr>
  <tr>
    <td>5</td>
    <td>*****
*   *
*   *
*   *
*****</td>
  </tr>
</table>


1. Направете конзолна Java програма. За да прочетете числото **N** (2 ≤ N ≤100), използвайте следния код:

<table>
  <tr>
    <td>static void main(String[] args) {
    Scanner console = new Scanner(System.in);
    int n = Integer.parseInt(console.nextLine());
            
    // TODO: print the rectangle
}</td>
  </tr>
</table>


2. Допишете програмата по-горе, за да отпечатва квадрат, съставен от звездички. Може да се наложи да използвате **for-цикли**. Потърсете информация в Интернет.

3. Тествайте решението си в judge системата: [https://judge.softuni.bg/Contests/Practice/Index/150#5](https://judge.softuni.bg/Contests/Practice/Index/150#5).ima