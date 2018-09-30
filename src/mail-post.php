<?php
if (isset($_POST['submit'])) {
  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];
  $phoneNumber = $_POST['phone'];

  $firstName = filter_var($firstName, FILTER_SANITIZE_STRING);
  $lasstName = filter_var($lasstName, FILTER_SANITIZE_STRING);
  $phoneNumber = filter_var($phoneNumber, FILTER_SANITIZE_STRING);

  $sendTo = "contact@aboutryansam.com";
  $name = $firstName." ".$lasstName;

  if (!preg_match('/^\(?\b\d{3}[-.)\s]?\s?\d{3}[-.)\s]?\d{4}\b$/', $phoneNumber) and $phoneNumber !== '') {
    echo "Invalid number";
  } else {
    $number = preg_replace('/[-.()\s]/','',$phoneNumber);
    $number = "(".substr($phoneNumber,0,3).") ".substr($phoneNumber,3,3)."-".substr($phoneNumber,6,4);

    $sendTo = "contactme@aboutryansam.com";
    $header = $name."\r\n#: ".$phoneNumber;

    mail($sendTo, "New appointment!", "New appointment!", $header);
  }
} else {
  echo "Error!";
}
?>
