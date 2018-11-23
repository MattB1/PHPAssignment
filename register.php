<?php
require "class/Database.php";
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$success = true;

$responses = [
    400 => "Bad Request",
    404 => "Not Found",
    405 => "Method Not Allowed",
    500 => "Internal server error"
];

ini_set("display_errors", TRUE);


// Error Function that changes header and returns Json object if there is an error
function send_error($code, $message)
{
    $PROTOCOL = $_SERVER["SERVER_PROTOCOL"];
    $CODE = $code;
    $REASON = $message;

    // Set header
    $headerStr = "$PROTOCOL $CODE - $REASON";
    header($headerStr);

    // Create a JSON object and serve it up
    $error = "$CODE - $REASON";
    $result_array = array();
    $result_array["error"] = $error;
    print(json_encode($result_array));
    print("\n");
}

// Function checks that post requests contain the parameter
function check_parameter($param){
    if (!isset($_POST[$param])) {
        send_error(400, "$param not provided");
    }
}

if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] != "POST"){
    $success = false;
    send_error(400, $responses["405"] . ":" . " Only post requests allowed");
}

if (isset($_POST) && $_POST == null){
    $success = false;
    send_error(400, $responses["400"] . ":" . " Post request must contain data");

}



// checks for the name, age and email post data
check_parameter("name");
check_parameter("age");
check_parameter("email");


// Name validation
if (isset($_POST["name"])) {
    $name = $_POST["name"];
// length between 2 and 100 characters long
    if (strlen($name) < 2 || strlen($name) > 100) {
        $success = false;
        send_error(400, $responses["400"] . ":" . " name must be between 2 and 100 characters");
    } // only contain characters a-z(upper&lowercase), hyphen or apostrophe
    else if (!preg_match("/^[a-zA-Z'-]*$/", $name)) {
        //(!preg_match("/^[a-zA-Z ]*$/",$name))
        $success = false;
        send_error(400, $responses["400"] . ":" . " only a-z, hyphens and apostrophes allowed");
    }
}else {
    $success = false;
}

// Age Validation
if (isset($_POST["age"])) {
    $age = $_POST["age"];
// only integers between 13-130 are valid
    if (!preg_match("/^1[3-9]$|^[2-9][0-9]$|^1[0-2][0-9]$|^13[0]$/", $age)) {
        $success = false;
        send_error(400, $responses["400"] . ":" . " only integers between 13 and 130 allowed");
    }
}else {
    $success = false;
}

// Email Validation
if (isset($_POST["email"])) {
    $email = $_POST["email"];
// only emails entered that match the pattern will be valid
    if (!preg_match("/^[a-zA-Z-]([\w-.]+)?@([\w-]+\.)+[\w]+$/", $email)) {
        $success = false;
        send_error(400, $responses["400"] . ":" . " invalid email");
    }
}else{
    $success = false;
}

// Phone Validation
if (isset($_POST["phone"])) {
    $phone = $_POST["phone"];
    // must be exactly 10 digits, start with 04, and only contain digits
    if (strlen($phone) != 10){
        $success = false;
        send_error(400, $responses["400"] . ":" . " phone number must be 10 digits long");
    }elseif (!preg_match("/^04/", $phone)){
        $success = false;
        send_error(400, $responses["400"] . ":" . " phone number must start with 04");
    }elseif (!preg_match("/^[0-9]+$/", $phone)){
        $success = false;
        send_error(400, $responses["400"] . ":" . " phone number can only contain digits");
    }
}

// Uses the database class to create an object
if($success == true) {
    if (!isset($_POST["phone"])) {
        $person = new Database($name, $age, $email);
    } else {
        $person = new Database($name, $age, $email, $phone);
    }
    // user ids
    $results_array = array();
    $results_array['user_id'] = rand(10000, 99999);
    //$all = json_encode(array_merge($results_array, $person->jsonSerialize()));
    $person->jsonSerialize();

    // Put the id and information together in database
    $everything = array();
    $everything = [$results_array['user_id'] => $person];
    $information = json_encode($everything);
    $person->writeToFile($information);

    // return user_id
    print(json_encode($results_array));
}


?>