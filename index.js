const axios = require('axios');

// Make a request for a user with a given ID
axios.get('https://bio.torre.co/api/people/danielrodriguez/connections')
    .then(function(response) {
        // handle success
        console.log(response);
    })
    .catch(function(error) {
        // handle error
        console.log(error);
    })
    .finally(function() {
        // always executed
    });