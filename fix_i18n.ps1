$path = 'src/lib/i18n.ts'
$text = Get-Content $path -Raw
$text = $text.Replace("      title: 'Une expérience d'exception'", "      title: \"Une expérience d'exception\"")
$text = $text.Replace("      desc: 'Choisissez l'expertise, les machines haut de gamme et un service local taillé pour Marrakech.'", "      desc: \"Choisissez l'expertise, les machines haut de gamme et un service local taillé pour Marrakech.\"")
$text = $text.Replace("      desc: 'Choisissez votre machine, on s'occupe du reste.'", "      desc: \"Choisissez votre machine, on s'occupe du reste.\"")
$text = $text.Replace("      title: 'Images et vidéos de l'activité, et notre point de départ'", "      title: \"Images et vidéos de l'activité, et notre point de départ\"")
$text = $text.Replace("      videoLabel: 'Vidéo d'aventure'", "      videoLabel: \"Vidéo d'aventure\"")
$text = $text.Replace("      helpText: 'Besoin d'aide '", "      helpText: \"Besoin d'aide \"")
$text = $text.Replace("      title: 'Let's talk about your adventure'", "      title: \"Let's talk about your adventure\"")
$text = $text.Replace("      title: 'Foto's en video's van de activiteit en onze vertrekbasis'", "      title: \"Foto's en video's van de activiteit en onze vertrekbasis\"")
$text = $text.Replace("      desc: 'Prijs weergegeven in euro's en Marokkaanse dirhams.'", "      desc: \"Prijs weergegeven in euro's en Marokkaanse dirhams.\"")
$text = $text.Replace("      title: 'Lass uns über dein Abenteuer sprechen'", "      title: \"Lass uns über dein Abenteuer sprechen\"")
Set-Content $path -Encoding utf8 -Value $text
