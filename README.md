## Shop

This is an Ember application showing shop items retrieved from a Rails backend.

## Requirements


### External Deps

* [Ruby](https://www.ruby-lang.org) (if you're on OS X, you should consider using a version manager such as [RVM](http://rvm.io/) or [rbenv](https://github.com/sstephenson/rbenv))
* [npm](https://www.npmjs.org/) for managing node packages
* [bower](http://bower.io/) for managing web packages

      npm install -g bower
      
* ember-cli

      npm install -g ember-cli

* [PhantomJS](http://phantomjs.org/) for running integration tests

      npm install -g phantomjs
      
* [Bundler](http://bundler.io/) for managing Ruby gems

      gem install bundler
      

### Standard Library Deps


## Installation

    cd backend
    bundle install
    bundle exec rake db:setup
    bundle exec rails s

    cd frontend
    npm install
    bower install
    ember server --proxy=http://localhost:3000

Open a browser and navigate to
[http://localhost:4200](http://localhost:4200).


## Tests


## More Information

* [Shop Homepage](http://startbootstrap.com/shop-homepage)
* [Shop Item](http://startbootstrap.com/shop-item)

### API Documentation


## Example Usage

## License

## Support
