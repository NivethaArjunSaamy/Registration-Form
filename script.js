function showPassword(){
    var password=document.getElementById('password');
    var eyeicon=document.getElementById('eye');
    if(password.type==='password')
    {
        password.type='text';
        eyeicon.src='eye.png';
        
    }
    else{
        password.type='password';
        eyeicon.src='hide.png';      
    }
}


function register(event) {
    
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var dob = document.getElementById('dob').value;
    var gender = document.getElementById('gender').value;
    var occupation = document.getElementById('occupation').value;
    var education = document.getElementById('education').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var pan = document.getElementById('pan').value;
    var val= validateAge();
    var flag=0;
    var fileInput = document.getElementById('photo');
    var file = fileInput.files[0];
    var ftype=file.type;
    var fsize=file.size;
    var reader = new FileReader();
    var errorMsgElements = document.getElementsByClassName('error');
    
    

    for (var i = 0; i < errorMsgElements.length; i++) {
        if (errorMsgElements[i].innerText.trim() !== '') {
            event.preventDefault();
            flag=1;
            console.log('inside if')
        }
    }
    console.log('before flag check');
if(flag === 0){
    reader.onload= function(event) {
        var base64Image = event.target.result;

        var formData = {
            name: name,
            email: email,
            phone: phone,
            dob: dob,
            gender: gender,
            occupation: occupation,
            age: val,
            education: education,
            username: username,
            password: password,
            pan: pan,
            photo: base64Image,
            file:{ftype,fsize}
        };
        var storedData = JSON.parse(localStorage.getItem('dataHold')) || [];
        storedData.push(formData);
        var storedDataJSON = JSON.stringify(storedData);
        localStorage.setItem('dataHold', storedDataJSON);
        alert("Congrats!! registered successfully... 🎉");
        playErrorSound();
        // window.location.reload();

        document.getElementById('registrationForm').reset();
       
    };
    reader.readAsDataURL(file);
}}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('name').addEventListener('input', function () {
        // console.log(this);
        var name = document.getElementById('name').value;
        var nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(name)) {
            document.getElementById('nameError').innerHTML = "Invalid characters in the name...";
            document.getElementById('name').style.outline="2px solid red"
            document.getElementById('nameError').style.color='red'

        } else {
            document.getElementById('name').style.outline="2px solid green"
            document.getElementById('nameError').innerHTML = "";
            console.log('crt name')
            
        }
    });


    document.getElementById("email").addEventListener("input", function() {
        var gmail = document.getElementById('email').value;
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(gmail)) {
            document.getElementById('emailError').innerHTML = "No such mail id is valid...";  
            document.getElementById('email').style.outline="2px solid red";
            document.getElementById('emailError').style.color='red';      
        } 
        else {
            document.getElementById('emailError').innerHTML = "";
            document.getElementById('email').style.outline="2px solid green";
            console.log('crt mail')
            
        }
    });

    document.getElementById('phone').addEventListener('input',function() {
        var phone = document.getElementById('phone').value;
        var phoneRegex = /^[6-9]{1}[0-9]{9}$/;
        if(!phoneRegex.test(phone)) {
            document.getElementById('phoneError').innerHTML = "Sorry..Mobile number seems invalid... ";
            document.getElementById('phone').style.outline="2px solid red";
            document.getElementById('phoneError').style.color='red';
        }
        else{
            document.getElementById('phoneError').innerHTML = "";
            document.getElementById('phone').style.outline="2px solid green";
            console.log('crt no')
        }
    });

    document.getElementById('dob').addEventListener('input',function() {
        var dob = document.getElementById('dob').value;
        var birthdate=new Date(dob);
        var year=birthdate.getFullYear();
        if(!(year>=1950 && year<=2010)){
            document.getElementById("dob").style.outline='2px solid red'
            document.getElementById('dobError').innerHTML = "Sorry.. you are not eligible right now!!";

        }
        else{
            document.getElementById("dob").style.outline='2px solid green'
            console.log('crt dob')
            document.getElementById('dobError').innerHTML = "";
        }
    });



    document.getElementById('pan').addEventListener('input',function() {
        var pan = document.getElementById('pan').value;
        var panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if(!panRegex.test(pan)){
            document.getElementById("pan").style.outline='2px solid red'
            document.getElementById('panError').innerHTML = "Enter valid PAN...";
        }
        else{
            document.getElementById("pan").style.outline='2px solid green'
            console.log('crt pan ')
            document.getElementById('panError').innerHTML = "";
        }
    });

    document.getElementById('username').addEventListener('input', function() {
        var usernameVal = this.value;
        var storedData = JSON.parse(localStorage.getItem('dataHold')) || [];
        var usernameExists = storedData.some(data => data.username === usernameVal);
        var usernameErrorElement = document.getElementById('usernameError');
        if (usernameExists) {
            console.log('crt unme')
            usernameErrorElement.innerHTML = "Oopss! This username is taken...";
            document.getElementById("username").style.outline='2px solid red'
        } else {
            usernameErrorElement.innerHTML = "";
            document.getElementById("username").style.outline='2px solid green'
        }
    });    

    document.getElementById('password').addEventListener('input',function() {
        var password = document.getElementById('password').value;
        var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passwordRegex.test(password)){
            document.getElementById('passwordError').innerHTML = "Password is weak";
            console.log('crt pss')
            document.getElementById("password").style.outline='2px solid red';
        }
        else if(password.length >15){
            document.getElementById('passwordError').innerHTML = "Password is too long";
            document.getElementById("password").style.outline='2px solid green';
        }
        else{
            document.getElementById('passwordError').innerHTML = "";
            document.getElementById("password").style.outline='2px solid green';
        }
    });

    document.getElementById('photo').addEventListener('change',function() {
        var photo = document.getElementById('photo');
        var photosize=photo.files[0].size;
        if (photosize < (2*1024*1024)) {
            document.getElementById('photoError').innerHTML = "";
            document.getElementById("photo").style.outline='2px solid green';
            console.log('crt img')
            
        }
        else{
            document.getElementById('photoError').innerHTML = "Image size is too large. upload less than 2MB";
            document.getElementById("photo").style.outline='2px solid red';
        }
    });

    addEventListener('input', function(event){
        
            var searchInput=document.getElementById('searchInput');
            if(document.activeElement===searchInput)
            {
                search();
                event.preventDefault();
            }
    });
    
    document.getElementById('searchInput').addEventListener('input',function(){
        document.getElementById('searchError').innerHTML="";
    });
});


    function backToForm(){
        var formC = document.getElementById('formC');
        var container = document.getElementById('resultC');
        container.style.display = 'none';
        formC.style.display='block';

    }

    function validateAge(){
        var dateInput=document.getElementById('dob').value;
        var birthdate=new Date(dateInput);
        var currentDate=new Date();
        var currentMonth = currentDate.getMonth();
        var birthMonth = birthdate.getMonth();
        var age=currentDate.getFullYear()- birthdate.getFullYear()-1;
        if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthdate.getDate())) {
            age--;
        }
    
        return age;
    }
    
    function search() {
        var searchInput = document.getElementById('searchInput').value.toLowerCase();
    
        if (searchInput === "") {
            document.getElementById("resultC").innerHTML=""
            return;
        }
    
        var storedData = JSON.parse(localStorage.getItem('dataHold')) || [];
        var searchResults;
    
        if (/^\d+$/.test(searchInput)) 
        { 
            searchResults = storedData.filter(data => data.age < (searchInput / 365));
        } 
        
        else if (/^(\d+)([mMkK]?[bB]?)$/.test(searchInput)) {

            var match = searchInput.match(/^(\d+)([mMkK]?[bB]?)$/);
            var numericValue = parseFloat(match[1]);
            console.log(match);
            var unit = match[2].toLowerCase();
    
            var searchInputBytes = (unit === 'kb' ? numericValue * 1024 : numericValue * 1024 * 1024);
            searchResults = storedData.filter(data => data.file.fsize <= searchInputBytes);
        } 
        
        else {
            searchResults = storedData.filter(data =>( data.name.toLowerCase()).includes(searchInput.toLowerCase()));
        }

        displaySearchResults(searchResults);
    }
    

    function displaySearchResults(find) {
        var container = document.getElementById('resultC');
        var formC = document.getElementById('formC');
        let flag=1;
        container.textContent = ''
        for(i=0;i<=find.length;i++){
        if (find[i]) {
            container.style.display = 'block';
            formC.style.display='none';
            var matchItem = document.createElement('div');
            matchItem.innerHTML =`<h3><em>Username:</em> ${find[i].username}</h3>`;
            matchItem.innerHTML += `<img src="${find[i].photo}" width="200" height="200">`;
            matchItem.innerHTML +=`<h3><em>Name:</em>${find[i].name}</h3>`;            
            matchItem.innerHTML +=`<h3><em>Email:</em> ${find[i].email}</h3>`;
            matchItem.innerHTML +=`<h3><em>Phone:</em> ${find[i].phone}</h3>`;
            matchItem.innerHTML +=`<h3><em>DOB:</em> ${find[i].dob}</h3>`;
            matchItem.innerHTML +=`<h3><em>Age:</em> ${find[i].age}</h3>`;
            matchItem.innerHTML +=`<h3><em>Gender:</em> ${find[i].gender}</h3>`;
            matchItem.innerHTML +=`<h3><em>Education:</em> ${find[i].education}</h3>`;
            container.appendChild(matchItem);
            matchItem.classList.add('aligned-content');
            flag=0;

        }
        }
        if(flag==0){
            matchItem.innerHTML +=`<button id="back"  onclick="backToForm()">Back</button>`;
        }
        else{
            container.style.display = 'none';
            document.getElementById('searchError').innerHTML = 'No such user found.';
        }
    }

    function goToLog(){
        alert('going')
        window.location.href="index.html";
    }

    function playErrorSound(){
        var invalidSound = document.getElementById('errorSound');
        invalidSound.play();
 }
