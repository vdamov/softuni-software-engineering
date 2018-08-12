let flightsService = (() => {

    function getAllFlights() {
        const endpoint = 'flights?query={"isPublic":"true"}';
        return remote.get('appdata', endpoint, 'kinvey');
    }

    function createFlight(destination, origin, departureDate, departureTime, seats, cost, image, isPublic) {
        let data = {destination, origin, departureDate, departureTime, seats, cost, image, isPublic};
        return remote.post('appdata', 'flights', 'kinvey', data);
    }

    function getFlightById(flightId) {
        const endpoint = `flights/${flightId}`;
        return remote.get('appdata', endpoint, 'kinvey');
    }

    function editFlight(flightId, destination, origin, departureDate, departureTime, seats, cost, image, isPublic) {
        const endpoint = `flights/${flightId}`;
        let data = {destination, origin, departureDate, departureTime, seats, cost, image, isPublic};
        return remote.update('appdata', endpoint, 'kinvey', data);
    }

    function deleteFlight(flightId) {
        const endpoint = `flights/${flightId}`;
        return remote.remove('appdata', endpoint, 'kinvey');
    }

    function getMyFlights(userId) {
        const endpoint = `flights?query={"_acl.creator":"${userId}"}`;
        return remote.get('appdata', endpoint, 'kinvey');
    }


    return {
        getAllFlights,
        createFlight,
        getFlightById,
        editFlight,
        deleteFlight,
        getMyFlights
    }
})();