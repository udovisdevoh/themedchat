<?php
	require_once('../AssemblyInfo.ns.php');
	$getMemberListAction = new GetMemberListAction();
	$getMemberListAction->execute();
	echo $getMemberListAction->getAjaxData();
?>