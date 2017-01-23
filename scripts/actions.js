var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.i = 0;
    this.tick(el);
};

TxtType.prototype.tick = function(elem) {
    if(this.txt.length === this.toRotate[this.i].length)
    {
        this.i++;
        this.txt = '';
        if(!this.toRotate[this.i])
            return;
        elem = createSpan(this.el);
    }
    var fullTxt = this.toRotate[this.i];
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    console.log(this.txt);
    if(elem.nodeName === 'TEXTAREA')
        elem.setAttribute('placeholder', this.txt)
    else 
        elem.innerHTML = this.txt;
    var that = this;
    var delta = 200 - Math.random() * 100;
    setTimeout(function() {
        that.tick(elem);
    }, delta);
};

var createSpan = function(elem){
    var span = document.createElement('span');
    span = elem.appendChild(span);
    span.classList.add('newLine');
    return span;
}
var animateDefaultText = function() {
    var elements = document.getElementsByClassName('typewrite');
	for (var i=0; i<elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-type');
		var period = elements[i].getAttribute('data-period');
		if (toRotate) {
			new TxtType(createSpan(elements[i]), JSON.parse(toRotate), period);
		}
	}
};
var animateTextarea = function(){
    var textArea = document.querySelector('.ls-widget-textarea');
    var placeholder = textArea.getAttribute('placeholder'); 
    var placeholderTextArr = JSON.parse(textArea.getAttribute('data-type'));
    var textareaPeriod = textArea.getAttribute('data-period');
    new TxtType(textArea, placeholderTextArr, textareaPeriod);
};


window.onload = function() {
    var widgetWrapper = document.querySelector('.ls-widget-wrapper');
    widgetWrapper.classList.add("animate");
	animateDefaultText();
    animateTextarea();
};
