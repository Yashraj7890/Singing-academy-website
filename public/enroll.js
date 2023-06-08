

const form=document.getElementById('form');
form
.addEventListener('submit',function(event){
    event.preventDefault()
    let country=document.getElementById('input').value.trim();
    fetch("https://restcountries.com/v3.1/name/"+country).then(function(res){
        return res.json();
    }).then((res)=>{
    if(res.status===404||res.length===0){
        swal({
            title: "Error!",
            text: "Please enter a valid country",
            type: "error",
            confirmButtonText: "Try again",
            confirmButtonColor:"#515151",
            allowOutsideClick: "true"
          });
    }
    else{
        form.submit();
    }
    })
});