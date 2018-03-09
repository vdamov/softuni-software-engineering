import java.util.Scanner;

public class House {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());

        int roof = -1;
        int dashes = -1;
        int asterisks = -1;

        if (n % 2 == 0) {
            roof = n / 2;
            asterisks = 2;
            dashes = n / 2 - 1;
        } else {
            roof = n / 2 + 1;
            asterisks = 1;
            dashes = n / 2;
        }


        for (int row = 0; row < roof; row++) {
            System.out.print(repeatStr(dashes - row, "-"));
            System.out.print(repeatStr(asterisks + 2 * row, "*"));
            System.out.println(repeatStr(dashes - row, "-"));
        }
        for (int i = 0; i < n - roof; i++) {
            System.out.print("|");
            System.out.print(repeatStr(n - 2, "*"));
            System.out.println("|");

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
