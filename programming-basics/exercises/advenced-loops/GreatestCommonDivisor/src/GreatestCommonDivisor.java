import java.util.Scanner;

public class GreatestCommonDivisor {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int a = Integer.parseInt(console.nextLine());
        int b = Integer.parseInt(console.nextLine());

        while (a != b) {


            if (a > b) {
                a = a - b;
            } else {
                b = b - a;
            }
        }
        if (a % b == 0) {
            System.out.println(b);
        }
    }
}
