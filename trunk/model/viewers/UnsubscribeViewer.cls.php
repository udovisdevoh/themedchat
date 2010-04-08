<?php
class UnsubscribeViewer
{
	public function getHtmlCode($unsubscribeAction)
	{
		$html = "";
		
		$html .= '<div id="chatPage">';
			$html .= '<h1>S\'enregistrer</h1>';
			$html .= '<form method="post" action="'.$_SERVER['REQUEST_URI'].'">';
				$html .= '<div class="FormElement" id="formElementOutput">';

					$html .= '<div>Matricule: <input type="text" name="matricule" /></div>';
					
					$html .= '<div>';
						$html .= '<input class="Button" type="submit" value="Se désenregistrer" />';
					$html .= '</div>';
					
				
				$html .= '</div>';
				
				
			$html .= '</form>';
		$html .= '</div>';
		
		$html .= '<p style="color:#FFF">'.$unsubscribeAction->getResult().'</p>';
		
		$menuViewer = new MenuViewer();
		$html .= $menuViewer->getHtmlCode();
		
		return $html;
	}
}