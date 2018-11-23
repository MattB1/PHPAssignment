<?php

class Database implements jsonserializable{
    public $name;
    public $age;
    public $email;
    public $phone;

    public function __construct($name, $age, $email, $phone = "None") {
        $this->name = $name;
        $this->age = $age;
        $this->email = $email;
        $this->phone = $phone;
    }



    public function jsonSerialize()
    {
        return [
            'name' => $this->name,
            'age' => $this->age,
            'email' => $this->email,
            'phone' => $this->phone
        ];

    }

    // Function appends to a file named 'database.txt'
    public function writeToFile($info){

        $myfile = fopen("database.txt", "a") or die("Unable to open file!");
        fwrite($myfile, $info . "\n");
        fclose($myfile);
    }

}