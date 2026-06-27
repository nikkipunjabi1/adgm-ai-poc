(function () {

    $(function () {
        // function to hide header footer for queryString 'nhf=true'
        hideHeaderFooter();

        // observer to handle the dynamic content to update the links for queryString 'nhf=true'
        const observeAnchors = () => {
            //MutationObserver is a JS API that monitor DOM changes & re-run the callback if change occurs
            //without this API some children anchors can't be detected
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'childList') {
                        hideHeaderFooter();
                    }
                });
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['href']
            });
        }

        observeAnchors();
    });

    // Check if the link url is an external link
    function isInternalLink(anchor) {
        var host = window.location.host;
        //for local environment
        if (host.indexOf(':') >= 0) {
            host = host.split(':')[0];
        }
        if (anchor.hostname == undefined) {
            return anchor.baseURI.indexOf(host) > 0;
        }
        var link = anchor.hostname;
        return (link === host);
    };

    // Add or Update quesryString
    function updateQueryStringParameter(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    }

    // Hides header footer base on queryString param
    function hideHeaderFooter() {
        var urlParams = new URLSearchParams(window.location.search);

        // Check if value exist and it's true
        if (urlParams.has('nhf')) {
            // Get queryString param 'nhf'
            var nhfParam = urlParams.get('nhf') ?? false;

            if (nhfParam === true || nhfParam === "true") {
                findAllHrefElements($("body"), nhfParam);
            }
        }

    }

    function findAllHrefElements(element, nhfParam) {
        var el = element[0];
        //if ($(el).attr("href") !== null || $(el).attr("href") !== undefined) {
        var hrefAttr = $(el).attr("href");
        if (typeof hrefAttr !== 'undefined' && hrefAttr !== false) {
            if (isInternalLink(el) && hrefAttr.indexOf("#") < 0) {
                el.href = updateQueryStringParameter(hrefAttr, "nhf", nhfParam);
            }
        }

        var childElements = $(el).children();
        if (childElements.length > 0) {
            childElements.each(function (index, childElement) {
                findAllHrefElements($(childElement), nhfParam);
            });
        }
        var shadowRoot = element.shadowRoot;
        if (shadowRoot != null || shadowRoot != undefined) {
            findAllHrefElements(shadowRoot, nhfParam);
        }
    }
})()