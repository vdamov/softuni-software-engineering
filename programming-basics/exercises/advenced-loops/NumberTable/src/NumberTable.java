import java.util.Scanner;

public class NumberTable {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());


        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                int num = row + col + 1;
                if (num > n) {
                    num = 2 * n - (row + col + 1);
                }
                System.out.print(num + " ");
            }
            System.out.println();
        }
    }
}
