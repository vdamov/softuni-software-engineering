import java.util.Scanner;

public class USDToBGN {
    public static void main(String[] args) {
        Scanner console = new Scanner(System.in);
        double usd = Double.parseDouble(console.nextLine());

        double bgn = usd / 0.55695;
        System.out.printf("%.2f BGN", bgn);

    }
}
