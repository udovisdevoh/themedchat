<?php
	require_once('../AssemblyInfo.ns.php');
	$getMessageListAction = new GetMessageListAction();
	$getMessageListAction->execute();
	echo $getMessageListAction->getAjaxData();
?>