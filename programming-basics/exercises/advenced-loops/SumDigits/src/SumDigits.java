import java.util.Scanner;

public class SumDigits {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());

        int total = 0;
        while (n > 0) {
            total += n % 10;
            n /= 10;
        }

        System.out.println(total);


    }
}
