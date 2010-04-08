<?php
class MenuViewer
{
	public function getHtmlCode()
	{
		$html = "";
		
		$menuItem[] = '<a href=".\">Chat</a>';
		$menuItem[] = '<a href="login.php">Se connecter</a>';
		$menuItem[] = '<a href="subscribe.php">S\'enregistrer</a>';
		
		$html .= '<div class="Clear"></div><div class="Menu">'.implode(" | ", $menuItem).'</div>';
		
		return $html;
	}
}