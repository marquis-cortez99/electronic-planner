var localSettings = {};
dayjs.locale(localSettings);
$(function () {

  var currentHour = dayjs().format('H');
  // The colors will change due to the function given
    function hourlyColor() {
      $('.time-block').each(function() {
        var blockHour = parseInt(this.id);
        $(this).toggleClass('past', blockHour < currentHour);
        $(this).toggleClass('present', blockHour === currentHour);
        $(this).toggleClass('future', blockHour > currentHour);
      });
    }
  // Due to the button I have placed it will save.
    function textEntry() {
      $('.saveBtn').on('click', function() {
        var key = $(this).parent().attr('id');
        var value = $(this).siblings('.description').val();
        localStorage.setItem(key, value);
      });
    }
  // This function will update the time so that the rest of the functions can operate properly
    function updateTime() {
      var dateElement = $('#date');
      var timeElement = $('#time');
      var currentDate = dayjs().format('dddd, MMMM D, YYYY');
      var currentTime = dayjs().format('hh:mm:ss A');
      dateElement.text(currentDate);
      timeElement.text(currentTime);
    }
    $('.time-block').each(function() {
      var key = $(this).attr('id');
      var value = localStorage.getItem(key);
      $(this).children('.description').val(value);
    });
    function refreshColor() {
      $('.time-block').each(function() {
        var blockHour = parseInt(this.id);
        if (blockHour == currentHour) {
          $(this).removeClass('past future').addClass('present');
        } else if (blockHour < currentHour) {
          $(this).removeClass('future present').addClass('past');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
      });
    }
    // These three main functions are what make the page operate to what I want.
    hourlyColor();
    textEntry();                
    refreshColor();
    // The set interval function will make the timer move according to what I have chosen
    setInterval(updateTime, 1000);
  });

