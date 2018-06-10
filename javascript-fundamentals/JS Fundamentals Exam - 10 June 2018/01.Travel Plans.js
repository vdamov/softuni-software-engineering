function travelPlans(arr) {
    let specialized = ['Programming', 'Hardware maintenance', 'Cooking', 'Translating', 'Designing'];
    let average = ['Driving', 'Managing', 'Fishing', 'Gardening'];
    let clumsy = ['Singing', 'Accounting', 'Teaching', 'Exam-Making', 'Acting', 'Writing', 'Lecturing', 'Modeling', 'Nursing'];
    let sum = 0;
    let clumsyRound = 0;
    let specializedRound = 0;
    for (let i = 0; i < arr.length; i++) {
        let profession = arr[i].split(' : ')[0];
        let gold = +arr[i].split(' : ')[1];

        if (specialized.includes(profession) && gold >= 200) {
            specializedRound++;
            if (specializedRound % 2 === 0) {
                sum += 200;
            }
            sum += gold * 0.8;
        } else if (average.includes(profession)) {
            sum += gold;
        } else if (clumsy.includes(profession)) {
            clumsyRound++;
            let minus = 1;
            if (clumsyRound % 2 === 0) {
                minus -= 0.05
            } else if (clumsyRound % 3 === 0) {
                minus -= 0.10
            }
            sum += gold * minus;
        }
    }
    console.log(`Final sum: ${sum.toFixed(2)}`);
    if (sum < 1000) {
        let dif = 1000 - sum;
        console.log(`Mariyka need to earn ${dif.toFixed(2)} gold more to continue in the next task.`);
    } else {
        let dif = sum - 1000;
        console.log(`Mariyka earned ${dif.toFixed(2)} gold more.`);
    }
}
