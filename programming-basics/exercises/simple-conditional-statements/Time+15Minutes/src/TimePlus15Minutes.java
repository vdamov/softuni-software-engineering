import java.util.Scanner;

public class TimePlus15Minutes {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        int hours = Integer.parseInt(scanner.nextLine());
        int minutes = Integer.parseInt(scanner.nextLine());
        minutes = minutes + 15;


        if (minutes >= 60) {
            minutes = minutes - 60;
            hours = hours + 1;
        }
        if (hours >= 24) {
            hours = hours - 24;
        }
        if (minutes < 10) {
            System.out.println(hours + ":0" + minutes);
        } else {
            System.out.println(hours + ":" + minutes);
        }

    }
}
