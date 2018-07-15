function travelTime(arr) {
    let map = new Map();
    //filling the map
    for (let i = 0; i < arr.length; i++) {
        let token = arr[i].split(' > ');
        let country = token[0];
        let town = token[1];
        let price = +token[2];

        town = town.charAt(0).toUpperCase() + town.slice(1);

        if (!map.has(country)) {
            map.set(country, new Map());
        }
        if (!map.get(country).has(town)) {
            map.get(country).set(town, Number.POSITIVE_INFINITY);
        }

        if (map.get(country).get(town) > price) {
            map.get(country).set(town, price);
        }
    }

    //sorting and printing
    let sortedMap = Array.from(map.keys()).sort((a, b) => a.localeCompare(b));
    for (let country of sortedMap) {
        let output = `${country} -> `;
        let sortedTowns = Array.from(map.get(country)).sort((a, b) => a[1] - b[1]);

        for (let [town, price] of sortedTowns) {
            output += `${town} -> ${price} `
        }
        console.log(output);
    }
}
