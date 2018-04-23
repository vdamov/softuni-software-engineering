import java.util.Scanner;

public class HalfSumElement {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int n = Integer.parseInt(console.nextLine());
        int sum = 0;
        int biggestNumber = Integer.MIN_VALUE;


        for (int i = 1; i <= n; i++) {
            int currentNumber = Integer.parseInt(console.nextLine());

            sum += currentNumber;

            if (biggestNumber < currentNumber) {
                biggestNumber = currentNumber;
            }

            if (i >= n) {
                if (biggestNumber == (sum - biggestNumber)) {
                    System.out.printf("Yes%nSum = %d", (sum - biggestNumber));
                } else {
                    int difference = (biggestNumber - (sum - biggestNumber));
                    System.out.printf("No%nDiff = %d", Math.abs(difference));
                }
            }


        }

    }
}
