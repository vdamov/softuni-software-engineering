import java.util.Scanner;

public class Sunglasses {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());


        int top = n * 2;
        int bottom = n * 2;
        int middle = (n * 2) - 2;
        int spaces = n;


        //top
        for (int i = 0; i < top; i++) {
            System.out.print("*");

        }
        for (int i = 0; i < spaces; i++) {
            System.out.print(" ");

        }
        for (int i = 0; i < top; i++) {
            System.out.print("*");

        }
        System.out.println();

        //middle
        for (int row = 0; row < n - 2; row++) {
            System.out.print("*");
            for (int col = 0; col < middle; col++) {
                System.out.print("/");
            }
            System.out.print("*");
            if (row == (n - 1) / 2 - 1) {
                for (int i = 0; i < spaces; i++) {
                    System.out.print("|");
                }
            } else {

                for (int i = 0; i < spaces; i++) {
                    System.out.print(" ");
                }
            }
            System.out.print("*");
            for (int col = 0; col < middle; col++) {
                System.out.print("/");
            }
            System.out.print("*");


            System.out.println();
        }


        //bottom
        for (int i = 0; i < bottom; i++) {
            System.out.print("*");

        }
        for (int i = 0; i < spaces; i++) {
            System.out.print(" ");

        }
        for (int i = 0; i < bottom; i++) {
            System.out.print("*");

        }
        System.out.println();


    }
}
