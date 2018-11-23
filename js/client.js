// EDIT THIS URL TO THE LOCATION OF YOUR REGISTER.PHP FILE
var url = "http://turing.une.edu.au/~mbubb2/assignment3/register.php";
var name, age, email, phone;


$(document).ready(function() {
    $('button').click(function() {
        // set all elements to default
        set_default();
        
        // test the service
        test_post();
        test_post_body();
        test_name();
        test_name_len();
        test_name_chars();
        test_age();
        test_age_int();
        test_age_range();
        test_email();
        test_email_regex();
        test_phone();
        test_phone_len();
        test_phone_int();
        test_phone_start();
        test_success();
  });
});


function set_valid_values() 
{
        name = "Someone";
        age = "42";
        email= "someone@email.com.au";
        phone = "0411222333";
}


// test for not POST 
function test_post() 
{
    var $ele = $('#test_post');
    
    $.ajax({
        method: "GET",
        dataType: "json",
        url: url,
        success: function(data) {
            set_error($ele);
            console.log("Your service should not allow GET requests.");
        },
        error: function(data) { 
            set_success($ele);
            console.log("Test for not POST: " +data.responseText);
        }     
    });
}


// test for no POST body
function test_post_body() 
{
    var $ele = $('#test_post_body');
    
    $.ajax({
        method: "POST",
        url: url,
        success: function(data) {
            set_error($ele);
            console.log("Your service should not allow POST requests without a body");
        },
        error: function(data) { 
            set_success($ele);
            console.log("Test for no POST body: " +data.responseText);
        }     
    });
}


// test for no 'name' field
function test_name() 
{
    var $ele = $('#test_name');
    set_valid_values();
    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: {age: age, email: email},
        success: function(data) {
            set_error($ele);
            console.log("Your service should not allow requests that do not contain a 'name' field.")
        },
        error: function(data) { 
            set_success($ele);
            console.log("Test for no 'name' field: " +data.responseText);
        }     
    });
}


// test for 'name' that is outside range (2-100)
function test_name_len() 
{   
    var $ele = $('#test_name_len');
    set_valid_values();
        
    // name too short (1)
    name = "a";
    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: {name: name, age: age, email: email},
        success: function(data) {
            set_error($ele);
            console.log("Your service should not allow requests with a 'name' field that is too short (2-100)");
        },
        error: function(data) { 
            set_success($ele);
            console.log("Test for 'name' outside range (small): " +data.responseText);
        }     
    });
        
    // name too long (101)
    name = "lhegdabyrFlMcRGEPqXStnYTzSfGgjeeBmXgisXiqsgMAFLkAVXKfuQVfxTaWbfWWXqkZbZvLLFTykJBqgTaBOAQymEoUCeJJAviV";
    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: {name: name, age: age, email: email},
        success: function(data) {
            set_error($ele);
            console.log("Your service should not allow requests with a 'name' field that is too long (2-100)");
        },
        error: function(data) { 
            set_success($ele);
            console.log("Test for 'name' outside range (big): " +data.responseText);
        }     
    });
}


// test for 'name' that contains invalid characters
function test_name_chars() 
{
    var $ele = $('#test_name_chars');
    set_valid_values();
    
    name = "Some1";
    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: {name: name, age: age, email: email},
        success: function(data) {
            set_error($ele);
            console.log("Your service should not allow requests with a 'name' field that contains invalid characters");
        },
        error: function(data) { 
            set_success($ele);
            console.log("Test for 'name' with invalid characters: " +data.responseText);
        }     
    });
}


// test for no 'age' field
function test_age() {
    var $ele = $('#test_age');
    set_valid_values();
    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: {name: name, email: email},
        success: function(data) {
            set_error($ele);
            console.log("Your service should not allow requests that do not contain an 'age' field.");
        },
        error: function(data) { 
            set_success($ele);
            console.log("Test for no 'age' field: " +data.responseText);
        }     
    });
}


// test for 'age' that is not a number
function test_age_int() 
{
    var $ele = $('#test_age_int');
    set_valid_values();
    
    age = "age";
    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: {name: name, age: age, email: email},
        success: function(data) {
            set_error($ele);
            console.log("Your service should not allow requests that contain an 'age' field that is non-integer.");
        },
        error: function(data) { 
            set_success($ele);
            console.log("Test for 'age' that is non-integer: " +data.responseText);
        }     
    });
}
    

// test for 'age' that is outside range (13-130)
function test_age_range() 
{
    var $ele = $('#test_age_range');
    set_valid_values();
    
    // age too young
    age = "12";
    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: {name: name, age: age, email: email},
        success: function(data) {
            set_error($ele);
            console.log("Your service should not allow requests that contain an 'age' field that is too young (13-130).");
        },
        error: function(data) { 
            set_success($ele);
            console.log("Test for no 'age' outside range (small): " +data.responseText);
        }     
    });
    
    // age too old
    age = "131";
    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: {name: name, age: age, email: email},
        success: function(data) {
            set_error($ele);
            console.log("Your service should not allow requests that contain an 'age' field that is too old (13-130).");
        },
        error: function(data) { 
            set_success($ele);
            console.log("Test for no 'age' outside range (big): " +data.responseText);
        }     
    });
}


