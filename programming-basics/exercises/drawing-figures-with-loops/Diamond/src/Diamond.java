import java.util.Scanner;

public class Diamond {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = Integer.parseInt(scanner.nextLine());

        int stars = -1;
        int underscore = -1;
        int MidUnderscore = 1;
        int top = -1;
        int bot = -1;


        if (n == 1) {
            System.out.println("*");
            return;
        } else if (n == 2) {
            System.out.println("**");
            return;

        }

        if (n % 2 == 0) {
            stars = 2;
            underscore = (n - stars) / 2;
            top = n / 2;
            bot = n / 2 - 1;
            MidUnderscore = 2;
        } else {
            stars = 1;
            top = n / 2 + 1;
            bot = n / 2;
            underscore = (n - stars) / 2;
            MidUnderscore = 1;

        }

        for (int row = 0; row < 1; row++) {
            System.out.print(repeatStr(underscore - row, "-") + repeatStr(stars, "*") + repeatStr(underscore, "-"));
            System.out.println();
        }
        //top
        for (int row = 1; row < top; row++) {
            System.out.print(repeatStr(underscore - row, "-") + "*" + repeatStr(MidUnderscore, "-") + "*" + repeatStr(underscore - row, "-"));
            System.out.println();
            MidUnderscore = MidUnderscore + 2;


        }
        MidUnderscore = MidUnderscore - 2;

        //bot
        for (int row = 1; row < bot; row++) {
            MidUnderscore = MidUnderscore - 2;
            System.out.print(repeatStr(row, "-") + "*" + repeatStr(MidUnderscore, "-") + "*" + repeatStr(row, "-"));
            System.out.println();
        }
        for (int row = 0; row < 1; row++) {
            System.out.print(repeatStr(underscore - row, "-") + repeatStr(stars, "*") + repeatStr(underscore, "-"));
            System.out.println();
        }

    }

    static String repeatStr(int count, String text) {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < count; i++) {
            sb.append(text);
        }
        return sb.toString();
    }
}
