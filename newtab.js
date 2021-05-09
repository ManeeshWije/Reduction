let quote;
function quotes() {
	fetch("https://api.quotable.io/random")
		.then((response) => response.json())
		.then((data) => {
			//console.log(`${data.content} —${data.author}`);
			quote = `${data.content} -${data.author}`;
			document.getElementById("quoteblock").innerHTML = quote;
		});
}
quotes();

let clock = () => {
	let date = new Date();
	let hrs = date.getHours();
	let mins = date.getMinutes();
	let secs = date.getSeconds();
	let period = " AM";
	if (hrs == 0) {
		hrs = 12;
	} else if (hrs >= 12) {
		hrs = hrs - 12;
		period = " PM";
	}
	hrs = hrs < 10 ? "0" + hrs : hrs;
	mins = mins < 10 ? "0" + mins : mins;
	secs = secs < 10 ? "0" + secs : secs;

	let time = `${hrs}:${mins}:${secs}:${period}`;
	document.getElementById("clock").innerHTML = time;
	setTimeout(clock, 1000);
};
clock();

var images = "";
var user = "";

$.ajax({
	type: "GET",
	url:
		"https://api.unsplash.com/search/photos?query=land scape&client_id=WQeGSnwU4L1Z2bIRlSWOAlgazKegU7qG_lTbLcoJKMI",
	success: function (data) {
		console.log(data);
		var randNum = Math.floor(Math.random() * 10);
		images = $("#image").append(
			`<img src=${data.results[randNum].urls.regular}/>`
		);
		user = $("#credits").append(
			`<h3>Photo Credits: ${data.results[randNum].user.name}</h3>`
		);
	},
});
