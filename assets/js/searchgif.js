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
            button.addClass("topic-item");

            $("#buttons-view").append(button);
        }
    }

    function alertTitle(topic) {
        alert(topic.Title);
    }

    function settopicItem(topic) {
        $(".topic-display").empty();

        const img = $("<img>");
        img.attr("src", topic.Poster);
        $(".topic-display").append(img)

        const p = $('<p>');
        p.text(topic.Plot)
        $(".topic-display").append(p);
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