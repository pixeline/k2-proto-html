# TODO

- vignette radio mediaplayer  > vignette--bandelette-mediaplayer.kit
- Check home responsive mobile + tablette

##########################
# LAYOUT BUILDER : LEQUEL?
##########################
- pouvoir spécifier les colonnes de la rangée (1/3, 2/3, 1/2)
- pouvoir utiliser des Widgets (chaque type de vignette = 1 widget. Le widget doit pouvoir spécifier 1 article spécifique ou le dernier (Featured) article d'une catégorie)

## 
un plugin qui permet de créer des colonnes responsive
https://wordpress.org/plugins/responsive-column-widgets
(à tester, mais semble compliqué à utiliser, peu visuel)

# SiteOrigin PageBuilder
https://siteorigin.com/page-builder/

		
		
## A propos du Golive et followup
- prévoir beaucoup d'assistance et formation (car VC va créer bcp d'envies) 
- planifier migration de la DB vers un WP unisite et de tous les fichiers sur le VPS



# Tester minimax
https://wordpress.org/plugins/page-layout-builder/
pro = 35 USD http://wpeden.com/minimax-wordpress-page-layout-builder-plugin/

# Tester WP Beaver Builder   (Bootstrap-based)
https://www.wpbeaverbuilder.com

# Tester WP Views  (https://wp-types.com) 
!! utilise bootstrap !  150 USD

# tester visual composer
- basé sur Bootstrap 3  / css minimisé: 727kb!!
- désactiver les template fournies, en créer de nouvelles
- quid des breakpoints? Je dois m'adapter à VC ou VC peut s'adapter aux miens?
- custom CSS: https://wpbakery.atlassian.net/wiki/display/VC/Custom+CSS
	- To override class names that are applied to Visual Composer content elements:  add_filter("vc_shortcodes_css_class").
- il faudrait que la feuille de style soit appliquée dans le VC et le Classic editor

## VC: concrètement
- des templates: https://wpbakery.atlassian.net/wiki/display/VC/Templates
Créer des "default templates":
(how: https://wpbakery.atlassian.net/wiki/pages/viewpage.action?pageId=524300 )
		- "article"
		- "homepages"
		- "rubrique index"
		et peut-être
		- "équipe"
		- "feuilleton"
		- "série"
