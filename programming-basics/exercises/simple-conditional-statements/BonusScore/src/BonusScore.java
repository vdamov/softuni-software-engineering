import java.util.Scanner;

public class BonusScore {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        int num = Integer.parseInt(scanner.nextLine());
        double bonus = 0.0;
        double bonus2 = 0.0;

        if (num > 1000) {
            bonus = num * 0.1;
        } else if (num > 100) {
            bonus = num * 0.2;
        } else if (num <= 100) {
            bonus = +5;
        }

        if (num % 2 == 0) {
            bonus2 = +1;
        } else if (num % 5 == 0) {
            bonus2 = +2;
        } else {
            bonus2 = 0.0;
        }
        System.out.println(bonus + bonus2);
        System.out.println(bonus + bonus2 + num);


    }
}
