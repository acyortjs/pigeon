
var padding = 30;
var space = 200;

$(function() {

    var W = $('.wrap').width();

    $('.posts').each(function() {
    
        position($(this), W)
    
    })

    function position(dom, w) {
        var H = Math.max.apply(Math, dom.find('a').map(function() {
            return $(this).height()
        })) + space - padding * 2;

        // set outer height
        dom.height(H)

        dom.find('a').each(function() {
            var _this = $(this);
            
            var h = _this.height();
            var w = _this.width();

            var t = _random(-h / 4, H - h / 4 * 3);
            var l = _random(-w / 4, W / 3 - w / 4 * 3);
            
            _this.css({
                'margin-top': t +'px',
                'margin-left': l +'px'
            })
        })
    }

})

function _random(n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n)
}
