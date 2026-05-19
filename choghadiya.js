// choghadiya.js

const dayChoghadiyaSequences = {
    0: ['Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg'], // Sun
    1: ['Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal', 'Labh', 'Amrit'], // Mon
    2: ['Rog', 'Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog'], // Tue
    3: ['Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal', 'Labh'], // Wed
    4: ['Shubh', 'Rog', 'Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh'], // Thu
    5: ['Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal'], // Fri
    6: ['Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal'], // Sat
};

const nightChoghadiyaSequences = {
    0: ['Shubh', 'Amrit', 'Chal', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh'], // Sun
    1: ['Chal', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal'], // Mon
    2: ['Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal', 'Rog'], // Tue
    3: ['Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal', 'Rog', 'Kaal'], // Wed
    4: ['Amrit', 'Chal', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit'], // Thu
    5: ['Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal', 'Rog'], // Fri
    6: ['Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal', 'Rog', 'Kaal', 'Labh'], // Sat
};

const dayTimes = [
    "06:00 AM - 07:30 AM",
    "07:30 AM - 09:00 AM",
    "09:00 AM - 10:30 AM",
    "10:30 AM - 12:00 PM",
    "12:00 PM - 01:30 PM",
    "01:30 PM - 03:00 PM",
    "03:00 PM - 04:30 PM",
    "04:30 PM - 06:00 PM"
];

const nightTimes = [
    "06:00 PM - 07:30 PM",
    "07:30 PM - 09:00 PM",
    "09:00 PM - 10:30 PM",
    "10:30 PM - 12:00 AM",
    "12:00 AM - 01:30 AM",
    "01:30 AM - 03:00 AM",
    "03:00 AM - 04:30 AM",
    "04:30 AM - 06:00 AM"
];

const choghadiyaTypes = {
    'Amrit': 'good',
    'Shubh': 'good',
    'Labh': 'good',
    'Chal': 'neutral',
    'Udveg': 'bad',
    'Rog': 'bad',
    'Kaal': 'bad'
};

document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('choghadiyaDate');
    const selectedDateTitle = document.getElementById('currentSelectedDate');
    const dayTableBody = document.querySelector('#dayChoghadiyaTable tbody');
    const nightTableBody = document.querySelector('#nightChoghadiyaTable tbody');

    // Function to calculate and render Choghadiya
    const renderChoghadiya = (dateStr) => {
        const dateObj = new Date(dateStr);
        if (isNaN(dateObj.getTime())) return;

        // Set the title
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        selectedDateTitle.textContent = dateObj.toLocaleDateString('en-US', options);

        const dayOfWeek = dateObj.getDay(); // 0 for Sunday, 1 for Monday, etc.

        // Get Sequences
        const daySeq = dayChoghadiyaSequences[dayOfWeek];
        const nightSeq = nightChoghadiyaSequences[dayOfWeek];

        // Render Day Table
        dayTableBody.innerHTML = '';
        daySeq.forEach((choghadiya, index) => {
            const tr = document.createElement('tr');
            tr.className = choghadiyaTypes[choghadiya];
            tr.innerHTML = `
                <td>${dayTimes[index]}</td>
                <td><strong>${choghadiya}</strong> ${getIcon(choghadiyaTypes[choghadiya])}</td>
            `;
            dayTableBody.appendChild(tr);
        });

        // Render Night Table
        nightTableBody.innerHTML = '';
        nightSeq.forEach((choghadiya, index) => {
            const tr = document.createElement('tr');
            tr.className = choghadiyaTypes[choghadiya];
            tr.innerHTML = `
                <td>${nightTimes[index]}</td>
                <td><strong>${choghadiya}</strong> ${getIcon(choghadiyaTypes[choghadiya])}</td>
            `;
            nightTableBody.appendChild(tr);
        });
    };

    const getIcon = (type) => {
        if (type === 'good') return '<i class="fas fa-check-circle" style="color: #28a745; margin-left:5px;"></i>';
        if (type === 'neutral') return '<i class="fas fa-minus-circle" style="color: #ffc107; margin-left:5px;"></i>';
        if (type === 'bad') return '<i class="fas fa-times-circle" style="color: #dc3545; margin-left:5px;"></i>';
        return '';
    };

    // Initialize with today's date
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    
    dateInput.value = todayStr;
    renderChoghadiya(todayStr);

    // Event listener on date change
    dateInput.addEventListener('change', (e) => {
        if(e.target.value) {
            renderChoghadiya(e.target.value);
        }
    });
});
