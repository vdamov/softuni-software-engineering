import java.util.Scanner;

public class SmallShop {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        String product = console.nextLine().toLowerCase();
        String city = console.nextLine();
        double quantity = Double.parseDouble(console.nextLine());
        double price = -1;

        if (city.equals("Sofia")) {
            if (product.equals("coffee")) {
                price = 0.50;
            } else if (product.equals("water")) {
                price = 0.80;
            } else if (product.equals("beer")) {
                price = 1.20;
            } else if (product.equals("sweets")) {
                price = 1.45;
            } else if (product.equals("peanuts")) {
                price = 1.60;
            }
        } else if (city.equals("Varna")) {
            if (product.equals("coffee")) {
                price = 0.45;
            } else if (product.equals("water")) {
                price = 0.70;
            } else if (product.equals("beer")) {
                price = 1.10;
            } else if (product.equals("sweets")) {
                price = 1.35;
            } else if (product.equals("peanuts")) {
                price = 1.55;
            }
        } else if (city.equals("Plovdiv")) {
            if (product.equals("coffee")) {
                price = 0.40;
            } else if (product.equals("water")) {
                price = 0.70;
            } else if (product.equals("beer")) {
                price = 1.15;
            } else if (product.equals("sweets")) {
                price = 1.30;
            } else if (product.equals("peanuts")) {
                price = 1.50;
            }
        }
        System.out.println(price * quantity);

    }
}
