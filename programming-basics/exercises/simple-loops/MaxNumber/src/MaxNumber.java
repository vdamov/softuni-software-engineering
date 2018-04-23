import java.util.Scanner;

public class MaxNumber {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());
        int maxValue = Integer.MIN_VALUE;

        for (int i = 1; i <= n; i++) {
            int num = Integer.parseInt(console.nextLine());

            if (num > maxValue) {
                maxValue = num;

            }
        }
        System.out.println(maxValue);

    }
}
