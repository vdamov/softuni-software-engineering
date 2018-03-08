import java.util.Scanner;

public class SumSeconds {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        int first = Integer.parseInt(scanner.nextLine());
        int second = Integer.parseInt(scanner.nextLine());
        int third = Integer.parseInt(scanner.nextLine());

        int sum = (first + second + third);
        int mins = sum / 60;
        int secs = sum % 60;

        if (secs >= 10) {
            System.out.println(mins + ":" + secs);
        } else {
            System.out.println(mins + ":0" + secs);
        }

    }
}
