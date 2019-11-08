# Countdown app


## Introduction
This library/function makes it easy to get a countdown timer on a page for countless reasons. All we have to do is import this JS file and add attributes as required to an empty **div** element.


```
<div data-countdown="11-7-2019 00:43:30" data-countdown-show-params="d,h,m,s" data-countdown-days="none" data-countdown-id="1296" data-countdown-style="classic" data-countdown-end="Make the most out of the offer now" data-countdown-end-callback="showTheOffer"></div>
```


## Available attributes/options

### Mandatory attributes

`data-countdown` => This library won’t work without this attribute. This attribute takes in any valid JS date format (can include timestamp too). Dates have to be in the future.
	Another way to use this is to just pass in seconds to have a relative countdown with a **+** sign as suffix. Remember using it this way the countdown would reset every time the page is refreshed.
```
Examples: 
data-countdown="11-7-2019 00:43:30"
data-countdown="12-25-2020"
data-countdown="+300" (relative to the current time)
```



`data-countdown-id` => This is just as important as **data-countdown** attribute. Helps in having multiple countdowns on a page. Can be numbers or words (without spaces). However, it has to be unique on a page. Duplicates would cause unexpected errors.
```
Examples:
data-countdown-id="1234"
data-countdown-id="orange"
```



`data-countdown-style` => This is the style in which Countdown is displayed. There are 2 possible values, **classic** and **textual**
```
Examples:
data-countdown-style="classic" (48 Days 02:08:01)
data-countdown-style="textual" (0 days 12 hours 20 minutes 52 seconds)
```


### Optional attributes

`data-countdown-show-params` => Helps in letting us display what we need in terms of days, hours, minutes, seconds respectively.
```
Examples:
data-countdown-show-params="d,h,m,s" (displays everything)
data-countdown-show-params="m,s" (displays only minutes and seconds)
data-countdown-show-params="d,s" (displays only days and seconds)
```



`data-countdown-days` => This lets us choose whether we want to show days field when it goes to **0** or not. It has 2 possible values, **none** (default) and **auto**.
```
Example:
data-countdown-days="auto" (Days feild in the countdown wouldn't show once it becomes 0)
```




`data-countdown-end` => Displays a message when the countdown comes to an end if required or it hides the countdown (default).
```
Example:
data-countdown-end="Make the most out of the offer now"
```



`data-countdown-end-callback` => This is my personal favorite. We can pass in a function to this attribute, so that the function gets executed once the countdown comes to an end.
```
Example:
data-countdown-end-callback="displayOffer"
```



`data-countdown-ticker` => Let’s us have our own kind of divider or ticker between time. This works only when **data-countdown-style** is set to **classic**. So using this attribute we can set 2 things, **none** or **blink** and kind of ticker. By default it is set to **none**|**:**. Remember if this attribute is used then both the properties are required with the pipe **|** dividing it.
```
Examples:
data-countdown-ticker="none|-"
data-countdown-ticker="blink|:"
```



`data-countdown-suffix` => This lets us have have custom text right after the countdown.
```
Example:
data-countdown-suffix="to go!" (0 days 12 hours 20 minutes 52 seconds to go!)
```



`data-countdown-prefix` => This lets us have have custom text right before the countdown.
```
Example:
data-countdown-suffix="Countdown:" (Countdown: 0 days 12 hours 20 minutes 52 seconds)
```



`data-countdown-hidden` => This is another cool attribute to use. It basically keeps the countdown hidden (not rendered). This goes well with **data-countdown-end-callback** and **data-countdown** set to relative time. One use case would be to display a banner or something after certain time of page load.
```
Example:
data-countdown-hidden
```


## Styling and Structure
By default styling is not applied at all. However, we are exposing _class_ names of elements for easy styling. Class names and structure is as follows, 

```
<div data-countdown="11-7-2019 00:43:30" data-countdown-id="1296" data-countdown-style="classic" data-countdown-prefix="Countdown:" data-countdown-suffix="to go!">
	<div id="countdown-1296">
		<span class="countdown-prefix-1296"> Countdown: </span>
		<span class="countdown-days-1296"> 2 Days </span>
		<span class="countdown-hours-1296"> 04 </span>
		<span class="countdown-ticker-1296"> : </span>
		<span class="countdown-minutes-1296"> 22 </span>
		<span class="countdown-ticker-1296"> : </span>
		<span class="countdown-seconds-1296"> 58 </span>
		<span class="countdown-suffix-1296"> to go! </span>
	</div>
</div>
```

Similar structure would be for **textual** styling too. And _class_ names should be pretty much the same except for the ID’s that you pass in.
