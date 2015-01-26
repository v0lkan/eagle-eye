# Eagle Eye

**Eagle Eye** analyzes your **npm** and **bower** dependencies, and reports
which of them are out of date.

Note that **Eagle Eye** is in its early development, use at your own rist.

Contributions are always welcome.

## Basic Usage

Install **Eagle Eye** via **npm** globally:

    npm install -g

`cd` to your project directory where you have **package.json** and **bower.json**.

    cd ~/PROJECTS/cool-aid

Run `eagle-eye`

    eagle-eye

The output will be similar to something like this:

    chai has a wildcard local version (*), and it is dangerous. Please be more specific!
    chai-as-promised has a wildcard local version (*), and it is dangerous. Please be more specific!
    grunt-contrib-jshint has a local version (~0.9.2); and there’s a newer/brighter/better version (0.11.0) at npm.
    grunt-contrib-less has a local version (^0.11.0); and there’s a newer/brighter/better version (1.0.0) at npm.
    grunt-cucumberjs has a local version (^0.4.1); and there’s a newer/brighter/better version (0.5.1) at npm.
    socket.io-client has a local version (1.2.1); and there’s a newer/brighter/better version (1.3.2) at bower.
    handlebars has a local version (1.3.0); and there’s a newer/brighter/better version (2.0.0) at bower.
    moment has a local version (2.0.0); and there’s a newer/brighter/better version (2.9.0) at bower.
    less has a local version (1.7.3); and there’s a newer/brighter/better version (2.2.0) at bower.
    jquery has a local version (1.8.2); and there’s a newer/brighter/better version (2.1.3) at bower.
    All done!
    11 of 22 dependencies failed the inspection.

Enjoy

## Help

`eagle-eye -h` displays a help message:

    eagle-eye -h

    Usage: eagle-eye [options]

    Options:

        -h, --help                output usage information
        -V, --version             output the version number
        -t, --target [targetDir]  Add the specified type of cheese [targetDir]

### Contact Information

* **Project Owner**: [Volkan Özçelik](http://volkan.io/)
* **Project Website**: [o2js.com](http://o2js.com/)
