<?php
error_reporting((E_ALL ^ E_NOTICE) & ~E_DEPRECATED);
session_start();

//Viewers
require_once('viewers/ChatInputViewer.cls.php');
require_once('viewers/LoginViewer.cls.php');
require_once('viewers/SubscribeViewer.cls.php');
require_once('viewers/UnsubscribeViewer.cls.php');
require_once('viewers/MenuViewer.cls.php');

//Actions
require_once('actions/AbstractAction.cls.php');
require_once('actions/LoginAction.cls.php');
require_once('actions/LogoutAction.cls.php');
require_once('actions/ChatAction.cls.php');
require_once('actions/SubscribeAction.cls.php');
require_once('actions/UnsubscribeAction.cls.php');
require_once('actions/GetMemberListAction.cls.php');
require_once('actions/GetMessageListAction.cls.php');

//Nusoap
require_once('nusoap/nusoap.php');

?>