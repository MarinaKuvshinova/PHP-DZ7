<?php
$country = strtolower(trim($_POST['country']));
$fp = @fopen("countries.txt", "a+");
$fpd = @fopen("dictionary.txt", "r+");
$arrC=[];
$arrCd=[];
while (!feof($fp))
{
    $s = strtolower(trim(fgets($fp)));
    $s!==''?$arrC[]=$s:false;
}
while (!feof($fpd))
{
    $s = strtolower(trim(fgets($fpd)));
    $s!==''?$arrCd[]=$s:false;
}

if (array_search($country, $arrC)===false) {
    if (array_search(strtolower($country), $arrCd)===false) {
        fclose($fpd);
        fclose($fp);
        echo json_encode(array('error'=>'falseCountry'));
    } else {
        fwrite($fp, "\r\n".$country);
        $arrC[]=$country;
        $country = $countryText = '';
        fclose($fpd);
        fclose($fp);
        echo json_encode($arrC);
    }
} else {
    fclose($fpd);
    fclose($fp);
    echo json_encode(array('error'=>'falseExist'));
}



