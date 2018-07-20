# Problem 4 – Travel Time

*It’s finally time for Mariykaь to organize her traveling plans. So far we already know that she wishes to go on a world trip and she already collected some money and made some useful research for the traveling destinations. To organize her plans and travel route she need your great help. So, let’s begin…..*

Write a JavaScript program that **collects** and **orders **information about traveling destinations.

As **input **you will receive an array of strings.

Each string will consist of the following information with format:

**"Country name > Town name > Travel cost"**

Country name will be unique string, Town name will also be unique string, Travel cost will be a number.

If you receive **the same** Town name twice, you should keep the **cheapest** offer. **Have in mind** that one Country may have **several **Towns to visit.

If you receive Town name starting with lower case letter ,you should make it to upper, as shown in the example above.

After you finish the organizational part, you need to let Mariyka know which destination point to visit first.. The order will be as follows:  First sort Country names **alphabetically **and then sort Town names by **lowest** Travel cost.

### Input

You will receive **one argument– **an **array strings **as shown above.

### Output

Print on the **console** the information you’ve collected, **sorted **by the given rules,** formatted **as seen in the examples.

### Constraints

* The **number** of **elements** in the** input argument** will be in range **[1..100] inclusive**

* There **will** be **no invalid** **input**

* There **will **be **no negative Travel cost**

### Examples

<table>
  <tr>
    <td>Input</td>
  </tr>
  <tr>
    <td>["Bulgaria > Sofia > 500",
"Bulgaria > Sopot > 800",
"France > Paris > 2000",
"Albania > Tirana > 1000",
"Bulgaria > Sofia > 200" ]
</td>
  </tr>
  <tr>
    <td>Output</td>
  </tr>
  <tr>
    <td>Albania -> Tirana -> 1000
Bulgaria -> Sofia -> 200 Sopot -> 800
France -> Paris -> 2000</td>
  </tr>
</table>


