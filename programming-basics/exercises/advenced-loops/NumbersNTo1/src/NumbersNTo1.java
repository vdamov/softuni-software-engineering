import java.util.Scanner;

public class NumbersNTo1 {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());

        int count = n;

        for (int row = 1; row <= n; row++) {
            System.out.println(count);
            count--;
        }


    }
}
