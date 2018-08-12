$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', home)
        this.get('#/index', home)

        function home(ctx) {
            if (!auth.isAuth()) {
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    login: './templates/forms/login.hbs',
                    register: './templates/forms/register.hbs'
                }).then(function () {
                    this.partial('./templates/welcome.hbs')
                })
            } else {
                ctx.redirect('#/catalog')
            }
        }

        this.post('#/register', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPass = ctx.params.repeatPass;

            const userRegex = /^[a-zA-Z]{3,}$/;
            const passRegex = /^[a-zA-Z0-9]{6,}$/;

            if (!userRegex.test(username)) {
                notify.showError('A username should be at least 3 characters long and should contain only english alphabet letters.')
            } else if (!passRegex.test(password)) {
                notify.showError('A user‘s password should be at least 6 characters long and should contain only english alphabet letters and digits.')
            } else if (password !== repeatPass) {
                notify.showError('Passwords do not match.')
            } else {
                auth.register(username, password).then((data) => {
                    auth.saveSession(data)
                    notify.showInfo('User registration successful.')
                    ctx.redirect('#/catalog')
                })
            }
        })

        this.post('#/login', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;

            const userRegex = /^[a-zA-Z]{3,}$/;
            const passRegex = /^[a-zA-Z0-9]{6,}$/;
            if (username.length === 0 || password.length === 0) {
                notify.showError('Both username and password should be filled.')
            } else if (!userRegex.test(username)) {
                notify.showError('A username should be at least 3 characters long and should contain only english alphabet letters.')
            } else if (!passRegex.test(password)) {
                notify.showError('A user‘s password should be at least 6 characters long and should contain only english alphabet letters and digits.')
            } else {
                auth.login(username, password).then((data) => {
                    auth.saveSession(data);
                    notify.showInfo('Login successful.')
                    ctx.redirect('#/catalog')
                }).catch(remote.handleError)
            }


        })

        this.get('#/logout', (ctx) => {
            auth.logout().then(() => {
                sessionStorage.clear();
                notify.showInfo('Logout successful.')
                ctx.redirect('#/index')
            }).catch(remote.handleError)


        })

        function calcTime(dateIsoFormat) {
            let diff = new Date - (new Date(dateIsoFormat));
            diff = Math.floor(diff / 60000);
            if (diff < 1) return 'less than a minute';
            if (diff < 60) return diff + ' minute' + pluralize(diff);
            diff = Math.floor(diff / 60);
            if (diff < 24) return diff + ' hour' + pluralize(diff);
            diff = Math.floor(diff / 24);
            if (diff < 30) return diff + ' day' + pluralize(diff);
            diff = Math.floor(diff / 30);
            if (diff < 12) return diff + ' month' + pluralize(diff);
            diff = Math.floor(diff / 12);
            return diff + ' year' + pluralize(diff);

            function pluralize(value) {
                if (value !== 1) return 's';
                else return '';
            }
        }


        this.get('#/catalog', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/index');
                return;
            }

            postsService.getAllPosts()
                .then(function (posts) {
                    posts.forEach((post, index) => {
                        post.rank = index + 1;
                        post.date = calcTime(post._kmd.ect);
                        post.isAuthor = post._acl.creator === sessionStorage.getItem('userId');
                    });

                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.posts = posts;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                        post: './templates/posts/post.hbs',
                        postList: './templates/posts/postList.hbs'
                    }).then(function () {
                        this.partial('./templates/posts/catalogPage.hbs')
                    })
                })
                .catch(notify.handleError);
        });


        this.get('#/create/post', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/index')
                return;
            }
            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                navigation: './templates/common/navigation.hbs'
            }).then(function () {
                this.partial('./templates/posts/createPost.hbs')
            })
        })

        this.post('#/create/post', function (ctx) {

            let author = sessionStorage.getItem('username');
            let url = ctx.params.url
            let title = ctx.params.title
            let image = ctx.params.image
            let comment = ctx.params.comment

            postsService.createPost(author, title, comment, url, image)
                .then(function () {
                    notify.showInfo('Post Created.');
                    ctx.redirect('#/catalog');
                }).catch(notify.handleError)
        })

        this.get('#/edit/post/:postId', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/index');
                return;
            }
            let postId = ctx.params.postId;
            postsService.getPostById(postId).then(function (post) {
                ctx.isAuth = auth.isAuth();
                ctx.username = sessionStorage.getItem('username');
                ctx.post = post;
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    navigation: './templates/common/navigation.hbs'
                }).then(function () {
                    this.partial('./templates/posts/editPost.hbs')
                })
            })


        })

        this.post('#/edit/post', function (ctx) {

            let postId = ctx.params.postId;
            let author = sessionStorage.getItem('username');
            let url = ctx.params.url
            let title = ctx.params.title
            let image = ctx.params.image
            let comment = ctx.params.comment

            if (url === '' || title === '') {
                notify.showError('Url and title are required!')
            } else if (!url.startsWith('http') || !image.startsWith('http')) {
                notify.showError('Valid url must starts with http!')
            } else {
                postsService.editPost(postId, author, title, comment, url, image)
                    .then(function () {
                        notify.showInfo(`Post ${title} updated.`);
                        ctx.redirect('#/catalog');
                    }).catch(notify.handleError)
            }
        })

        this.get('#/delete/post/:postId', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/index');
                return;
            }

            let postId = ctx.params.postId;

            postsService.deletePost(postId).then(function () {
                notify.showInfo('Post deleted.');
                ctx.redirect('#/catalog')
            }).catch(notify.handleError);

        })


        this.get('#/posts', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/index');
                return;
            }
            let username = sessionStorage.getItem('username');
            postsService.getMyPosts(username)
                .then(function (posts) {
                    ctx.posts = posts;
                    ctx.username = username;
                    ctx.isAuth = auth.isAuth();

                    posts.forEach((post, index) => {
                        post.rank = index + 1;
                        post.date = calcTime(post._kmd.ect);
                    });

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                        myPosts: './templates/posts/myPosts.hbs'
                    }).then(function () {
                        this.partial('./templates/posts/myPostsList.hbs')
                    })
                })
        });

        this.get('#/details/:postId', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/index');
                return;
            }
            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            let postId = ctx.params.postId;
            ctx.postId = postId;
            postsService.getPostById(postId).then(function (post) {
                post.date = calcTime(post._kmd.ect);
                post.isAuthor = post._acl.creator === sessionStorage.getItem('userId');
                ctx.post = post;

                commentsService.getPostComments(postId)
                    .then(function (comments) {
                        comments.forEach((comment, index) => {
                            comment.date = calcTime(post._kmd.ect);
                            comment.isCommentAuthor = comment._acl.creator === sessionStorage.getItem('userId');
                        })
                        ctx.comments = comments;

                        ctx.loadPartials({
                            header: './templates/common/header.hbs',
                            footer: './templates/common/footer.hbs',
                            navigation: './templates/common/navigation.hbs',
                            commentsList: './templates/posts/commentsList.hbs',
                            addComment: './templates/posts/addComment.hbs'
                        }).then(function () {
                            this.partial('./templates/posts/detailsPost.hbs')
                        })
                    })
            })

        });

        this.post('#/add/comment', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/index');
                return;
            }
            let postId = ctx.params.postId;
            let content = ctx.params.content
            let author = sessionStorage.getItem('username')
            
            commentsService.createComment(postId,content, author).then(function () {
                notify.showInfo('Comment Created.')
                ctx.redirect(`#/details/${postId}`)
            })


        })

        this.get('#/delete/comment/:commentId/post/:postId', (ctx) => {
            let commentId = ctx.params.commentId;
            let postId = ctx.params.postId;

            commentsService.deleteComment(commentId)
                .then(() => {
                    notify.showInfo('Comment deleted.');
                    ctx.redirect(`#/details/${postId}`);
                })
                .catch(notify.handleError);
        });

    })
    app.run()
});