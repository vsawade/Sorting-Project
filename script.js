let array = [];
let delay = 500; 


const algorithmDescriptions = {
    bubble: "Bubble Sort: Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The process repeats until no swaps are needed.",
    insertion: "Insertion Sort: Builds a sorted list one element at a time, by picking each element and placing it in the correct position among the already sorted elements.",
    selection: "Selection Sort: Divides the list into a sorted and unsorted part. Finds the minimum element from the unsorted part and moves it to the sorted part, repeating until the entire list is sorted."
};


function createNumbers() {
    const container = document.getElementById("array-container");
    container.innerHTML = "";
    array.forEach((value, index) => {
        const number = document.createElement("div");
        number.classList.add("number");
        number.innerText = value;
        number.style.margin = "0 10px";
        number.setAttribute("id", `num-${index}`);
        container.appendChild(number);
    });
}


function addExplanation(text) {
    const explanationContainer = document.getElementById("explanation");
    const paragraph = document.createElement("p");
    paragraph.innerText = text;
    explanationContainer.appendChild(paragraph);
}


function clearExplanations() {
    const explanationContainer = document.getElementById("explanation");
    explanationContainer.innerHTML = "";
}


function showAlgorithmOverview(algorithm) {
    clearExplanations();
    addExplanation(algorithmDescriptions[algorithm]);
}


function startSorting() {
    const input = document.getElementById("array-input").value;
    array = input.split(",").map(Number);


    if (array.length > 8 || array.some(isNaN)) {
        alert("Please enter up to 8 valid numbers separated by commas.");
        return;
    }

    createNumbers();
    clearExplanations();
    
    const algorithm = document.getElementById("algorithm-select").value;
    showAlgorithmOverview(algorithm); 

    setTimeout(() => { 
        if (algorithm === "bubble") bubbleSort();
        else if (algorithm === "insertion") insertionSort();
        else if (algorithm === "selection") selectionSort();
    }, 1500); 
}


async function bubbleSort() {
    addExplanation("Starting Bubble Sort: We will repeatedly compare and swap adjacent elements if they are out of order.");
    for (let i = 0; i < array.length - 1; i++) {
        let swaps = 0; /
        addExplanation(`Pass ${i + 1} begins: We will move the largest unsorted element to its correct position.`);
        for (let j = 0; j < array.length - i - 1; j++) {
            highlightNumbers(j, j + 1, "red");
            await new Promise(resolve => setTimeout(resolve, delay));

            if (array[j] > array[j + 1]) {
                addExplanation(`Swapping ${array[j]} and ${array[j + 1]} as ${array[j]} > ${array[j + 1]}`);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swaps++;
                createNumbers();
            }
            resetHighlights(j, j + 1);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        addExplanation(`Pass ${i + 1} complete: ${swaps} swaps made. The largest element is now in place.`);
    }
    addExplanation("Bubble Sort Complete! All elements are now in sorted order.");
}

async function insertionSort() {
    addExplanation("Starting Insertion Sort: We will build a sorted section by inserting each element into its correct position.");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        let moves = 0; 
        addExplanation(`Selecting ${key} as the key element to insert into the sorted section.`);
        highlightNumbers(i, j, "red");
        await new Promise(resolve => setTimeout(resolve, delay));

        while (j >= 0 && array[j] > key) {
            addExplanation(`Since ${array[j]} > ${key}, moving ${array[j]} one position to the right.`);
            array[j + 1] = array[j];
            moves++;
            createNumbers();
            await new Promise(resolve => setTimeout(resolve, delay));
            j = j - 1;
        }
        array[j + 1] = key;
        addExplanation(`Inserted ${key} at position ${j + 1} after ${moves} shifts.`);
        createNumbers();
        resetHighlights(i, j + 1);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    addExplanation("Insertion Sort Complete! All elements are now in sorted order.");
}


async function selectionSort() {
    addExplanation("Starting Selection Sort: We will select the smallest unsorted element and place it in its correct position.");
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        addExplanation(`Pass ${i + 1} begins: Assuming ${array[i]} (position ${i}) is the minimum in the unsorted section.`);
        highlightNumbers(minIdx, null, "red");
        for (let j = i + 1; j < array.length; j++) {
            highlightNumbers(j, null, "blue");
            await new Promise(resolve => setTimeout(resolve, delay));
            if (array[j] < array[minIdx]) {
                addExplanation(`Found new minimum: ${array[j]} at position ${j}, replacing previous minimum ${array[minIdx]}.`);
                minIdx = j;
            }
            resetHighlights(j);
        }
        if (minIdx !== i) {
            addExplanation(`Swapping ${array[i]} (position ${i}) with minimum ${array[minIdx]} (position ${minIdx}).`);
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            createNumbers();
        } else {
            addExplanation(`No swap needed; ${array[i]} is already in the correct position.`);
        }
        resetHighlights(i, minIdx);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    addExplanation("Selection Sort Complete! All elements are now in sorted order.");
}


function highlightNumbers(index1, index2, color) {
    document.getElementById(`num-${index1}`).classList.add(color);
    if (index2 !== null) document.getElementById(`num-${index2}`).classList.add(color);
}

function resetHighlights(index1, index2 = null) {
    document.getElementById(`num-${index1}`).classList.remove("red", "blue");
    if (index2 !== null) document.getElementById(`num-${index2}`).classList.remove("red", "blue");
}
