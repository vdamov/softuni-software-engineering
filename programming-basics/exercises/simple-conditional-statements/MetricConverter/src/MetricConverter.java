import java.util.Scanner;

public class MetricConverter {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        double value = Double.parseDouble(scanner.nextLine());
        String input = scanner.nextLine();
        String output = scanner.nextLine();

        double converted = 0.00000000;
        double m = 0.0;


        if (input.equals("m")) {
            m = value / 1;
        } else if (input.equals("mm")) {
            m = value / 1000;
        } else if (input.equals("cm")) {
            m = value / 100;
        } else if (input.equals("mi")) {
            m = value / 0.000621371192;
        } else if (input.equals("in")) {
            m = value / 39.3700787;
        } else if (input.equals("km")) {
            m = value / 0.001;
        } else if (input.equals("ft")) {
            m = value / 3.2808399;
        } else if (input.equals("yd")) {
            m = value / 1.0936133;
        }
        if (output.equals("m")) {
            converted = m * 1;
        } else if (output.equals("mm")) {
            converted = m * 1000;
        } else if (output.equals("cm")) {
            converted = m * 100;
        } else if (output.equals("mi")) {
            converted = m * 0.000621371192;
        } else if (output.equals("in")) {
            converted = m * 39.3700787;
        } else if (output.equals("km")) {
            converted = m * 0.001;
        } else if (output.equals("ft")) {
            converted = m * 3.2808399;
        } else if (output.equals("yd")) {
            converted = m * 1.0936133;
        }

        System.out.printf("%.8f", converted);
        System.out.print(" " + output);
    }
}
