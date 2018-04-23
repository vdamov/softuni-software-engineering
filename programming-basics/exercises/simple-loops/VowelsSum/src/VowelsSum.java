import java.util.Scanner;

public class VowelsSum {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        String text = console.nextLine();
        int sum = 0;

        for (int i = 0; i <= text.length(); i++) {
            char character = text.charAt(i);
            switch (character) {
                case 'a':
                    sum += 1;
                    break;
                case 'e':
                    sum += 2;
                    break;
                case 'i':
                    sum += 3;
                    break;
                case 'o':
                    sum += 4;
                    break;
                case 'u':
                    sum += 5;
                    break;
            }
            if (i >= text.length() - 1) {
                System.out.println(sum);
                return;
            }

        }
    }
}
