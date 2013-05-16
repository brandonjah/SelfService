# Based off of Play20StartApp
# using this angular module: https://github.com/codef0rmer/angular-dragdrop
# using this mongo wrapper: https://github.com/vznet/play-mongo-jackson-mapper

# Configuration notes
* Must change java build path in project properties to prevent data binding error JSR-303
* brew install play
* brew install mongo

## Account details
* No clear password stored in db
* Secure workflow to reset password
* Secure workflow to reset email
* I18n example (en, fr)
* Using Typesafe Plugin Mailer : https://github.com/typesafehub/play-plugins/tree/master/mailer
* Using Twitter Bootstrap 2 : http://twitter.github.com/bootstrap/, theme Spacelab from http://http://bootswatch.com
* Using Less and CoffeeScript
* Using a password generator 

## Try
* Rename conf/email.conf.example in conf/email.conf and check it (smtp, etc...)
* Download Play Framework 2 from http://www.playframework.org/
* Open a terminal in Play20StartApp directory and exec `play run`
* Generate Scala Doc & Javadoc with exec `play app-doc` (task app-doc add in Build.scala file)

## Documentation
* Insecure Cryptography (an explanation of good web app password practices and why they're good) : http://webapp-hardening.heroku.com/insecure_crypto
* Failing with Passwords (a presentation on issues in user authentication) : http://tersesystems.com/2012/02/17/failing-with-passwords
* Everything you ever wanted to know about secure password reset : http://www.troyhunt.com/2012/05/everything-you-ever-wanted-to-know.html
 
#validate user without email thru mongo shell, currently not needed as all accounts are validated
> db.users.update({email : 'brandon.jahner@arestravelinc.com'},{$set: {'validated' : 'true'},})

#test form post
> curl --data "siteId=77&templateName=convis-1" http://localhost:9000/info

## Heroku info
* Procfile in root should override mongo uri
* heroku open will launch the app in the browser or the domain is http://self-service.herokuapp.com/
* if Play isn't running on heroku: heroku run sbt play
* view logs: heroku logs -n 200

## Angular UI Bootstrap info (needs to be changed again when updated)
* template/progressbar/bar.html changed to /assets/app/template/progressbar/bar.html|progress.html in ui-bootstrap-0.3.0.min.js