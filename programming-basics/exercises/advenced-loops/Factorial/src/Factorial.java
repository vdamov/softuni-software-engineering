import java.util.Scanner;

public class Factorial {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());

        int factorial = 1;

        for (int i = 1; i <= n; i++) {

            factorial *= i;

        }
        System.out.println(factorial);


    }
}
