console.log("hello world");

var prob, sampleSize, calcButton, inputProb, inputSamplesize, calculatingText, currentlyAppended;

calcButton = document.getElementById("calc_button").addEventListener("click",onCalcButtonCLicked);
inputProb = document.getElementById("prob");
inputSamplesize = document.getElementById("samplesize");
calculatingText = document.createElement("p");
calculatingText.innerHTML = "Calculating..."
currentlyAppended = [];


function onCalcButtonCLicked() {
    prob = parseFloat(inputProb.value);
    sampleSize = parseInt(inputSamplesize.value);
    if (isNaN(prob) | isNaN(sampleSize)) {
        window.alert("Gib Zahlen ein, du Lauch!")
        return
    } else if (prob < 0 | prob > 1) {
        window.alert("Gib gescheite Wahrscheinlichkeiten ein, du Kotnascher!")
        return
    } else if (sampleSize < 10 | sampleSize > 100000) {
        window.alert("Gib gescheite Stichprobengrößen ein, du Kartoffel!")
        return
    }
    document.body.appendChild(calculatingText);
    let attemptsList = []
    for (i = 0; i < sampleSize; i++) {
        let attempts = 0;
        while (true) {
            attempts++;
            let roll = Math.random();
            if (roll < prob) {
                attemptsList.push(attempts);
                break;
            }
        }
    }
    let mean, mode, median, q1, q3, iqr, min, max, variance, stdev;
    mean = ss.mean(attemptsList);
    mode = ss.mode(attemptsList);
    median = ss.median(attemptsList);
    q1 = ss.quantile(attemptsList,0.25);
    q3 = ss.quantile(attemptsList,0.75);
    iqr = q3 - q1;
    min = ss.max([ss.min(attemptsList),q1 - iqr * 1.5]);
    max = ss.min([ss.max(attemptsList),q3 + iqr * 1.5]);
    variance = ss.variance(attemptsList);
    stdev = Math.sqrt(variance);
    appendEverything(mean,mode,median,q1,q3,iqr,min,max,variance,stdev);
    document.body.removeChild(calculatingText);
}

function appendEverything(mean,mode,median,q1,q3,iqr,min,max,variance,stdev) {
    currentlyAppended.forEach(el => document.body.removeChild(el));
    currentlyAppended.length = 0;

    meanEl = document.createElement("p");
    meanEl.innerHTML = "Mean: " + mean;
    document.body.appendChild(meanEl);
    currentlyAppended.push(meanEl);

    modeEl = document.createElement("p");
    modeEl.innerHTML = "Mode: " + mode;
    document.body.appendChild(modeEl);
    currentlyAppended.push(modeEl);

    medianEl = document.createElement("p");
    medianEl.innerHTML = "Median: " + median;
    document.body.appendChild(medianEl);
    currentlyAppended.push(medianEl);

    q1El = document.createElement("p");
    q1El.innerHTML = "Q1: " + q1;
    document.body.appendChild(q1El);
    currentlyAppended.push(q1El);

    q3El = document.createElement("p");
    q3El.innerHTML = "Q3: " + q3;
    document.body.appendChild(q3El);
    currentlyAppended.push(q3El);

    iqrEl = document.createElement("p");
    iqrEl.innerHTML = "IQR: " + iqr;
    document.body.appendChild(iqrEl);
    currentlyAppended.push(iqrEl);

    minEl = document.createElement("p");
    minEl.innerHTML = "Min: " + min;
    document.body.appendChild(minEl);
    currentlyAppended.push(minEl);

    maxEl = document.createElement("p");
    maxEl.innerHTML = "Max: " + max;
    document.body.appendChild(maxEl);
    currentlyAppended.push(maxEl);

    varianceEl = document.createElement("p");
    varianceEl.innerHTML = "Variance: " + variance;
    document.body.appendChild(varianceEl);
    currentlyAppended.push(varianceEl);

    stdevEl = document.createElement("p");
    stdevEl.innerHTML = "Standard Devition: " + stdev;
    document.body.appendChild(stdevEl);
    currentlyAppended.push(stdevEl);
}