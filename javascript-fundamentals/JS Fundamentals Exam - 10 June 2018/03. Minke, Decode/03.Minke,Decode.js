function minkeDecode(arr) {
    let countryRegex = /[A-Z][a-zA-Z]+?[A-Z]/gm;
    let numberRegex = /([0-9]{3}([.][0-9]*)?)/gm;
    let start = +arr[0];
    let end = +arr[1];
    let replace = arr[2];
    let str = arr[3];
    let town = '';
    let exec;
    let country = '';

    country = countryRegex.exec(str)[0];
    country = country.replace(country.substring(start, end + 1), replace);

    while (exec = numberRegex.exec(str)) {
        let number = +exec[1];

        if (number % 1 !== 0) {
            number = Math.ceil(number);
        }
        town += String.fromCharCode(number);
    }

    country = country.toLowerCase();
    country = country.charAt(0).toUpperCase() + country.slice(1);
    town = town.toLowerCase();
    town = town.charAt(0).toUpperCase() + town.slice(1);


    console.log(`${country} => ${town}`);

}
