import java.util.Scanner;

public class NumberInRange1To100 {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        System.out.print("Еnter a number in the range [1...100]: ");
        int n = Integer.parseInt(console.nextLine());

        while (true) {
            if (n >= 1 && n <= 100) {
                System.out.println("The number is: " + n);
                break;
            }
            System.out.println("Invalid number!");
            System.out.print("Еnter a number in the range [1...100]: ");
            n = Integer.parseInt(console.nextLine());
        }
    }
}
