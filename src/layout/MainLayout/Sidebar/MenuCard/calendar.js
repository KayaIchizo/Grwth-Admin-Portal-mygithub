import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Calendarview() {
    const [value, onChange] = useState(new Date());
    const monthArray = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const month = monthArray[value.getMonth()];

    return (
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
            {/* {'<' + month + '>'} */}
            <Calendar onChange={onChange} value={value} />
        </div>
    );
}
