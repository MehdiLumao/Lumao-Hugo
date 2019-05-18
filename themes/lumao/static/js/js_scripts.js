jQuery(document).ready(function() {
    jQuery('.menu a[href="#"]').on('click', function() {
        window.location.href = window.location.origin + jQuery(this).data('goto');
    })
});