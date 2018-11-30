let request = createAjaxObject();
function createAjaxObject() {
    let req = null;
    try
    {
        req =  new XMLHttpRequest();//для современных
    }
    catch(e){
        try{
            req = new ActiveXObject("Msxm12.XMLHTTP")
        }
        catch(e) {
            //старые браузеры Microsoft
            try
            {
                req = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e) {
                alert("Ajax is not supported by you your browser!")
            }
        }
    }
    return req;
}
function Process() {
    if(request.readyState == 4 || request.readyState == 0){
        let country = document.getElementById("countryText").value;
        if(!(country.trim()=='')){
            request.open("POST","getCountries.php",true);
            request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            request.onreadystatechange = getData;
            request.send("country="+country);
        }
    }
}
function getData() {
    if(request.readyState == 4 && request.status == 200){
        let response = JSON.parse(request.responseText);

        if(document.getElementById('countrySelect')){
            document.getElementById('countrySelect').parentNode.removeChild(document.getElementById('countrySelect'));
        }
        if (response['error']){
            let textError = document.createElement("h3");
            textError.id = "countrySelect";
            textError.className = "alert alert-danger";
            if (response['error'] == 'falseCountry') {
                textError.textContent = 'Its is not country';
            } else {
                textError.textContent = 'This country has already been added.';
            }
            document.getElementById("result").appendChild(textError);
        } else {
            console.log(3);
            let selectList = document.createElement("select");
            selectList.id = "countrySelect";
            selectList.className = "form-control";
            document.getElementById("result").appendChild(selectList);

            for (let i = 0; i < response.length; i++) {
                let option = document.createElement("option");
                option.value = response[i];
                option.text = response[i];
                selectList.appendChild(option);
            }
        }
    }
}
