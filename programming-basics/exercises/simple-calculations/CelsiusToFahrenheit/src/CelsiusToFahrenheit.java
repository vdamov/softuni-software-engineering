import java.util.Scanner;

public class CelsiusToFahrenheit {
    public static void main(String[] args) {
        Scanner console = new Scanner(System.in);
        double c = Double.parseDouble(console.nextLine());
        double f = c * 9 / 5 + 32;

        System.out.printf("%.2f", f);
    }
}
