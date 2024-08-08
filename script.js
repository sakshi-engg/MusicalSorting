const myCanvas = document.getElementById('myCanvas');
myCanvas.width = 400;
myCanvas.height = 300;
const margin = 30;
const n = 19; 
const array = [];
let moves = [];
let animationId;  // Store the requestAnimationFrame ID
let isPaused = false;  // Track if the animation is paused
let currentAlgorithm = 'bubbleSort';  // Track the current algorithm

const cols = [];
const spacing = (myCanvas.width - margin * 2) / n;
const ctx = myCanvas.getContext("2d");

const maxColumnHeight = 200;

// Algorithm explanations
const algorithmExplanations = {
    'bubbleSort': `
        <strong>Bubble Sort:</strong> A simple comparison-based algorithm that repeatedly steps through the list,
        compares adjacent elements, and swaps them if they are in the wrong order. This process is 
        repeated until the list is sorted. Smaller elements "bubble" to the top of the list.
        <br><strong>Time Complexity:</strong> O(n²)
        <br><strong>Space Complexity:</strong> O(1)
    `,
    'quickSort': `
        <strong>Quick Sort:</strong> A divide-and-conquer algorithm that selects a 'pivot' element 
        from the array and partitions the other elements into two sub-arrays, according to whether 
        they are less than or greater than the pivot. The sub-arrays are then sorted recursively.
        <br><strong>Time Complexity:</strong> O(n log n) on average, O(n²) in the worst case
        <br><strong>Space Complexity:</strong> O(log n)
    `
};

init();

let audioCtx = null;

// Function to play a note corresponding to the frequency
function playNote(freq, type) {
    if (audioCtx == null) {
        audioCtx = new (AudioContext || webkitAudioContext || window.webkitAudioContext)();
    }

    const dur = 0.2;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.type = type;
    osc.stop(audioCtx.currentTime + dur);

    const node = audioCtx.createGain();
    node.gain.value = 0.4;
    node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
    osc.connect(node);
    node.connect(audioCtx.destination);
}

// Function to initialize the bars
function init() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random(); // Generate random numbers in the range of 0 to 1
    }
    moves = []; // Stop previously running animation
    isPaused = false;  // Reset pause state
    cancelAnimationFrame(animationId);  // Stop any ongoing animation
    for (let i = 0; i < array.length; i++) {
        const x = i * spacing + spacing / 2 + margin;
        const y = myCanvas.height - margin - i * 3;
        const width = spacing - 4;
        const height = maxColumnHeight * array[i];
        cols[i] = new Column(x, y, width, height);
    }
    displayAlgorithmExplanation(currentAlgorithm); // Display the explanation for the current algorithm
}

// Function to play the sorting animation
function play() {
    isPaused = false;  // Resume the animation
    if (moves.length === 0) {
        // Select the appropriate sorting algorithm
        if (currentAlgorithm === 'bubbleSort') {
            moves = bubbleSort(array.slice());
        } else if (currentAlgorithm === 'quickSort') {
            moves = quickSort(array.slice());
        } 
    }
    animate();
}

// Function to pause the sorting animation
function pause() {
    isPaused = true;  // Pause the animation
}

// Bubble Sort algorithm with move tracking
function bubbleSort(array) {
    const moves = [];
    do {
        var swapped = false;
        for (let i = 1; i < array.length; i++) {
            if (array[i - 1] > array[i]) {
                swapped = true;
                [array[i - 1], array[i]] = [array[i], array[i - 1]];
                moves.push({ indices: [i - 1, i], swap: true });
            } else {
                moves.push({ indices: [i - 1, i], swap: false });
            }
        }
    } while (swapped);
    return moves;
}

// Quick Sort algorithm with move tracking
function quickSort(array) {
    const moves = [];

    function partition(start, end) {
        const pivot = array[end];
        let i = start;
        for (let j = start; j < end; j++) {
            if (array[j] < pivot) {
                [array[i], array[j]] = [array[j], array[i]];
                moves.push({ indices: [i, j], swap: true });
                i++;
            }
        }
        [array[i], array[end]] = [array[end], array[i]];
        moves.push({ indices: [i, end], swap: true });
        return i;
    }

    function quickSortRecursive(start, end) {
        if (start >= end) return;
        const pivotIndex = partition(start, end);
        quickSortRecursive(start, pivotIndex - 1);
        quickSortRecursive(pivotIndex + 1, end);
    }

    quickSortRecursive(0, array.length - 1);
    return moves;
}



// Function to animate the sorting visualization
function animate() {
    if (isPaused) return;  // Stop the animation loop if paused

    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    let changed = false;
    for (let i = 0; i < cols.length; i++) {
        changed = cols[i].draw(ctx) || changed;
    }

    if (!changed && moves.length > 0) {
        const move = moves.shift();
        const [i, j] = move.indices;
        const waveformType = move.swap ? "square" : "sine";
        playNote(cols[i].height + (cols[j] ? cols[j].height : 0), waveformType);
        if (move.swap) {
            cols[i].moveTo(cols[j]);
            cols[j].moveTo(cols[i], -1);
            [cols[i], cols[j]] = [cols[j], cols[i]];
        } else {
            cols[i].jump();
            if (cols[j]) cols[j].jump();
        }
    }

    customRequestAnimationFrame(animate);
}

// Function to change the sorting algorithm
function changeAlgorithm(algorithm) {
    currentAlgorithm = algorithm;
    init();  // Reinitialize with the new algorithm
    displayAlgorithmExplanation(algorithm); // Display the explanation for the selected algorithm
}

// Function to display the explanation of the selected algorithm
function displayAlgorithmExplanation(algorithm) {
    const explanationContainer = document.getElementById('algorithm-explanation');
    explanationContainer.innerHTML = algorithmExplanations[algorithm] || 'Select an algorithm to see its explanation.';
}

// Speed Control
const speedControl = document.getElementById('speed-control');
let animationSpeed = parseInt(speedControl.value);

// Update the animation speed based on the slider value
speedControl.addEventListener('input', () => {
    animationSpeed = parseInt(speedControl.value);
});

function customRequestAnimationFrame(callback) {
    const start = performance.now();
    function frame(time) {
        const elapsed = time - start;
        if (elapsed >= 1000 / animationSpeed) {
            callback(time);
        } else {
            requestAnimationFrame(frame);
        }
    }
    requestAnimationFrame(frame);
}
