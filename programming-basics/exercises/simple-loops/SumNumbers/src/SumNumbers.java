import java.util.Scanner;

public class SumNumbers {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());
        int sum = 0;

        for (int i = 1; i <= n; i++) {
            int num = Integer.parseInt(console.nextLine());
            sum = num + sum;

        }

        System.out.println(sum);
    }
}
