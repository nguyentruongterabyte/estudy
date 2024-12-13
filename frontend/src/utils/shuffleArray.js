// Fisher-Yates Shuffle
const shuffleArray = ( array = [] ) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap i, j element `Destructuring Assignment`
  }

  return shuffled;
};

export default shuffleArray;


/**
 * The Fisher–Yates shuffle is an algorithm for shuffling a finite sequence. 
 * The algorithm takes a list of all the elements of the sequence, 
 * and continually determines the next element in the shuffled sequence 
 * by randomly drawing an element from the list until no elements remain.
 * */