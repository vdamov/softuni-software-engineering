import java.util.Scanner;

public class EnterEvenNumber {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        System.out.print("Enter even number: ");
        int n = Integer.parseInt(console.nextLine());

        try {

            while (n % 2 != 0) {
                System.out.println("The number is not even.");
                System.out.print("Enter even number: ");
                n = Integer.parseInt(console.nextLine());


            }
            System.out.print("Even number entered: " + n);

        } catch (Exception a) {
            System.out.println("Invalid number!");
            System.out.print("Enter even number: ");
            n = Integer.parseInt(console.nextLine());

            while (n % 2 != 0) {
                System.out.println("The number is not even.");
                System.out.print("Enter even number: ");
                n = Integer.parseInt(console.nextLine());


            }
            System.out.print("Even number entered: " + n);

        }
    }
}
