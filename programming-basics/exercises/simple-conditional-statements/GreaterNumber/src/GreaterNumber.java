import java.util.Scanner;

public class GreaterNumber {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter two integers: ");
        int first = Integer.parseInt(scanner.nextLine());
        int second = Integer.parseInt(scanner.nextLine());

        if (first >= second) {
            System.out.println("Greater number: " + first);
        } else {
            System.out.println("Greater number: " + second);
        }

    }
}
