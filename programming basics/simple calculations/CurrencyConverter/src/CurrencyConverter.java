import java.util.Scanner;

public class CurrencyConverter {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        double amount = Double.parseDouble(scan.nextLine());
        String inputCurrency = scan.nextLine();
        String outputCurrency = scan.nextLine();
        double rateToBgn = 0;
        double rate = 0;

        switch (inputCurrency) {
            case "BGN":
                rateToBgn = 1;
                break;
            case "USD":
                rateToBgn = 1.79549;
                break;
            case "EUR":
                rateToBgn = 1.95583;
                break;
            case "GBP":
                rateToBgn = 2.53405;
        }
        switch (outputCurrency) {
            case "BGN":
                rate = 1;
                break;
            case "USD":
                rate = 1.79549;
                break;
            case "EUR":
                rate = 1.95583;
                break;
            case "GBP":
                rate = 2.53405;
        }
        double exchange = amount * rateToBgn / rate;
        System.out.printf("%.2f %s", exchange, outputCurrency);
    }
}
