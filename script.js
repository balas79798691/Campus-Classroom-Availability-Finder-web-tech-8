const rooms = [
    {name:"A101",capacity:60,facilities:["Projector","Air Conditioning","Smart Board"],slots:{
        Monday:["09:00","10:00","14:00"],Tuesday:["11:00","12:00"],Wednesday:["09:00","15:00"]
    }},
    {name:"B204",capacity:40,facilities:["Projector","Computer"],slots:{
        Monday:["11:00","13:00","15:00"],Tuesday:["09:00","14:00"],Thursday:["10:00","16:00"]
    }},
    {name:"C301 Lab",capacity:30,facilities:["Computer","Air Conditioning"],slots:{
        Monday:["10:00","14:00"],Wednesday:["11:00","13:00"],Friday:["09:00","15:00"]
    }},
    {name:"Seminar Hall",capacity:120,facilities:["Projector","Air Conditioning","Smart Board"],slots:{
        Tuesday:["09:00","13:00"],Thursday:["11:00","14:00"],Friday:["10:00","16:00"]
    }}
];

const day = document.getElementById("day");
const time = document.getElementById("time");
const capacity = document.getElementById("capacity");
const facility = document.getElementById("facility");

function displayRooms(){
    const selectedDay = day.value;
    const selectedTime = time.value;
    const minCapacity = Number(capacity.value) || 0;
    const selectedFacility = facility.value;

    const result = rooms.filter(room => {
        const dayMatch = !selectedDay || room.slots[selectedDay];
        const timeMatch = !selectedDay || !selectedTime ||
            (room.slots[selectedDay] && room.slots[selectedDay].includes(selectedTime));
        const capacityMatch = room.capacity >= minCapacity;
        const facilityMatch = !selectedFacility || room.facilities.includes(selectedFacility);

        return dayMatch && timeMatch && capacityMatch && facilityMatch;
    });

    document.getElementById("rooms").innerHTML = result.map(room => `
        <article class="room">
            <h3>${room.name}</h3>
            <p><strong>Capacity:</strong> ${room.capacity} students</p>
            <p class="available">✓ Available for selected criteria</p>
            <p><strong>Facilities:</strong></p>
            ${room.facilities.map(f => `<span class="facility">${f}</span>`).join("")}
        </article>
    `).join("") || "<p>No suitable rooms found.</p>";
}

[day,time,capacity,facility].forEach(element => {
    element.addEventListener("input", displayRooms);
    element.addEventListener("change", displayRooms);
});

displayRooms();
