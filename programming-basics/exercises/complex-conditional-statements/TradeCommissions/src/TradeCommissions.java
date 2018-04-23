import java.util.Scanner;

public class TradeCommissions {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        String city = console.nextLine();
        double sales = Double.parseDouble(console.nextLine());
        double commissions = -1;


        if (city.equals("Sofia")) {
            if (sales >= 0 && sales <= 500) {
                commissions = 5;
            } else if (sales >= 501 && sales <= 1000) {
                commissions = 7;
            } else if (sales >= 1001 && sales <= 10000) {
                commissions = 8;
            } else if (sales > 10000) {
                commissions = 12;
            } else {
                System.out.println("error");
                return;
            }
        } else if (city.equals("Varna")) {
            if (sales >= 0 && sales <= 500) {
                commissions = 4.5;
            } else if (sales >= 501 && sales <= 1000) {
                commissions = 7.5;
            } else if (sales >= 1001 && sales <= 10000) {
                commissions = 10;
            } else if (sales > 10000) {
                commissions = 13;
            } else {
                System.out.println("error");
                return;
            }
        } else if (city.equals("Plovdiv")) {
            if (sales >= 0 && sales <= 500) {
                commissions = 5.5;
            } else if (sales >= 501 && sales <= 1000) {
                commissions = 8;
            } else if (sales >= 1001 && sales <= 10000) {
                commissions = 12;
            } else if (sales > 10000) {
                commissions = 14.5;
            } else {
                System.out.println("error");
                return;
            }
        } else {
            System.out.println("error");
            return;
        }
        double total = (sales / 100) * commissions;

        if (sales != -1) {
            System.out.printf("%.2f", total);
        }

    }
}
