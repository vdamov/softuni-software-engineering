import java.util.Scanner;

public class FruitShop {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        String fruit = console.nextLine().toLowerCase();
        String day = console.nextLine();
        double quantity = Double.parseDouble(console.nextLine());
        double price = -1;


        if (day.equals("Monday")) {
            if (fruit.equals("banana")) {
                price = 2.50;
            } else if (fruit.equals("apple")) {
                price = 1.20;
            } else if (fruit.equals("orange")) {
                price = 0.85;
            } else if (fruit.equals("grapefruit")) {
                price = 1.45;
            } else if (fruit.equals("kiwi")) {
                price = 2.7;
            } else if (fruit.equals("pineapple")) {
                price = 5.50;
            } else if (fruit.equals("grapes")) {
                price = 3.85;
            }
        } else if (day.equals("Tuesday")) {
            if (fruit.equals("banana")) {
                price = 2.50;
            } else if (fruit.equals("apple")) {
                price = 1.20;
            } else if (fruit.equals("orange")) {
                price = 0.85;
            } else if (fruit.equals("grapefruit")) {
                price = 1.45;
            } else if (fruit.equals("kiwi")) {
                price = 2.7;
            } else if (fruit.equals("pineapple")) {
                price = 5.50;
            } else if (fruit.equals("grapes")) {
                price = 3.85;
            }
        } else if (day.equals("Wednesday")) {
            if (fruit.equals("banana")) {
                price = 2.50;
            } else if (fruit.equals("apple")) {
                price = 1.20;
            } else if (fruit.equals("orange")) {
                price = 0.85;
            } else if (fruit.equals("grapefruit")) {
                price = 1.45;
            } else if (fruit.equals("kiwi")) {
                price = 2.7;
            } else if (fruit.equals("pineapple")) {
                price = 5.50;
            } else if (fruit.equals("grapes")) {
                price = 3.85;
            }
        } else if (day.equals("Thursday")) {
            if (fruit.equals("banana")) {
                price = 2.50;
            } else if (fruit.equals("apple")) {
                price = 1.20;
            } else if (fruit.equals("orange")) {
                price = 0.85;
            } else if (fruit.equals("grapefruit")) {
                price = 1.45;
            } else if (fruit.equals("kiwi")) {
                price = 2.7;
            } else if (fruit.equals("pineapple")) {
                price = 5.50;
            } else if (fruit.equals("grapes")) {
                price = 3.85;
            }
        } else if (day.equals("Friday")) {
            if (fruit.equals("banana")) {
                price = 2.50;
            } else if (fruit.equals("apple")) {
                price = 1.20;
            } else if (fruit.equals("orange")) {
                price = 0.85;
            } else if (fruit.equals("grapefruit")) {
                price = 1.45;
            } else if (fruit.equals("kiwi")) {
                price = 2.7;
            } else if (fruit.equals("pineapple")) {
                price = 5.50;
            } else if (fruit.equals("grapes")) {
                price = 3.85;
            }
        } else if (day.equals("Saturday")) {
            if (fruit.equals("banana")) {
                price = 2.70;
            } else if (fruit.equals("apple")) {
                price = 1.25;
            } else if (fruit.equals("orange")) {
                price = 0.9;
            } else if (fruit.equals("grapefruit")) {
                price = 1.6;
            } else if (fruit.equals("kiwi")) {
                price = 3;
            } else if (fruit.equals("pineapple")) {
                price = 5.60;
            } else if (fruit.equals("grapes")) {
                price = 4.2;
            }
        } else if (day.equals("Sunday")) {
            if (fruit.equals("banana")) {
                price = 2.70;
            } else if (fruit.equals("apple")) {
                price = 1.25;
            } else if (fruit.equals("orange")) {
                price = 0.9;
            } else if (fruit.equals("grapefruit")) {
                price = 1.6;
            } else if (fruit.equals("kiwi")) {
                price = 3;
            } else if (fruit.equals("pineapple")) {
                price = 5.60;
            } else if (fruit.equals("grapes")) {
                price = 4.2;
            } else {
                System.out.println("error");
            }
        }
        if (price != -1) {
            System.out.println(price * quantity);
        } else {
            System.out.println("error");
        }
    }
}
