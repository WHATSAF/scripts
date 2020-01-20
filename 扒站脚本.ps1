Write-Host "选择抓取类型" -ForegroundColor White -BackgroundColor Green
Write-Host "1、PC网站"
Write-Host "2、手机网站"
Write-Host "3、广告跳转"
$type=Read-Host "输入数字"
$mobileUA="Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
$baiduReferer="https://www.baidu.com"
$siteUrl=Read-Host "输入网站地址"
$domain=""
$scheme=""
if ($siteUrl -match "(?<scheme>http[s]?):\/\/(?<domain>.+)\/")
{
    $scheme=$Matches.scheme
    $domain=$Matches.domain
}
mkdir "$domain"
switch ($type)
{
    1 {Invoke-WebRequest $siteUrl -OutFile "$domain\\index.html"; break;}
    2 {Invoke-WebRequest $siteUrl -OutFile "$domain\\index.html" -Headers @{"User-Agent"=$mobileUA}; break;}
    3 {Invoke-WebRequest $siteUrl -OutFile "$domain\\index.html" -Headers @{"Referer"=$baiduReferer;"User-Agent"=$mobileUA}; break;}
    default {exit}
}


$tags=(Get-Content "$domain\\index.html" | Select-String -Pattern '<img(.*?)>|<link(.*?)>|<script(.*?)>' -AllMatches).Matches
$i=0
foreach ($tag in $tags)
{
    $i++

    if ($tag -match '<link.+href=\"(?<path>.+/)(?<file>.+\.css)\"' `
    -or $tag -match '<script.+src=\"(?<path>.+/)(?<file>.+\.js)\"' `
    -or $tag -match '<img.+src=\"(?<path>.+/)(?<file>.+\.\w+)\"')
    {
        if (-not (Test-Path ("$domain\\{0}" -f $Matches.path)))
        {
            mkdir ("$domain\\{0}" -f $Matches.Path)
        }
        Invoke-WebRequest ("$scheme`://$domain/{0}{1}" -f $Matches.path,$Matches.file) -OutFile ("$domain\\{0}{1}" -f $Matches.path,$Matches.file)
        Unblock-File ("$domain\\{0}{1}" -f $Matches.path,$Matches.file)
    }

    $percent=[int](($i/$tags.Length)*100)
    Write-Progress -Activity "已完成：$percent" -PercentComplete $percent
}

Write-Host "处理完毕！" -BackgroundColor Green -ForegroundColor White
pause