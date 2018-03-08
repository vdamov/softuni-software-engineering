import java.util.Scanner;

public class Cinema {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        String type = console.nextLine().toLowerCase();
        int rows = Integer.parseInt(console.nextLine());
        int columns = Integer.parseInt(console.nextLine());
        double price = -1;

        if (type.equals("premiere")) {
            price = 12;
        } else if (type.equals("normal")) {
            price = 7.50;
        } else if (type.equals("discount")) {
            price = 5;
        }

        double total = price * rows * columns;
        System.out.printf("%.2f", total);
        System.out.print(" leva");
    }
}
