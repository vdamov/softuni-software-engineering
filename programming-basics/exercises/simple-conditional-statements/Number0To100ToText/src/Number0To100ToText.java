import java.util.Scanner;

public class Number0To100ToText {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        int number = Integer.parseInt(scanner.nextLine());

        if (number < 0 || number > 100) {
            System.out.println("invalid number");
        } else if (number == 0) {
            System.out.println("zero");
        } else if (number == 100) {
            System.out.println("one hundred");
        } else {
            if (number > 10 && number < 20) {
                if (number == 11) {
                    System.out.println("eleven");
                } else if (number == 12) {
                    System.out.println("twelve");
                } else if (number == 13) {
                    System.out.println("thirteen");
                } else if (number == 14) {
                    System.out.println("fourteen");
                } else if (number == 15) {
                    System.out.println("fifteen");
                } else if (number == 16) {
                    System.out.println("sixteen");
                } else if (number == 17) {
                    System.out.println("seventeen");
                } else if (number == 18) {
                    System.out.println("eighteen");
                } else if (number == 19) {
                    System.out.println("nineteen");
                }
            } else {
                String tens = "";
                String ones = "";
                switch (number / 10) {
                    case 1:
                        tens = "ten";
                        break;
                    case 2:
                        tens = "twenty";
                        break;
                    case 3:
                        tens = "thirty";
                        break;
                    case 4:
                        tens = "forty";
                        break;
                    case 5:
                        tens = "fifty";
                        break;
                    case 6:
                        tens = "sixty";
                        break;
                    case 7:
                        tens = "seventy";
                        break;
                    case 8:
                        tens = "eighty";
                        break;
                    case 9:
                        tens = "ninety";
                        break;
                }
                switch (number % 10) {
                    case 1:
                        ones = "one";
                        break;
                    case 2:
                        ones = "two";
                        break;
                    case 3:
                        ones = "three";
                        break;
                    case 4:
                        ones = "four";
                        break;
                    case 5:
                        ones = "five";
                        break;
                    case 6:
                        ones = "six";
                        break;
                    case 7:
                        ones = "seven";
                        break;
                    case 8:
                        ones = "eight";
                        break;
                    case 9:
                        ones = "nine";
                        break;
                }
                if (number % 10 == 0) {
                    System.out.println(tens);
                } else {
                    System.out.printf(number < 10 ? ones : "%s %s", tens, ones);


                }
            }
        }
    }
}
