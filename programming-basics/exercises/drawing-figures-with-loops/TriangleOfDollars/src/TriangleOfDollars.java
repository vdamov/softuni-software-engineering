import java.util.Scanner;

public class TriangleOfDollars {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());

        int count = 0;

        for (int row = 0; row < n; row++) {
            count = n - (n - row);
            for (int col = 0; col <= count; col++) {
                System.out.print("$ ");
            }
            System.out.println();
        }
    }
}
