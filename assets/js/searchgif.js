$(document).ready(function () {
    // Initial array of topics
    var topics = ["Iron Man", "Captain America", "Black Widow", "Hawkeye", "Vision", "Hulk", "War Machine", "Thor", "Black Panther"];
    const api_key = "E5uEHubH83gyNyy2nSIsxdtTE9SNhDDi";
    const limit = 10;
    var offset = 0;

    // Function for displaying topic data
    function renderButtons() {
        console.log("F:renderButtons - topics = " + topics);
        $("#buttons-view").empty();
        for (x in topics) {
            const button = $('<button>');
            button.text(topics[x]);
            button.attr('value', topics[x]);
            button.addClass("topic-item mx-1 my-1");

            $("#buttons-view").append(button);
        }
    }

    function settopicItem(topic) {
        console.log("f:settopicItem - START")
        $(".topic-display").empty();





        console.log("topic.data.length" + topic.data.length);

        if (topic.data.length < 1) {
            const h1 = $("<h1>");
            h1.text("NO RESULTS FOUND. TRY SEARCHING ANOTHER KEYWORD, OR CHECK YOUR BROWSER SETTINGS THAT BLOCKS COOKIES.");
            $(".topic-display").append(h1);
        }
        // console.log(topic.data.length);

        for (x = 0; x < topic.data.length; x++) {
            const div1 = $('<div>');
            const div = $('<div>');
            div.addClass("mt-2");
            div.text("Rating: " + topic.data[x].rating);
            div1.append(div);

            const img = $("<img>");
            img.addClass("my-2");
            img.attr("src", topic.data[x].images.fixed_height.url);
            console.log("TEST: " + topic.data[x].images.fixed_height.url);
            img.css("height", "200px");
            div1.append(img);
            $(".topic-display").append(div1);

        }

    }

    // This function handles events where one button is clicked
    $("#add-topic").on("click", function (event) {
        // event.preventDefault();

        let topic = $("#topic-input").val().trim();

        if (!topics.includes(topic) && topic != "") {
            topics.push(topic);
        }

        console.log(topics);

        // YOUR CODE GOES HERE
        renderButtons();

    });

    $(document).on("click", ".topic-item", function () {
        console.log("on-click: topic-item -- ");
        let topic = $(this).val();
        let objtopic = $(this);
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + api_key +
            "&limit=" + limit + "&offset=" + offset;

        $.ajax({ url: queryURL, method: "GET" }).then(function (response) {
            console.log(response);
            settopicItem(response);

            if (!topics.includes(response.Title)) {
                objtopic.text(response.Title);
                objtopic.val(response.Title);
                // alertTitle(response);
            }
            else {
                objtopic.remove();
            }
        });
    });

    // Calling the renderButtons function to display the initial list of topics
    renderButtons();
});