<?php
require_once 'auth.php';
require_once 'db.php';
requireLogin();
if (!isAdmin()) die('Admin only');

if (isset($_GET['id'])) {
  $id = $_GET['id'];
  $pdo = getPDO();
  $pdo->prepare("DELETE FROM articles WHERE id=?")->execute([$id]);
}
header("Location: admin_dashboard.php");
exit;
