document.addEventListener("DOMContentLoaded", function() {
    var configElement = document.getElementById('config');
    if (configElement && configElement.hasAttribute("data-content-max-width")) {
        var maxWidth = configElement.getAttribute("data-content-max-width");
        document.documentElement.style.setProperty('--content-max-width', maxWidth);
    }
});
