/*
 *  incdec v 0.1 - jQuery plugin
 *  Increase or decrease numeric values
 *  written by Diego Ghersi
 *
 *  Copyright 2013, Diego Ghersi
 *  Built for jQuery library
 *  http://jquery.com
 *
 */

(function( $ ) {
  $.fn.idcrease = function(element, data_type, original_value, next_value) {

    // verified if the value is not empty and replace with 0
    if (!original_value) {
        original_value = 0;
    }

    // convert the value to a numeric value
    original_value = parseFloat(original_value);
    next_value = parseFloat(next_value);

    // if the values are the same skip animation
    if (original_value != next_value)
    {
        $({value: original_value}).animate({value: next_value}, {
            duration: 500,
            easing: 'swing',
            step: function()
            {
                if (data_type == 'money') {
                    element.text(format_money(Math.abs(this.value)), 0);
                }
                else if (data_type == 'percentage') {
                    element.text(format_rate(Math.abs(this.value)), 1);
                }
                else if (data_type == 'none') {
                    element.text(Math.ceil(this.value));
                }
            },
            complete: function() {
                if (data_type == 'money') {
                    element.text(format_money(next_value), 0);
                }
                else if (data_type == 'percentage') {
                    element.text(format_rate(next_value), 1);
                }
                else if (data_type == 'none') {
                    element.text(next_value);
                }
            }
        });
    }

  };
})( jQuery );