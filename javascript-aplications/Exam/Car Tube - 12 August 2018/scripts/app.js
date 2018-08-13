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
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs'

                }).then(function () {
                    this.partial('./templates/pages/welcome.hbs')
                })
            } else {
                ctx.redirect('#/listing')
            }
        }

        this.get('#/register', function (ctx) {
            if (auth.isAuth()) {
                ctx.redirect('#/listing');
                return
            }

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'

            }).then(function () {
                this.partial('./templates/pages/register.hbs')
            })


        })

        this.post('#/register', function (ctx) {


            const username = ctx.params.username;
            const password = ctx.params.password;
            const repeatPass = ctx.params.repeatPass;

            const userRegex = /^[a-zA-Z]{3,}$/;
            const passRegex = /^[a-zA-Z0-9]{6,}$/;

            if (!username.match(userRegex)) {
                notify.showError('Username must be at least 3 characters long and should contain only english alphabet letters!')
            } else if (password !== repeatPass) {
                notify.showError('Passwords must match!')
            } else if (!password.match(passRegex)) {
                notify.showError('Password must be at least 6 characters long and must contain only english alphabet letters and digits!')
            } else {
                auth.register(username, password).then(function (data) {
                    auth.saveSession(data);
                    notify.showInfo('User registration successful.');
                    ctx.redirect('#/listing')
                }).catch(notify.handleError)
            }
        })

        this.get('#/login', function (ctx) {
            if (auth.isAuth()) {
                ctx.redirect('#/listing');
                return
            }
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'

            }).then(function () {
                this.partial('./templates/pages/login.hbs')
            })


        })

        this.post('#/login', function (ctx) {
            const username = ctx.params.username;
            const password = ctx.params.password;

            const userRegex = /^[a-zA-Z]{3,}$/;
            const passRegex = /^[a-zA-Z0-9]{6,}$/;

            if (!username.match(userRegex)) {
                notify.showError('Username must be at least 3 characters long and should contain only english alphabet letters!')
            } else if (!password.match(passRegex)) {
                notify.showError('Password must be at least 6 characters long and must contain only english alphabet letters and digits!')
            } else {
                auth.login(username, password).then(function (data) {
                    auth.saveSession(data);
                    notify.showInfo('Login successful.');
                    ctx.redirect('#/listing')
                }).catch(notify.handleError)
            }


        })

        this.get('#/logout', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home')
                return;
            }

            auth.logout().then(function () {
                sessionStorage.clear()
                notify.showInfo('Logout successful.')
                ctx.redirect('#/login')
            }).catch(notify.handleError)
        })

        this.get('#/listing', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return
            }

            ctx.username = sessionStorage.getItem('username');
            ctx.isAuth = auth.isAuth();

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                listCars: './templates/sections/listCars.hbs',
            }).then(function () {
                carsService.listAll().then((cars) => {
                    cars.forEach((car) => {
                        car.isAuthor = car._acl.creator === sessionStorage.getItem('userId');
                    })
                    ctx.cars = cars;
                    this.partial('./templates/pages/listing.hbs')
                })

            })
            ;


        })

        this.get('#/create/listing', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return
            }

            ctx.username = sessionStorage.getItem('username');
            ctx.isAuth = auth.isAuth();

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/pages/create.hbs')
            })
        })

        this.post('#/create/listing', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return
            }

            ctx.username = sessionStorage.getItem('username');
            ctx.isAuth = auth.isAuth();

            const title = ctx.params.title;
            const description = ctx.params.description;
            const brand = ctx.params.brand;
            const model = ctx.params.model;
            const year = ctx.params.year;
            const imageUrl = ctx.params.imageUrl;
            const fuel = ctx.params.fuelType;
            const price = ctx.params.price;
            const seller = ctx.username;

            if (title.length > 33) {
                notify.showError('The title length must not exceed 33 characters!')
            } else if (description.length < 30 || description.length > 450) {
                notify.showError('The description length must not exceed 450 characters and should be at least 30!')
            } else if (brand.length > 11 || fuel.length > 11 || model.length > 11) {
                notify.showError('The brand,fuel type and model length must not exceed 11 characters!')
            } else if (model.length < 4) {
                notify.showError('The model length should be at least 4 characters!')
            } else if (year.length !== 4) {
                notify.showError('The year must be only 4 chars long!')
            } else if (+price > 1000000) {
                notify.showError('The maximum price is 1000000$!')
            } else if (!imageUrl.startsWith('http')) {
                notify.showError('Link url should always start with “http”.')
            } else if (title.length === 0 || description.length === 0 || brand.length === 0 || model.length === 0 || year.length === 0 || price.length === 0 || fuel.length === 0) {
                notify.showError('All fields are required!')
            } else {
                carsService.createListing(seller, title, description, brand, model, year, imageUrl, fuel, price).then(function () {
                    notify.showInfo('listing created.');
                    ctx.redirect('#/listing')
                }).catch(notify.handleError)

            }

        })

        this.get('#/edit/:id', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return
            }

            ctx.username = sessionStorage.getItem('username');
            ctx.isAuth = auth.isAuth();
            const carId = ctx.params.id;

            carsService.getCarById(carId).then(function (car) {
                if (car._acl.creator !== sessionStorage.getItem('userId')) {
                    notify.showError('Unauthorized action!')
                    ctx.redirect('#/home')
                    return;
                }
                ctx.car = car;
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                }).then(function () {
                    this.partial('./templates/pages/edit.hbs')
                })

            })
        })

        this.post('#/edit/:id', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return
            }

            ctx.username = sessionStorage.getItem('username');
            ctx.isAuth = auth.isAuth();
            const carId = ctx.params.id;

            const title = ctx.params.title;
            const description = ctx.params.description;
            const brand = ctx.params.brand;
            const model = ctx.params.model;
            const year = ctx.params.year;
            const imageUrl = ctx.params.imageUrl;
            const fuel = ctx.params.fuelType;
            const price = ctx.params.price;
            const seller = ctx.username;

            if (title.length > 33) {
                notify.showError('The title length must not exceed 33 characters!')
            } else if (description.length < 30 || description.length > 450) {
                notify.showError('The description length must not exceed 450 characters and should be at least 30!')
            } else if (brand.length > 11 || fuel.length > 11 || model.length > 11) {
                notify.showError('The brand,fuel type and model length must not exceed 11 characters!')
            } else if (model.length < 4) {
                notify.showError('The model length should be at least 4 characters!')
            } else if (year.length !== 4) {
                notify.showError('The year must be only 4 chars long!')
            } else if (+price > 1000000) {
                notify.showError('The maximum price is 1000000$!')
            } else if (!imageUrl.startsWith('http')) {
                notify.showError('Link url should always start with “http”.')
            } else if (title.length === 0 || description.length === 0 || brand.length === 0 || model.length === 0 || year.length === 0 || price.length === 0 || fuel.length === 0) {
                notify.showError('All fields are required!')
            } else {
                carsService.editCar(carId, seller, title, description, brand, model, year, imageUrl, fuel, price)
                    .then(function () {
                        notify.showInfo(`Listing ${title} updated.`)
                        ctx.redirect('#/listing')
                    }).catch(notify.handleError)
            }
        })

        this.get('#/delete/:id', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return
            }
            ctx.username = sessionStorage.getItem('username');
            ctx.isAuth = auth.isAuth();
            const carId = ctx.params.id;

            carsService.getCarById(carId).then(function (car) {
                if (car._acl.creator === sessionStorage.getItem('userId')) {
                    carsService.deleteCar(carId).then(function () {
                        notify.showInfo('Listing deleted.')
                        ctx.redirect('#/listing')
                    }).catch(notify.handleError)
                } else {
                    notify.showError('Unauthorized action!')
                    ctx.redirect('#/home')
                }
            }).catch(notify.handleError)

        })

        this.get('#/my/listing', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return
            }

            ctx.username = sessionStorage.getItem('username');
            ctx.isAuth = auth.isAuth();

            carsService.getMyCars(ctx.username).then(function (myCars) {
                ctx.myCars = myCars;
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    myList: './templates/sections/myList.hbs',
                }).then(function () {
                    this.partial('./templates/pages/myListing.hbs')
                })
            }).catch(notify.handleError)
        })

        this.get('#/details/:id', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return
            }

            ctx.username = sessionStorage.getItem('username');
            ctx.isAuth = auth.isAuth();
            const carId = ctx.params.id;
            carsService.getCarById(carId).then(function (car) {
                ctx.isAuthor = car._acl.creator === sessionStorage.getItem('userId');
                ctx.car = car;

                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                }).then(function () {
                    this.partial('./templates/pages/details.hbs')
                })

            }).catch(notify.handleError)
        })

    })
    app.run()
})