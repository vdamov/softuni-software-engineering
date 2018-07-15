function travelInvestigation(arr) {
    let delimeter = arr[1];
    let companies = arr[0].split(delimeter);
    let valid = [];
    let invalid = [];

    for (let i = 2; i < arr.length; i++) {
        let sentence = arr[i].toLowerCase();
        let isValid = true;
        for (let j = 0; j < companies.length; j++) {
            let company = companies[j];
            if (!sentence.toLowerCase().includes(company)) {
                isValid = false;
                break;
            }
        }
        if (isValid) {
            valid.push(sentence);
        } else {
            invalid.push(sentence);
        }
    }
    if (valid.length > 0) {
        console.log(`ValidSentences`);
        for (let i = 0; i < valid.length; i++) {
            console.log(`${i + 1}. ${valid[i]}`);
        }
    }
    if (invalid.length > 0) {
        if (valid.length > 0) {
            console.log(`==============================`);
        }
        console.log(`InvalidSentences`);
        for (let i = 0; i < invalid.length; i++) {
            console.log(`${i + 1}. ${invalid[i]}`);
        }
    }


}
