let steps=[0, 6220*12, 8920*12, 14320*12, 19990*12, 41410*12, 53333*12];
let rate=[0.10, 0.14, 0.20, 0.31, 0.35, 0.47, 0.50];

function fun(){
    function myFunction(){ 
        let name=$("#name").val();
        let str="Hello " +name+ " your choises are" ;
        if($("#bike")[0].checked)
            str+="<br>"+$("#bike").val();

        $("#demo").html(str);
        }
        $("#myFunction").click(myFunction);
    }
    $("document").ready(fun);
    
function setTwelve(box){
    row=document.getElementById("months");
    let base=document.getElementById('mon0');
    if(box.checked){
        row.style.display='none';
        base.disabled=false;
    }
    else{
        row.style.display='';
        base.disabled=true;
        base.value='';
    }
    calcGross();
}

function calcGross(){
    let gross=document.getElementById('gross');
    let total=0, income;
    let box=document.getElementById('twelve');
    if(box.checked){
        income=valueOfMonth(0);
        if(income == '?'){
            return;
        }
        total=income*12;
    }
    else{   
        let i;
        for(i=1;i<=12;++i){
            income = valueOfMonth(i);
            if(income == '?'){
                gross.innerText = '?';
                return;
            }
            total += income;
        }
    }
    gross.innerText=total;
    let taxInfo=document.getElementById('taxinfo');
    taxInfo.style.textDecoration='line-through';
}

function valueOfMonth(mon){
    let id=document.getElementById('mon'+mon);
    let val=id.value;
    if(val==''){
        val=0;       
    }
    else{
        if(isNaN(val)){
            alert('wrong number');
            val='?';
        }
        else{
            val=parseFloat(val);
            if(val < 0){
                alert('positive number only');
                val='?';
            }
        }
    }
    return val;
}

function calcTax(){
    let taxInfo=document.getElementById('taxinfo');
    let taxSpan=document.getElementById('tax');
    taxInfo.style.display='';
    taxInfo.style.textDecoration='';    

    let income = document.getElementById('gross').innerText;
    if(income=='?'){
        taxSpan.innerText = '?';        
        return;
    }

    let gross=parseFloat(income);
    let tax=0, i;
    for(i = 1; i < steps.length && steps[i] <= gross; i++){
    }
    
    for(i = i-1; i >= 0; --i){
        tax += (gross - steps[i]) * rate[i];
        gross = steps[i];
    }

    let bonus = valueOfMonth(99);
    if(bonus == '?'){
        taxSpan.innerText = '?';        
        return;
    }

    tax -= bonus * 2580;    
    if(tax < 0){
        tax=0;
    }
    taxSpan.innerText=tax;
}
