// $(function() {
//     var url = "http://quotes.rest/qod.json";
//     var quote = $("#quoteblock");// the id of the heading
//     $.get(url, function (data) {
//     var the_quote = data;
//     quote.text(the_quote.contents.quotes[0].quote);
//     var author = $("#author");// id of author
//     author.text(the_quote.contents.quotes[0].author);
//     });
// });

// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://type.fit/api/quotes",
// 	"method": "GET"
//   }

//   $.ajax(settings).done(function (response) {
// 	const data = JSON.parse(response);
// 	console.log(data);
//   });

const settings = {
  async: true,
  crossDomain: true,
  url: "https://quotes15.p.rapidapi.com/quotes/random/",
  method: "GET",
  headers: {
    "x-rapidapi-key": "442d139cacmsh193c5fcc792d3b5p1007a0jsn6715d85ce4d3",
    "x-rapidapi-host": "quotes15.p.rapidapi.com",
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

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
  document.getElementById("clock").innerText = time;
  setTimeout(clock, 1000);
};

clock();
