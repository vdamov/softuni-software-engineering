import java.util.Scanner;

public class SquareFrame {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());

        int count = n - 2;

        for (int row = 0; row < n; row++) {
            if (row == n - 1 || row == 0) {
                System.out.print("+ ");
            } else {
                System.out.print("| ");
            }

            for (int col = 0; col < count; col++) {
                System.out.print("- ");
            }
            if (row == n - 1 || row == 0) {
                System.out.println("+ ");
            } else {
                System.out.println("| ");
            }
        }


    }
}
