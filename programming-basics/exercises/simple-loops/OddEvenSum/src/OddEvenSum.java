import java.util.Scanner;

public class OddEvenSum {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());
        int odd = 0;
        int even = 0;

        for (int i = 1; i <= n; i++) {
            int num = Integer.parseInt(console.nextLine());

            if (i % 2 == 0) {
                even += num;
            } else {
                odd += num;
            }

        }
        int difference = Math.abs(even - odd);

        if (difference == 0) {
            System.out.printf("Yes Sum = %d", even);
        } else {
            System.out.printf("No Diff = %d", difference);
        }
    }
}
