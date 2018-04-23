import java.util.Scanner;

public class Sequence2kPlus1 {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());


        int firstNumber = 1;
        int secondNumber = 1;

        while (n >= secondNumber) {
            firstNumber = secondNumber;
            secondNumber = firstNumber * 2 + 1;
            System.out.println(firstNumber);
        }
    }
}
