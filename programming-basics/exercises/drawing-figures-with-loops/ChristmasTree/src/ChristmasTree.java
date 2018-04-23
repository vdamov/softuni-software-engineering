import java.util.Scanner;

public class ChristmasTree {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());


        for (int i = 0; i < n; i++) {
            System.out.print(" ");
        }
        System.out.println(" | ");

        for (int row = 0; row < n; row++) {
            //left
            for (int spaces = 0; spaces < (n - 1) - row; spaces++) {
                System.out.print(" ");
            }
            for (int asterisks = 0; asterisks < row + 1; asterisks++) {
                System.out.print("*");
            }
            System.out.print(" | ");


            //right
            for (int asterisks = 0; asterisks < row + 1; asterisks++) {
                System.out.print("*");
            }
            System.out.println();
        }

    }
}
