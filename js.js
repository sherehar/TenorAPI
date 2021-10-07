document.getElementById("sbmt").addEventListener('click', validator);

function validator(e) {
    e.preventDefault();
    const x = document.getElementById("srch");
    let searchWord = x.value;
    const y = document.getElementById("lmt");
    let lmt = y.value;
    lmt = parseInt(lmt);
    if (searchWord == "" || lmt == "") {
        document.getElementById("warning").innerHTML=('<p>Warning! Search Word must be filled out. </p>');
    } else if(isNaN(lmt) || lmt < 1 || lmt > 20){
            document.getElementById("warning").innerHTML=('<p> Warning! Please enter a number between 1 to 20</p>');
        }else{
            document.getElementById("warning").innerHTML="";
            document.getElementById("content").innerHTML="";
            document.querySelector("h4").innerText=`Search Result for (${searchWord})`;
            getGif(searchWord, lmt);
            document.getElementById("srch").value = "";
            document.getElementById("lmt").value = "";
        }
    
    
}

function getGif(searchWord, lmt){
    let XHReq = new XMLHttpRequest();
    XHReq.open('GET',`https://api.tenor.com/v1/search?q=${searchWord}&key=CON25TPJXR5Y&limit=${lmt}`,true);
    XHReq.onload = function(){
    if(XHReq.status === 200){
        let jsonResponse = XHReq.responseText;
        let ResObj = JSON.parse(jsonResponse);
        let gifs = ResObj["results"];
        // console.log(gifs)
        // console.log(searchWord)
        let pic ='';
        if(gifs.length > 0){
            gifs.forEach((gif) => {
            let url = gif.media[0].gif.url;
            let img = `<a href ="${url}" target= "_blank"><img src="${url}" class="rounded gif"></a>`; 
            console.log(url);
            pic += img;
        });
        document.getElementById('content').innerHTML = (`${pic}`);
        }else{
            document.getElementById("warning").innerHTML=('<p>Sorry, nothing to show, try it with another meaningful Word</p>');
        }
    }else if(XHReq.status === 404){
        document.getElementById("warning").innerHTML=('<p>Not Found</p>');
    }

    }
XHReq.send();
}


function TrendGif(){
    let XHReq = new XMLHttpRequest();
    XHReq.open('GET',`https://g.tenor.com/v1/trending?&key=CON25TPJXR5Y&limit=20`,true);
    XHReq.onload = function(){
    if(XHReq.status === 200){
        let jsonResponse = XHReq.responseText;
        let ResObj = JSON.parse(jsonResponse);
        let gifs = ResObj["results"];
        console.log(gifs)
        let pic = '';
        gifs.forEach((gif) => {
            let url = gif.media[0].gif.url;
            let img = `<a href ="${url}" target= "_blank"><img src="${url}" class="rounded term"></a>`; 
            console.log(url);
            pic += img;
        });
        document.getElementById('content').innerHTML = (`${pic}`);
    }else if(XHReq.status === 404){
        document.getElementById("warning").innerHTML=('<p>Not Found</p>');
    }
}
XHReq.send();

}

TrendGif();
