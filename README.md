Introduction

My main aim behind developing this Musical Sorting Visualizer was to deepen the understanding of sorting algorithms. The Musical Sorting Visualizer is a web application designed to demonstrate sorting algorithms through animation and sound. It is implemented with vanilla JavaScript and the HTML Canvas API, this project visualizes the Bubble Sort algorithm by animating columns that represent data elements. The animation employs linear interpolation to ensure smooth transitions, creating a clear and engaging representation of the sorting process. The Web Audio API is used to provide auditory feedback, adding a layer of interaction that helps users better understand the sorting steps.
Here's a summary of the code for the Musical Sorting Visualizer:

---

The Musical Sorting Visualizer is a web application developed using vanilla JavaScript, HTML, and CSS. It provides an interactive way to understand sorting algorithms through visual and auditory feedback.

1. **HTML (`index.html`)**:
   - Defines the structure of the page, including a canvas for visualization, control buttons (Init, Play, Pause, Bubble Sort, Quick Sort), and a section for displaying algorithm explanations.
   - Links to external CSS and JavaScript files for styling and functionality.

2. **CSS (`style.css`)**:
   - Styles the page with a centered layout and a color scheme that enhances readability and aesthetics.
   - Ensures the control elements and canvas are visually appealing.

3. **JavaScript (`script.js`)**:
   - Manages the core functionality of the visualizer.
   - **Initialization (`init()`):** Generates random bars representing elements, sets up the canvas, and prepares for sorting.
   - **Animation (`animate()`):** Uses the requestAnimationFrame API to update the canvas and visualize sorting operations with smooth transitions achieved through linear interpolation.
   - **Sorting Algorithms:**
     - **Bubble Sort:** Implements the bubble sort algorithm and tracks moves for visualization.
     - **Quick Sort:** Implements quick sort with visualization of swaps and partitions.
   - **Auditory Feedback (`playNote()`):** Generates sound effects corresponding to sorting actions using the Web Audio API.
   - **Control Functions:** Handles play, pause, and algorithm selection, and updates the algorithm explanation dynamically.

4. **JavaScript (`math.js`)**:
   - Provides a helper function for linear interpolation, which is used to create smooth animations by calculating intermediate values between two points.

5. **JavaScript (`column.js`)**:
   - Defines the `Column` class, which represents individual bars in the visualization. Includes methods for animating movements and drawing columns on the canvas with color transitions.

---

This summary captures the main components and functionality of the Musical Sorting Visualizer, highlighting how the application visually and audibly demonstrates sorting algorithms.


Working of :
### Bubble Sort

**Bubble Sort** is a simple comparison-based sorting algorithm that repeatedly steps through a list, compares adjacent elements, and swaps them if they are in the wrong order. The process is repeated until the list is sorted. Here’s a step-by-step explanation:

1. **Initialization**:
   - Start with the first element of the list.

2. **Comparison and Swap**:
   - Compare the current element with the next element in the list.
   - If the current element is greater than the next element, swap them.
   - Move to the next pair of adjacent elements and repeat the comparison and swapping.

3. **Repeat**:
   - Continue the process for each pair of adjacent elements until you reach the end of the list. After each pass through the list, the next largest element is in its correct position.
   - Repeat the process for the remaining elements, ignoring the last sorted elements.

4. **Termination**:
   - The algorithm terminates when a complete pass through the list is made without any swaps, indicating that the list is sorted.

**Time Complexity**: O(n²) in the worst case, where n is the number of elements. This is because each element is compared with every other element.

**Space Complexity**: O(1) as it only requires a constant amount of extra space for the swapping operations.

### Quick Sort

**Quick Sort** is a divide-and-conquer sorting algorithm that works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays based on whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. Here’s a step-by-step explanation:

1. **Select Pivot**:
   - Choose a pivot element from the array. Various strategies can be used for pivot selection, such as picking the first, last, middle, or a random element.

2. **Partitioning**:
   - Rearrange the array so that all elements less than the pivot come before it, and all elements greater than the pivot come after it. The pivot is placed in its correct position in the sorted array.

3. **Recursive Sorting**:
   - Recursively apply the same process to the sub-arrays on either side of the pivot.

4. **Termination**:
   - The recursion terminates when the sub-arrays contain only one element or are empty, indicating that the elements are in their correct positions.

**Time Complexity**: O(n log n) on average, where n is the number of elements. However, it can degrade to O(n²) in the worst case (e.g., when the smallest or largest element is always chosen as the pivot).

**Space Complexity**: O(log n) on average due to the recursion stack.

---

**Summary**: 

- **Bubble Sort** is easy to implement but inefficient for large lists due to its O(n²) time complexity.
- **Quick Sort** is much faster for large lists on average due to its O(n log n) time complexity but can be less predictable in performance depending on the pivot selection.
