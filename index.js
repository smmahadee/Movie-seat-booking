const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const seatsContainer = document.querySelector('.container');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movie = document.querySelector('select');

let ticketPrice = +movie.value;


// Update Selected Seats
const updateSelectedSeats = (seat) => {
  seat?.classList.toggle('selected');

  const selectedSeats = document.querySelectorAll('.row .selected');
  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;

  // save seats index into local storage
  const seatIndexs = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem('seatIndexes', JSON.stringify(seatIndexs));
};

// set movie index and price into local storage
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('movieIndex', movieIndex);
  localStorage.setItem('moviePrice', moviePrice);
};

// Populate UI from local storage data
const populateUI = () => {

  // populate seats from local storage
  const selectedSeats = JSON.parse(localStorage.getItem('seatIndexes'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      selectedSeats.indexOf(index) > -1 && seat.classList.add('selected')
    });
  }

  // populate total price  and total seats from local sorage
  const moviePrice = JSON.parse(localStorage.getItem('moviePrice'));
  if(moviePrice !== null){
   ticketPrice = moviePrice;
  }

  // populate movie index from storage
  const movieIndex = localStorage.getItem('movieIndex');
  if(movieIndex !== null){
    movie.selectedIndex = movieIndex;
  }
};
populateUI();

updateSelectedSeats();

// movie select add event listener
movie.addEventListener('change', (e) => {
  ticketPrice = e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedSeats();
});

// Seats add event listener

seatsContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('occupied')) {
    updateSelectedSeats(e.target);
  }
});
