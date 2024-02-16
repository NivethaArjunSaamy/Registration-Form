function goToReg(){
    window.location.href="reg.html";
}

function showPassword(){
    var password=document.getElementById('password');
    var eyeicon=document.getElementById('eye');
    if(password.type==='password')
    {
        password.type='text';
        eyeicon.src='open-eye.png';
        
    }
    else{
        password.type='password';
        eyeicon.src='closed-eye.png';      
    }
}

function login(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var storedData = JSON.parse(localStorage.getItem('dataHold'));
    var authenticatedUser = storedData.find(user => user.username === username && user.password === password);

    
    if (authenticatedUser) {
        displaySearchResults(username);
    } else {
        alert('Invalid username or password');
    }
}

function displaySearchResults(find) {
    var storedData = JSON.parse(localStorage.getItem('dataHold')) || [];
    var searchResults = storedData.filter(data => data.username === find)
    console.log(searchResults)
    var container = document.getElementById('resultC');
    var loginC = document.getElementById('loginC');
    container.textContent = '';

    
        container.style.display = 'block';
        loginC.style.display='none';
        var matchItem = document.createElement('div');

        matchItem.innerHTML =`<h3><em>Username:</em> ${searchResults[0].username}</h3>`;
        matchItem.innerHTML += `<img src="${searchResults[0].photo}" width="200" height="200">`;
        matchItem.innerHTML +=`<h3><em>Name:</em>${searchResults[0].name}</h3>`;            
        matchItem.innerHTML +=`<h3><em>Email:</em> ${searchResults[0].email}</h3>`;
        matchItem.innerHTML +=`<h3><em>Phone:</em> ${searchResults[0].phone}</h3>`;
        matchItem.innerHTML +=`<h3><em>DOB:</em> ${searchResults[0].dob}</h3>`;
        matchItem.innerHTML +=`<h3><em>Age:</em> ${searchResults[0].age}</h3>`;
        matchItem.innerHTML +=`<h3><em>Gender:</em> ${searchResults[0].gender}</h3>`;
        if(searchResults.occupation === ""){ 
            matchItem.innerHTML +=`<h3><em>Occupation:</em> nill </h3>`;
        }
        else{
        matchItem.innerHTML +=`<h3><em>Occupation:</em> ${searchResults[0].occupation}</h3>`;}
        matchItem.innerHTML +=`<h3><em>Education:</em> ${searchResults[0].education}</h3>`;
        container.appendChild(matchItem);
        matchItem.classList.add('aligned-content');   
}