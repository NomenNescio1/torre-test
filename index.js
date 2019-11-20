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

    //GET user connections based on input
    //GET user bio based on input
    //GET connections bio based on previous GET
    //match user interests with connections strengths