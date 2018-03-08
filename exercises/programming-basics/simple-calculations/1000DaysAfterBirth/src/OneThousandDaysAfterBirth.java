import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

public class OneThousandDaysAfterBirth {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String birthDay = scanner.nextLine();

        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate after1000Days = LocalDate.parse(birthDay, dateTimeFormatter).plusDays(999);

        System.out.println(dateTimeFormatter.format(after1000Days));

    }
}