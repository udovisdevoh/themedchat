<?php
	require_once('../model/AssemblyInfo.ns.php');
	session_start();
	session_destroy();
	header('Location: ./');
?>