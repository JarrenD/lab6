document.addEventListener('DOMContentLoaded', () => {
    const loadCarsBtn = document.getElementById('loadCarsBtn');
    const carList = document.getElementById('carList');
    cars = [];
    loadCarsBtn.addEventListener('click', () => {
        fetch('/api/message')
            .then(response => response.json())
            .then(data => {
                cars = data;
                carList.innerHTML = '';
                data.forEach((car, index) => {
                    const carCard = document.createElement('div');
                    carCard.classList.add('car-card');
                    carCard.innerHTML = `
                        <h2>${car.make} ${car.model}</h2>
                        <p><strong>Year:</strong> ${car.year}</p>
                        <p><strong>Make:</strong> ${car.make}</p>
                        <p><strong>Model:</strong> ${car.model}</p>
                        <p><strong>Price:</strong> R${car.price}</p>
                        <button class="btn btn-remove" data-index="${index}">Remove</button>
                    `;
                    carList.appendChild(carCard);
                });
            })
            .catch(error => {
                console.error('Error fetching car data:', error);
            });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const addCarsBtn = document.getElementById('addCar');
    const carList = document.getElementById('carList');
    cars = [];

    addCarsBtn.addEventListener('click', () => {
        const make = document.getElementById('make').value;
        const model = document.getElementById('model').value;
        const year = document.getElementById('year').value;
        const color = document.getElementById('color').value;
        const price = document.getElementById('price').value;


        const newCar = {
            make: make,
            model: model,
            year: year,
            color: color,
            price: price
        };

        console.log("trying to add  car");
        addCar(newCar);
        const loadCarsBtn = document.getElementById('loadCarsBtn');
        loadCarsBtn.click();
});
});

// Assume newCar is already constructed

function addCar(newCar) {
    fetch('/api/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add car');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // If you want to reload cars after adding a new car, you can call a function here
        // For example:
        // loadCars();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


// Usage example:
//addCar(newCar);


// carForm.addEventListener('submit', event => {
//     event.preventDefault();
//     const make = document.getElementById('make').value;
//     const model = document.getElementById('model').value;
//     const year = document.getElementById('year').value;
//     const price = document.getElementById('price').value;
//     addCar({ make, model, year, price });
//     carForm.reset();
// });

// Function to remove a car

// Event delegation for remove buttons
// carList.addEventListener('click', event => {
//     if (event.target.classList.contains('btn-remove')) {
//         const index = event.target.dataset.index;
//         removeCar(index);
//     }
// });


// function removeCar(index) {
//     const carId = cars[index].id;
//     fetch(`/api/message/${carId}`, {
//         method: 'DELETE'
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success:', data);
//             //reload cars
//             // const loadCarsBtn = document.getElementById('loadCarsBtn');
//             loadCarsBtn.click();
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }

async function removeCar(index) {
    fetch(`/api/message/${index}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                console.log('Car deleted successfully');
                loadCars(); // Reload cars after removing one
            } else {
                throw new Error('Failed to delete car');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}





// Event delegation for remove buttons
carList.addEventListener('click', event => {
    if (event.target.classList.contains('btn-remove')) {
        const index = event.target.dataset.index;
        removeCar(index);
    }
});