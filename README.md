# idcrease v 0.1.3 - jQuery plugin

Increase or decrease numeric values

## Installation

Include script *after* the jQuery library:

    <script src="/path/to/jquery.idcrease.js"></script>

## Settings

    'data_type' : 'none' // none | money | percentage
    'original_value' : 0
    'next_value' : 100
    'duration' : 2000
    'easing' : 'swing'
    'sufix': ''

## Usage

    $('.some_class').idcrease({
        'data_type' : 'money',
        'original_value' : 10,
        'next_value' : 1340.32,
        'duration': 5000
    });

    $('.some_class1').idcrease({
        'data_type' : 'percentage',
        'original_value' : 20,
        'next_value' : 95.44,
        'duration': 3000
    });

    $('.some_class2').idcrease({
        'data_type' : 'none',
        'original_value' : 10,
        'next_value' : 300,
        'duration': 1500
    });

    $('.some_class3').idcrease({
        'data_type' : 'none',
        'original_value' : 5,
        'next_value' : 34,
        'duration': 1000,
        'sufix': ' months'
    });

## Development

- Source hosted at [GitHub](https://github.com/vemec/idcrease)
- Report issues, questions and feature requests on [GitHub Issues](https://github.com/vemec/idcrease/issues)
- GitHub page at [idCrease](http://vemec.github.io/idcrease)

## Author

[Diego Ghersi](https://github.com/vemec) [@vemec](https://twitter.com/vemec)
