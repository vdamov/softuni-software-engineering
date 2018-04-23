import java.util.Scanner;

public class ThreeEqualNumbers {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        int one = Integer.parseInt(scanner.nextLine());
        int two = Integer.parseInt(scanner.nextLine());
        int three = Integer.parseInt(scanner.nextLine());

        if (one == two && two == three && three == one) {
            System.out.println("yes");
        } else {
            System.out.println("no");
        }
    }
}
