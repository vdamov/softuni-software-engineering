import java.util.Scanner;

public class PointInTheFigure {
    public static void main(String[] args) {

        Scanner console = new Scanner(System.in);
        int h = Integer.parseInt(console.nextLine());
        int x = Integer.parseInt(console.nextLine());
        int y = Integer.parseInt(console.nextLine());
        int x1 = 0;
        int y1 = 0;
        int x2 = h * 3;
        int y2 = h;
        int x3 = h;
        int y3 = h;
        int x4 = h * 2;
        int y4 = h * 4;

        if (((((x == x1) || (x == x2)) && (y1 <= y) && (y <= h)) || (((y == y1) || (y == h)) && (x1 <= x) && (x <= x2)) ||
                (((x == h) || (x == x4)) && (h <= y) && (y <= y4)) || (((y == h) || (y == y4)) && (h <= x) && (x <= x4)))
                && (!((y == h) && (x > h) && (x < x4)))) {
            System.out.println("border");
        } else if (((x >= x1) && (x <= x2) && (y >= y1) && (y <= h)) || ((x >= h) && (x <= x4) && (y >= h) && (y <= y4)) ||
                (y == h) && (x > h) && (x < x4)) {
            System.out.println("inside");
        } else {
            System.out.println("outside");
        }
    }
}
