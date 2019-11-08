(function() {
	const countdownElements = document.querySelectorAll("[data-countdown]");
	
	this.countdown = {};

	for(let i=0; i<countdownElements.length; i++) {
		const ele = countdownElements[i];
		const date = ele.getAttribute("data-countdown");
		const settings = ele.getAttribute("data-countdown-show-params");
		const autoDays = ele.getAttribute("data-countdown-days");
		const id = ele.getAttribute("data-countdown-id");
		const style = ele.getAttribute("data-countdown-style");
		const endMessage = ele.getAttribute("data-countdown-end");
		const callback = ele.getAttribute("data-countdown-end-callback");
		const suffix = ele.getAttribute("data-countdown-suffix");
		const prefix = ele.getAttribute("data-countdown-prefix");
		const tickerSettings = ele.getAttribute("data-countdown-ticker");
		const hideCountdown = ele.getAttribute("data-countdown-hidden");
		
		let future = 0;
		
		if(date.includes('+')) {
			future = new Date().getTime() + (parseInt(date.substr(1,date.length))*1000);
		} else {
			future = (new Date(date)).getTime();
		}
		
		this.countdown[id] = {id,
							  date,
							  settings,
							  autoDays,
							  style,
							  endMessage,
							  callback,
							  suffix,
							  prefix,
							  tickerSettings,
							  hideCountdown,
							 
							  future: future};
		
		showTheCountdown(ele, 
						 date, 
						 settings?settings.toLowerCase():'', autoDays?autoDays.toLowerCase():'', 
						 id, 
						 style?style.toLowerCase():'', 
						 endMessage, 
						 callback, 
						 suffix, 
						 prefix,
						 tickerSettings,
						 hideCountdown);
	}
})();

function showTheCountdown(ele, date, settings, autoDays, id, style, endMessage, callback, suffix, prefix, tickerSettings, hideCountdown) {
	let interval = "";
	const startInterval = startCountdown(interval, ele, date, settings, autoDays, id, style, endMessage, callback, suffix, prefix, tickerSettings, hideCountdown);
	
	if(startInterval) {
		interval = setInterval(function(){
			startCountdown(interval, ele, date, settings, autoDays, id, style, endMessage, callback, suffix, prefix, tickerSettings, hideCountdown);
		}, 1000);	
	}
}

function getIdentifiers(id) {
	if(!this.countdown[id].identifiers) {
		const identifiers = {
			dClass: `countdown-days${id?`-${id}`:""}`,
			hClass: `countdown-hours${id?`-${id}`:""}`,
			mClass: `countdown-minutes${id?`-${id}`:""}`,
			sClass: `countdown-seconds${id?`-${id}`:""}`,
			tClass: `countdown-ticker${id?`-${id}`:""}`,
			suffixClass: `countdown-suffix${id?`-${id}`:""}`,
			prefixClass: `countdown-prefix${id?`-${id}`:""}`,
			mId: `countdown${id?`-${id}`:''}`
		};

		this.countdown[id].identifiers = identifiers;
	}
	
	return this.countdown[id].identifiers;
}

function getCoreNumbers(future, present, id) {
	const difference = future - present;

	const fdays = (Math.abs(difference/1000))/60/60/24;
	const days = Math.trunc(fdays);

	const fhours = (fdays - days)*24;
	const hours = Math.trunc(fhours);

	const fminutes = (fhours - hours)*60;
	const minutes = Math.trunc(fminutes);

	const fseconds = (fminutes - minutes)*60;
	const seconds = Math.trunc(fseconds);
	
	return {
		d: days,
		h: hours,
		m: minutes,
		s: seconds,
		forward: difference >= 0
	}
}

function getConditionals(settings, autoDays, days, id) {
	
	let conditionals = {};
	
	if(!this.countdown[id].days || this.countdown[id].days !== days) {
		this.countdown[id].days = days;
		conditionals = {
			dCondition: ((!settings || settings.includes('d')) && !(autoDays && autoDays==="auto" && days === 0)),
			hCondition: (!settings || settings.includes('h')),
			mCondition: (!settings || settings.includes('m')),
			sCondition: (!settings || settings.includes('s'))
		};
		this.countdown[id].conditionals = conditionals;
	}
	
	return this.countdown[id].conditionals;
}

