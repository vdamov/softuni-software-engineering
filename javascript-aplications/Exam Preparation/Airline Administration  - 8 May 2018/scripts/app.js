$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');


        this.get('#/home', homePage)
        this.get('index.html', homePage)

        function homePage(ctx) {
            ctx.isLogged = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            if (!auth.isAuth()) {
                ctx.loadPartials({
                    nav: './templates/common/nav.hbs',
                    footer: './templates/common/footer.hbs',
                    login: './templates/sections/login.hbs'
                }).then(function () {
                    this.partial('./templates/pages/home.hbs')
                })
            } else {
                ctx.redirect('#/list')
            }
        }

        this.get('#/register', function (ctx) {
            ctx.isLogged = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                nav: './templates/common/nav.hbs',
                footer: './templates/common/footer.hbs',
                register: './templates/sections/register.hbs'
            }).then(function () {
                this.partial('./templates/pages/registerPage.hbs')
            })
        })

        this.post('#/register', function (ctx) {
            ctx.isLogged = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            let username = ctx.params.username;
            let pass = ctx.params.pass;
            let checkPass = ctx.params.checkPass;

            let regexUn = /[\s\S]{5,}/


            if (!username.match(regexUn)) {
                notify.showError('Username should be a string with at least 5 characters long!')
            } else if (pass !== checkPass) {
                notify.showError('Both passwords should match!')
            } else if (pass === '') {
                notify.showError('Passwords input fields shouldn’t be empty!')
            } else {
                auth.register(username, pass).then(function (data) {
                    auth.saveSession(data)
                    notify.showInfo('User registration successful.')
                    ctx.redirect('#/home')
                })
            }
        })

        this.get('#/login', function (ctx) {
            ctx.isLogged = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                nav: './templates/common/nav.hbs',
                footer: './templates/common/footer.hbs',
                login: './templates/sections/login.hbs'
            }).then(function () {
                this.partial('./templates/pages/home.hbs')
            })

        })

        this.get('#/logout', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home')
                return;
            }

            auth.logout().then(function () {
                sessionStorage.clear()
                notify.showInfo('Logout successful.')
                ctx.redirect('#/home')
            })
        })

        this.post('#/login', function (ctx) {
            ctx.isLogged = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            let username = ctx.params.username;
            let password = ctx.params.pass;

            auth.login(username, password).then(function (data) {
                auth.saveSession(data);
                notify.showInfo('Login successful.')
                ctx.redirect('#/home')
            }).catch(notify.handleError)
        })


        this.get('#/list', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home')
                return;
            }

            flightsService.getAllFlights()
                .then(function (flight) {
                    ctx.isLogged = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.flight = flight;

                    ctx.loadPartials({
                        nav: './templates/common/nav.hbs',
                        footer: './templates/common/footer.hbs',
                        flights: './templates/sections/flights.hbs'

                    }).then(function () {
                        this.partial('./templates/pages/list.hbs');
                    })

                })
        })

        this.get('#/create/flight', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home')
                return;
            }

            ctx.isLogged = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                nav: './templates/common/nav.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/pages/create.hbs')
            })


        })

        this.post('#/create/flight', function (ctx) {

            ctx.isLogged = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            let destination = ctx.params.destination;
            let origin = ctx.params.origin;
            let departureTime = ctx.params.departureTime;
            let departureDate = ctx.params.departureDate;
            let seats = ctx.params.seats;
            let cost = ctx.params.cost;
            let image = ctx.params.img;
            let public = ctx.params.public !== undefined;

            if (destination === '' || origin === '') {
                notify.showError('Fill all fields.')
            } else if (seats < 0 || cost < 0) {
                notify.showError('Seats and Cost must be positive numbers.')
            } else {
                flightsService.createFlight(destination, origin, departureDate, departureTime, seats, cost, image, public).then(function () {
                    notify.showInfo('Created flight.')
                    ctx.redirect('#/list');
                })
            }


        })

        this.get('#/flight/details/:id', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home')
                return;
            }

            ctx.isLogged = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            let id = ctx.params.id;

            flightsService.getFlightById(id).then(function (flight) {
                ctx.isAuthor = sessionStorage.getItem('userId') === flight._acl.creator;
                ctx.flight = flight;
                ctx.loadPartials({
                    nav: './templates/common/nav.hbs',
                    footer: './templates/common/footer.hbs'
                }).then(function () {
                    this.partial(`./templates/pages/details.hbs`)
                })
            })
        })

        this.get('#/flight/edit/:id', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home')
                return;
            }
            ctx.isLogged = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            let id = ctx.params.id;

            flightsService.getFlightById(id).then(function (flight) {
                ctx.flight = flight;
                ctx.loadPartials({
                    nav: './templates/common/nav.hbs',
                    footer: './templates/common/footer.hbs'
                }).then(function () {
                    this.partial(`./templates/pages/edit.hbs`)
                })
            })


        })

        this.post('#/flight/edit/:id', function (ctx) {
            let id = ctx.params.id;
            let destination = ctx.params.destination;
            let origin = ctx.params.origin;
            let departureTime = ctx.params.departureTime;
            let departureDate = ctx.params.departureDate;
            let seats = ctx.params.seats;
            let cost = ctx.params.cost;
            let image = ctx.params.img;
            let public = ctx.params.public !== undefined;

            flightsService.editFlight(id, destination, origin, departureDate, departureTime, seats, cost, image, public)
                .then(function () {
                    notify.showInfo('Successfully edited flight.')
                    ctx.redirect(`#/flight/details/${id}`)
                })
        })

        this.get('#/flights', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home')
                return;
            }
            ctx.isLogged = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            flightsService.getMyFlights(sessionStorage.getItem('userId')).then(function (flights) {
                ctx.flights = flights;
                ctx.loadPartials({
                    nav: './templates/common/nav.hbs',
                    footer: './templates/common/footer.hbs',
                    myFlights: './templates/sections/myFlights.hbs'
                }).then(function () {
                    this.partial('./templates/pages/myFlightsList.hbs');
                })

            })
        })

        this.get('#/flight/delete/:id', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home')
                return;
            }
            ctx.isLogged = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            let id = ctx.params.id;

            flightsService.deleteFlight(id).then(function () {
                notify.showInfo('Flight deleted.')
                ctx.redirect('#/flights')
            })
        })


    })
    app.run()
})