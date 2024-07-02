<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {
        // Налаштування сервера
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'sinkovvv1@gmail.com'; // Ваш email
        $mail->Password = 'visspan01';  // Ваш пароль
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Отримувач
        $mail->setFrom('sinkovvv1@gmail.com', 'Your Name');
        $mail->addAddress($to);

        // Вміст листа
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        $mail->send();
        echo 'Лист відправлено';
    } catch (Exception $e) {
        echo "Лист не був відправлений. Помилка: {$mail->ErrorInfo}";
    }
}
?>