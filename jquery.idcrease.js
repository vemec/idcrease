/*
 *  idcrease v 0.1.2 - jQuery plugin
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
    var settings = $.extend( {
      'data_type' : 'none', // none | money | format_percentage
      'original_value' : 0,
      'next_value' : 100,
      'duration' : 2000,
      'easing' : 'swing'
    }, options);

    // format money values
    function format_money(value, symbol) {
        return symbol + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }

    // format percentage values
    function format_percentage(value) {
        return value.toFixed(2) + '%';
    }

    return this.each(function() {

        var element = $(this);

        // convert the value to a numeric value
        settings.original_value = parseFloat(settings.original_value);
        settings.next_value = parseFloat(settings.next_value);

        // if the values are the same skip animation
        if (settings.original_value != settings.next_value)
        {
            $({value: settings.original_value}).animate({value: settings.next_value}, {
                duration: settings.duration,
                easing: settings.easing,
                step: function()
                {
                    if (settings.data_type == 'money') {
                        element.text(format_money(this.value, '$'));
                    }
                    else if (settings.data_type == 'percentage') {
                        element.text(format_percentage(this.value));
                    }
                    else if (settings.data_type == 'none') {
                        element.text(Math.floor(this.value * 100) / 100);
                    }
                },
                complete: function() {
                    if (settings.data_type == 'money') {
                        element.text(format_money(settings.next_value, '$'));
                    }
                    else if (settings.data_type == 'percentage') {
                        element.text(settings.next_value + '%');
                    }
                    else if (settings.data_type == 'none') {
                        element.text(settings.next_value);
                    }
                }
            });
        }

    });

  };
})( jQuery );