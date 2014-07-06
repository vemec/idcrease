/*
 *  idcrease v 1.0 - jQuery plugin
 *  Increase or decrease numeric values
 *  written by Diego Ghersi
 *
 *  Copyright 2013, Diego Ghersi
 *  Built for jQuery library
 *  http://jquery.com
 *
 */

(function($) {

    $.fn.idcrease = function(options) {

        // idcrease settings
        var settings = $.extend({
          'data_type' : 'none', // none | money | percentage
          'original_value' : 0,
          'next_value' : 100,
          'duration' : 500,
          'easing' : 'swing',
          'sufix': '',
          'decimals': false
        }, options);

        // format percentage values
        function format_p(value) {
            return format_rate(value, 2);
        }

        // format money
        function format_m(value) {
            if (settings.decimals) {
                return format_money(value, 2);
            }
            else {
                return format_money(value, 0);
            }
        }

        return this.each(function() {

            // this element
            var element = $(this);

            // set original value.
            var original_value = 0;
            if (element.data('original_value')) {
                original_value = element.data('original_value');
            }
            else {
                original_value = parseFloat(settings.original_value);
            }

            // convert the value to a numeric value
            settings.next_value = parseFloat(settings.next_value);

            // if the values are the same skip animation
            if (original_value != settings.next_value)
            {
                $({value: original_value}).animate({value: settings.next_value}, {
                    duration: settings.duration,
                    easing: settings.easing,
                    step: function()
                    {
                        if (settings.data_type == 'money') {
                            element.text(format_m(this.value) + settings.sufix);
                        }
                        else if (settings.data_type == 'percentage') {
                            element.text(format_p(this.value) + settings.sufix);
                        }
                        else if (settings.data_type == 'none') {
                            element.text(Math.round(this.value) + settings.sufix);
                        }
                    },
                    complete: function() {
                        if (settings.data_type == 'money') {
                            element.text(format_m(settings.next_value) + settings.sufix);
                        }
                        else if (settings.data_type == 'percentage') {
                            element.text(format_p(settings.next_value) + settings.sufix);
                        }
                        else if (settings.data_type == 'none') {
                            element.text(settings.next_value + settings.sufix);
                        }

                        // set original value on complete
                        element.data('original_value', settings.next_value);
                    }
                });
            }
        });

        // format money function
        function format_money(value, decimals, separator, decimal_separator, allow_space)
        {
            if (typeof allow_space == 'undefined') {
                allow_space = true;
            }
            else {
                if (allow_space) {
                    allow_space = true;
                }
                else {
                    allow_space = false;
                }
            }

            var symbol_space = '';
            if (allow_space) {
                symbol_space = ' ';
            }

            decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
            separator = separator || '.';
            decimal_separator = decimal_separator || ',';
            var number = (parseFloat(value) || 0).toFixed(decimals);
            if (number.length <= (3 + decimals))
                return '$'+symbol_space+number.replace('.', decimal_separator);
            var parts = number.split(/[-.]/);
            value = parts[parts.length > 1 ? parts.length - 2 : 0];
            var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
                decimal_separator + parts[parts.length - 1] : '');
            var start = value.length-6;
            while (start > -3) {
                result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start))
                    + separator + result;
                start -= 3;
            }
            return '$'+symbol_space+(parts.length == 3 ? '-' : '') + result;
        }

        // format rate function
        function format_rate(value, decimals, separator, decimal_separator)
        {
            decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
            separator = separator || '.';
            decimal_separator = decimal_separator || ',';
            var number = (parseFloat(value) || 0).toFixed(decimals);
            if (number.length <= (4 + decimals))
                return number.replace('.', decimal_separator) + '%';
            var parts = number.split(/[-.]/);
            value = parts[parts.length > 1 ? parts.length - 2 : 0];
            var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
                decimal_separator + parts[parts.length - 1] : '');
            var start = value.length - 6;
            while (start > -3) {
                result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start))
                    + separator + result;
                start -= 3;
            }
            return (parts.length == 3 ? '-' : '') + result + '%';
        }

    };
})(jQuery);
