import java.util.Scanner;

public class MinNumber {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());
        int minValue = Integer.MAX_VALUE;

        for (int i = 1; i <= n; i++) {
            int num = Integer.parseInt(console.nextLine());

            if (num < minValue) {
                minValue = num;

            }
        }
        System.out.println(minValue);

    }
}
