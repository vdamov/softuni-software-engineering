import java.text.DecimalFormat;
import java.util.Scanner;

public class OddOrEvenPosition {
    public static void main(String[] args) {
        Scanner console = new Scanner(System.in);
        DecimalFormat df = new DecimalFormat("#.################");
        int n = Integer.parseInt(console.nextLine());

        double evenSum = 0;
        double evenMin = 1000000.0;
        double evenMax = -1000000.0;

        double oddSum = 0;
        double oddMax = -1000000.0;
        double oddMin = 1000000.0;


        for (int i = 1; i <= n; i++) {
            double num = Double.parseDouble(console.nextLine());

            if (i % 2 == 0) {

                evenSum += num;

                if (num > evenMax) {
                    evenMax = num;
                }

                if (num < evenMin) {
                    evenMin = num;
                }

            } else {
                oddSum += num;

                if (num > oddMax) {
                    oddMax = num;
                }
                if (num < oddMin) {
                    oddMin = num;
                }
            }
        }
        System.out.println("OddSum=" + df.format(oddSum) + ",");
        if (oddMin != 1000000.0) {
            System.out.println("OddMin=" + df.format(oddMin) + ",");
        } else {
            System.out.println("OddMin=No,");
        }

        if (oddMax == -1000000.0) {
            System.out.println("OddMax=No,");
        } else {
            System.out.println("OddMax=" + df.format(oddMax) + ",");
        }
        System.out.println("EvenSum=" + df.format(evenSum) + ",");
        if (evenMin == 1000000.0) {
            System.out.println("EvenMin=No,");
        } else {
            System.out.println("EvenMin=" + df.format(evenMin) + ",");
        }
        if (evenMax == -1000000.0) {
            System.out.println("EvenMax=No");
        } else {
            System.out.println("EvenMax=" + df.format(evenMax));
        }

    }
}
