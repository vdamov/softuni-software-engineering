import java.util.Scanner;

public class Numbers1ToNWithStep3 {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());

        int number = 1;


        while (number <= n) {
            System.out.println(number);
            number += 3;

        }
    }
}
