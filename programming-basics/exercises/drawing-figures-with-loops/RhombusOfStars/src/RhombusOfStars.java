import java.util.Scanner;

public class RhombusOfStars {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());
        //top
        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                if (col == (n - 1) - row) {
                    for (int i = 0; i < row + 1; i++) {
                        System.out.print("* ");
                    }
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println();

        }

        //bottom
        for (int row = 0; row < n - 1; row++) {
            for (int col = 0; col < n; col++) {
                if (col - 1 == row) {
                    for (int i = 0; i < n - (row + 1); i++) {
                        System.out.print("* ");
                    }
                } else {
                    System.out.print(" ");
                }
            }

            System.out.println();
        }


    }
}