function prependZero(n) {
	if(n < 10) {
		return `0${n}`;
	}

	return `${n}`;
}

function startCountdown(interval, ele, date, settings, autoDays, id, style, endMessage, callback, suffix, prefix, tickerSettings, hideCountdown) {
	const future = this.countdown[id].future;
	const present = (new Date()).getTime();

	const coreNumbers = getCoreNumbers(future, present, id);
	const identifiers = getIdentifiers(id);

	if(!coreNumbers.forward && endMessage) {
		ele.innerHTML = `<div id="${identifiers.mId}">${endMessage}</div>`;
		return endCountdown(callback, interval);
	} else if(!coreNumbers.forward) {
		ele.innerHTML = "";
		return endCountdown(callback, interval);
	}

	if(hideCountdown !== "") {
		const conditionals = getConditionals(settings, autoDays, coreNumbers.d, id);

		let render = "";

		if(style === "classic") {
			render = renderClassic(coreNumbers, identifiers, conditionals, suffix, prefix, tickerSettings);
		} else if (style === "textual") {
			render = renderTextual(coreNumbers, identifiers, conditionals, suffix, prefix);
		}

		ele.innerHTML = render;
	}

	return true;
}

function endCountdown(callback, interval) {
	if(callback) {
		eval(callback)();
	}
	
	clearInterval(interval);
	return false;
}

function renderClassic(coreNumbers, identifiers, conditionals, suffix, prefix, tickerSettings) {
	let final = `<div id="${identifiers.mId}">${prefix?`<span class='${identifiers.prefixClass}'>${prefix}</span> `:''}`;

	let ticker = ":";
	
	if(tickerSettings) {
		const tS = tickerSettings.split('|');
		if(tS[0] === 'blink') {
			ticker = (coreNumbers.s%2===0)?`<span class="${identifiers.tClass}">${tS[1]}</span>`:`<span class="${identifiers.tClass}" style='color:transparent'>${tS[1]}</span>`;
		} else {
			ticker = `<span class="${identifiers.tClass}">${tS[1]}</span>`;
		}
	}
	
	if(conditionals.dCondition) {
		final += `<span class="${identifiers.dClass}">${coreNumbers.d} Day${coreNumbers.d===1?"":"s"}</span>`;
	}

	if(conditionals.hCondition) {
		final += ` <span class="${identifiers.hClass}">${prependZero(coreNumbers.h)}</span>`;
	}

	if(conditionals.mCondition) {
		final += `${conditionals.hCondition?ticker:""}<span class="${identifiers.mClass}">${prependZero(coreNumbers.m)}</span>`;
	}

	if(conditionals.sCondition) {
		final += `${conditionals.hCondition||conditionals.mCondition?ticker:""}<span class="${identifiers.sClass}">${prependZero(coreNumbers.s)}</span>`;
	}

	final += `${suffix?` <span class='${identifiers.suffixClass}'>${suffix}</span>`:''}</div>`;
	
	return final;
}

function renderTextual(coreNumbers, identifiers, conditionals, suffix, prefix) {
	
	let final = `<div id="${identifiers.mId}">${prefix?`<span class='${identifiers.prefixClass}'>${prefix}</span> `:''}`;
	
	if(conditionals.dCondition) {
		final += `<span class="${identifiers.dClass}">${coreNumbers.d} day${coreNumbers.d===1?"":"s"}</span>`;
	}

	if(conditionals.hCondition) {
		final += ` <span class="${identifiers.hClass}">${prependZero(coreNumbers.h)} hours</span>`;
	}

	if(conditionals.mCondition) {
		final += ` <span class="${identifiers.mClass}">${prependZero(coreNumbers.m)}</span> minutes`;
	}

	if(conditionals.sCondition) {
		final += ` <span class="${identifiers.sClass}">${prependZero(coreNumbers.s)}</span> seconds`;
	}

	final += `${suffix?` <span class='${identifiers.suffixClass}'>${suffix}</span>`:''}</div>`;
	
	return final;
}