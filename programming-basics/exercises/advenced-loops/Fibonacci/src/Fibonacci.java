import java.util.Scanner;

public class Fibonacci {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());

        int firstNumber = 1;
        int secondNumber = 1;

        for (int i = 0; i < n - 1; i++) {
            int next = firstNumber + secondNumber;
            firstNumber = secondNumber;
            secondNumber = next;
        }

        System.out.println(secondNumber);

    }
}
