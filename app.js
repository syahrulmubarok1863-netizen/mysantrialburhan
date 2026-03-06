document.addEventListener('DOMContentLoaded', () => {
    const activities = [
        "Puasa",
        "Tilawah Al-Qur'an",
        "Shalat Tarawih",
        "Sedekah / Amal"
    ];

    const days1 = [18, 19, 20, 21, 22, 23, 24, 25, 26];
    const days2 = [27, 28, 29, 30];

    // Populate Headers
    const header1 = document.getElementById('days-header-1');
    const header2 = document.getElementById('days-header-2');

    days1.forEach(day => {
        const span = document.createElement('div');
        span.className = 'day-header';
        span.textContent = day;
        header1.appendChild(span);
    });

    days2.forEach(day => {
        const span = document.createElement('div');
        span.className = 'day-header';
        span.textContent = day;
        header2.appendChild(span);
    });

    // Handle spacing for second header to align with signature box missing days
    for (let i = 0; i < (days1.length - days2.length); i++) {
        const spacer = document.createElement('div');
        spacer.className = 'day-header';
        spacer.style.visibility = 'hidden';
        header2.appendChild(spacer);
    }

    // Populate Bodies
    const body1 = document.getElementById('table-body-1');
    const body2 = document.getElementById('table-body-2');

    function createRow(activity, days, padToLength) {
        const row = document.createElement('div');
        row.className = 'tracking-row';

        const name = document.createElement('div');
        name.className = 'activity-name';
        name.textContent = `${activity}`;
        row.appendChild(name);

        const circlesContainer = document.createElement('div');
        circlesContainer.className = 'check-circles';

        days.forEach(day => {
            const circle = document.createElement('div');
            circle.className = 'day-circle';
            circle.dataset.id = `${activity}-${day}`;

            // Load state
            if (localStorage.getItem(circle.dataset.id)) {
                circle.classList.add('checked');
            }

            circle.addEventListener('click', () => {
                circle.classList.toggle('checked');
                if (circle.classList.contains('checked')) {
                    localStorage.setItem(circle.dataset.id, 'true');
                } else {
                    localStorage.removeItem(circle.dataset.id);
                }
            });
            circlesContainer.appendChild(circle);
        });

        // Add padding circles to align the second table with the first
        if (padToLength && days.length < padToLength) {
            for (let i = 0; i < (padToLength - days.length); i++) {
                const spacer = document.createElement('div');
                spacer.className = 'day-circle';
                spacer.style.visibility = 'hidden';
                circlesContainer.appendChild(spacer);
            }
        }

        row.appendChild(circlesContainer);
        return row;
    }

    activities.forEach(activity => {
        body1.appendChild(createRow(activity, days1, days1.length));
        body2.appendChild(createRow(activity, days2, days1.length));
    });

    // Rating functionality
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const val = parseInt(star.dataset.value);
            stars.forEach(s => {
                const sVal = parseInt(s.dataset.value);
                if (sVal <= val) {
                    s.classList.add('active');
                    s.textContent = '★';
                } else {
                    s.classList.remove('active');
                    s.textContent = '☆';
                }
            });
            localStorage.setItem('journal-rating', val);
        });
    });

    // Load rating
    const savedRating = localStorage.getItem('journal-rating');
    if (savedRating) {
        stars.forEach(s => {
            if (parseInt(s.dataset.value) <= parseInt(savedRating)) {
                s.classList.add('active');
                s.textContent = '★';
            }
        });
    }
});
