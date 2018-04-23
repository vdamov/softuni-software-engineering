import java.util.Scanner;

public class InchesToCentimeters {
    public static void main(String[] args) {
        Scanner console = new Scanner(System.in);
        System.out.print("Inches: ");
        double inches = Double.parseDouble(console.nextLine());
        double centimeters = inches * 2.54;
        System.out.println("Centimeters: " + centimeters);
    }
}
