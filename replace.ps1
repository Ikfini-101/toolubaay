$files = Get-ChildItem -Path "src" -Recurse -Include *.astro,*.ts,*.json -File

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $original = $content
    
    $content = $content -creplace 'contact@toolubaay\.sn', 'infotoolubay@gmail.com'
    
    $content = $content -replace '221770914639', '221774745011'
    $content = $content -replace '77 091 46 39', '77 474 50 11'
    
    $content = $content -creplace 'aux coopératives', 'au GIE'
    $content = $content -creplace 'des coopératives', 'des GIE'
    $content = $content -creplace 'les coopératives', 'les GIE'
    $content = $content -creplace 'nos coopératives', 'nos GIE'
    $content = $content -creplace 'la coopérative', 'le GIE'
    $content = $content -creplace 'cette coopérative', 'ce GIE'
    $content = $content -creplace 'notre coopérative', 'notre GIE'
    $content = $content -creplace 'une coopérative', 'un GIE'
    
    $content = $content -creplace 'coopérative', 'GIE'
    $content = $content -creplace 'Coopérative', 'GIE'
    $content = $content -creplace 'coopératives', 'GIE'
    $content = $content -creplace 'Coopératives', 'GIE'

    $content = $content -creplace 'productrices', 'producteurs'
    $content = $content -creplace 'productrice', 'producteur'
    $content = $content -creplace 'Productrices', 'Producteurs'
    $content = $content -creplace 'Productrice', 'Producteur'

    $content = $content -creplace 'conforme aux normes B2B', 'HACCP'
    $content = $content -creplace 'normes B2B', 'HACCP'
    
    $content = $content -creplace 'women cooperatives', 'women GIE'
    $content = $content -creplace 'women cooperative', 'women GIE'
    
    $content = $content -creplace 'cooperativas de mujeres', 'GIE de mujeres'
    $content = $content -creplace 'cooperativa de mujeres', 'GIE de mujeres'

    if ($original -cne $content) {
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
    }
}
