document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/clubs')
    .then(response => response.json())
    .then(data => {
        const clubsContainer = document.getElementById('clubs');
        data.forEach(club => {
            const clubCard = document.createElement('div');
            clubCard.classList.add('club-card');
            clubCard.innerHTML = `
            <img src="${club.imageUrl}" alt="${club.name}">
            <h2>${club.name}</h2>
            <p>Brand: ${club.brand}</p>
            <p>Type: ${club.type}</p>
            <p>Price: $${club.price}</p>
            <p>Compatibility: ${club.compatibility.join(', ')}</p>
            `;
            clubsContainer.appendChild(clubCard);
        });
    });

    document.getElementById('new-club-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => (data[key] = value));
        fetch('/api/clubs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.reload();
            } else {
                alert('Error adding club');
            }
        });
    });
});