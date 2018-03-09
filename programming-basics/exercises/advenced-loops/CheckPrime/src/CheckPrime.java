import java.util.Scanner;

public class CheckPrime {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());

        if (n < 2) {
            System.out.println("Not Prime");
            return;
        }
        for (int i = 2; i <= n; i++) {
            if (n % i == 0 && i != n) {
                System.out.println("Not Prime");
                return;
            } else if (n % i == 0 && i == n) {
                System.out.println("Prime");
            }

        }
    }
}