// test for no 'email' field
function test_email() 
{
    var $ele = $('#test_email');
    set_valid_values();
    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: {name: name, age: age},
        success: function(data) {
            set_error($ele);
            console.log("Your service should not allow requests that do not contain an 'email' field.");
        },
        error: function(data) { 
            set_success($ele);
            console.log("Test for no 'email': " +data.responseText);
        }     
    });
}



// test for malformed 'email' field
function test_email_regex() 
{
    var $ele = $('#test_email_regex');
    set_valid_values();
    
    email = "invalid?email@test.test.test.com";
    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: {name: name, age: age, email: email},
        success: function(data) {
            set_error($ele);
            console.log("Your service should not allow requests contain a incorrect 'email' field.");
        },
        error: function(data) { 
            set_success($ele);
            console.log("Test for incorrect 'email': " +data.responseText);
        }     
    });        
}


// test valid request, without 'phone' field
function test_phone() 
{
    var $ele = $('#test_phone');
    set_valid_values();
    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: {name: name, age: age, email: email},
        success: function(data) {
            set_success($ele);
            console.log("Test for valid request with no 'phone': " +data.user_id);
        },
        error: function(data) { 
            set_error($ele);
            console.log("Your service should allow valid requests that do not contain a 'phone' field.");
        }     
    });
}


// test for phone with incorrect length (10)
function test_phone_len() 
{
    var $ele = $('#test_phone_len');
    set_valid_values();
    
    // test phone that is too short (9)
    phone = "041122233";
    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: {name: name, age: age, email: email, phone: phone},
        success: function(data) {
            set_error($ele);
            console.log("Your service should not allow requests that contain a 'phone' field that is too short.");
        },
        error: function(data) { 
            set_success($ele);
            console.log("Test for 'phone' that is too short: " +data.responseText);
        }     
    });
    
    // test phone that is too long (11)
    phone = "04112223334";
    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: {name: name, age: age, email: email, phone: phone},
        success: function(data) {
            set_error($ele);
            console.log("Your service should not allow requests that contain a 'phone' field that is too long.");
        },
        error: function(data) { 
            set_success($ele);
            console.log("Test for 'phone' that is too long: " +data.responseText);
        }     
    });
}


// test for 'phone' that is not a number
function test_phone_int() 
{
    var $ele = $('#test_phone_int');
    set_valid_values();
    
    phone = "041122233E";
    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: {name: name, age: age, email: email, phone: phone},
        success: function(data) {
            set_error($ele);
            console.log("Your service should not allow requests that contain a 'phone' field that is non-integer.");
        },
        error: function(data) { 
            set_success($ele);
            console.log("Test for 'phone' that is non-integer: " +data.responseText);
        }     
    });
}


// test for 'phone' that doesn't start with "04"
function test_phone_start() 
{
    var $ele = $('#test_phone_start');
    set_valid_values();
    
    phone = "0311222333";
    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: {name: name, age: age, email: email, phone: phone},
        success: function(data) {
            set_error($ele);
            console.log("Your service should not allow requests that contain a 'phone' field that doesn't start with 04.");
        },
        error: function(data) { 
            set_success($ele);
            console.log("Test for 'phone' that doesn't start with 04: " +data.responseText);
        }     
    });
}


// test a correctly structure request
// display 'user_id' in HTML
function test_success() 
{
    var $ele = $('#test_success');
    set_valid_values();
    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: {name: name, age: age, email: email, phone: phone},
        success: function(data) {
            set_success($ele);
            $('#user_id').text("User ID: " +data.user_id);
            $('#user_id').css('display', 'block');
            console.log("Test for valid request: " +data.user_id);
        },
        error: function(data) { 
            set_error($ele);
            console.log("Your service should return a user ID for valid requests.");
        }     
    });
}


// set 'error' class to element
function set_error($ele) 
{
    if ($ele.hasClass('success')) {
        $ele.removeClass('success');
    }
    
    if (!$ele.hasClass('error')) {
        $ele.addClass('error');
    }
}


// set 'success' class to element
// don't set 'success' if 'error' class already set
function set_success($ele) 
{
    if (!$ele.hasClass('error')) {
        $ele.addClass('success');
    }
}


// set 'default' class for all test elements
function set_default() 
{
    var $tests = $('#tests');
    
    if ($tests.hasClass('error')) {
        $tests.removeClass('error');
    }
    
    if ($tests.hasClass('success')) {
        $tests.removeClass('success');
    }
    
    $tests.addClass('default');
}
    
    