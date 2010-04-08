<?php
class SubscribeViewer
{
	public function getHtmlCode()
	{
		$html = "";
		
		$html .= '<div id="chatPage">';
			$html .= '<h1>S\'enregistrer</h1>';
			$html .= '<form method="post" action="'.$_SERVER['REQUEST_URI'].'">';
				$html .= '<div class="FormElement" id="formElementOutput">';

					$html .= '<div>Usager: <input type="text" name="user" /></div>';
					$html .= '<div>Mot de passe: <input type="text" name="password" /></div>';
					
					$html .= '<div>';
						$html .= '<input class="Button" type="submit" value="S\'enregistrer" />';
					$html .= '</div>';
				
				$html .= '</div>';
				
				
			$html .= '</form>';
		$html .= '</div>';
		
		$menuViewer = new MenuViewer();
		$html .= $menuViewer->getHtmlCode();
		
		return $html;
	}
}