import java.util.Scanner;

public class LeftAndRightSum {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());
        int left = 0;
        int right = 0;

        for (int i = 1; i <= 2 * n; i++) {
            int num = Integer.parseInt(console.nextLine());

            if (i > n) {
                right += num;
            } else {
                left += num;
            }

        }
        int difference = Math.abs(right - left);

        if (difference == 0) {
            System.out.printf("Yes, sum = %d", right);
        } else {
            System.out.printf("No, diff = %d", difference);
        }
    }
}
