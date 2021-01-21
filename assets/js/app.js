function randomArrayShuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

$(document).ready(function () {
    $('.answer').mouseenter(function () {
        $(this).effect("bounce",{times: 3, distance: 10} ,200);
    })
    $.get(
        "https://opentdb.com/api.php?amount=1",
        function (data) {
            data = data['results'][0];
            if (data['type'] === 'boolean'){
                $(".answer")[2].remove()
                $(".answer")[2].remove()
            }
            $('#question').html(data['question']);
            $('#categories').html(data['category']);

            switch (data['difficulty']){
                case 'easy':
                    $('#difficulty').text("💥");
                    break;
                case 'medium':
                    $('#difficulty').text("💥💥");
                    break;
                case 'hard':
                    $('#difficulty').text("💥💥💥");
                    break;
            }

            answer = $.merge(data['correct_answer'].split('|'), data['incorrect_answers']);
            answer = randomArrayShuffle(answer)
            $(".answer").each(function () {
                $(this).find('span').html(answer[answer.length - 1])
                answer.pop()
            })
            $(".answer").click(function (e) {
                e.preventDefault();
                if ($(this).find('span').html() === data['correct_answer']){
                    $(this).addClass('good-answer');
                    $('.answer').not(this).addClass('bad-answer')
                }else {
                    $(this).addClass('bad-answer-selected');
                    $('.answer').not(this).each(function () {
                        if ($(this).find('span').html() == data['correct_answer']){
                            $(this).addClass('good-answer');
                        }else {
                            $(this).addClass('bad-answer')
                        }
                    })
                }
            })
        }
    )
})
