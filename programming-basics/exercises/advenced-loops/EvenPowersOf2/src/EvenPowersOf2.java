import java.util.Scanner;

public class EvenPowersOf2 {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());


        int number = 2;
        System.out.println("1");

        while (number <= n) {
            System.out.println((int) Math.pow(2, number));
            number += 2;

        }
    }
}
