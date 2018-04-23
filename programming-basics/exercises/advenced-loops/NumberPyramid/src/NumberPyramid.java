import java.util.Scanner;

public class NumberPyramid {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());

        int num = 1;


        for (int row = 1; row <= 50; row++) {

            for (int col = 1; col <= row; col++) {
                System.out.print(num + " ");
                num++;
                if (num > n) {
                    return;
                }
            }
            System.out.println();

        }
    }
}
