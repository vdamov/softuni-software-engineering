import java.util.Scanner;

public class TwoDRectangleArea {
    public static void main(String[] args) {
        Scanner console = new Scanner(System.in);
        double x1 = Double.parseDouble(console.nextLine());
        double y1 = Double.parseDouble(console.nextLine());
        double x2 = Double.parseDouble(console.nextLine());
        double y2 = Double.parseDouble(console.nextLine());
        double area = Math.abs(x1 - x2) * Math.abs(y1 - y2);
        double perimeter = 2 * (Math.abs(x1 - x2) + Math.abs(y1 - y2));

        System.out.println(area);
        System.out.println(perimeter);

    }
}
