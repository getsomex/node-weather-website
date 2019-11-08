console.log('client side js is loaded');








const weatherForm = document.querySelector('button');
const search = document.querySelector('input');
const msg1= document.querySelector('.msg-1');
const msg2= document.querySelector('.msg-2');

weatherForm.addEventListener('click',e =>{
    
    e.preventDefault();
    const location = search.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent = `Error : ${data.error}`
            } else{
                msg1.textContent = `Location : ${data.location}`
                msg2.textContent = `Forecast : ${data.forecast}`
            }
        })
    
    
    })

})



